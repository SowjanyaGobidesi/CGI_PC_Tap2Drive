import { GwRegisteredSystem } from "../../core/util/GwRegisteredSystem";
import { GwDomNode, GwMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwPrivacy extends GwRegisteredSystem {
    getSystemName(): string;
    readonly hiddenClass: string;
    clearEncrypted(triggerNode: GwDomNode, args: GwMap): void;
    setValueProgammatically(widgetNode: GwDomNode, value: string): boolean;
}
export declare const gwPrivacy: GwPrivacy;
