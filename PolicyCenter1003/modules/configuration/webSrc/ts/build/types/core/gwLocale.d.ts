import { GwOrderDependentInitializableSystem } from "./util/GwOrderDependentInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwLocale extends GwOrderDependentInitializableSystem {
    getSystemName(): string;
    private localeCode;
    languageCode: string | null;
    orderSpecificInit(isFullReload: boolean): void;
    updateLocaleCode(): void;
    updateLanguageCode(): void;
    onLanguageChange(): void;
    getDecimalSymbol(): string;
    getThousandsSymbol(): string;
    getMinWeekdays(): string[];
    getShortWeekdays(): string[];
    getWeekdays(): string[];
    getShortMonths(): string[];
    getMonths(): string[];
    getPeriods(): string[];
    getFirstDayOfWeek(): number;
}
export declare const gwLocale: GwLocale;
