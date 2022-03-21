import { GwDomNode, GwMap } from "../types/gwTypes";
import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
import { GwPoint } from "./GwPoint";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwMouse extends GwRegisteredSystem {
    getSystemName(): string;
    private _position;
    updatePosition(e: PointerEvent): void;
    readonly position: GwPoint;
    /**
     * The method called by events.js for all systems that need to share the mouseenter event listener.
     * Any system needling to listen to mouseenter needs to add a complex transform in event.js, then register itself here.
     * @param node
     * @param args
     * @param e
     */
    enter(node: GwDomNode, args: GwMap, e: PointerEvent): void;
}
export declare const gwMouse: GwMouse;
