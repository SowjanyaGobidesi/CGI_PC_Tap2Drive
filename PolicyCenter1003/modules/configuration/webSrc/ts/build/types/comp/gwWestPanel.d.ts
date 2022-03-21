import { GwDomNode } from "../types/gwTypes";
import { GwDraggableSystem } from "../core/util/GwDraggableSystem";
import { GwPoint } from "../core/GwPoint";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwWestPanel extends GwDraggableSystem {
    getSystemName(): string;
    private readonly westPanelLastActiveIDs;
    private readonly westPanelMinKey;
    private readonly westPanelSizeKey;
    private readonly westPanelSnapLine;
    /**
     * Used to calculate the offset of the drag bar from it's original position.
     * @type gw.Point
     */
    private startX;
    private offsetFromDragBar;
    init(): void;
    /**
     * @public
     * Toggles the WestPanel expanding or collapsing.
     */
    toggleMinMax(): void;
    /**
     * Only used by gwStorage.registerComponentRestoreFunction.
     * Restores the various client only UI settings relating to the west panel.
     */
    _restoreWestPanel(): void;
    private scrollActiveLocationMenuItemIntoViewIfNeeded();
    /**
     * We diff-replace the currently open active menu in the west panel when the user switches to a new location, which closes the menu, which is undesired.
     * So now we save off the last active menus and open them all up again after the diff.
     */
    private openLastActiveMenuItem();
    toggleActionMenu(): void;
    /**
     * Dragging
     */
    setWestPanelSizingOnEvent(): void;
    restoreWestPanelWidth(recalculateCenterPanel?: boolean): void;
    setWestPanelSizing(pixelWidth: string | number | null, recalculateCenterPanel?: boolean): void;
    getWestPanelEl(): GwDomNode;
    private moveDragBarToMouse();
    private resetDragBar();
    private _dragBar;
    private readonly dragBar;
    /**
      * Called by gwDraggable.ts
     * @param el
     * @param args
     * @param e
     */
    drag(el: GwDomNode): void;
    /**
     * Called by gwDraggable.ts
     * @param el
     * @param initialPosition
     */
    dragStart(el: GwDomNode, initialPosition: GwPoint): void;
    /**
     * Called by gwDraggable.ts
     * @param el
     * @param args
     * @param e
     */
    dragEnd(el: GwDomNode): void;
    /**
     * Called by gwDraggable.ts
     * @param el
     * @param args
     * @param e
     */
    dragCancel(el: GwDomNode): void;
    private dragEndOrCancel();
}
export declare const gwWestPanel: GwWestPanel;
