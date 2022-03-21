import { GwMap, GwValueWidgetElement, HTMLTextInputElement } from "../../types/gwTypes";
import { GwInitializableSystem } from "../util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwCurrency extends GwInitializableSystem {
    macros: GwMap;
    macroChars: string[];
    /**
     * Currency Macros
     * Currently only single chars are supported. Macro characters are NOT case sensitive.
     * Examples:
     * 107b => 107,000,000,000
     * 1.9m => 1,900,000
     * These are not multipliers, so changing the values to anything other than 0s will not have the effect you expect
     * display.properties defines the single keys for each amount, per language
     */
    macroZeroMap: GwMap;
    getSystemName(): string;
    init(isFullPageReload: boolean): void;
    private setupCurrencyMacroCharacters();
    private escapeCurrencySymb(cSymb);
    private getCurrencyFormatRegEx(currencyInfo);
    private stripFirstAndLastCharsIfParens(pastedValue);
    /**
     * Method called when paste is triggered on a currency input.
     * 1. Does extra logic to determine whether we need to throw up an alert if the pasted value is formatted correctly.
     * @param el
     * @param args
     * @param e
     */
    pasteOnCurrencyInput(valueWidget: GwValueWidgetElement, args: GwMap, e: ClipboardEvent): boolean;
    /**
     * Method called when copy or cut is triggered on a currency input.
     * 1. Does extra logic to determine whether it should affix the prefix and suffix to the clipboard value.
     * 2. If the value is determined to be negative, then moves the prefix or suffix currency symbols inside of the
     *    negative symbol. ie: -$500.98 or ($500.98)
     * @param el
     * @param args
     * @param e
     */
    copyOnCurrencyInput(el: HTMLTextInputElement, args: GwMap, e: ClipboardEvent): void;
    valueChangedSoProcessCurrencyInfo(valueWidget: GwValueWidgetElement, el: HTMLTextInputElement): void;
}
export declare const gwCurrency: GwCurrency;
