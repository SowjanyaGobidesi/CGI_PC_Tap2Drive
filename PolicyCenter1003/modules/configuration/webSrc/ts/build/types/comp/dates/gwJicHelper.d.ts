import { GwDomNode, GwTypedMap } from "../../types/gwTypes";
import { GwDateInfo } from "./GwDateInfo";
import { GwEraDetail } from "./GwEraDetail";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwJicHelper {
    eraYearLocalizedSuffix: string;
    eraMonthLocalizedSuffix: string;
    highestEraIndex: number;
    readonly eraIndexOrNameToDetails: GwTypedMap<GwEraDetail>;
    readonly eraQuickToDetails: GwTypedMap<GwEraDetail>;
    mapEraDataFromServer(): void;
    getCurrDateInfo(): GwDateInfo;
    getDateWidget(el: GwDomNode | null): GwDomNode;
    getEraInput(el: GwDomNode | null): HTMLInputElement | null;
    getTotalYearsForCurrentEraSelect(el: GwDomNode): number;
    getMonthSelect(el: GwDomNode | null): HTMLSelectElement;
    getEraYearSelect(el: GwDomNode | null): HTMLSelectElement;
    getEraSelect(el: GwDomNode | null): HTMLSelectElement;
    getDateInput(): HTMLInputElement;
    getEraValueForToday(): string;
    setEraYearSelect(eraYear: number): void;
    setEraSelect(eraValOrIndex: any, dateInput?: HTMLInputElement | null): void;
    setEraInputValue(eraValOrIndex: string | number | undefined, dateInput?: HTMLInputElement | null): void;
    getEraInputValue(el: GwDomNode | null): string | null;
    getEraDetailsForValueOrIndexOrThrow(eraValOrIndex: string | number | undefined): GwEraDetail;
    getEraDetailsForValueOrIndex(eraValOrIndex: string | number | undefined): GwEraDetail | null;
    eraYearToGregYear(eraYear: number, useEraSelectForValue?: boolean): number;
    gregYearToEraYear(gregDateObj: Date, forceUpdate?: boolean): {
        year: string;
        era: string;
    };
    getEraSelectValue(): string | undefined;
    resetEraInputValue(dateInput: HTMLInputElement): void;
}
export declare const gwJicHelper: GwJicHelper;
