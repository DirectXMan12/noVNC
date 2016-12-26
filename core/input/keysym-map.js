/* [module]
 * import KeyTable from "./keysym"
 */

// these maps map [UIEvent-Key] special keys to keysyms
// these maps contain all keys with known corresponding key codes from
// the normal set of keysysms, plus the XFree86 keysyms
// (see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
// for tips on what maps to what)

// Several keys have alternates, which are listed in comments

// missing are:
// - Fn
// - FnLock
// - Symbol
// - SymbolLock
// - Accept
// - Again (could just be XK_Redo)
// - Props
// - Power
// - FinalMode
// - NextCandidate
// - Process
// - Soft1-4
// - some multimedia keys
// - Key11, Key12
// - some audio keys
// - speech keys
// - mobile phone keys
// - most TV keys
// - most media controller keys
var KeySymMaps = {};

KeySymMaps.NonLocationalKeys = {
    "Tab": KeyTable.XK_Tab,
    "CapsLock": KeyTable.XK_Caps_Lock,
    "AltGraph": KeyTable.XK_ISO_Level3_Shift,
    "NumLock": KeyTable.XK_Num_Lock,
    "ScrollLock": KeyTable.XK_Scroll_Lock,
    "Backspace": KeyTable.XK_Page_Down,
    "Clear": KeyTable.XK_Clear, // TODO: Clear in XF86?
    "Copy": KeyTable.XF86XK_Copy,
    "CrSel": KeyTable.XK_3270_CursorSelect,
    "Cut": KeyTable.XF86XK_Cut,
    "EraseEof": KeyTable.XK_3270_EraseEOF,
    "ExSel": KeyTable.XK_3270_ExSelect,
    "Paste": KeyTable.XF86XK_Paste,
    "Redo": KeyTable.XK_Redo,
    "Undo": KeyTable.XK_Undo,
    "Attn": KeyTable.XK_3270_Attn,
    "Cancel": KeyTable.XK_Cancel,
    "ContextMenu": KeyTable.XK_Menu,
    "Escape": KeyTable.XK_Escape,
    "Execute": KeyTable.XK_Execute,
    "Find": KeyTable.XK_Find,
    "Help": KeyTable.XK_Help,
    "Pause": KeyTable.XK_Break, // could also be _Pause
    "Play": KeyTable.XK_3270_Play,
    "Select": KeyTable.XK_Select,
    "ZoomIn": KeyTable.XF86XK_ZoomIn,
    "ZoomOut": KeyTable.XF86XK_ZoomOut,
    "BrightnessDown": KeyTable.XF86XK_MonBrightnessDown,
    "BrightnessUp": KeyTable.XF86XK_MonBrightnessUp,
    "Eject": KeyTable.XF86XK_Eject,
    "LogOff": KeyTable.XF86XK_LogOff,
    "PowerOff": KeyTable.XF86XK_PowerOff, // could also be _PowerDown
    "PrintScreen": KeyTable.XK_Print, // could also be _Sys_Req
    "Hibernate": KeyTable.XF86XK_Hibernate,
    "Standby": KeyTable.XF86XK_Standby,
    "WakeUp": KeyTable.XF86XK_WakeUp,
    "AllCandidates": KeyTable.XK_MultipleCandidates,
    "Alphanumeric": KeyTable.XK_Eisu_Shift, // could also be _Eisu_Toggle
    "CodeInput": KeyTable.XK_Codeinput,
    "Compose": KeyTable.XK_Multi_key,
    "Convert": KeyTable.XK_Henkan,
    "GroupFirst": KeyTable.XK_ISO_First_Group,
    "GroupLast": KeyTable.XK_ISO_Last_Group,
    "GroupNext": KeyTable.XK_ISO_Next_Group,
    "GroupPrevious": KeyTable.XK_ISO_Prev_Group,
    // NB: Firefox generates AltGraph instead
    "ModeChange": KeyTable.XK_Mode_switch,
    "NonConvert": KeyTable.XK_Muhenkan,
    "PreviousCandidate": KeyTable.XK_PreviousCandidate,
    "SingleCandidate": KeyTable.XK_SingleCandidate,
    "HangulMode": KeyTable.XK_Hangul,
    "HanjaMode": KeyTable.XK_Hangul_Hanja,
    "JunjuaMode": KeyTable.XK_Hangul_Jeonja,
    "Eisu": KeyTable.XK_Eisu_toggle,
    "Hankaku": KeyTable.XK_Hankaku,
    "Hiragana": KeyTable.XK_Hiragana,
    "HiraganaKatakana": KeyTable.XK_Hiragana_Katakana,
    "KanaMode": KeyTable.XK_Kana_Shift,  // could also be _Kana_Lock
    "KanjiMode": KeyTable.XK_Kanji,
    "Katakana": KeyTable.XK_Katakana,
    "Romaji": KeyTable.XK_Romaji,
    "Zenkaku": KeyTable.XK_Zenkaku,
    "ZenkakuHanaku": KeyTable.XK_Zenkaku_Hankaku,
    "F1": KeyTable.XK_F1,
    "F2": KeyTable.XK_F2,
    "F3": KeyTable.XK_F3,
    "F4": KeyTable.XK_F4,
    "F5": KeyTable.XK_F5,
    "F6": KeyTable.XK_F6,
    "F7": KeyTable.XK_F7,
    "F8": KeyTable.XK_F8,
    "F9": KeyTable.XK_F9,
    "F10": KeyTable.XK_F10,
    "F11": KeyTable.XK_F11,
    "F12": KeyTable.XK_F12,
    "MediaFastForward": KeyTable.XF86XK_AudioForward,
    "MediaPause": KeyTable.XF86XK_AudioPause,
    "MediaPlay": KeyTable.XF86XK_AudioPlay,
    "MediaRecord": KeyTable.XF86XK_AudioRecord,
    "MediaRewind": KeyTable.XF86XK_AudioRewind,
    "MediaStop": KeyTable.XF86XK_AudioStop,
    "MediaTrackNext": KeyTable.XF86XK_AudioNext,
    "MediaTrackPrevious": KeyTable.XF86XK_AudioPrev,
    "AudioVolumeDown": KeyTable.XF86XK_AudioLowerVolume,
    "AudioVolumeMute": KeyTable.XF86XK_AudioMute,
    "AudioVolumeUp": KeyTable.XF86XK_AudioRaiseVolume,
    "AudioMicMute": KeyTable.XF86XK_AudioMicMute,
    "Dimmer": KeyTable.XF86XK_BrightnessAdjust,
    "MediaAudioTrack": KeyTable.XF86XK_AudioCycleTrack,
    "RandomToggle": KeyTable.XF86XK_AudioRandomPlay,
    "SplitScreenToggle": KeyTable.XF86XK_SplitScreen,
    "Subtitle": KeyTable.XF86XK_Subtitle,
    "VideoModeNext": KeyTable.XF86XK_Next_VMode,
    "Close": KeyTable.XF86XK_Close,
    "New": KeyTable.XF86XK_New,
    "Open": KeyTable.XF86XK_Open,
    "Print": KeyTable.XK_Print,
    "Save": KeyTable.XF86XK_Save,
    "SpellCheck": KeyTable.XF86XK_Spell,
    "MailForward": KeyTable.XF86XK_MailForward,
    "MailReply": KeyTable.XF86XK_Reply,
    "MainSend": KeyTable.XF86XK_Send,
    "LaunchCalculator": KeyTable.XF86XK_Calculator,
    "LaunchCalendar": KeyTable.XF86XK_Calendar,
    "LaunchMail": KeyTable.XF86XK_Mail,
    "LaunchMediaPlayer": KeyTable.XF86XK_AudioMedia, // could also be _CD, _Video
    "LaunchMusicPlayer": KeyTable.XF86XK_Music,
    "LaunchMyComputer": KeyTable.XF86XK_MyComputer, // could also be _Explorer
    "LaunchPhone": KeyTable.XF86XK_Phone,
    "LaunchScreenSaver": KeyTable.XF86XK_ScreenSaver,
    "LaunchSpreadsheet": KeyTable.XF86XK_Excel,
    "LaunchWebBrowser": KeyTable.XF86XK_WWW,
    "LaunchWebCam": KeyTable.XF86XK_WebCam,
    "LaunchWordProcessor": KeyTable.XF86XK_Word,
    "BrowserBack": KeyTable.XF86XK_Back,
    "BrowserFavorites": KeyTable.XF86XK_Favorites,
    "BrowserForward": KeyTable.XF86XK_Forward,
    "BrowserHome": KeyTable.XF86XK_HomePage,
    "BrowserRefresh": KeyTable.XF86XK_Refresh, // could also be _Reload
    "BrowserSearch": KeyTable.XF86XK_Search,
    "BrowserStop": KeyTable.XF86XK_Stop,
};

KeySymMaps.LocationalKeys = {}
// These keys have either a left and a right, or a normal and a numpad variant
KeySymMaps.LocationalKeys = {};
KeySymMaps.LocationalKeys["Alt"] = {};
KeySymMaps.LocationalKeys["Alt"][KeyboardEvent.DOM_KEY_LOCATION_LEFT] = KeyTable.XK_Alt_L;
KeySymMaps.LocationalKeys["Alt"][KeyboardEvent.DOM_KEY_LOCATION_RIGHT] = KeyTable.XK_Alt_R;

KeySymMaps.LocationalKeys["Control"] = {};
KeySymMaps.LocationalKeys["Control"][KeyboardEvent.DOM_KEY_LOCATION_LEFT] = KeyTable.XK_Control_L;
KeySymMaps.LocationalKeys["Control"][KeyboardEvent.DOM_KEY_LOCATION_RIGHT] = KeyTable.XK_Control_R;

// TODO: Firefox might generate "OS" instead of "Super" or "Hyper"
// NB: the standard says that hyper and super aren't supposed to be left/right variant,
// but they really should be, so check anyway
KeySymMaps.LocationalKeys["Hyper"] = {};
KeySymMaps.LocationalKeys["Hyper"][KeyboardEvent.DOM_KEY_LOCATION_LEFT] = KeyTable.XK_Hyper_L;
KeySymMaps.LocationalKeys["Hyper"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Hyper_L;
KeySymMaps.LocationalKeys["Hyper"][KeyboardEvent.DOM_KEY_LOCATION_RIGHT] = KeyTable.XK_Hyper_R;

KeySymMaps.LocationalKeys["Meta"] = {};
KeySymMaps.LocationalKeys["Meta"][KeyboardEvent.DOM_KEY_LOCATION_LEFT] = KeyTable.XK_Meta_L;
KeySymMaps.LocationalKeys["Meta"][KeyboardEvent.DOM_KEY_LOCATION_RIGHT] = KeyTable.XK_Meta_R;

KeySymMaps.LocationalKeys["Super"] = {};
KeySymMaps.LocationalKeys["Super"][KeyboardEvent.DOM_KEY_LOCATION_LEFT] = KeyTable.XK_Super_L;
KeySymMaps.LocationalKeys["Super"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Super_L;
KeySymMaps.LocationalKeys["Super"][KeyboardEvent.DOM_KEY_LOCATION_RIGHT] = KeyTable.XK_Super_R;

KeySymMaps.LocationalKeys["Shift"] = {};
KeySymMaps.LocationalKeys["Shift"][KeyboardEvent.DOM_KEY_LOCATION_LEFT] = KeyTable.XK_Shift_L;
KeySymMaps.LocationalKeys["Shift"][KeyboardEvent.DOM_KEY_LOCATION_RIGHT] = KeyTable.XK_Shift_R;

// side note: there's a separate XK_Linefeed key.  Take that as you will...
KeySymMaps.LocationalKeys["Enter"] = {};
KeySymMaps.LocationalKeys["Enter"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Return;
KeySymMaps.LocationalKeys["Enter"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Enter;

KeySymMaps.LocationalKeys["ArrowDown"] = {};
KeySymMaps.LocationalKeys["ArrowDown"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Down;
KeySymMaps.LocationalKeys["ArrowDown"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Down;

KeySymMaps.LocationalKeys["ArrowUp"] = {};
KeySymMaps.LocationalKeys["ArrowUp"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Up;
KeySymMaps.LocationalKeys["ArrowUp"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Up;

KeySymMaps.LocationalKeys["ArrowLeft"] = {};
KeySymMaps.LocationalKeys["ArrowLeft"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Left;
KeySymMaps.LocationalKeys["ArrowLeft"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Left;

KeySymMaps.LocationalKeys["ArrowRight"] = {};
KeySymMaps.LocationalKeys["ArrowRight"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Right;
KeySymMaps.LocationalKeys["ArrowRight"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Right;

KeySymMaps.LocationalKeys["End"] = {};
KeySymMaps.LocationalKeys["End"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_End;
KeySymMaps.LocationalKeys["End"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_End;

KeySymMaps.LocationalKeys["Home"] = {};
KeySymMaps.LocationalKeys["Home"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Home;
KeySymMaps.LocationalKeys["Home"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Home;

KeySymMaps.LocationalKeys["PageUp"] = {};
KeySymMaps.LocationalKeys["PageUp"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Page_Up;
KeySymMaps.LocationalKeys["PageUp"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Page_Up;

KeySymMaps.LocationalKeys["PageDown"] = {};
KeySymMaps.LocationalKeys["PageDown"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Page_Down;
KeySymMaps.LocationalKeys["PageDown"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Page_Down;

// NB: while the standard says delete, insert, equals, comman, and space aren't locationally-variant,
// browsers seem to report them as such, so we handle that here
KeySymMaps.LocationalKeys["Delete"] = {};
KeySymMaps.LocationalKeys["Delete"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Delete;
KeySymMaps.LocationalKeys["Delete"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Delete;

KeySymMaps.LocationalKeys["Insert"] = {};
KeySymMaps.LocationalKeys["Insert"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = KeyTable.XK_Insert;
KeySymMaps.LocationalKeys["Insert"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Insert;

KeySymMaps.LocationalKeys["="] = {};
KeySymMaps.LocationalKeys["="][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "=";
KeySymMaps.LocationalKeys["="][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Equal;

KeySymMaps.LocationalKeys["+"] = {};
KeySymMaps.LocationalKeys["+"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "+";
KeySymMaps.LocationalKeys["+"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Add;

KeySymMaps.LocationalKeys["-"] = {};
KeySymMaps.LocationalKeys["-"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "-";
KeySymMaps.LocationalKeys["-"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Subtract;

KeySymMaps.LocationalKeys["*"] = {};
KeySymMaps.LocationalKeys["*"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "*";
KeySymMaps.LocationalKeys["*"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Multiply;

KeySymMaps.LocationalKeys["/"] = {};
KeySymMaps.LocationalKeys["/"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "/";
KeySymMaps.LocationalKeys["/"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Divide;

KeySymMaps.LocationalKeys["."] = {};
KeySymMaps.LocationalKeys["."][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = ".";
KeySymMaps.LocationalKeys["."][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Decimal;

KeySymMaps.LocationalKeys[","] = {};
KeySymMaps.LocationalKeys[","][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = ",";
KeySymMaps.LocationalKeys[","][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Separator;

KeySymMaps.LocationalKeys["0"] = {};
KeySymMaps.LocationalKeys["0"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "0";
KeySymMaps.LocationalKeys["0"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_0;

KeySymMaps.LocationalKeys["1"] = {};
KeySymMaps.LocationalKeys["1"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "1";
KeySymMaps.LocationalKeys["1"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_1;

KeySymMaps.LocationalKeys["2"] = {};
KeySymMaps.LocationalKeys["2"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "2";
KeySymMaps.LocationalKeys["2"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_2;

KeySymMaps.LocationalKeys["3"] = {};
KeySymMaps.LocationalKeys["3"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "3";
KeySymMaps.LocationalKeys["3"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_3;

KeySymMaps.LocationalKeys["4"] = {};
KeySymMaps.LocationalKeys["4"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "4";
KeySymMaps.LocationalKeys["4"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_4;

KeySymMaps.LocationalKeys["5"] = {};
KeySymMaps.LocationalKeys["5"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "5";
KeySymMaps.LocationalKeys["5"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_5;

KeySymMaps.LocationalKeys["6"] = {};
KeySymMaps.LocationalKeys["6"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "6";
KeySymMaps.LocationalKeys["6"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_6;

KeySymMaps.LocationalKeys["7"] = {};
KeySymMaps.LocationalKeys["7"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "7";
KeySymMaps.LocationalKeys["7"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_7;

KeySymMaps.LocationalKeys["8"] = {};
KeySymMaps.LocationalKeys["8"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "8";
KeySymMaps.LocationalKeys["8"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_8;

KeySymMaps.LocationalKeys["9"] = {};
KeySymMaps.LocationalKeys["9"][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = "9";
KeySymMaps.LocationalKeys["9"][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_9;

KeySymMaps.LocationalKeys[" "] = {};
KeySymMaps.LocationalKeys[" "][KeyboardEvent.DOM_KEY_LOCATION_STANDARD] = " ";
KeySymMaps.LocationalKeys[" "][KeyboardEvent.DOM_KEY_LOCATION_NUMPAD] = KeyTable.XK_KP_Space;

KeySymMaps.DeadKeys = {
    "`": KeyTable.XK_dead_grave,
    "´": KeyTable.XK_dead_acute,
    "ˆ": KeyTable.XK_dead_circumflex,
    "˜": KeyTable.XK_dead_tilde,
    " ͂": KeyTable.XK_dead_perispomeni,
    "¯": KeyTable.XK_dead_macron,
    "˘": KeyTable.XK_dead_breve,
    "˙": KeyTable.XK_dead_abovedot,
    "¨": KeyTable.XK_dead_diaresis,
    "˚": KeyTable.XK_dead_abovering,
    "˝": KeyTable.XK_dead_doubleacute,
    "ˇ": KeyTable.XK_dead_caron,
    " ": KeyTable.XK_dead_cedilla,
    " ": KeyTable.XK_dead_ogonek,
    " ͅ": KeyTable.XK_dead_iota,
    "゙": KeyTable.XK_dead_voiced_sound,
    "゚": KeyTable.XK_dead_semivoiced_sound,
    "̣̣": KeyTable.XK_dead_belowdot,
    " ": KeyTable.XK_dead_hook,
    " ̛": KeyTable.XK_dead_dead_horn,
    " ̶̶": KeyTable.XK_dead_dead_stroke,
    " ̓̓": KeyTable.XK_dead_dead_abovecomma,
    " ": KeyTable.XK_dead_dead_psili,
    " ": KeyTable.XK_dead_dead_abovereversedcomma,
    "῾": KeyTable.XK_dead_dead_dasia,
    " ": KeyTable.XK_dead_doublegrave,
    " ": KeyTable.XK_dead_belowring,
    " ": KeyTable.XK_dead_belowmacron,
    "ꞈ": KeyTable.XK_dead_belowcircumflex,
    " ": KeyTable.XK_dead_belowtilde,
    " ": KeyTable.XK_dead_belowbreve,
    " ̤": KeyTable.XK_dead_belowdiaresis,
    " ": KeyTable.XK_dead_invertedbreve,
    " ": KeyTable.XK_dead_belowcomma,
    // NB: this skips the dead vowels, dead currency, dead greek, and a couple of extra
    // dead keys on the T3 german keyboard

};

/* [module] export default KeySymMaps; */
