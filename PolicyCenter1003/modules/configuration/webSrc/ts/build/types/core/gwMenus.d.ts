/**
 * Handler of all "dropdown" menu systems. All objects involved in menus are MenuItemWidgets, but are differentiated
 * based on a number of factors: parent container, whether it's in a submenu or is a top level menu.
 * Dropdown menus can be on stand alone buttons, in toolbars, in header cells, navigation tabs, left navigation, etc.
 * The one thing they have in common is their structure:
 *
 *      <div class="gw-action--outer"> // Handles any mouseenter, mouseleave, focus, or blur
 *          <div class="gw-action--inner">LABEL</div> fires the primary action if any when clicked
 *          <div class="gw-action--expand-button">ICON</div> toggles the subMenu when clicked
 *          <div class="gw-subMenu">
 *              ...children
 *          </div>
 *      </div>
 *
 * Note: One oddity: calling openSubMenu only registers the subMenu to be opened. We have to call "closeAllMenus" at various
 * points in the event chain. So only after closing all menus, do we then call make makeMenuVisibleInDom on the stored subMenu,
 * which then makes it and all of it's ancestor menus visible.
 *
 * See menus.scss for SASS mixins.
 * @type {{}}
 */
import { GwClassIdTagOrNode, GwDomNode, GwMap, GwEventType, GwKeyboardNavigation } from "../types/gwTypes";
import { GwInitializableSystem } from "./util/GwInitializableSystem";
export declare class GwMenus extends GwInitializableSystem implements GwKeyboardNavigation {
    getSystemName(): string;
    private menuVerticalScrollAmount;
    /**
     * id and element
     * if a menu is toggled open, it needs to register itself so the mouse event doesn't close it as part of closing all the menus
     * @type {{}}
     */
    private storedMenuToOpenAfterClosingOthers;
    /**
     * map of id:el
     * @type {{[id]:[el]}}
     */
    private currentlyOpenMenus;
    /**
     * Store the groupname of the currently open top level menu group
     * @type {string}
     */
    private topLevelGroupMenuOpen;
    init(isFullPageReload: boolean): void;
    private getBoundaries();
    /**
     * @private
     * Returns the first node, including the node itself, that is gw-action--outer with .gw-hasChildren.
     *
     * Has a safety check depth of 10. This means that if you actually have a focusable element 10 layers deep
     * inside of the outer, then it won't get there.
     * @param node - DOM Element
     * @param nullIfFoundActionButNoChildren - if true will return null when a gw-action--outer is found with no children,
     * otherwise the closest .gw-action--outer with children will be returned.
     * @returns {DOM Elmement or null}
     */
    private getSelfOrFirstParentActionOptionallyWithChildren(node, nullIfFoundActionButNoChildren?);
    /**
     * Should only be called by the global mouseenter event.
     * If this method was triggered by a browser attempting to be "helpful" and calling mouseover when you touch down, then this becomes a noop
     * @param node
     * @returns {boolean} true if a menu is opened as a result of this mouseenter event, false otherwise
     */
    openSubMenuMouseEnter(node: GwDomNode): boolean;
    private getEnteredMenuNode(node);
    private isSubMenusBelow(menuElement);
    focusChangedViaTabPossiblyCloseAbandonedMenus(el: GwDomNode): void;
    /**
     * @private
     * Takes a DOM element and makes it's subMenu visible, then walks up the dom and makes any ancestor menus visible as well.
     * - if gw-putSubMenusBelow class is present, then moves the subMenu to render like a top NavBar would
     * - otherwise it renders like a subMenu would, to the right of the menu item, top aligned.
     * - finds the first child element with gw-subMenu, and adds the class gw-open to it.
     * - It then runs logic to determine if the subMenu would be off the screen, and if it is, aligns it to the otherside of that axis
     * - Looks for a parent menu, and makes a recursive call passing the parent as an argument.
     * @param el
     * @returns {null}
     */
    private makeMenuVisibleInDom(el);
    private isMultiColumnMenu(menu);
    private getSubMenuWidth(subMenu);
    private getSubMenuHeight(subMenu);
    private resetHiddenMenus(menu);
    private resetMenuArrows(menu);
    private buildScrollingMenu(menu, panelBoundaries, subMenuLeftStyle);
    private scroll(scrollContainer, upArrow, downArrow);
    private updateUpArrowStatus(menu, upArrow);
    private updateDownArrowStatus(menu, downArrow);
    private buildArrow(id, arrowClass, direction, width);
    private buildNonScrollingMenu(menu, boundaries, totalMenuHeight, subMenusBelow, parentRect);
    scrollMenuUp(arrow: GwDomNode, args: GwMap, e: GwEventType): void;
    scrollMenuDown(arrow: GwDomNode, args: GwMap, e: GwEventType): void;
    private scrollMenu(arrow, direction);
    private calculateScrollAmount(scroller, direction);
    private getOtherArrow(arrow);
    private getMenuId(menu);
    /**
     * Sets 'storedMenuToOpenAfterClosingOthers', after checking various open menu logic:
     * 1. if this is from a mouseover event, and the el is top level, check to see if there is an open top
     *    menu group that is already open.  If the el's menu group menu does not match, kick out.  If it's
     *    not a top level menu, it means it is an open submenu and we can go ahead and call fetchMenuIfNeeded
     * 2. store the menu to be opened
     * 3. if this is a mouse click event, kick out.  Rely on events.doAfterAnyClick to handle closing and then opening
     *    opening the menu stored in step 2.
     * 4. if not a click (mouse over or keyboard), close all menus and open the stored menu
     *
     * If the event type is click, then this method defers all open and closing to the doAfterAnyClick methodf
     * @param classIdTagOrNode - a clickable element either inside a gw-action--outer node, or the node itself.
     * @param eventType - (Optional) the event type associated with the method call. mouseover and click have special handling
     * @returns {boolean} true if the sub menu is opened, false otherwise (if, for example, the menu is disabled)
     */
    openSubMenu(classIdTagOrNode: GwClassIdTagOrNode, eventType?: string): boolean;
    /**
     * @private Gets the menu group from the passed in element.  If no group is specifiec, returns "NoGroup"
     * @param el
     * @returns {string|string}
     */
    private getMenuGroup(el);
    /**
     * Fired after any click event, or inside of openSubMenu, if the call came from a mouseover event.
     * Iterates over all currentlyOpenMenus and closes them.
     */
    closeAllMenus(modifyFocus?: boolean): void;
    closeAllMenusContainedBy(parentElem?: GwDomNode | null): void;
    /**
     * Takes the storedMenuToOpenAfterClosing element, and if it exists, fires makeMenuVisibleInDom on it.
     * -If the storedMenuToOpenAfterClosingOthers.restoreFocusSelector exists
     * then calls setFocusToClosestFocusableSelfOrParent on it
     */
    openStoredMenu(): void;
    /**
     * @public
     * Takes the first result of getDomNodes. And then runs getSelfOrFirstParentActionOptionallyWithChildren to find a gw-action--outer element.
     * Removes the gw-open class from the first child with gw-subMenu found
     * -If the currentFocus is found to be effectively a direct child of the subMenu, then calls setFocusToClosestFocusableSelfOrParent on it
     * @param classIdTagOrNode
     */
    closeSubMenu(classIdTagOrNode: GwClassIdTagOrNode, modifyFocus?: boolean): void;
    /**
     * @public
     * Takes the first result of getDomNodes. And then runs getSelfOrFirstParentActionto find a gw-action--outer element.
     * Chooses between openSubMenu and closeSubMenu based on the presence of the gw-open class on the
     * first child found with gw-subMenu class
     * @param classIdTagOrNode
     */
    toggleSubMenu(classIdTagOrNode: GwClassIdTagOrNode, eventType?: string): void;
    toggleFromShortcut(na: any, args: GwMap): void;
    /**
     * @private
     * Fetches the subMenu for the given on-demand MenuItem if needed
     * @param outer
     */
    private fetchMenuIfNeeded(outer);
    /**
     * @public
     * This returns a fully formed div with identical structure to the MenuItemWidgets built out by the server, which are then
     * customized by the inline events system. Its purpose is to add client side menu options that the server should not know
     * anything about, like "change to theme x" or "clear local storage".
     * Keep in mind, that any element added to the dom client side, will need to be readded on full and partial page reload.
     *
     * @param id: String: inline id attribute
     * @param label: String: text for the MenuItem label
     * @param click: String: Optional, the string normally values to data-gw-click in server templates. ie 'fireEvent' or 'gwUtil.toggleClass target:#blah'.
     * @param children: Array of Objects: Optional. {id:String, label:String, click:String, children:Array of Objects};
     * @returns {DOMElement, identical to MenuItemWidget}
     */
    createMenuItemDiv(id: string, label: string, click?: string, children?: GwMap[]): HTMLDivElement;
    /**
     * @private
     * Helper method to determine whether a menu item node is in a submenu.
     * @param outer - a Menu Item node with the gw-action--outer css class.
     * @returns {boolean}
     */
    private isInSubMenu(outer);
    private isInStaticMenus(outer);
    /**
     * @private
     * Helper method to return the gw-action--outer node by passing one of the focusable children to it,
     * currently expected to be the gw-action--inner or the gw-action--expand-button.
     * @param node
     * @returns {DOM Element}
     */
    private getOuterFromInnerOrExpand(node);
    /**
     * @private
     * Helper method to return the gw-action--outer that is holding the submenu..that is holding the focusable node.
     * It does this simply by making 2 calls to getouterFromInnerOrExpand.
     * @param node - a DOM node, expected to be the gw-action--inner, or gw-action--expand-button.
     * @returns {DOM Element}
     */
    private getParentOuterFromInnerOrExpand(node);
    /**
     * @private
     * Method should only be executed by the gwNavigation system, when a matching navigation method is found.
     * Follows logic to determine whether a MenuItem is in a submMenu, or is a top item.
     * if in submenu: then it moves focus down to the next MenuItem. If at the bottom, then does nothing
     * if is top item: like in a tab bar: then it opens the top item's sub menu, and sets focus to the first MenuItem
     * @param node
     */
    down(node: GwDomNode): boolean;
    /**
     * @private
     * Method should only be executed by the gwNavigation system, when a matching navigation method is found.
     * Follows logic to determine whether a MenuItem is in a submMenu, or is a top item.
     * if in submenu: then it moves the focus up to the previous Menu Item. If it's at the top of the submenu,
     * then it closes the sub menu and puts focus on the gw-action--outer that held the subMenu.
     * if is top item: like in a tab bar: then it's a noop.
     * @param node
     */
    up(node: GwDomNode): boolean;
    /**
     * @private
     * Method should only be executed by the gwNavigation system, when a matching navigation method is found.
     * Follows logic to determine whether a MenuItem is in a submMenu, or is a top item.
     * if in submenu: then it opens the MenuItem's subMenu and sets focus to the first element. If there is no subMenu, then noop.
     * if is top item: like in a tab bar: then it moves focus to the next MenuItem sibling in the tab bar.
     * @param node
     */
    right(node: GwDomNode): boolean;
    /**
     * @private
     * Method should only be executed by the gwNavigation system, when a matching navigation method is found.
     * Follows logic to determine whether a MenuItem is in a submMenu, or is a top item.
     * if in submenu: then it closes the subMenu and puts focus onto the gw-action--outer that held the subMenu.
     * if is top item: like in a tab bar: then it moves focus to the previous MenuItem sibling in the tab bar.
     * @param node
     */
    left(node: GwDomNode): boolean;
}
export declare const gwMenus: GwMenus;
