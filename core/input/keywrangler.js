/* [module]
 * import keysyms from "./keysymdef";
 * import KeyTable from "./keysym";
 * import KeySymMaps from "./keysym-map";
 */

// KeyWrangler is a series of keyboard handlers based on the DOM Level 3 UI Event specification.
// It is composed of a series of "filters" which receive events and modify them.
var KeyWrangler = {};

// In browser testing can be done with
// https://cdn.rawgit.com/w3c/uievents/gh-pages/tools/key-event-viewer.html

// PassThroughKeyFilter is a base class for all other filters, which passes
// events through to the next filter in the chain.
KeyWrangler.PassThroughKeyFilter = class {
    constructor(next) {
        this._next = next;
    }

    keydown(evt) {
        this._next.keydown(evt);
    }

    beforeinput(evt) {
        this._next.beforeinput(evt);
    }

    keyup(evt) {
        this._next.keyup(evt);
    }

    compositionupdate(evt) {
        this._next.compositionupdate(evt);
    }

    compositionend(evt) {
        this._next.compositionend(evt);
    }

    releaseAll() {
        this._next.releaseAll();
    }
}

// TerminalKeyFilter passes keyup and keydown events to the given function,
// and ignores all others.

KeyWrangler.TerminalKeyFilter = class {
    constructor(handler) {
        this._handler = handler;
    }

    keydown(evt) {
        this._handler(evt);
    }

    keyup(evt) {
        this._handler(evt);
    }

    beforeinput(evt) {}
    compositionupdate(evt) {}
    compositionend(evt) {}
    releaseAll(evt) {}
}


// TODO: non-latin languages need to be handled better

// So, there are two cases here to handle:
//
// Case #1: Raw Mode (a.k.a. QEMU Mode)
// ====================================
//
// In this mode, we don't really have to fake modifier releases, but we do have
// to guess at dead keys.
//
// This case has three components: a hanlder for dead keys enriches dead key events
// with key information, which then gets processed into keysyms for RFB, and finally
// all down keys are remembered, so that we can generate keyup signals when we ungrab
// focus.
//
// 1. a handler for dead keys
// --------------------------
//
// Dead keys work as such:
// 1. keydown with key of "Dead"
// 2. compositionstart event
// 3. compositionupdate with data of $ACCENT (associated with keydown #1)
// 4. keyup "Dead" (isComposing === true)
// 5. keydown with key of $LETTER with $ACCENT
// 6. compositionupdate with data of key from #5
// 7. compositionend with data of key from #5
// 8. keyup with key of $LETTER (from #5)
//
// So, when we see "Dead", we hold, and wait for the #3 (compositionupdate),
// which we can use to find a corresponding actual key.  The event from #1
// contains a valid code, though, so we save the event and augement it with the
// keysym for the accent.  Then, we can send the letter keydown and keyup (#5
// and #8) as appropriate.
//
// Browser notes (tested on Linux with FF53a1 and Chromium 57):
// - Firefox doesn't fire a composition update with just the accent
// - Firefox doesn't fire a keydown for the dead key, just a keyup, *unless*
//   the we press the dead key again to indicate that we want just an accent
// - Chrome doesn't fire composition events at all in some cases
// - Firefox and Chrome don't properly set the key of #5, but we don't care for this case
//
// Ergo, currently, we can't actually do anything with the keysym from dead keys, be we can
// send the code over just fine (which should work with qemu when it's actually processing
// the code, but will break when qemu ignores the code and uses the keysym (when the keymap
// is set on the qemu command line)).

KeyWrangler.DeadKeyFilter = class extends KeyWrangler.PassThroughKeyFilter {
    constructor(next) {
        super(next);
        this._current_dead = null;
        this._last_accent = null;
    }

    keydown(evt) {
        // pass through if we're not currently handling a dead key, or about to start
        if (evt.key !== "Dead") {
            return this._next.keydown(evt);
        }

        if (this._current_dead !== null) {
            var old_current = this._current_dead;
            this._current_dead = null;
            throw new Error("got another dead key (" + key.code + ") while processing an earlier dead key (" + old_current.code + ")!");
        }

        this._current_dead = evt;
    }

    compositionupdate(evt) {
        if (evt.data) {
            this._last_accent = 0;  // set to zero so we don't skip it, even when we can't look up the keysym
            if (KeySymMaps.DeadKeys[evt.data] !== undefined) {
                this._last_accent = KeySymMaps.DeadKeys[evt.data];
            }
        }
        // TODO: guess at the accent by comparing modified key to the actual one
    }

    compositionend(evt) {
    }

    keyup(evt) {
        if (evt.key !== "Dead") {
            return this._next.keyup(evt);
        }

        var keydown = this._current_dead;
        if (keydown === null) {
            keydown = new KeyboardEvent('keydown', evt);
        }

        if (this._last_accent) {
            // add in the keysym for lookup later
            evt.keysym = this._last_accent;
            keydown.keysym = this._last_accent;
        } else {
            evt.keysym = 0;
            keydown.keysym = 0;
        }

        this._next.keydown(keydown);
        this._next.keyup(evt);

        this._current_dead = null;
    }
}

// 2. the keysym enricher
// ----------------------
//
// This populates the `keysym` field from `KeyboardEvent.key`.

KeyWrangler.KeySymEnricherFilter = class extends KeyWrangler.PassThroughKeyFilter {
    // _lookup turns KeyboardEvent#key and KeyboardEvent#location into
    // an RFB keysym (or undefined for dead keys)
    _lookup(key, loc) {
        // return undefined for dead keys, since the dead key filter should
        // take care of it for us in raw mode, and we skip them in normal mode
        if (key === "Dead") {
            return undefined;
        }

        var keysym = undefined;

        if (KeySymMaps.LocationalKeys[key] !== undefined) {
            // LocationalKeys include some printable character keys, so check those first
            keysym = KeySymMaps.LocationalKeys[key][loc];
        } else if (key.length === 1) {
            // look up printable characters in our table
            // TODO: multi-codepoint characters don't seem to be possible to translate here...
            keysym = keysyms.fromUnicode(key.codePointAt(0));
        } else if (KeySymMaps.NonLocationalKeys[key] !== undefined) {
            keysym = KeySymMaps.NonLocationalKeys[key];
        }

        if (keysym === undefined) {
            throw new Error("unknown key '" + key + "' at location " + loc);
        }

        return keysym
    }

    keyup(evt) {
        // the dead key handler populates this for us, so we skip it here
        if (evt.keysym === undefined) {
            evt.keysym = this._lookup(evt.key, evt.location);
            if (evt.keysym === undefined) {
                // skip it
                return;
            }
        }

        this._next.keyup(evt);
    }

    keydown(evt) {
        // the dead key handler populates this for us, so we skip it here
        if (evt.keysym === undefined) {
            evt.keysym = this._lookup(evt.key, evt.location);
            if (evt.keysym === undefined) {
                // skip it
                return;
            }
        }

        this._next.keydown(evt);
    }
}

// 3. a helper to track key state
// ------------------------------
//
// This tracks key state so that we can release all keys when we ungrab.

// TODO: why does the old code fake CtrlLeft + AltRight releases?

KeyWrangler.KeyStateTrackingFilter = class extends KeyWrangler.PassThroughKeyFilter {
    constructor(next) {
        super(next);
        // map from key code + location to relevant keysym
        this._down_keys = new Map();
    }

    _key_id(evt) {
        // We can use key codes (combined with location) to
        // unambiguously identify keys.
        return evt.code + '/' + evt.location;
    }

    keydown(evt) {
        this._down_keys.set(this._key_id(evt), evt);
        this._next.keydown(evt);
    }

    keyup(evt) {
        this._down_keys.delete(this._key_id(evt));
        this._next.keyup(evt);
    }

    releaseAll() {
        this._down_keys.forEach((keydown_evt, codeloc) => {
            // TODO: will passing the event as a KeyboardEventInit work?
            var keyup_evt = new KeyboardEvent('keyup', keydown_evt);
            this._next.keyup(keyup_evt);
        });
        this._down_keys.clear();
    }
};

//
// Case #2: Normal VNC Mode
// ------------------------
//
// In this mode, we have to keep track of key-modifiers, and fake releasing
// them when they're used to create a different printable character.  These
// modifiers are somewhat platform dependent, sadly (they *should* all be
// AltGr, but what can you do...).

// In order to do this, we'll first need a good way to keep track of which keys
// are down.  We'll want to track this by `code` to uniquely identify the right
// keys, but we'll want to be able to index by `key` so that we can determine
// modifier state.
KeyWrangler.KeyDownTracker = class {
    constructor(keys) {
        // keys tracks which keys we care about
        this._keys = new Set(keys);

        // map from `code` to keydown events
        this._codes_down = new Map();

        // map from `key` to Set of `code`
        this._keys_to_codes = new Map();
        for (let key of this._keys) {
            this._keys_to_codes.set(key, new Set());
        }
    }

    keydown(evt) {
        // TODO: we could cheat a bit here to make sure our state
        // is synchronized by checking the getModifierKeyState
        // on all incoming events...
        if (this._keys.has(evt.key)) {
            this._codes_down.set(evt.code, evt);
            this._keys_to_codes.get(evt.key).add(evt.code);
        }
    }

    keyup(evt) {
        if (this._keys.has(evt.key)) {
            this._codes_down.delete(evt.code);
            this._keys_to_codes.get(evt.key).delete(evt.code);
        }
    }

    *keyDownEvents(key) {
        for (let code of this._keys_to_codes.get(key)) {
            var evt = this._codes_down.get(code);
            if (evt !== undefined) {
                yield evt;
            }
        }

        return res;
    }

    // a convinience method when you know you only have a single key-code releationship
    getKeyDownEvent(key) {
        for (let code of this._keys_to_codes.get(key)) {
            return this._codes_down.get(code);
        }

        return undefined;
    }

    getAllKeyDownEvents() {
        return this._codes_down.values();
    }

    releaseAll() {
        this._codes_down.clear();
        for (let codes of this._keys_to_codes.values()) {
            codes.clear();
        }
    }
}


//
// We need to be able to tell when someone is pressing modifier keys to create
// a new letter vs when they're doing a keyboard shortcut.  The UI events spec
// indicates that beforeinput (formerly known as keypress) is only fired when
// creating a printable key.  Ergo, if we look for beforeinput events, we can
// find when modifiers are used to create new characters.
//
// In case of actual characters, we see:
// 1. keydown Modifier
// 2. keydown with key of modified character
// 3. beforeinput with data of modified character
// 4. keyup with key of modified character
// 5. keyup Modifier
//
// The last two can be switched around, in which case we have a keyup with a key
// of an unmodified character.  For the sake of keydown tracking, we should probably
// use the code to identify the key.
//
// In case of modifiers not changing the character, we won't get the beforeinput event.
// Thus, when we see a keydown with a modified character, we hold it and wait for a
// beforeinput, another keydown (see below), or a keyup.  At this point, if we see a
// beforeinput, we've got a modified character, so we send keyups for the modifiers,
// the actual keydown event, and then keydown for the modifiers.  If we see either of
// the other events, we send the events as-is.
//
// The browser can send more keydown and beforeinput events in the case of keys being
// held down (Firefox does this for non-printable characters, it seems).  In this case,
// evt.repeat will be set.
//
// NB: beforeinput would be nice to have, or event input with data.  Sadly, Firefox
// and Chrome both lack those, so we'll just have to fall back to keypress.  Same
// principle, but we use keypress.key instead of beforeinput.data
//
// NB: Firefox (at least on Linux) doesn't send keypress when the key triggers during
// composition.  We'll have to use input.
//
// NB: if AltGraph is actually being reported about AltGraph, we shouldn't have to do anything
// special with the logic, because AltGraph itself implies only modification of characters

KeyWrangler.ModifierKeyFakingFilter = class extends KeyWrangler.PassThroughKeyFilter {
    constructor(next, modifiers) {
        super(next);

        // the modifiers to watch for
        this._modifiers = new Set(modifiers);

        // always track AltGraph, since it's what everything should actually be using
        // (and Windows seems to use both AltGraph and Control+Alt sometimes)
        var tracked_keys = new Set(modifiers);
        tracked_keys.add("AltGraph");
        this._tracker = new KeyWrangler.KeyDownTracker(tracked_keys);

        // this keeps track of the keys that we've fake-released
        this._fake_released = new KeyWrangler.KeyDownTracker(tracked_keys);

        this._held_keydown = null;

        // a timer set to stop waiting for a beforeinput event
        this._moveon_timeout = null;
    }

    _release_keydown() {
        if (this._held_keydown !== null) {
            console.log("releasing held keydown ", this._held_keydown);
            this._next.keydown(this._held_keydown);
            this._held_keydown = null;
        }
    }

    repress_modifiers() {
        for (let fake_released of this._fake_released.getAllKeyDownEvents()) {
            this._next.keydown(fake_released);
        }
        this._fake_released.releaseAll();
    }

    releaseAll() {
        this._release_keydown();
        this._next.releaseAll();
    }

    _check_modifiers(evt) {
        for (let mod of this._modifiers) {
            if (evt.getModifierState(mod) === false) {
                return false;
            }
        }

        return true;
    }

    keydown(evt) {
        // release any held-down keys and re-press fake-released modifiers
        this._release_keydown();
        this.repress_modifiers();

        // keep track of our modifiers
        this._tracker.keydown(evt);

        // only check our logic for character-generating keys (non-character
        // keys are ascii words, so checking ascii codepoints with length > 1
        // should suffice).
        if (evt.key.charCodeAt(0) < 0x10 && evt.key.length != 1) {
            console.log("forwarding non-character key ", evt);
            this._next.keydown(evt);
            return;
        }

        // check if all of our modifiers are present...
        if (this._modifiers.size == 0 || !this._check_modifiers(evt)) {
            console.log("missing some modifiers for ", evt);
            // ...and if any are missing, we don't have to care about this key
            let altgr_down = this._tracker.getKeyDownEvent("AltGraph")
            if (altgr_down !== undefined) {
                // track this as a fake-released key
                this._fake_released.keydown(altgr_down);
                this._next.keyup(new KeyboardEvent('keyup', altgr_down));
            }

            this._next.keydown(evt);
            return;
        }

        console.log("holding keydown event ", evt);
        // if all modifiers are present, hold the key until we get a keypress or another event
        this._held_keydown = evt;
        this._moveon_timeout = setTimeout(this._release_keydown.bind(this), 5);
    }

    keyup(evt) {
        // release the held keydown, if present
        this._release_keydown();

        // release saved modifiers
        this._tracker.keyup(evt);

        this._next.keyup(evt);

        // re-press and fake-released modifiers
        this.repress_modifiers();
    }

    beforeinput(evt) {
        console.log("input event ", evt);
        if (this._held_keydown !== null) {
            clearTimeout(this._moveon_timeout);
            console.log("faking modifier releases...");
            var mod_evts = [];
            // get the list of all relevant saved modifiers
            for (let mod of this._modifiers) {
                Array.prototype.push.apply(mod_evts, this._tracker.getKeyDownEvents(mod));
            }
            Array.prototype.push.apply(mod_evts, this._tracker.getKeyDownEvents("AltGraph"));

            // release all held modifiers
            for (let down_evt of mod_evts) {
                this._next.keyup(new KeyboardEvent('keyup', down_evt));
                // track this as a fake-released key
                this._fake_released.keydown(down_evt);

            }

            // release the held keydown event
            this._release_keydown();

            // we release held modifiers on the next keyup event or keydown event
            return;
        }

        // release the held keydown, if it exists
        this._release_keydown();
    } }
// osModifiers is a map from operating systems to their respective replacements for
// AltGr.
KeyWrangler.osModifiers = {
    'linux': [], // Nothing besides AltGraph
    'windows': ["Control", "Alt"],
    'mac': ["Alt"],
};

// Futher complicating the matter is that browsers sometimes don't put the proper
// value of 'key' in when dealing with composed keys -- they'll just put the base
// letter, not the fully composed letter, so we have to use the beforeinput event
// to get the proper keysym.
//
// We also take this time to skip dead keys.
//
// (Both Chrome nor Firefox of the versions listed above seem to do this on Linux,
// but they seem to work properly on Windows).

// this is disabled because it's fragile -- we have no way to tell if a key is
// part of composition (because the browsers aren't up-to-spec yet), so we can't
// easily assume which key is the base key.
//
// Furthermore, Firefox doesn't send send keypress events, so we'd have to use input
// events instead.
/*KeyWrangler.ComposedKeySymFixingFilter = class extends PassThroughKeyFilter {
    constructor(next) {
        super(next);

        // we should be able to use isComposing to detect when we're composing,
        // but neither Chrome nor Firefox seem to honor this.
        this._was_dead = true;

        this._held_keydown = null;
    }

    _release_keydown() {
        if (this._held_keydown !== null) {
            this._next.keydown(this._held_keydown);
            this._held_keydown = null;
        }
    }

    // the flow:
    // - keyup "Dead" --> was_dead = true
    // ...
    // - keydown [not-dead] && was_dead --> hold
    // - beforeinput --> save keysym, release keydown
    // TODO: enrich keyup with keysym?

    keydown(evt) {
        if (evt.key === "Dead") {
            // skip dead keys
            return;
        }

        // if we're compositing, keep the key around if it's not a modifier
        if (this._was_dead && !KeyWrangler.modifierKeys.has(evt.key)) {
            this._held_keydown = evt;
            return;
        }

        // otherwise, just pass it along
        this._next.keydown(evt);
    }

    beforeinput(evt) {
        // if we've got a saved keydown from compositing, enrich and release it
        if (this._held_keydown !== null) {
            this._held_keydown.keysym = evt.data;
            this._release_keydown();
        }
    }

    keyup(evt) {
        // release held keydown events if this isn't a
        // modifier key, just to clean up in case of a state mismatch
        if (!KeyWrangler.modifierKeys.has(evt.key)) {
            this._release_keydown();
        }

        if (evt.key === "Dead") {
            // note that we had a dead key, then skip it
            this._was_dead = true;
            return;
        }

        // reset the "isComposing" marker
        this._was_dead = false;

        // TODO: enrich the keysym of this?
        this._next.keyup(evt);
    }
}*/

// These are all the modifier keys defined by [UIEvents-Key]
KeyWrangler.modifierKeys = new Set([
    "Alt", "AltGraph", "CapsLock", "Control", "Fn", "FnLock",
    "Hyper", "Meta", "NumLock", "ScrollLock", "Shift", "Super",
    "Symbol", "SymbolLock",
]);

/* [module] export default KeyWrangler; */
