import { GwRegisteredSystem } from "../../core/util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwDatePicker extends GwRegisteredSystem {
    getSystemName(): string;
    prev(): void;
    next(): void;
    hide(): void;
    today(): void;
    current(): void;
    selectDay(el: HTMLSelectElement | HTMLTableDataCellElement): void;
    selectMonth(el: HTMLSelectElement): void;
    selectYear(el: HTMLSelectElement): void;
}
export declare const gwDatePicker: GwDatePicker;
