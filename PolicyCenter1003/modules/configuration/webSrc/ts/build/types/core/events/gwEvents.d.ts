/**
 * How to construct an element on the server that responds to events:
 * 1. add data-gw-eventname="methodname", ie: '<div data-gw-click="fireEvent">'
 *   -
 *   - You can also pass a dot delimited string to use a method not on this.methods: ie:
 *     - data-gw-eventname="SouthPanel.UIMethods.toggleMinMax"
 * 2. Any additional arguments should be supplied after the method name and a space.
 *   - ie: <div data-gw-click="fireEvent add:class1 class2 class3 target:.class4">.
 *   - if you use an `argName: blah` format, then the client will build a map of argName to argString.
 *   - for the common methods, these are already defined. So addClass expects add: blah, etc.
 *     - for custom methods, it will call your method as myMethod(node, argumentMap, event);
 *   - If you want to pass custom info to a custom method and not use name: blah, just don't use any colons, and the client will execute
 *     your method as myMethod(node, entireArgString, event);
 *
 * Key event handling makes use of "key listener" objects. A key listener contains the description of
 * a key (a keyCode plus boolean modifiers, like alt, shift, ctrl), an optional enableDefault flag and
 * an action to execute. The action is either a simple method name, stored in a field called "methodName",
 * or a "createEventDescription" function that can be called to get a complete event description.
 */
import { GwAction, GwContextNode, GwDomNode, GwMap, GwPartialReloadDetails, GwShortcutOwner, GwTypedMap, GwValueWidgetElement } from "../../types/gwTypes";
import { GwOrderDependentInitializableSystem } from "../util/GwOrderDependentInitializableSystem";
import { GwFunctionWithContext } from "../util/GwFunctionWithContext";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwEvents extends GwOrderDependentInitializableSystem {
    readonly BREAK_AUTOCOMPLETE_VALUE: string;
    /**
     * Each time an event fires on a form input node, we walk up the DOM tree looking for someone who "owns the event".
     * Like, data-gw-focus, etc. But for input events and key events, just to be safe, we don't want to walk up the entire tree
     * everytime someone types a character or rapidly tabs through the page. So we limit it here to a reasonable number.
     * This number could probably be more like 5, but 20 is safe. We only break it out here, in case for some reason,
     * we find a very complicated widget we didn't think about, or if we refactor widgets in the future to be far more
     * deeply nested.
     *
     * @type {number}
     */
    readonly LIMITED_PARENT_SEARCH_STEPS_FOR_RAPID_FIRE_EVENTS: number;
    private eventLockCount;
    /**
     * private member used by getter pasteCausedCurrentInputEvent
     * @type {boolean}
     * @private
     */
    private _pasteCausedCurrentInputEvent;
    /**
     * Is set to true on a paste event, and set to false at the end of onGlobalInputEvent
     * @returns {boolean}
     */
    readonly pasteCausedCurrentInputEvent: boolean;
    /**
     * private member used by getter pasteEventRawClipboardText
     * @type {null}
     * @private
     */
    private _pasteEventRawClipboardText;
    /**
     * Set to the text based contents of the clipboard on a paste event, and set to null at the end of onGlobalInputEvent
     * @returns {string | null}
     */
    readonly pasteEventRawClipboardText: string | null;
    private readonly mouseDown;
    private queuedInternalClick;
    /**
     * @public constant
     * @type {string}
     */
    readonly dataPrefix: string;
    /**
     * @private
     * Contains the custom transformations used to add complex additional attributes for particular data-gw-* attributes.
     * These transforms are processed after the base transforms, to ensure there's no extra attributes added by chaining.
     * ie: if a node has gw-data-hover-submenu on it, then it will end up with 4 additional attributes handling mouseenter and mouseleave.
     */
    readonly complexAttributeTransforms: GwMap;
    /**
     * @private
     * The default suffix for any fireEvent action. This can be overridden inline for the default events methods by passing a suffix
     * argument, ie "fireEvent suffix:_other" or fireEvent suffix:null to not use a suffix. Mainly used for dev actions like PCF_RELOAD
     * @type {string}
     */
    readonly actionSuffix: string;
    /**
     * @private
     * Use the disableEvents and enableEvents functions
     */
    private eventsEnabled;
    /**
     * @private
     * Used to convert the actual DOM event name from key to value, when we process static
     * This is primarily so that we never need to change how events are declared on the server, regardless of how we
     * decide to listen for events on the client. ie, we changed from onkeypress to onkeydown, but the server just sets
     * data-gw-key.
     *
     */
    readonly eventsMap: GwMap;
    /**
     * Events types listed here, by our "internal event names" meaning, "key" not "onkeydown".
     * Will fire event.preventDefault if the events system finds a target that can handle the event.
     * Unless the eventDescription it finds specifically sets enableDefault: true.
     * @type {{key: boolean, copy: boolean, dragover: boolean, drop: boolean}}
     */
    private readonly disableDefaultBehaviorIfHandled;
    private lastActiveKeydownKey;
    DOUBLE_CLICK_MAX_DELAY_MS: number;
    CLICK_MAX_TIME_BETWEEN_UP_AND_DOWN_MS: number;
    DRAG_DISTANCE_TO_START_IN_PX: number;
    MOVE_DISTANCE_TO_CANCEL_LONG_PRESS_IN_PX: number;
    LONG_PRESS_TIME_MS: number;
    getSystemName(): string;
    forceGlobalChangeEvent(targetEl: GwDomNode, optRelatedTargetEl?: GwDomNode): void;
    forceGlobalClickEvent(targetEl: GwDomNode): void;
    /**
     * @private
     * Called on a dom node and an attribute object, to transform any matching data-gw-'event' attributes
     */
    private addAdditionalAttributeTransforms(el, attributes);
    /**
     * Catch all method to do anything when the escape key is pressed. Focus node can be checked to do specific things.
     */
    escapeKeyPressed(): void;
    closeAllTemporaryUIElements(): void;
    forceFocus(targetId: string): void;
    possiblyAddOnBeforeUnloadHandler(): void;
    /**
     * Clears any currently registered onBeforeUnload handler
     */
    clearBeforeUnload(): void;
    /**
     * Checks whether an onBeforeUnload handler has been registered.
     */
    isBeforeUnloadRegistered(): boolean;
    /**
     * @public
     * should be called on any page reload.
     */
    orderSpecificInit(isFullReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    onBeforeUnload(): string;
    private getEnabledEventMethodOwnerOrBarrierEl(el, eventName);
    private shiftKeyEnabledOnLastPointerUp;
    private pointerDownInfo;
    private possibleFirstClickOfDoubleClick;
    private longPressTimeoutInfo;
    private scrollingSincePointerDown;
    private cancelLongpressTimer();
    private startLongpressTimer(info);
    getShiftkeyPressedDuringLastMouseUp(): boolean;
    /**
     * Pointer Lifecycle:
     * 1. Pointer down
     * 2. Blur
     * 3. Focus
     * 4. Pointer up
     * 5. Input (in some scenarios)
     * 6. Change (in some scenarios)
     *
     * @param {PointerEvent} event
     */
    onGlobalPointerdownEvent(event: PointerEvent): void;
    onGlobalPointerupEvent(event: PointerEvent): void;
    onGlobalPointermoveEvent(event: PointerEvent): void;
    onGlobalPointeroverEvent(event: PointerEvent): void;
    onGlobalPointeroutEvent(event: PointerEvent): void;
    onGlobalPointercancelEvent(event: PointerEvent): void;
    /**
     * Uses the longPressTimeoutInfo to create a forced event with "longpress"
     * Passes the info.originalTarget as the relatedTarget to the GwForcedEvent
     */
    private fireLongPress();
    private internalClick(clickableElement, event);
    private internalDoubleClick(dblClickableEl, event);
    possiblyFireQueuedClick(): void;
    onGlobalCopyEvent(event: ClipboardEvent): void;
    onGlobalPasteEvent(event: ClipboardEvent): void;
    onGlobalCutEvent(event: ClipboardEvent): void;
    onGlobalMessageEvent(event: MessageEvent): void;
    /**
     * Input event fires every time the value of an input changes
     * @param event
     */
    onGlobalInputEvent(event: Event): void;
    /**
     *
     * Currently we handle the following cases:
     * 1) for <select>, when the selection is changed
     * 2) textarea, input:password, input:search: input:text; during onblur if the value's been changed
     *
     * TODO: input:file, input:range slightly different?
     *       input:checkbox and input:radio may be handled differently in IE?
     *
     * The complicated part is we need to know if the element that caused the blur, (clicked or tabbed to),
     * is actually a child of the widget holding the input, meaning, the user has clicked something like the
     * autocomplete widget. In that case, we don't want to fire the onChange method.
     *
     * The only way for us to know that, is to wait for the blur event, and then run all the logic there.
     *
     * So, here, we set a flag to tell the following on blur event to run all the on change logic.
     * Unless this event is the result of a call to forceGlobalChangeEvent, in which case we process the event normally.
     * @type {boolean}
     */
    onGlobalChangeEvent(event: Event): void;
    /**
     * IE11 fires extra input event when focus enters or leaves an empty input with a placeholder. The
     * extra event on entry is fairly harmless but the one on leave can cause the autocomplete dropdown
     * to appear on the wrong input when tabbing between two autocomplete inputs. So watch for this
     * particular case and ignore it. For more details see:
     *
     * https://connect.microsoft.com/IE/feedback/details/810538/ie-11-fires-input-event-on-focus
     * http://jsfiddle.net/H8XTX/11/
     *
     * @param node the event target
     * @param e the event
     * @returns {boolean}
     */
    private isBogusIE11InputEvent(e);
    private handleDeferredChangeEventTimer;
    private clearHandleDeferredChangeEventTimer();
    /**
     * @private
     * Sets gwNavigation.lastFocused
     * Then processes the blur event
     * Then if processChangeEventInBlurEvent, process a change event
     *
     * Note, in the pointer system we use we get:
     * 1. pointer down
     * 2. focus out (this may not fire a focus in ever, if there is no focusable element)
     * 3. pointer up
     *
     * @param event
     */
    onGlobalFocusoutEvent(event: FocusEvent): void;
    /**
     * @private
     * Stores the currentFocus and lastFocus globals. Then fires abstractOnEvent, passing the newly set currentFocus as the node.
     * @param event
     */
    onGlobalFocusinEvent(event: FocusEvent): void;
    private handleDeferredChangeEvent(targetNode, allowNullTarget?);
    /**
     * Checks if target node is part of the given value widget and is not one of its children
     * (i.e. a nested menu item)
     */
    private isPartOfValueWidget(valueWidget, targetNode);
    /**
     * Fires when a user drag & drops a file on a dropzone target.
     */
    onGlobalDropEvent(event: DragEvent): void;
    /**
     * Fires when a user drag a file over a dropzone target
     */
    onGlobalDragoverEvent(event: DragEvent): void;
    onGlobalDragenterEvent(event: DragEvent): void;
    onGlobalDragleaveEvent(event: DragEvent): void;
    onGlobalDragendEvent(event: DragEvent): void;
    private abstractGlobalDragDropEvent(event, type);
    /**
     * NOTE: This is being called on every scroll event; do not put anything expensive in this method
     * NOTE: We only listen to targets that are divs.
     * @param event
     */
    onGlobalScrollEvent(event: Event): void;
    /**
     * @public
     * The event listener method placed on any elements with data-gw-"event" attributes requiring the node to listen for the event.
     * @parem node: passed to the function via inline 'this'.
     * @param event
     */
    onElementEvent(event: Event, node: GwDomNode): void;
    /**
     * @private
     * Global callback for any key event.
     * @param event
     */
    onGlobalKeyEvent(event: KeyboardEvent): void;
    /**
     * @private
     * This should not need to be referenced outside of this file. This is the catch all listener function for all static
     * @param node: a DOM element
     * @param e: the event object
     * @param forceAllowEvent: boolean - set to true will bypass the aria-disabled and eventsEnabled checks. Used to allow things like
     * mouseleave to let hover menus close even during a server roundtrip.
     */
    private abstractOnEvent(node, e, forceAllowEvent?);
    clearQueuedInternalClick(): void;
    findEnclosingValueWidgetOrThrow(el: GwDomNode): GwValueWidgetElement;
    setPendingChangesOnValueWidget(el: GwValueWidgetElement): void;
    private isImmediateChangeNodeType(node);
    /**
     * @private
     * Given a string describing a method return the corresponding function
     * @param methodName
     * @returns {*}
     */
    findSystemAndMethod(methodName: string): GwFunctionWithContext | null;
    /**
     * @private
     * If the node running this event includes a prompt, show the prompt and the optional
     * default value, and set the eventParam input to match the submitted value before continuing.
     * @return boolean false if the action was canceled, stopping the event
     */
    private checkForAndShowPrompt(eventDescription);
    /**
     * @private
     * Fires after any mouse click event. Closes all open submenus and datepickers
     * if the click comes from outside of the submenu or the datepicker.
     * @param target - DOM element
     */
    private doAfterAnyClick(clickedEl);
    /**
     * @private
     * Checks the current focus and returns associated shortcut owner.  If the current focus is not set, use
     * the focus context area to try to determine the shortcut owner.
     *
     * The shortcut owner is used to determine which panels and in what order the panels are checked when
     * resolving shortcuts.
     *
     * @returns GwShortcutOwner which owner to use when resolving shortcuts
     */
    getCurrentShortcutOwner(): GwShortcutOwner;
    /**
    * Returns true if south panel is visible and not-collapsed
    * @returns {boolean}
    */
    isSouthPanelOpen(): boolean;
    /**
     * @private
     * Checks to see if the gw-internalTools-flag info div is set to true, signalling that
     * internal tools are enabled
     * @returns true if internal tools are enabled, false if not.
     */
    internalToolsEnabled(): boolean;
    /**
     * Called by addInlineEventListenersToContainer,
     * allows systems to add processing to check every node in the dom, since we're already walking them for addInlineEventListeners
     * @param node
     */
    private doCustomSystemWorkOnEveryNodeOnPageLoad(node);
    addInlineEventListenersToContainer(contextNode: GwContextNode): void;
    /**
     * @public
     * Currently called on full or partial page reload. TODO: this could get optimized to only run on the diff nodes.
     * Iterates over every element in the dom looking for data-gw-"event" attributes, and adds the corresponding inline event listeners
     * //TODO: eventually, this could become the "walkAllDomNodesOnPageLoad" generic method.
     */
    addInlineEventListenersToDom(contextNode?: GwContextNode): void;
    processNodeForInlineEvents(node: GwDomNode): void;
    addInlineEventListenersToThisSpecificNode(el: GwDomNode): void;
    addAdditionalAttributes(node: GwDomNode): void;
    private isEventEnabledOnNode(node, eventType, e);
    /**
     * @public
     * Enable events globally. This includes mouse, keyboard, blur, focus.  Calling enableEvents will decrement the
     * current lock count by 1 and will only enable events if the underlying lock count is <= 0.
     *
     * Lock count is incremented every time {@method disabledEvents} is called.
     *
     */
    enableEvents(): void;
    onEventsEnabled(): void;
    onEventsDisabled(): void;
    /**
     * @public
     * Disable events globally. This includes mouse, keyboard, blur, focus.  Each call to this method will increment
     * an underlying lock counter.
     */
    disableEvents(): void;
    /**
     * Indicates whether events are currently enabled.
     * @returns {boolean}
     */
    areEventsEnabled(): boolean;
    handleOnChangeMethod(onChangeMethod: string, node: GwDomNode, args: GwMap): void;
    private tempActiveId;
    private createPointerEvent(type, original);
    private createMouseEvent(type, original);
    /**
     * @private
     * These methods should only be called as a result of a lookup inside of gw.event.onElementEvent
     * @type {{fireEvent: this.methods.fireEvent, addClass: this.methods.addClass, removeClass: this.methods.removeClass, addAndRemoveClass: this.methods.addAndRemoveClass, toggleClass: this.methods.toggleClass, openSubMenu: this.methods.openSubMenu, closeSubMenu: this.methods.closeSubMenu, toggleSubMenu: this.methods.toggleSubMenu, resetValue: this.methods.resetValue, page: this.methods.page}}
     */
    methods: GwTypedMap<GwAction>;
}
export declare const gwEvents: GwEvents;
