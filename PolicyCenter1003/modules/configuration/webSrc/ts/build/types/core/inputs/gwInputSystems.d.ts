import { GwDomNode, GwEventType, GwInputElement, GwMap, GwValueAndCursorPos, GwValueWidgetElement, HTMLTextInputElement } from "../../types/gwTypes";
import { GwRegisteredSystem } from "../util/GwRegisteredSystem";
import { GwNumberFormatInfo } from "./GwNumberFormatInfo";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwInputSystems extends GwRegisteredSystem {
    getSystemName(): string;
    private readonly DEFAULT_INPUT_MASK_PLACEHOLDER_CHAR;
    private readonly clearTrailingMaskCharacters;
    private readonly DATE_COMPLETION_CHARS;
    private readonly maxIllegalCharsBeforePunting;
    getCursorPos(el: HTMLTextInputElement | HTMLTextAreaElement): number;
    setCursorPos(el: HTMLTextInputElement | HTMLTextAreaElement, cursorPos: number): void;
    setCursorPosToEnd(el: HTMLTextInputElement | HTMLTextAreaElement): void;
    setSelectionRange(el: HTMLTextInputElement | HTMLTextAreaElement, start: number, end: number): void;
    forcePickerIntoVerticalAlignment(parent: GwDomNode, input: GwInputElement, addonDiv: GwDomNode, putAbove: boolean, alignRight?: boolean): void;
    getFirstModifiedIndex(previous: string, current: string, cursorPos: number): number;
    /**
     * Takes a floating element div and attempts to to align it left | right | above | below
     * inside of a parent div, using an input div as it's alignment
     * Has an option to "force" the position above or below, regardless of space, this is for the situations in which more than 1 picker is on an input
     * By default, it will also limit the height and width of the picker div, and set it to scroll, if there isn't enough screen space
     * This behavior can be disabled via restrictToViewableScreen = false
     *
     * NOTE: passing a pickerDiv to this function will remove inline style widths and overflows from it.
     * If you DO NOT want this to happen, then you need to set restrictViewableScreen to false and handle height and width management yourself
     * @param {GwDomNode} parent
     * @param {GwInputElement} input
     * @param {GwDomNode} floatingDiv
     * @param {boolean} alignRight
     * @param {boolean} placeAbove
     * @param {"above" | "below" | null} forceVPos
     * @param {boolean} restrictToViewableScreen
     * @returns {boolean} true if widget was renderered above
     */
    preventFloatingElementFromBeingOffscreen(parent: GwDomNode, input: GwInputElement, floatingDiv: GwDomNode, alignRight?: boolean, placeAbove?: boolean, forceVPos?: null | "above" | "below", restrictToViewableScreen?: boolean): boolean;
    private renderAddOnDiv(targetDiv, renderAbove, topPosWhenBelow, bottomPosWhenAbove);
    /**
     * Clears the invalid value status from the ValueWidget parent of the given Node
     */
    clearInvalidValueStatus(node: GwDomNode): void;
    /**
     * Adds an invalid value status from the Valuewidget parent of the given Node
     */
    addInvalidValueStatus(node: GwDomNode): void;
    inputEventNotifySystems(valueWidget: GwValueWidgetElement, args: GwMap, e: GwEventType): void;
    pasteEventNotifySystems(valueWidget: GwValueWidgetElement, args: GwMap, e: GwEventType): void;
    copyEventNotifySystems(valueWidget: GwValueWidgetElement, args: GwMap, e: GwEventType): void;
    notifySystemsOfInputValueChange(inputEl: HTMLTextInputElement, ignoreSystem?: GwInputSystemType, args?: GwMap, e?: GwEventType): void;
    /**
     * We use this to handle the times where a placeholder has been translated in a way that renders it an illegal mask value.
     * We only return the ph if it's the same length as the mask, otherwise, we return the mask
     * @param {GwInputElement} el
     * @param {string} mask
     * @returns {string}
     */
    private getPlaceholderValueOrMaskIfPlaceholderIsIncorrectLength(el, mask);
    /**
     * This method is only called by valueChangedSoProcessInputMask if the input has userRestrictedInput but NOT an input mask
     * It takes the userRestrictedInput and filters the element's value using the associated regex
     * while adjusting the cursor position accordingly.
     *
     * For some restrictedInput types it also adds grouping separators
     * @param {GwInputElement} el
     * @param {string} userRestrictedInput
     */
    private handleUserInputRestrictionForInputsWithoutMasks(valueWidget, el, restrictedInput);
    private isValidChar(char, regex);
    private valueChangedSoProcessInputMask(valueWidget, el);
    /**
     * This is a duplicate of valueChangedSoProcessInputMask, but with a bunch of extra date logic.
     * One day, would be great to simplify the date logic, or abstract it out into function calls
     * @param {GwValueWidgetElement} valueWidget
     * @param {HTMLTextInputElement} el
     */
    valueChangedSoProcessDateInfo(valueWidget: GwValueWidgetElement, el: HTMLTextInputElement): void;
    /**
     * Called by the copy/cut event on inputs with input masks.
     * If the element has a select for am/pm, then copy/cut appends the value of the select to the clipboardData
     * only if the right hand side of the input selection extends to the end of the input.
     *
     * @param el
     * @param args
     * @param e
     */
    copyOnInputMask(el: HTMLTextInputElement, args: GwMap, e: ClipboardEvent): void;
    copyOnDateValue(el: HTMLTextInputElement, args: GwMap, e: ClipboardEvent): void;
    /**
     * Runs before server event is fired.
     * if clearTrailingMaskCharacters is true then:
     * - Trim off any trailing characters in the input's value that match the input mask.
     */
    beforeFireEvent(): void;
    /**
     * Returns either the value of the element, or if it has an input mask, the value with any trailing input masks chars removed
     * @param el
     * @returns {*}
     */
    getValueWithMaskTrimmed(el: HTMLTextInputElement | HTMLTextAreaElement): string;
    /**
     *
     * @param {string} value
     * @param {number} cursorIndex
     * @param {boolean} userDeletedChar - if the user deleted a character, then we aren't going to clear out the leading zeroes
     * @param {GwNumberFormatInfo} formatInfo - format details, specifying grouping and radix symbols
     * @returns {GwValueAndCursorPos}
     */
    addGroupingSeparators(value: string, cursorIndex: number, userDeletedChar: boolean, formatInfo: GwNumberFormatInfo): GwValueAndCursorPos;
    /**
     * Checks if the given input mask is "active" - that is will it actually guide user input? Some input masks
     * have no placeholder characters are just intended as a hint to the user.
     *
     * This function only works for explicitly specified PCF input masks, which always use the default input mask
     * placeholder character.
     * @param {string} inputMask the input mask
     * @returns {boolean} true if it is an active mask
     */
    isActiveInputMask(inputMask: string): boolean;
    closeOpenInputs(event?: GwEventType): void;
    /**
     * All non-digit characters will be stripped out.
     *
     * @param {HTMLInputElement} inputElement
     * @param {GwMap} args
     */
    clearNonDigitCharactersFromInput(inputElement: HTMLInputElement, args: GwMap): void;
    /**
     * return true if an input has postOnChange configured.
     * @param el
     */
    hasPostOnChange(valueWidget: GwValueWidgetElement): boolean;
    /**
     * Runs on data-gw-currency-info elements to do inline automatic locale specific currency formatting.
     * requires: 'data-gw-currency-info="USD;$;,;.;2" where the semi-colon separated values are:
     * 1. International Currency Code: ex USD
     * 2. Currency Symbol: ex $
     * 3. Thousands Grouping Separator: ex ,
     * 4. Radix Separator: ex .
     * 5. Maximum Allowed Decimal Places: ex 2
     *
     * Features:
     * a. automatically adds grouping separators on the fly
     * b. restricts any invalid input
     * c. typing a matching radix or grouping symbol will move the cursor past the existing one
     * d. caps major digits to maxCurrencyDigits
     * e. Parses the macros in gw.currency.macros to convert things like 1.5m into 1,500,000 if enableMacroChars == true
     * f. adds and removes leading 0s when needed
     * g. delete key when to the right of a grouping symbol will move the cursor to the left of the symbol
     * h. typing or pasting a value with () for negative will convert them to a leading -
     * @param el
     * @param args
     * @param e
     */
    handleGroupingDecimalsAndMacros(valueWidget: GwValueWidgetElement, el: HTMLTextInputElement, valueOtherThanCurrent?: string, cursorPosOtherThanCurrent?: number): GwValueAndCursorPos;
}
export declare const gwInputSystems: GwInputSystems;
export declare type GwInputSystemType = "autocomplete" | "inputmask" | "currency" | "date" | "picker" | "datepicker" | null;
