import { GwDomNode, GwEventType, GwMap } from "../types/gwTypes";
import { GwPoint } from "../core/GwPoint";
import { GwDraggableSystem } from "../core/util/GwDraggableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * The south panel (also known as the workspace) is displayed at the bottom of the UI and contains one or more
 * worksheets, which can contain arbitrary panels, inputs and so on. You can switch between worksheets via tabs at
 * the top of the workspace.
 *
 * The south panel is in one of three states:
 * - Hidden entirely
 * - Showing normally
 * - Minimized (just the worksheet tab labels showing)
 *
 * The server determines whether the south panel is hidden. On every render it will figure out the current worksheet,
 * if any, and then render it. The client side code cannot hide the south panel directly, it must cause a server
 * request that will then figure out if there is still a current worksheet and render accordingly. All tab changes
 * also require a server round trip and re-render, as the client only has the content for the "current" worksheet.
 *
 * The client is in control of the south panel height and whether it is minimized. These values are both kept in
 * local storage and the controls for resizing and minimizing the south panel are purely client side. So when the
 * panel is minimized all its contents is available on the client side, just not all visible.
 *
 * The very first time the south panel is displayed there will be no stored height or minimization flag and, in that
 * case, the client side code will set the south panel height to be a proportion of the overall UI height.
 *
 * Resizing the south panel is done via a drag control so it implements the GwDraggableSystem interface.
 */
export declare class GwSouthPanel extends GwDraggableSystem {
    getSystemName(): string;
    /**
     *  Used to store a boolean indicating whether the south panel is minimized - if unset, assume false
     */
    private readonly IS_MINIMIZED_KEY;
    /**
     * Used to store the south panel height in pixels - if unset need to calculate default height
     */
    private readonly HEIGHT_KEY;
    /**
     * Used when there is no stored south panel height; used to calculate how high it should be relative to the
     * center panel
     */
    private readonly DEFAULT_HEIGHT_PERCENTAGE;
    /**
     * Minimum number of pixels to allow for the center panel, to stop the south panel from entirely covering it.
     * This ensures at least a little of the center panel is visible and also leaves space for the south panel
     * "minimizer" control.
     */
    private readonly MINIMUM_CENTER_PANEL_HEIGHT;
    /**
     * If the south panel is smaller than the "snapLine" height (in pixels) then it is minimized automatically
     */
    private _snapLine;
    /**
     * Used to calculate the offset of the drag bar from it's original position.
     * @type GwPoint
     */
    private _startY;
    private _offsetFromDragBar;
    /**
   * Initialization, called after server round trip
   */
    init(isFullPageReload: boolean): void;
    private possiblyHideDuplicateTitlebar();
    /**
     * Called by the resizer to calculate the size of the center panel, to ensure that the south panel will fit in the
     * available space. The south panel will try to return to its saved height, if available. If there's not room for
     * that, or it has no saved height, then it will try to fill up 40% of the available space.
     * @param {number} availablePixels the amount of space available for the south panel
     * @returns {number} the height of the south panel
     */
    ensureHeightFits(availablePixels: number): number;
    /**
     * Toggles south panel minimization
     * Public event handler
     */
    toggleCollapse(): void;
    /**
     * Open the south panel if it is minimized
     * Public event handler
     */
    unMinimize(): void;
    /**
     * Opens the south panel if currently minimized, in addition to firing the worksheet tab event. Firing the tab
     * event will cause a server round trip and re-render
     * Public event handler
     */
    worksheetTabClick(node: GwDomNode, args: GwMap, e: GwEventType): void;
    private _dragBar;
    private readonly dragBar;
    /**
     * Part of the GwDraggableSystem interface, called by gwDraggable.ts when the south panel is being resized
     */
    drag(el: GwDomNode): void;
    /**
     * Part of the GwDraggableSystem interface, called by gwDraggable.ts when the south panel is being resized
     */
    dragStart(el: GwDomNode, initialPosition: GwPoint): void;
    /**
     * Part of the GwDraggableSystem interface, called by gwDraggable.ts when the south panel is being resized
     */
    dragEnd(el: GwDomNode): void;
    /**
     * Part of the GwDraggableSystem interface, called by gwDraggable.ts when the south panel is being resized
     */
    dragCancel(el: GwDomNode): void;
    private dragEndOrCancel();
    /**
     * Called when the user has dragged the south panel to a new height. Clear minimization and then attempt
     * to set height according to the mouse position - if that makes the panel smaller than the "snap line"
     * setPanelHeight will re-minimize it.
     */
    private setPanelHeightOnEvent();
    private restorePanelHeight();
    /**
     * Read the snap line height configured in CSS, if possible. This allows the snap line to be configured via
     * style sheet, rather than being hard coded in this file.
     */
    private setSnapLineFromCss();
    /**
     * Called during initialization - that is after the server has re-rendered - to set the newly rendered panel's
     * height to the value chosen by the user. Later in initialization the resizer will ensure that the panel will
     * actually fit in the available space.
     */
    private setPanelToSavedHeightAfterRender();
    private computeActualHeight();
    /**
     * Called when a client side action (resizing or minimization) has changed the height of the panel. Notifiers
     * the resizer when it is done, and the resizer will call back to ensure the proposed height works.
     */
    private setPanelHeight(pixelHeight);
    private isHidden();
    private isMinimized();
    private getStoredHeight();
    /**
     * Check whether the south panel is minimized and then show/hide the appropriate south panel elements
     */
    private applyMinimization();
    private getSouthPanelEl();
    private moveDragBarToMouse();
    private resetDragBar();
}
export declare const gwSouthPanel: GwSouthPanel;
