import { GwClassIdTagOrNode, GwDomNode, GwDomNodeList, GwPanel } from "../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwFocus {
    /**
     * @private
     * Key for localStorage.
     * @type {string}
     */
    private readonly CURR_FOCUS_KEY;
    /**
     * @private
     * Key for localStorage.
     * @type {string}
     */
    private readonly LAST_FOCUS_KEY;
    /**
     * @private
     * The cache for the current focused node.
     * We cache it to prevent having to do an ID lookup from localStorage everytime.
     * But it means we need to clear the cache on full and partial page reloads.
     * Only accessed via gw.navigation.setCurrentFocus and getCurrentFocus
     */
    private currentFocusNode;
    /**
     * ibid.
     */
    private lastFocusNode;
    /**
     * Early in processing a server request we may learn that we need to set focus to a given element (e.g. via a
     * server "event" or "command"). But, at that time, the focus and event systems aren't ready. So we save the
     * focus node and process it when we are ready.
     */
    private serverSpecifiedFocusNode;
    private lastClickedPanel;
    /**
     * @public
     * Returns either the cached node in currentFocusNode, or pulls the stored id from localStorage and does a DOM lookup.
     * @returns {*}
     */
    getCurrentFocus(): GwDomNode | null;
    /**
     * Removes focus and focus styling from all nodes
     */
    clearFocus(): void;
    private setCurrentAndLastFocusToNull();
    /**
     * @public
     * Holds a reference to the last focused node.
     * @returns {*}
     */
    getLastFocus(): GwDomNode | null;
    /**
     * @public
     * Sets the last focused node.
     * @param node
     */
    setLastFocus(node: GwDomNode | null): void;
    /**
     * @public
     * Only to be called by server events/commands to specify a focus node that should be applied once
     * the focus system is ready
     * @param {GwDomNode} node
     */
    setFocusFromServer(node: GwDomNode): void;
    /**
     * @private
     * Given a node, returns an array of focusable children via querySelectorAll tabindex.
     * And filters the array for various properties and styles that would make it "invisible".
     * @param node
     * @returns {[DOMNodes]}
     */
    getFocusable(node: GwDomNode): GwDomNodeList;
    /**
     * @private
     * used by getFocusable and isFocusable, to determine if an element meets the criteria of visibility and size to be focused.
     * @param el - an HTML DOM element.
     * @returns {boolean}
     */
    private canSelfBeFocusedBasedOnHtmlState(el);
    private readonly defaultFocusableMap;
    private allowsFocusBasedOnReadonly(el);
    /**
     * @private
     * Check if element is focusable based on tabIndex.  If the tabIndex is not explicitly specified
     * on the element, check a default focusable map to determine if the element should be focusable.
     */
    private focusableUsingTabIndex(el);
    focusableOnClick(el: GwDomNode): boolean;
    /**
     * @public
     * Returns true if the node, or anyone of it's children is focusable.
     * @param node
     * @param allowChildren whether to search down for a focusable element to consider the node focusable
     * @returns {boolean}
     */
    isFocusable(node: GwDomNode | null, allowChildren?: boolean): boolean;
    /**
     * When an element is clicked, we search up the DOM for something with a tabIndex
     * to focus. In IE, everything receives a focusIn event, so we need to search
     * for what elements we support focus on.
     * @param targetNode
     * @returns {*}
     */
    findFocusableNodeForClick(targetNode: GwDomNode | null): GwDomNode | null;
    processNewFocus(node: GwDomNode, animateOnFocus?: boolean): void;
    forceFocusIgnoreIfNull(classIdOrNode: GwClassIdTagOrNode | null, animateOnFocus?: boolean): boolean;
    /**
     * @public
     * This call takes a class or Id string, or a node, and sets focus to it if it has a tab index.
     * If it does not have a tabindex it begins recursively drilling down to find the first child of child with a tabindex
     * @param classIdOrNode: argument passed to getDomNode
     * @param animateOnFocus: Whether the DOM element should "bounce" to show it has been focused
     * @returns {boolean} returns true to stop the recursive calls.
     */
    forceFocus(classIdOrNode: GwClassIdTagOrNode, animateOnFocus?: boolean): boolean;
    setLastClickedPanelAndClearFocus(target: GwDomNode | null): void;
    /**
     * @public
     * Needs to be called after full and partial page reload to restore the focus correctly.
     * Clears current node caches then forces focus onto the the currentFocus
     * @param asyncTimer: if present, and a number, then will delay calling restore focus for n milleseconds.
     * This is mainly for debugging, but it's likely there will come a time where we have async logic running
     * after page reload, and restore focus will need to wait until it's done. Though when that happens,
     * this should probably become a callback to the given async method.
     */
    restoreFocus(isFullPageReload: boolean, asyncTimer?: number): void;
    restoreLastFocusNodeIfAvailable(animate?: boolean): void;
    getLastClickedPanel(): GwPanel | null;
    focusIsOutsideApplication(): boolean;
    /**
     * The document.activeElement is the document.body inbetween blur and focus events in chrome
     * and it's the document.documentElement in firefox an edge;
     * This makes it impossible to tell synchronously, during the blur event, whether the shift tab from the first element
     * on the page has actually put focus on the body element, in which case we need to clear our previously focused element.
     * So we have to do the check in the next frame.
     *
     * NOTE: if you have developer tools open in either chrome or firefox, the body element will receive focus always
     * as an extra step between the document and the address bar.
     */
    possiblyHandleDocumentBlur(): void;
    getFirstFocusableElInNorth(): GwDomNode | null;
    getLastFocusableElInCenterOrSouth(): GwDomNode | null;
    private getCorrespondingLockElForLastFocusNode(newFocusEl);
    /**
     * [IF]
     * the newFocus node is one of the application's focus barrier element, then it will run logic to determine
     * what direction the user was heading, and then return either the first element in north panel, or the last element in center/south
     *
     * [ELSE]
     * If the lastFocus node exists, and is part of a focus lock cycle. Meaning, it's either the top or the bottom node
     * Then this method goes and finds the lock container, ie the first parent element with a data-gw-focus-lock attribute
     * If the new focus is contained by the lock container, then all is good, and return the new focus.
     * If the new focus is outside of the lock container, then we query the lock container to find the corresponding lock node.
     * If the lastFocusNode is top, then returns bottom, and vice versa
     * @returns {GwDomNode | null}
     */
    getCorrespondingFocusLockOrNewFocusEl(newFocusEl: GwDomNode): GwDomNode;
}
export declare const gwFocus: GwFocus;
