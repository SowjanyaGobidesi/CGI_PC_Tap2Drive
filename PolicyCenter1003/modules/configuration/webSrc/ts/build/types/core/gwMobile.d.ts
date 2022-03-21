import { GwInitializableSystem } from "./util/GwInitializableSystem";
import { GwPartialReloadDetails } from "../types/gwTypes";
export declare class GwMobile extends GwInitializableSystem {
    getSystemName(): string;
    init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    /**
     * Pinch/Pull zoom fires ctrl + wheel
     *
     * We use gwResizer "check" to prevent getting spammed with updates as the user pinches and pulls
     * @param {WheelEvent} e
     */
    private onGlobalWheel(e);
    /**
     * When the user rotates the screen, we need to rebuild the panels
     * We use recalcPanelSizing directly, so the effect is immediate, as it's a one off event.
     * @param {DeviceOrientationEvent} event
     */
    private onGlobalOrientationChange(event);
}
export declare const gwMobile: GwMobile;
