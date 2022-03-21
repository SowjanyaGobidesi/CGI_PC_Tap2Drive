import { GwDomNode } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwShuttleBoxInfo {
    readonly left: HTMLSelectElement;
    readonly right: HTMLSelectElement;
    readonly hidden: HTMLSelectElement;
    readonly parent: GwDomNode;
    constructor(parentWidgetForRangeShuttle: GwDomNode);
}
