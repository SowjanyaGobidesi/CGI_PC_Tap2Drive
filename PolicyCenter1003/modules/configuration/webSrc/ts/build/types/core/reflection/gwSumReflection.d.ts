import { GwRegisteredSystem } from "../util/GwRegisteredSystem";
import { GwDomNode, GwMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwSumReflection extends GwRegisteredSystem {
    private updatedValues;
    getSystemName(): string;
    clearValues(): void;
    updateValue(node: GwDomNode, args: GwMap): void;
    recalculateSum(sumValueWidgetId: string, inputNode: GwDomNode): void;
    /**
     * Handles a response from the server with the reflected value.
     */
    private handleResponse(sumValueWidgetId, inputNode, response);
    private updateSumValue(sumValueWidgetId, sumValue);
    private updateSumAndAltSumValue(sumValueWidgetId, sumValue, altSumValue);
    private handleError(inputNode, errorType, response);
}
export declare const gwSumReflection: GwSumReflection;
