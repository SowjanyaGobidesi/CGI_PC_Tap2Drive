import { GwDomNode } from "../../types/gwTypes";
import { GwDraggableSystem } from "../../core/util/GwDraggableSystem";
import { GwPoint } from "../../core/GwPoint";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * Dedicated class for handling the .gw-drag-bar inside of every horizontally resizable cell
 * Currently, only column (horizontal) resizing is supported
 */
export declare class GwDraggableColumn extends GwDraggableSystem {
    private readonly SCROLL_TRIGGER_MARGIN;
    private readonly SCROLL_AMOUNT;
    private readonly MIN_DRAGGED_WIDTH;
    private mousePos;
    private originalContainerRect;
    private currentDragCell;
    private currentDragCellInner;
    private tdOriginalMinWidth;
    private tdOriginalMaxWidth;
    private cellInnerOriginalWidth;
    getSystemName(): string;
    protected availableToInitialize(): boolean;
    init(): void;
    private resetAllDragChanges();
    private clearDragVariables();
    dragStart(dragBar: GwDomNode, initialPosition: GwPoint): void;
    dragEnd(): void;
    dragCancel(): void;
    drag(): void;
    /**
     * Returns the first element in the hierarchy with a scroll width greater than its client width
     * and with it's computed overflow x being equal to auto or scroll.
     * @param el
     * @returns {element or null if none found}
     */
    private getScrollParentOrNull(el);
    /**
     * Sets the width of the cell based on the mouse position relative to the cells right edge
     * uses gwListView.sizeColumnByCellId
     * width is capped at MIN_DRAGGED_WIDTH < width < windowWidth
     */
    private setCellSize(finalFrame?);
    private scrollListView();
}
export declare const gwDraggableColumn: GwDraggableColumn;
