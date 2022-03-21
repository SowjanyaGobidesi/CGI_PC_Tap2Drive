import { GwDomNode, GwMap, GwTypedMap } from "../../types/gwTypes";
import { GwKeyListener } from "./GwKeyListener";
import { GwInitializableSystem } from "../util/GwInitializableSystem";
import { GwShortcutInfo } from "../GwShortcutInfo";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwKeys extends GwInitializableSystem {
    getSystemName(): string;
    /**
     * @private
     * Used to translate special characters to the equivalent keyCode
     */
    private readonly keyCodeMap;
    /**
     * @private
     * Used to map shortcut key words to keyCode for use with shortcuts
     */
    readonly shortcutKeyWordToKeyCodeMap: GwMap;
    /**
     * @private
     * Stores keyboard shortcuts sent down from the server via a client command. The shortcuts are stored
     * as a map of arrays where the keys to the map are scopes (MAIN/WORKSHEET) and the arrays contain the
     * actual listeners. The listeners have a createEventDescription function, which is called if a matching
     * key event is detected. This function searches for the widget with the id specified by the server and
     * finds its data-gw-click attribute (which may be directly on the element, or hidden in a sub element)
     * to determine the full event description
     * @type {Object}
     */
    private serverShortcutKeyListeners;
    /**
     * We ignore any of these keycodes if they appear inside of the keyup event
     * @type {{16: boolean, 17: boolean, 18: boolean, 91: boolean, 93: boolean}}
     */
    readonly ignoredKeyCodes: GwMap;
    /**
     * Used by getKeyCode. Converts any keycode into another keycode.
     * Handy for when browsers are misbehaving, or specifically to ensure that numpad keys are treated the same as digit keys
     * @return number
     */
    readonly convertedKeyCodes: GwMap;
    /**
     * If an element has focus and triggers a keyup event, this map will be used if the element doesn't explicitly
     * define a data-gw-keyup method So, for instance if an element has a data-gw-click method, then when keycode 13 fires (the
     * enter key) the on click method will fire. This is so we can implement things like space bar toggling radio
     * buttons, etc. These can also take shift, alt, ctrl, and meta key modifiers by setting shift: true,
     * alt: true, etc.
     */
    readonly genericKeyReactors: GwKeyListener[];
    /**
     * Contextual key listeners, who only fire if they key combination was fired within an element of the given contextClass
     * See: registerContextualKeyListener
     * contextual key listeners are added to the front of the queue in order to allow customers to override existing functionality
     */
    readonly contextualKeyListeners: GwTypedMap<GwKeyListener[]>;
    /**
     * These global shortcuts are only evaluated if the the focused element does not listen to the given keycode.
     * These are processed for shift, alt, ctrl, and meta key modifiers, but historically the gw shortcuts only used
     * alt and shift
     *
     * call registerGlobalShortcutKeyListeners to add a new keylisteners. New key listeners are added to the front of the queue
     * in order to allow customers to override existing functionality.
     */
    readonly globalShortcutKeyListeners: GwKeyListener[];
    init(isFullReload: boolean): void;
    /**
     * This could in theory be used elsewhere in the app, but I can't imagine where
     * Looks through the event to find one of the hundreds of possible locations various browsers store key codes
     * @param e
     * @returns {key code}
     */
    getKeyCode(e: KeyboardEvent): number | null;
    /**
     * Adds a contextual keylistener to the front of the queue, ensuring that is will be evaluated before existing listeners
     * This ensures that a customer can override any existing listeners
     * @param {string} contextClass
     * @param {GwKeyListener} keyListener
     */
    registerContextualKeyListener(contextClass: string, keyListener: GwKeyListener): void;
    /**
     * Adds a keylistener to the front of the queue, ensuring that is will be evaluated before existing listeners
     * This ensures that a customer can override any existing listeners
     * @param {GwKeyListener} keyListener
     */
    registerGlobalShortcutKeyListeners(keyListener: GwKeyListener): void;
    /**
     * Used by server side shortcuts to track down the target of the shortcut and return it
     */
    findServerShortcutKeyTarget(id: string): GwDomNode | null;
    addServerKeyboardShortcut(shortcutInfo: GwShortcutInfo): void;
    clearServerKeyboardShortcuts(): void;
    getServerKeyboardShortcutCharacters(): string[];
    /**
     * Walks up the parent chain, checking each parent and returns the first one that:
     * 1. has the css context class for any registered contextual keylisteners
     * 2. matches the key listener event
     */
    findClosestMatchingContextualKeyListener(e: KeyboardEvent, node: GwDomNode, keyCode: string): GwKeyListener | null;
    /**
     * Returns the keyCode of the associated shortcut.  First we check keycodes to see if there's a keycode
     * shortcut.  If we find no keycode match, we assume the shortcut is a single letter shortcut key.
     *
     * For a single letter shortcut key we usually return the ASCII character code.  However, the shortcut does
     * not always match the keyCode for a given character.  e.g. - the keycode for '.' is 190.  '.'.charCodeAt(0) is 46
     * @param shortcut
     * @returns {Number}
     */
    getShortcutToKeyCode(shortcut: string): string;
    /**
     * Checks server shortcut keys and returns a key listener if it finds a match.
     * Checks current panel Scope to determine the priority of shortcut listeners.
     * If the current scope is South, center is never checked. If Center, south is never checked.
     *
     * @param e
     * @param keyCode
     */
    findMatchingServerShortcutKeyListener(e: KeyboardEvent, keyCode: string): GwKeyListener | null;
    /**
     * @private
     * Finds the first key listener that matches the given key event in the supplied array of key listener
     * objects, or returns null if none match. A key listener must have a keyCode and may have various other
     * flags such as alt, shift, ctrl, meta, internalTool and enableDefault.
     * @param e: the event
     * @param keyListeners: an array of objects to be matched via keyCode and modifier keys.
     * @param keyCode: the keyCode from the event.
     * @returns {object}
     */
    findMatchingKeyListener(e: KeyboardEvent, keyListeners: GwKeyListener[], keyCode: string): GwKeyListener | null;
    /**
     * @private
     * Finds all key listeners, in order, that match the given key event in the supplied array of key listener
     * objects, or returns an empty array if none match. A key listener must have a keyCode and may have various other
     * flags such as alt, shift, ctrl, meta, internalTool and enableDefault.
     * @param e: the event
     * @param keyListeners: an array of objects to be matched via keyCode and modifier keys.
     * @param keyCode: the keyCode from the event.
     * @returns {object}
     */
    findMatchingKeyListeners(e: KeyboardEvent, keyListeners: GwKeyListener[], keyCode: string, returnOnFirstFound?: boolean): GwKeyListener[];
}
export declare const gwKeys: GwKeys;
