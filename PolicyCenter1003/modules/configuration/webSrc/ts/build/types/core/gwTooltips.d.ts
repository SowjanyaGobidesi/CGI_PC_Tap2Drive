import { GwDomNode, GwMap, GwPartialReloadDetails } from "../types/gwTypes";
import { GwInitializableSystem } from "./util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwTooltips extends GwInitializableSystem {
    getSystemName(): string;
    private readonly xOffset;
    private readonly yOffsetUp;
    private readonly yOffsetDown;
    private tooltipDiv;
    readonly DATA_TOOLTIP: string;
    init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    /**
     * Used to add a tooltip, and all the required attributes, to a client generated element, generated after the page walk is complete
     * @param el
     * @param tooltip
     */
    addTooltip(el: GwDomNode, tooltip: string): void;
    private getTooltipDiv();
    private positionTooltip(e);
    show(el: GwDomNode, args: GwMap, e: MouseEvent): void;
    move(el: GwDomNode, args: GwMap, e: MouseEvent): void;
    hide(): void;
}
export declare const gwTooltips: GwTooltips;
