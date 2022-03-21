import { GwDomNode, GwMap } from "../types/gwTypes";
import { GwRegisteredSystem } from "../core/util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwNoteBody extends GwRegisteredSystem {
    getSystemName(): string;
    downloadDocument(triggerNode: GwDomNode, args: GwMap): void;
}
export declare const gwNoteBody: GwNoteBody;
