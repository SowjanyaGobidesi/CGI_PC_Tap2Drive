import { GwMap } from "../../types/gwTypes";
import { GwInitializableSystem } from "./GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare abstract class GwWebsocketSystem extends GwInitializableSystem {
    constructor();
    protected availableToWebSocket(): boolean;
    abstract onWebSocket(info: GwMap): void;
}
