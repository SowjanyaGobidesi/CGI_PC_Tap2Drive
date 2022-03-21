import { GwDomNode, GwMap } from "../types/gwTypes";
import { GwRegisteredSystem } from "../core/util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwPaging extends GwRegisteredSystem {
    getSystemName(): string;
    page(pagingButtonNode: GwDomNode, pageArgs: GwMap): void;
    parent(pagingButtonNode: GwDomNode, pageArgs: GwMap): void;
    child(pagingButtonNode: GwDomNode, pageArgs: GwMap): void;
}
export declare const gwPaging: GwPaging;
