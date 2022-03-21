import { GwDomNode, GwEventType } from "../../types/gwTypes";
import { GwKeyListener } from "./GwKeyListener";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwEventDescription extends GwKeyListener {
    eventTargetNode: GwDomNode | undefined;
    eventType: string;
    unnamedArgs: string;
    replacesClick: boolean;
    id: string;
    suffix: string;
    key: string;
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    constructor(node: GwDomNode);
    static copy(source: GwEventDescription): GwEventDescription;
    /**
     * @private
     * Takes the node and the event, and returns an event description object in the form of:
     * {eventTargetNode: node, methodName: Function, arg1: String, unnamedArgs: String etc }
     *
     * First looks on the node for matching gw-data-eventType attribute to parse. If we're not dealing
     * with a key event then that's it - if we found a matching attribute we're good otherwise we return
     * null.
     *
     * If the event is a key event then even if we have a matching attribute we have to check that it
     * applies to the particular key code in the event. And if the attribute doesn't match (or if we didn't
     * even find an attribute) we still have to check for special "reactor" key events plus server and
     * global keyboard shortcuts. If the current focus node is disabled then we only check for context/server/shortcuts
     * event description.
     *
     * @param node
     * @param e
     * @returns {Object}
     */
    static getEventDescription(node: GwDomNode, e: GwEventType, focusNodeDisabled: boolean): GwEventDescription | null;
    /**
     * @private
     * Creates an initial event description containing the eventTargetNode, id and suffix fields.
     * @param node target of the event
     * @returns {{eventTargetNode: node, id: string, suffix: string}}
     */
    static createBasicEventDescription(node: GwDomNode): GwEventDescription;
    /**
     * @private
     * Takes the node and a string describing an event and returns an event description object containing
     * the target node, the name of the method to be executed plus arguments to the method. Defines the
     * methodName as the first whole word it finds and then parses the remaining string. For example:
     * "fireEvent arg1:foo arg2:bar" would become {methodName: "fireEvent", arg1: "foo", arg2: "bar"}
     * where the colon is used to as the delimiter to determine key and value.
     *
     * If the string following the method name has no colon, then the entire string is returned as a
     * single unnamed argument, for example {unnamedArgs: wholeString}.
     *
     * By default sets the field "suffix" to the global action suffix and the field "id" to be the id of the
     * target node. These can be overridden by explicit arguments in the event string
     *
     * Returns null if the event string is null, undefined or empty
     *
     * @param node the target node of the event
     * @param eventString description of the event
     *
     * @returns {{eventTargetNode: node, id: string, suffix: string, methodName: string}}
     */
    static parseEventDescription(node: GwDomNode, eventString: string | null): GwEventDescription | null;
    /**
     * Given a key listener (or null) plus an initial event description return a completed event description
     * based on the key listener. Returns null if the key listener is null or if the listener cannot create
     * an event description.
     *
     * If the key listener just contains a method name, then the returned description will be the initial
     * description plus the method name and, possibly, enableDefault. If the key listener knows how to create
     * its own event description then that new description is returned.
     *
     * @param keyListener possibly null key listener
     * @param initialEventDescription event description containing at least target node and basic fields
     * @returns {*}
     */
    static descriptionFromKeyListener(keyListener: GwKeyListener | null, initialEventDescription: GwEventDescription): GwEventDescription | null;
}
