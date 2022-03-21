import { GwRegisteredSystem } from "../core/util/GwRegisteredSystem";
import { GwDomNode, GwMap } from "../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwImageWidget extends GwRegisteredSystem {
    getSystemName(): string;
    clickThumb(el: GwDomNode, args: GwMap, e: Event): void;
    onLoad(e: Event): void;
    onError(e: Event): void;
    private getContainerFromImg(e);
}
export declare const gwImageWidget: GwImageWidget;
