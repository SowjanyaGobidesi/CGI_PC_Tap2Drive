import { GwDomNode, HTMLCheckboxElement } from "../../types/gwTypes";
import { GwInitializableSystem } from "../util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwFlags extends GwInitializableSystem {
    getSystemName(): string;
    private checkAvailabilityOfAllButtons();
    headerCheckBoxChanged(node: GwDomNode): void;
    checkBoxChanged(node: GwDomNode): void;
    init(): void;
    getCheckBox(node: GwDomNode): HTMLCheckboxElement;
}
export declare const gwFlags: GwFlags;
