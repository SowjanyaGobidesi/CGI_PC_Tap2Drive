import { GwDomNode, GwMap } from "../types/gwTypes";
import { GwInitializableSystem } from "../core/util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwMessages extends GwInitializableSystem {
    getSystemName(): string;
    private readonly NAV_ATTR;
    private readonly ERROR_CLASS;
    private readonly WARNING_CLASS;
    private readonly ERROR_QUICK_BUTTON_ID;
    private focusElementOnNextPageLoad;
    private errorsOnCurrentPage;
    private possiblyHighlightErrorButton;
    /**
     * @Optimize, could do this entire init method server side and mark elements there, instead of modifying the dom here
     * Marks any widgets that lead to the destination of the errors as being in an error state.
     * If there's a focusElementOnNextPageLoad, then moves the focus to that element.
     */
    init(): void;
    /**
     * File download errors are awkward because they occur when we are "rendering" to a different
     * window. So in such cases we end up having to apply an error message to an existing error
     * widget on the client side. The server sends us the HTML for an entire error group, so we
     * currently clear out the entire existing contents of the messages widget and replace whatever
     * was there with the new error group.
     *
     * @param {string | null} html for the error group in which the error should appear
     */
    addFileDownloadError(dangerousHTML: string | null): void;
    private updateWebMessageIndicators();
    private updateQuickErrorButton();
    willFocusElementOnNextPageLoad(): boolean;
    private getQuickErrorButtonOrThrow();
    private iterateMessagesWidgetsWithErrors(cb);
    quickErrorButton(el: GwDomNode, args: GwMap): void;
    toggleGroup(el: GwDomNode, args: GwMap): void;
    /**
     * Toggles the group of messages open or closed.
     */
    toggleSubGroup(el: GwDomNode, args: GwMap): void;
    private markNavElementAsHavingErrors(navId, hasOnlyWarnings?);
    /**
     * Move the focus to a field, animate it to show it, which will also scroll the page to include it if not currently visible.
     */
    highlight(el: GwDomNode | null, args: GwMap): void;
    /**
     * Requires the NAV_ATTR to be present on the element.
     * If present, then fires the event of the associated navigation element.
     */
    navigate(el: GwDomNode, args: GwMap): void;
    /**
     * If the web message widget has an action listener, then it has specific functionality to fire an event,
     * passing the parameter of the the WebMessage source id.
     */
    action(el: GwDomNode, args: GwMap): void;
}
export declare const gwMessages: GwMessages;
