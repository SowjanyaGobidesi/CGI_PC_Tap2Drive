import { GwTypedMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwFlagGroup {
    readonly checkBoxes: HTMLInputElement[];
    readonly buttons: HTMLElement[];
    headerCheckBox: HTMLInputElement | null;
    constructor(iteratorId: string | undefined);
    updateButtonsAvailability(): void;
    updateButtonAvailability(button: HTMLElement): void;
    evaluateCondition(button: HTMLElement, condition: string): boolean;
    operations: GwTypedMap<Function>;
    countTargetedCheckedCheckBoxesWithFlag(button: HTMLElement, flagName: string): number;
    checkBoxHasFlag(checkBox: HTMLInputElement, flagName: string): boolean;
    targetedCheckedCheckBoxes(button: HTMLElement): HTMLInputElement[];
    targetedCheckBoxes(button: HTMLElement): HTMLInputElement[];
    targetListStartsWith(targetList: string, targetSubList: string): boolean;
}
