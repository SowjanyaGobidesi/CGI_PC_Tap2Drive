import { GwInitializableSystem } from "../util/GwInitializableSystem";
import { GwDomNode, GwInputElement, GwMap, GwPartialReloadDetails, GwValueWidgetElement } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwClientValidation extends GwInitializableSystem {
    init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    getSystemName(): string;
    /**
     * Hook for customers to set overrides for the standard GwUserRestriction RegExp
     * BE CAREFUL! These are regexes that run per character, they ARE NOT string wide validation
     * This hook exists solely for customers to "slightly modify" allowed characters in a text input
     * @type {{}}
     */
    userRestrictionTypeCustomerOverrides: GwMap;
    private registerPlatformConfigCustomCharRegEx();
    handleValidationForEmailType(el: HTMLInputElement): void;
    getRegexForRestrictionType(userRestrictedInput: GwUserInputRestriction | null): RegExp;
    getRegexForRestrictionTypeFromString(userRestrictedInput: string | null): RegExp;
    getRestrictionTypeFromString(userRestrictedInput: string | null): GwUserInputRestriction;
    getRestrictionTypeFromValueWidget(valueWidget: GwValueWidgetElement): GwUserInputRestriction;
    userRestrictionTypeUsesGroupingFormatting(restrictionType: GwUserInputRestriction): boolean;
    userInputRejectedSingleCharacter(el: GwInputElement, userInput: string): void;
    userInputRejectedOnPaste(el: GwInputElement, userInput: string): void;
    warnAboutUserInput(el: GwInputElement, userInput: string): void;
    warnAboutUserInputFloatOnly(el: GwInputElement, userInput: string): void;
    private floatIllegalInput(el, userInput, type);
    dismiss(el: GwDomNode): void;
    dismissAll(): void;
}
export declare const gwClientValidation: GwClientValidation;
export declare const enum GwUserInputRestriction {
    all = "all",
    numerals = "numerals",
    integer = "integer",
    phone = "phone",
    decimal = "decimal",
    alphabeticAToZ = "alphabeticAToZ",
    alphabeticAToZNumeric = "alphabeticAToZNumeric",
    alphabeticAToZNameChars = "alphabeticAToZNameChars",
    alphabeticGlobal = "alphabeticGlobal",
    alphabeticGlobalNumeric = "alphabeticGlobalNumeric",
    alphabeticGlobalNameChars = "alphabeticGlobalNameChars",
    customPerCharacterRegex1 = "customPerCharacterRegex1",
    customPerCharacterRegex2 = "customPerCharacterRegex2",
}
