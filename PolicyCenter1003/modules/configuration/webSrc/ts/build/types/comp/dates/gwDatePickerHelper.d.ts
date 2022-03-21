import { GwMap, HTMLTextInputElement } from "../../types/gwTypes";
import { GwInitializableSystem } from "../../core/util/GwInitializableSystem";
import { GwDateInfo } from "./GwDateInfo";
import { GwInputSystemType } from "../../core/inputs/gwInputSystems";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwDatePickerHelper extends GwInitializableSystem {
    private readonly _mainDivId;
    private readonly _unselectableClass;
    private readonly _otherMonthDayClass;
    private readonly _inputtedValueDayClass;
    private readonly _todayDayClass;
    private readonly _keyEventCurrentDayClass;
    private readonly minRows;
    private _datePickerShowing;
    private _lastEventWasKey;
    private _$datePickerDiv;
    private _currDateInfo;
    private _lastInput;
    readonly settings: GwMap;
    protected availableToGlobal(): boolean;
    getSystemName(): string;
    init(isFullPageReload: boolean): void;
    readonly datePickerDiv: HTMLDivElement;
    readonly $datePickerDiv: JQuery;
    isDatePickerShowing(): boolean;
    setupDateInput(inputEl: HTMLTextInputElement): void;
    readonly currDateInfo: GwDateInfo | null;
    private handleKeyDown(event);
    /** Pop-up the date picker for a given input field.
     * @param  inputEl - the input field attached to the date picker or
     *                    event - if triggered by focus
     */
    showDatePicker(inputEl: HTMLTextInputElement): void;
    putFocusBackOnInput(): void;
    updateDatePicker(): void;
    hideDatePicker(): void;
    adjustDate(offset?: number, period?: string): void;
    /**
     * Show the month and year that currently contains today's date.
     * @param inst
     * @private
     */
    adjustDatePickerToShowToday(): void;
    selectToday(): void;
    /**
     * Show the month and year of the date displayed in the input element
     * @param inst
     * @private
     */
    adjustDatePickerToShowDayFromInputField(): void;
    selectMonthYear(select: HTMLSelectElement, period: string): void;
    selectDay(month: number, year: number, day: number): void;
    private selectCurrentlyKeySelectedDay();
    private clearDate();
    private selectDate(dateStr);
    private getCurrentDateFormat();
    private parseDateFromDateField(forcedValue?);
    getSetting(name: string): any;
    updateDatePickerFromDateInputField(): void;
    private getDefaultDate();
    private determineDate(date, defaultDate);
    private daylightSavingAdjust(date);
    private getInternalDateIfValid(inst);
    disableDaysAfter(lastValidDay: number | string): void;
    disableDaysBefore(firstValidDay: number | string): void;
    private shouldDisableCalendarDate(num, inst);
    private getCurrentButtonText();
    private getTodayButtonText();
    private generateHTML(inst);
    private generateMonthYearHeader(drawMonth, drawYear, minDate, maxDate, monthNamesShort?);
    private getInfoButtonHTML();
    private adjustInternalDate(offset?, period?);
    private restrictMinMax(date);
    private getMinMaxDate(minMax);
    private getDaysInMonth(year, month);
    private getFirstDayOfMonth(year, month);
    private canAdjustMonth(offset, curYear, curMonth);
    isDateWithinAcceptableRange(date: Date): boolean;
    private formatDate(day?, month?, year?);
    markDateValueInputModified(el: HTMLTextInputElement, ignoresystem?: GwInputSystemType): void;
}
export declare const gwDatePickerHelper: GwDatePickerHelper;
