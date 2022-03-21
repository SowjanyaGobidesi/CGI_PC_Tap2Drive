import { GwDomNode } from "../types/gwTypes";
import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
import { GwPoint } from "./GwPoint";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * @public
 * Handles all events triggered by the global events mapped to dragstart, drag, and dragend.
 * To register a system for drag, the element just needs a data-gw-draggable="SystemName" attribute.
 * When the various drag events are triggered, then corresponding methods will be called on the system:
 * ie:
 * gw[SystemName].dragstart
 * gw[SystemName].drag
 * gw[SystemName].dragend
 * (Optional)gw[SystemName].dragcancel (if not present, and a cancel condition fires, then dragend will be fired)
 *
 * e.g. if you had data-gw-draggable="SouthPanel" then a drag operation would call:
 * gw.SouthPanel.dragStart(el, args, e)
 * gw.SouthPanel.drag(el, args, e) - maybe multiple times
 * gw.SouthPanel.dragEnd(el, args, e)
 * gw.SouthPanel.dragCancel(el, args, e) - is Optional, and dragEnd will fire if no drag cancel is found
 * @type {{}}
 */
export declare class GwDraggable extends GwRegisteredSystem {
    getSystemName(): string;
    private readonly DRAG_ATTR;
    private beingDragged;
    private dragHoverInterval;
    private currentDraggingSystemName;
    private dragHoverEnabled;
    getBeingDragged(): GwDomNode | null;
    isDragging(): boolean;
    /**
     * An individual system needs to call this, most likely inside of dragStart,
     * in order to receive calls to the drag method every frame, even if the mouse isn't moving.
     * This is so systems can do things like "scroll the screen" while the user hovers the mouse near the edge.
     */
    enableDragHover(): void;
    /**
     * calls gw[el.getAttributeName("data-gw-draggable")].dragStart(el, initialPosition);
     */
    start(el: GwDomNode, initialPosition: GwPoint): void;
    /**
     * calls gw[el.getAttributeName("data-gw-draggable")].drag(getBeingDragged(), args, e);
     * @param e a mouse move event
     */
    drag(): void;
    /**
     * calls gw[el.getAttributeName("data-gw-draggable")].dragend(getBeingDragged(), args, e);
     * @param el
     * @param args
     * @param e
     */
    end(): void;
    /**
     * calls gw[el.getAttributeName("data-gw-draggable")].dragcancel(getBeingDragged(), args, e);
     * @param el
     * @param args
     * @param e
     */
    cancel(): void;
    private abstractDragEndedOrCanceled(isCancel?);
    forceCancel(): void;
}
export declare const gwDraggable: GwDraggable;
