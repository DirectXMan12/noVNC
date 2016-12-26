// This contains the main set of keysyms required for noVNC to
// handle KeyboardEvent keys.  The full set of keysyms can be found
// in the modules full-keysym and xf86-keysym.
var KeyTable = {
    XK_BackSpace:                    0xff08, /* Back space, back char */
    XK_Tab:                          0xff09,
    XK_Linefeed:                     0xff0a, /* Linefeed, LF */
    XK_Clear:                        0xff0b,
    XK_Return:                       0xff0d, /* Return, enter */
    // XK_Pause:                        0xff13, /* Pause, hold */
    XK_Scroll_Lock:                  0xff14,
    // XK_Sys_Req:                      0xff15,
    XK_Escape:                       0xff1b,
    XK_Delete:                       0xffff, /* Delete, rubout */

    /* International & multi-key character composition */

    XK_Multi_key:                    0xff20, /* Multi-key character compose */
    XK_Codeinput:                    0xff37,
    XK_SingleCandidate:              0xff3c,
    XK_MultipleCandidate:            0xff3d,
    XK_PreviousCandidate:            0xff3e,

    /* Japanese keyboard support */

    XK_Kanji:                          0xff21, /* Kanji, Kanji convert */
    XK_Muhenkan:                       0xff22, /* Cancel Conversion */
    XK_Henkan:                         0xff23, /* Alias for Henkan_Mode */
    XK_Romaji:                         0xff24, /* to Romaji */
    XK_Hiragana:                       0xff25, /* to Hiragana */
    XK_Katakana:                       0xff26, /* to Katakana */
    XK_Hiragana_Katakana:              0xff27, /* Hiragana/Katakana toggle */
    XK_Zenkaku:                        0xff28, /* to Zenkaku */
    XK_Hankaku:                        0xff29, /* to Hankaku */
    XK_Zenkaku_Hankaku:                0xff2a, /* Zenkaku/Hankaku toggle */
    XK_Kana_Shift:                     0xff2e, /* Kana Shift */
    XK_Eisu_Shift:                     0xff2f, /* Alphanumeric Shift */
    XK_Eisu_toggle:                    0xff30, /* Alphanumeric toggle */

    /* Korean keyboard support */

    XK_Hangul:                      0xff31, /* Hangul start/stop(toggle) */
    XK_Hangul_Hanja:                0xff34, /* Start Hangul->Hanja Conversion */
    XK_Hangul_Jeonja:               0xff38, /* Jeonja mode */

    /* Cursor control & motion */

    XK_Home:                        0xff50,
    XK_Left:                        0xff51, /* Move left, left arrow */
    XK_Up:                          0xff52, /* Move up, up arrow */
    XK_Right:                       0xff53, /* Move right, right arrow */
    XK_Down:                        0xff54, /* Move down, down arrow */
    XK_Page_Up:                     0xff55, /* Prior, previous */
    XK_Page_Down:                   0xff56, /* Next */
    XK_End:                         0xff57, /* EOL */


    /* Misc functions */

    XK_Select:                      0xff60, /* Select, mark */
    XK_Print:                       0xff61,
    XK_Execute:                     0xff62, /* Execute, run, do */
    XK_Insert:                      0xff63, /* Insert, insert here */
    XK_Undo:                        0xff65,
    XK_Redo:                        0xff66, /* Redo, again */
    XK_Menu:                        0xff67,
    XK_Find:                        0xff68, /* Find, search */
    XK_Cancel:                      0xff69, /* Cancel, stop, abort, exit */
    XK_Help:                        0xff6a, /* Help */
    XK_Break:                       0xff6b,
    XK_Mode_switch:                 0xff7e, /* Character set switch */
    XK_Num_Lock:                    0xff7f,

    /* Keypad functions, keypad numbers cleverly chosen to map to ASCII */

    XK_KP_Space:                    0xff80, /* Space */
    XK_KP_Tab:                      0xff89,
    XK_KP_Enter:                    0xff8d, /* Enter */
    XK_KP_F1:                       0xff91, /* PF1, KP_A, ... */
    XK_KP_F2:                       0xff92,
    XK_KP_F3:                       0xff93,
    XK_KP_F4:                       0xff94,
    XK_KP_Home:                     0xff95,
    XK_KP_Left:                     0xff96,
    XK_KP_Up:                       0xff97,
    XK_KP_Right:                    0xff98,
    XK_KP_Down:                     0xff99,
    XK_KP_Page_Up:                  0xff9a,
    XK_KP_Page_Down:                0xff9b,
    XK_KP_End:                      0xff9c,
    XK_KP_Begin:                    0xff9d,
    XK_KP_Insert:                   0xff9e,
    XK_KP_Delete:                   0xff9f,
    XK_KP_Equal:                    0xffbd, /* Equals */
    XK_KP_Multiply:                 0xffaa,
    XK_KP_Add:                      0xffab,
    XK_KP_Separator:                0xffac, /* Separator, often comma */
    XK_KP_Subtract:                 0xffad,
    XK_KP_Decimal:                  0xffae,
    XK_KP_Divide:                   0xffaf,

    XK_KP_0:                        0xffb0,
    XK_KP_1:                        0xffb1,
    XK_KP_2:                        0xffb2,
    XK_KP_3:                        0xffb3,
    XK_KP_4:                        0xffb4,
    XK_KP_5:                        0xffb5,
    XK_KP_6:                        0xffb6,
    XK_KP_7:                        0xffb7,
    XK_KP_8:                        0xffb8,
    XK_KP_9:                        0xffb9,

    /*
     * Auxiliary functions; note the duplicate definitions for left and right
     * function keys;  Sun keyboards and a few other manufacturers have such
     * function key groups on the left and/or right sides of the keyboard.
     * We've not found a keyboard with more than 35 function keys total.
     */

    XK_F1:                          0xffbe,
    XK_F2:                          0xffbf,
    XK_F3:                          0xffc0,
    XK_F4:                          0xffc1,
    XK_F5:                          0xffc2,
    XK_F6:                          0xffc3,
    XK_F7:                          0xffc4,
    XK_F8:                          0xffc5,
    XK_F9:                          0xffc6,
    XK_F10:                         0xffc7,
    XK_F11:                         0xffc8,
    XK_F12:                         0xffc9,

    /* Modifiers */

    XK_Shift_L:                     0xffe1, /* Left shift */
    XK_Shift_R:                     0xffe2, /* Right shift */
    XK_Control_L:                   0xffe3, /* Left control */
    XK_Control_R:                   0xffe4, /* Right control */
    XK_Caps_Lock:                   0xffe5, /* Caps lock */

    XK_Meta_L:                      0xffe7, /* Left meta */
    XK_Meta_R:                      0xffe8, /* Right meta */
    XK_Alt_L:                       0xffe9, /* Left alt */
    XK_Alt_R:                       0xffea, /* Right alt */
    XK_Super_L:                     0xffeb, /* Left super */
    XK_Super_R:                     0xffec, /* Right super */
    XK_Hyper_L:                     0xffed, /* Left hyper */
    XK_Hyper_R:                     0xffee, /* Right hyper */

    // the XK_ISO keys we care about
    XK_ISO_Level3_Shift:            0xfe03,
    XK_ISO_Next_Group:              0xfe08,
    XK_ISO_Prev_Group:              0xfe0a,
    XK_ISO_First_Group:             0xfe0c,
    XK_ISO_Last_Group:              0xfe0e,

    // Some extras from weird keyboards
    XK_3270_EraseEOF:               0xfd06,
    XK_3270_ExSelect:               0xfd1b,
    XK_3270_CursorSelect:           0xfd1c,
    XK_3270_Attn:                   0xfd0e,
    XK_3270_Play:                   0xfd16,

    // XFree86 special keys we care about
    XF86XK_Copy:              0x1008FF57,   /* Copy selection              */
    XF86XK_Cut:               0x1008FF58,   /* Cut selection               */
    XF86XK_Paste:             0x1008FF6D,   /* Paste                       */
    XF86XK_ZoomIn:            0x1008FF8B,   /* zoom in view, map, etc.   */
    XF86XK_ZoomOut:           0x1008FF8C,   /* zoom out view, map, etc.  */
    XF86XK_MonBrightnessUp:   0x1008FF02,  /* Monitor/panel brightness */
    XF86XK_MonBrightnessDown: 0x1008FF03,  /* Monitor/panel brightness */
    XF86XK_Eject:             0x1008FF2C,   /* Eject device (e.g. DVD)    */
    XF86XK_LogOff:            0x1008FF61,   /* Log off system              */
    XF86XK_PowerOff:          0x1008FF2A,   /* Power off system entirely  */
    XF86XK_Hibernate:         0x1008FFA8,   /* Sleep to disk               */
    XF86XK_Standby:           0x1008FF10,   /* System into standby mode   */
    XF86XK_WakeUp:            0x1008FF2B,   /* Wake up system from sleep  */
    XF86XK_AudioForward:      0x1008FF97,   /* fast-forward audio track    */
    XF86XK_AudioPause:        0x1008FF31,   /* Pause audio playing        */
    XF86XK_AudioPlay:         0x1008FF14,   /* Start playing of audio >   */
    XF86XK_AudioRecord:       0x1008FF1C,   /* Record audio application   */
    XF86XK_AudioRewind:       0x1008FF3E,   /* "rewind" audio track        */
    XF86XK_AudioStop:         0x1008FF15,   /* Stop playing audio         */
    XF86XK_AudioPrev:         0x1008FF16,   /* Previous track             */
    XF86XK_AudioNext:         0x1008FF17,   /* Next track                 */
    XF86XK_AudioLowerVolume:  0x1008FF11,   /* Volume control down        */
    XF86XK_AudioMute:         0x1008FF12,   /* Mute sound from the system */
    XF86XK_AudioRaiseVolume:  0x1008FF13,   /* Volume control up          */
    XF86XK_AudioMicMute:      0x1008FFB2,   /* Mute the Mic from the system */
    XF86XK_BrightnessAdjust:  0x1008FF3B,   /* Invoke brightness adj. UI   */
    XF86XK_AudioCycleTrack:   0x1008FF9B,   /* cycle through audio tracks  */
    XF86XK_AudioRandomPlay:   0x1008FF99,   /* toggle shuffle mode         */
    XF86XK_SplitScreen:       0x1008FF7D,   /* Split window or screen      */
    XF86XK_Subtitle:          0x1008FF9A,   /* cycle through subtitle      */
    XF86XK_Next_VMode:        0x1008FE22,   /* next video mode available  */
    XF86XK_Close:             0x1008FF56,   /* Close window                */
    XF86XK_New:               0x1008FF68,   /* New (folder, document...    */
    XF86XK_Open:              0x1008FF6B,   /* Open                        */
    XF86XK_Save:              0x1008FF77,   /* Save (file, document, state */
    XF86XK_Spell:             0x1008FF7C,   /* Spell checker               */
    XF86XK_MailForward:       0x1008FF90,   /* Forward in mail           */
    XF86XK_Reply:             0x1008FF72,   /* Reply e.g., mail            */
    XF86XK_Send:              0x1008FF7B,   /* Send mail, file, object     */
    XF86XK_Calculator:        0x1008FF1D,   /* Invoke calculator program  */
    XF86XK_Calendar:          0x1008FF20,   /* Invoke Calendar program    */
    XF86XK_Mail:              0x1008FF19,   /* Invoke user's mail program */
    XF86XK_Music:             0x1008FF92,   /* Launch music application  */
    XF86XK_MyComputer:        0x1008FF33,   /* Display "My Computer" window */
    XF86XK_Phone:             0x1008FF6E,   /* Launch phone; dial number   */
    XF86XK_ScreenSaver:       0x1008FF2D,   /* Invoke screensaver         */
    XF86XK_Excel:             0x1008FF5C,   /* Launch spread sheet         */
    XF86XK_WWW:               0x1008FF2E,   /* Invoke web browser         */
    XF86XK_WebCam:            0x1008FF8F,   /* Launch web camera app.    */
    XF86XK_Word:              0x1008FF89,   /* Launch word processor     */
    XF86XK_Back:              0x1008FF26,   /* Like back on a browser     */
    XF86XK_Favorites:         0x1008FF30,   /* Show favorite locations    */
    XF86XK_Forward:           0x1008FF27,   /* Like forward on a browser  */
    XF86XK_HomePage:          0x1008FF18,   /* Display user's home page   */
    XF86XK_Refresh:           0x1008FF29,   /* Refresh the page           */
    XF86XK_Search:            0x1008FF1B,   /* Search                     */
    XF86XK_Stop:              0x1008FF28,   /* Stop current operation     */
    XF86XK_AudioMedia:        0x1008FF32,   /* Launch media collection app */

    // dead keys
    XK_dead_grave:                  0xfe50,
    XK_dead_acute:                  0xfe51,
    XK_dead_circumflex:             0xfe52,
    XK_dead_tilde:                  0xfe53,
    XK_dead_perispomeni:            0xfe53, /* alias for dead_tilde */
    XK_dead_macron:                 0xfe54,
    XK_dead_breve:                  0xfe55,
    XK_dead_abovedot:               0xfe56,
    XK_dead_diaeresis:              0xfe57,
    XK_dead_abovering:              0xfe58,
    XK_dead_doubleacute:            0xfe59,
    XK_dead_caron:                  0xfe5a,
    XK_dead_cedilla:                0xfe5b,
    XK_dead_ogonek:                 0xfe5c,
    XK_dead_iota:                   0xfe5d,
    XK_dead_voiced_sound:           0xfe5e,
    XK_dead_semivoiced_sound:       0xfe5f,
    XK_dead_belowdot:               0xfe60,
    XK_dead_hook:                   0xfe61,
    XK_dead_horn:                   0xfe62,
    XK_dead_stroke:                 0xfe63,
    XK_dead_abovecomma:             0xfe64,
    XK_dead_psili:                  0xfe64, /* alias for dead_abovecomma */
    XK_dead_abovereversedcomma:     0xfe65,
    XK_dead_dasia:                  0xfe65, /* alias for dead_abovereversedcomma */
    XK_dead_doublegrave:            0xfe66,
    XK_dead_belowring:              0xfe67,
    XK_dead_belowmacron:            0xfe68,
    XK_dead_belowcircumflex:        0xfe69,
    XK_dead_belowtilde:             0xfe6a,
    XK_dead_belowbreve:             0xfe6b,
    XK_dead_belowdiaeresis:         0xfe6c,
    XK_dead_invertedbreve:          0xfe6d,
    XK_dead_belowcomma:             0xfe6e,
};

/* [module] export default KeyTable; */
