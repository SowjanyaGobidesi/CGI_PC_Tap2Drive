import { GwMap, GwTypedMap } from "../types/gwTypes";
import { GwDraggableSystem } from "./util/GwDraggableSystem";
import { GwWebsocketSystem } from "./util/GwWebsocketSystem";
import { GwApi } from "./gwApi";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * One exception is the TypeScript/JavaScript API exposed via gw.api; see GwApi for details
 */
export declare class Gw {
    private _api;
    readonly draggable: GwTypedMap<GwDraggableSystem>;
    readonly sockets: GwTypedMap<GwWebsocketSystem>;
    displaykeyvalues: GwMap | null;
    readonly globals: GwTypedMap<{
        getSystemName(): string;
    }>;
    registerDraggableSystem(draggable: GwDraggableSystem): void;
    registerWebsocketSystem(socketSystem: GwWebsocketSystem): void;
    readonly api: GwApi;
}
export declare const gw: Gw;
