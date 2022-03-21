import { GwDomNode } from "../../types/gwTypes";
import { GwPoint } from "../../core/GwPoint";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwListViewHelper {
    /**
     * Configurable number determine the valid drop area on either side of a cell border.
     * @type {number}
     */
    private readonly DROP_MARGIN;
    private readonly SCROLL_TRIGGER_MARGIN;
    private readonly SCROLL_AMOUNT;
    /**
     * Used to calculate the offset of the drag bar from it's originally grabbed position.
     * @type {gwPoint}
     */
    private mouseOffset;
    /**
     * Updated from draggable on every drag frame
     * @type gwPoint
     */
    private mousePos;
    private origContainerPos;
    private dragContainerHalfWidth;
    private headerRow;
    private headerCellTds;
    private ownerHeaderCell;
    private currentDragContainer;
    private getCurrentDragContainerOrThrow();
    private getOwnerHeaderCellOrThrow();
    private getHeaderCellTdsOrThrow();
    private getHeaderRowOrThrow();
    private getDragContainerHalfWidthOrThrow();
    private getMousePosOrThrow();
    private getMouseOffsetOrThrow();
    private getOrigContainerPosOrThrow();
    /**
     * Populates the Columns Menu with Menu Items for each valid header cell in each listview on the page.
     * @param optionalSingleLV - passing an optional LV element will cause the method to only generate
     * content for that LV.
     */
    buildColumnsMenusForAllLVs(optionalSingleLV?: GwDomNode): void;
    private duplicatePagingToBottomOfLV(lv, paging, bumper);
    /**
     * Calls getIndexForAndHighlightPossibleDrop
     * Moves the original column to the left of the targetColumn, unless the target column is the last in the row,
     * in which case it inserts the original column to the right of it.
     */
    private possiblyPlaceColumn();
    /**
     * Returns the first element in the hierarchy with a scroll width greater than its client width
     * and with it's computed overflow x being equal to auto or scroll.
     * Stops at the screen widget.
     * @param el
     * @returns {element or null if none found}
     */
    private getScrollParentOrNull(el);
    /**
     * Updates the header drag slider to be aligned with the mouse, while capping its position
     * to the row element, and attempting to scroll parent elements if the dragged element is near
     * either horizontal edge.
     */
    private moveSliderToMouse();
    private scrollListView(dragContainer);
    /**
     * Caches off the headerRow and headerCellTds array.
     */
    private processHeaderRow();
    /**
     * Highlights both the dragged header, and valid left and right headers if the dragged header can be legally dropped.
     * Also returns the index of the valid drop position.
     * Returns null if the slider is not in a valid position to be dropped.
     * @returns {int or null}
     */
    private getIndexForAndHighlightPossibleDrop();
    /**
     * Returns true if the header cell is marked as being draggable
     * @param headerCell header cell being checked for drag-ability
     * @returns {boolean} returns true if the header cell is marked to be draggable else returns false
     */
    private headerCellDraggable(headerCell);
    private resetAllDragChanges();
    dragStart(actionInner: GwDomNode, initialPosition: GwPoint): void;
    dragEnd(): void;
    dragCancel(): void;
    drag(): void;
}
export declare const gwListViewHelper: GwListViewHelper;
