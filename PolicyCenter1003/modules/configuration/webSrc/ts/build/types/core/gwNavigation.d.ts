import { GwDomNode, GwEventType, GwKeyboardNavigation, GwMap, GwNavigationPredicate } from "../types/gwTypes";
import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * The navigation system is primarily responsible for handling focus, persisting and restoring focus.
 * It uses only native HTML level focus, and no pseudo states. It persists lastFocusID and currentFocusId in storage.
 * And responds to any navigation key events, via registrations in events.js.
 * At the top level, all a component needs to do is is register the css classes it owns with the navigation system, ie:
 * gw.navigation(["gw-action--inner", "gw-action--expand-button"], gw.MenuItem);
 * Any time a navigation event is parsed, it will examine the target to see if any registered nav classes are on it,
 * and then attempt to execute a matching method name on the component object.
 * ie, if gw.navigation.down is called on a "gw-action--inner" target, then:
 * gw.MenuItem.down(node, "gw-action--inner") will be executed if the method exists. It's then up to the component
 * to decide what to do on the arrow down event.
 */
export declare type GwNavigable = GwRegisteredSystem & GwKeyboardNavigation;
export declare type GwNavHandler = {
    shouldHandle: GwNavigationPredicate;
    handler: GwNavigable;
};
export declare class GwNavigation extends GwRegisteredSystem {
    getSystemName(): string;
    /**
     * An array of objects with two properties,
     * @type {Array}
     */
    private readonly navHandlers;
    /**
     * Makes use of navigation.registerNavFunction to register a handler that will be used if
     * the given CSS class(es) match the node firing the key event.
     *
     * See comment on navigation.registerNavFunction for more.
     * @param cssClasses - String, or String[], of valid css classes
     * @param globalComponentObject - Object, component object stored on the gw global, ie gw.MenuItem
     */
    registerNavClasses(cssClasses: string | string[], globalSystem: GwNavigable): void;
    /**
     * Called by registered navigable systems to allow a widget or area in the DOM to control navigation, regardless of child type that's currently focused.
     * For example: list view registers this with it's gw-listview--wrapper class, so that it can be notified whenever alt+shift+arrowKey
     * fires. This then fires gwListView.left, or gwListView.right, and it's up to the listview to then decide what to do, like moving the focus to the next cell
     * @param {string} contextClass
     * @param {GwNavigable} navSystem
     */
    registerContextualNavClass(contextClass: string, navSystem: GwNavigable): void;
    /**
     * @private
     * A helper method with a default, class-based nav registration function.
     * @param cssClass the class to check
     * @param globalComponentObject the handler
     */
    private addCssMatchFunction(cssClass, globalSystem);
    /**
     * Registers a function and handler that are checked when direction keys are pressed.
     * The function determines whether a keypress should be handled by the supplied handler object,
     * which needs to implement the relevant direction method (up, down, left, right).
     *
     * Nav Functions are checked in order of addition, and the first to return true from the "shouldHandle"
     * function will receive the event.
     * @param shouldHandle a function that returns true if the corresponding handler should handle this key event
     * @param globalComponentObject the object that handles the key nav event
     */
    registerNavFunction(shouldHandle: GwNavigationPredicate, globalSystem: GwNavigable): void;
    /**
     * Forces the focus onto the west panel.
     */
    goWest(): void;
    /**
     * Forces the focus onto the north panel.
     */
    goNorth(): void;
    /**
     * Forces the focus onto the center panel.
     */
    goCenter(): void;
    /**
     * Forces the focus onto the south panel.
     */
    goSouth(): void;
    /**
     * Takes the node and the navigation method name, ie "down", "left", and determines if there is a component
     * that has registered to handle navigation events by testing the node's css classes.
     * If a handler is found, then it attempts to execute a matching event name on the handler.
     * passing the node and the matched css class. ie: gw.MenuItem.down(node, "gw-action--inner");
     */
    private getNavContextAndMethod(node, navDir, info, event);
    /**
     * This method is registered on the navigation object, solely to be executed by the events system.
     * See registerNavTypes on the navigation object to have a Component register for navigation events.
     */
    left(node: GwDomNode, info: GwMap, event: GwEventType): void;
    /**
     * This method is registered on the navigation object, soley to be executed by the events system.
     * See registerNavTypes on the navigation object to have a Component register for navigation events.
     */
    right(node: GwDomNode, info: GwMap, event: GwEventType): void;
    /**
     * This method is registered on the navigation object, soley to be executed by the events system.
     * See registerNavTypes on the navigation object to have a Component register for navigation events.
     */
    up(node: GwDomNode, info: GwMap, event: GwEventType): void;
    /**
     * This method is registered on the navigation object, soley to be executed by the events system.
     * See registerNavTypes on the navigation object to have a Component register for navigation events.
     */
    down(node: GwDomNode, info: GwMap, event: GwEventType): void;
    /**
     * see registerContextualNavClass
     * @param {GwDomNode} node
     * @param {GwMap} info
     * @param {GwEventType} event
     */
    contextualLeft(node: GwDomNode, info: GwMap, event: GwEventType): void;
    /**
     * see registerContextualNavClass
     * @param {GwDomNode} node
     * @param {GwMap} info
     * @param {GwEventType} event
     */
    contextualUp(node: GwDomNode, info: GwMap, event: GwEventType): void;
    /**
     * see registerContextualNavClass
     * @param {GwDomNode} node
     * @param {GwMap} info
     * @param {GwEventType} event
     */
    contextualRight(node: GwDomNode, info: GwMap, event: GwEventType): void;
    /**
     * see registerContextualNavClass
     * @param {GwDomNode} node
     * @param {GwMap} info
     * @param {GwEventType} event
     */
    contextualDown(node: GwDomNode, info: GwMap, event: GwEventType): void;
    private handleNavDirection(contextAndFunction, node, info, event);
    private handleNavDirection(dir, node, info, event);
    /**
     * @private
     * Shared helper used by getNextFocusableSibling, and getPrevFocusableSibling.
     * Takes the name of an iterator method on the util global, and a DOM node, and determines returns the first
     * focusable same level sibling that's found "after" the child itself is found. After obviously changes depending
     * on the direction of the iterator method.
     * @param method - string, name of iterator method on gwUtil. Common usages would be forEach and forEachReverse
     * @param child
     * @returns {*}
     */
    private abstractGetFocusableSibling(method, child);
    /**
     * @public
     * Gets the next focusable sibling at the same level in the child's parent;
     * @param child - the element to find the sibling of.
     * @returns {DOM Element}
     */
    getNextFocusableSibling(child: GwDomNode): GwDomNode | null;
    /**
     * @public
     * Gets the previous focusable sibling at the same level in the child's parent;
     * @param child - the element to find the sibling of.
     * @returns {DOM Element}
     */
    getPrevFocusableSibling(child: GwDomNode): GwDomNode | null;
    /**
     * @public
     * sets the focus to self or the first parent that passes the gw.navigation.isFocusable test.
     * @param idOrNode - string id or DOM element
     */
    setFocusToClosestFocusableSelfOrParent(idOrNode: string | GwDomNode): void;
}
export declare const gwNavigation: GwNavigation;
