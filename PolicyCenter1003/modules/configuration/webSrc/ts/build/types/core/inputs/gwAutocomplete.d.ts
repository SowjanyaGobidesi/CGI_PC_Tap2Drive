import { GwDomNode, GwEventType, GwKeyboardNavigation, GwMap, HTMLTextInputElement } from "../../types/gwTypes";
import { GwInitializableSystem } from "../util/GwInitializableSystem";
import { GwEventDescription } from "../events/GwEventDescription";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * System for providing the autocomplete entries drop down.
 * Makes ajax requests on a delay to retrieve possible entries.
 *
 * Keymap:
 * up: move up in entry selection dropdown
 * down: move down in entry selection dropdown
 * right: remove selection range, move cursor position to end, close autocomplete
 * left: revert input value and close autocomplete
 * escape: revert input value and close autocomplete
 * enter: remove selection range, move cursor position to end, close autocomplete, possibly fire post on change
 * click on entry in dropdown: same as enter key
 */
export declare class GwAutocomplete extends GwInitializableSystem implements GwKeyboardNavigation {
    getSystemName(): string;
    private timeoutKey;
    /**
     * The delay after the last keypress before the autocomplete will be refreshed and rendered
     * @type {number}
     */
    private readonly autocompleteDelay;
    /**
     * Caches the last value we sent a request to the server for, preventing a new
     * autocomplete request on focus if the value hasn't changed and the autocomplete
     * is still visible.
     * @type {string}
     */
    private autocompletedValueCache;
    /**
     * The current entry in the autocomplete dropdown when using arrow keys to navigate up and down
     * @type {object}
     */
    private currentAutocompleteEntry;
    /**
     * Keeps track of the current autocomplete input element
     * @type {boolean}
     */
    private autocompleteInput;
    /**
     * Keeps track of the current autocomplete div element
     * @type {boolean}
     */
    private autocompleteDiv;
    init(isFullPageReload: boolean): void;
    private cancelAnyPendingAutocomplete();
    /**
     * Called when an autocomplete input gets focus
     * @param {HTMLTextInputElement} input autocomplete input that just got focus
     * @param {GwEventDescription} eventDescription event description, from data-gw-focus attribute
     * @param {FocusEvent} event focus event
     */
    autocompleteOnFocus(input: HTMLTextInputElement, eventDescription: GwEventDescription, event: FocusEvent): void;
    /**
     * @public
     * Fetches and Renders autocomplete information for the given node. Called when an autocomplete
     * input first gets focus (via autocompleteOnFocus) and then whenever its value changes
     * @param input the input node that needs to be autocompleted
     */
    autocomplete(input: HTMLTextInputElement): void;
    private inputTabbed();
    private addTabListenerToInput();
    private removeTabListenerFromInput();
    /**
     * @private
     * Builds the request object to send a request for autocomplete results
     * @param widgetId the renderId of the widget being autocompleted
     */
    private fetchAutocompleteData(widgetId);
    /**
     * @private
     * Handles a server response for autocomplete, creates the autocomplete elements under the input, or
     * destroys them if they are visible but there's nothing to show
     * @param widgetName the id of the autocomplete widget
     * @param originalInputValue the autocomplete input's value at the time the server request was made
     * @param data the data from the server
     */
    private renderAutocompleteData(widgetName, originalInputValue, data);
    /**
     * @private
     * Create autocomplete entries matching the given result list under the input widget with the given name.
     * @param widgetName name of the autocomplete widget
     * @param originalInputValue the autocomplete input's value at the time the server request was made
     * @param results a non empty list of autocomplete results
     */
    private createAutocompleteEntries(widgetName, originalInputValue, results);
    private setInputBasedOnCurrentEntry();
    private setInputValue(text);
    /**
     * Renders autocomplete using the input as a reference to position
     * Attempts to align it to the left edge of the input it's displayed for.
     * - If it's offscreen right, then aligns itself to the right of the input
     * @link - gw.resizer.windowHeight, gw.resizer.windowWidth
     * @private
     */
    private renderAutocomplete();
    /***
     * @private
     * Called if there is an error while calling the server to fetch autocomplete entries
     * @param widgetName name of the autocomplete widget
     */
    private handleAutocompleteError(widgetName);
    /**
     * @private
     * Destroy any visible autocomplete entries under the widget with the given name.
     * @param widgetName name of the autocomplete widget
     */
    private destroyAutocompleteEntriesIfVisible(widgetName);
    /**
     * Replaces "markers" with a div containing a markup class plus the tag for styling
     * @param displayText the display text to replace
     * @returns the displayText with divs inserted
     */
    private replaceStyles(displayText);
    private setCurrentAutocompleteEntry(dir);
    /**
     * Autocomplete entries are problematic because we don't want them to be focusable (we want
     * to leave focus in the input field, and not affect the tab order) but that means clicking on
     * an entry causes a focus/blur event pair as we leave the input and go to the entry, quickly
     * followed by another focus/blur event pair as we force focus back to the input. We have to
     * watch out for these events and ignore them
     * @param {FocusEvent} e focus event
     * @returns {boolean} true if the focus event is caused by focusing on or returning focus from an entry
     */
    private isFocusEventCausedByAutocompleteEntry(e);
    revertAutocompleteInput(): void;
    /**
     * @public
     * Called when the user clicks on an entry in the autocomplete dropdown
     * @param entry the clicked autocomplete node
     * @param info the event info
     */
    clickAutocompleteEntry(entry: GwDomNode, info: GwMap): void;
    enterKeyPressed(node: GwDomNode): void;
    tabOrEnterKeyPressed(node: HTMLTextInputElement, args: any, e: KeyboardEvent): void;
    autocompleteInputBlurred(node: GwDomNode, info: GwMap, e: FocusEvent): void;
    /**
     * Closes the autocomplete panel.
     * removes the blur attribute from the container.
     * restores the focus attribute to the child.
     */
    closeAutocomplete(node?: GwDomNode, info?: GwMap, event?: GwEventType): void;
    /**
     * @private
     * Should only be called by the navigation system, handles an "up" keystroke
     * when in an autocomplete input
     * @param input the dom node where "up" was pressed
     * @param info the event method info
     * @param event the key event
     */
    up(input: HTMLTextInputElement, info: GwMap, event: GwEventType): boolean;
    /**
     * @private
     * Should only be called by the navigation system, handles an "down" keystroke
     * when in an autocomplete input
     * @param input the dom node where "down" was pressed
     * @param info the method info
     * @param event the event
     */
    down(input: HTMLTextInputElement, info: GwMap, event: GwEventType): boolean;
    left(input: HTMLTextInputElement, info: GwMap, event: GwEventType): boolean;
    right(input: HTMLTextInputElement, info: GwMap, event: GwEventType): boolean;
}
export declare const gwAutocomplete: GwAutocomplete;
