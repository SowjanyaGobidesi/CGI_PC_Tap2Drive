import { GwDomNode, GwPointerType } from "../../types/gwTypes";
import { GwPoint } from "../GwPoint";
/**
 * Used by gwEvents to store off information about pointer events.
 * Primarily for comparison between pointer down and pointer up, but also provides helper methods
 * for mousemove, and for things like determining if drag should start, or if a thumb or palm should be rejected.
 */
export declare class GwPointerInfo {
    readonly id: number;
    readonly position: GwPoint;
    readonly type: GwPointerType;
    readonly eventType: GwPointerInternalEventType;
    readonly height: number;
    readonly width: number;
    readonly timestamp: number;
    readonly originalTarget: GwDomNode | null;
    readonly meta: boolean;
    readonly shift: boolean;
    readonly ctrl: boolean;
    readonly alt: boolean;
    readonly button: number;
    readonly isTouch: boolean;
    readonly isPen: boolean;
    readonly isMouse: boolean;
    readonly isDown: boolean;
    readonly isMove: boolean;
    readonly isEnter: boolean;
    readonly isOut: boolean;
    readonly isUp: boolean;
    readonly isPossiblyPalm: boolean;
    readonly isValidForClick: boolean;
    readonly isValidForDblClick: boolean;
    readonly isValidForMouseDown: boolean;
    readonly clickableEl: GwDomNode | null;
    readonly draggableEl: GwDomNode | null;
    readonly dblClickableEl: GwDomNode | null;
    readonly longPressableEl: GwDomNode | null;
    readonly hasAnyDataGwEl: boolean;
    constructor(event: PointerEvent, pointerDownEventInfo?: GwPointerInfo | null);
    /**
     * Get the target of the pointer event, but with special handling for the case where this is a pointer up
     * event and the overlay mask has obscured the original target of the corresponding pointer down event. In
     * that case, providing the original target is still present and under the pointer, we set the "original
     * target" to match the pointer down, so we'll fire an intenal click
     * @param event the current pointer event
     * @param pointerDownInfo the corresponding pointer down event, if this is a pointer up event
     */
    private getTarget(event, pointerDownInfo?);
    private getRelevantAncestorDataGwEventEls(start);
    timeSinceEventInMs(): number;
    timeBetweenEvents(otherInfo: GwPointerInfo): number;
    hasSameClickableAs(otherInfo: GwPointerInfo | null): boolean;
    hasSameDblClickableAs(otherInfo: GwPointerInfo | null): otherInfo is GwPointerInfo;
    /**
     * Runs logic to determine if this instance of GwPointerInfo should replace a currently stored instance.
     * It's primary purpose is to determine if we can ignore what was an errant touch, or a palm touch
     * in a multi-touch environment. Like if the user is holding a tablet by the bottom left corner
     * We would start tracking that thumb touch, and then, without this logic, we would ignore every other touch
     * or pen touch that didn't match that touch's id.
     *
     * When this method runs, it attempts to do things like assume if a pen touch follows a finger touch, then we should
     * ignore the earlier finger touch.
     *
     * Or if the earlier touch was "large" in footprint, and a following touch was much smaller, then we'll assume
     * the earlier touch was the user placing their "palm" on a large tablet device. And we'll let a new touch, or a new
     * pen touch replace it.
     *
     * The more opinionated, latter half of the method's logic, can be disabled via the smartTouchRejection panel pref.
     *
     * @param {GwPointerInfo} existingInfo
     * @returns {boolean}
     */
    shouldBecomeNewMouseDownOverExistingMouseDown(existingInfo: GwPointerInfo): boolean;
}
export declare type GwPointerInternalEventType = "down" | "move" | "enter" | "out" | "up";
