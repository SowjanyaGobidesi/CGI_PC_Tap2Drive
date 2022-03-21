import { GwValueWidgetElement } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwNumberFormatInfo {
    readonly code: string | null;
    readonly symb: string | null;
    readonly grouping: string;
    readonly radix: string;
    readonly maxDecimalDigits: number | null;
    constructor(code: string | null, symb: string | null, grouping: string, radix: string, maxDecimalDigits: number | null);
    static getNumberFormatInfo(el: HTMLInputElement, valueWidget: GwValueWidgetElement): GwNumberFormatInfo | null;
}
