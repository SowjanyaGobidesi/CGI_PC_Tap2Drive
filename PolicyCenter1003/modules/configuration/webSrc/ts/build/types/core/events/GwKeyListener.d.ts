import { GwDomNode, GwMap } from "../../types/gwTypes";
import { GwEventDescription } from "./GwEventDescription";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwKeyListener {
    keyCode: string;
    internalTool: boolean;
    meta: boolean;
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    enableDefault: boolean;
    methodName: string | undefined;
    reactors: string[] | undefined;
    createEventDescription: undefined | "reactors" | "server";
    eventType: string;
    eventDescriptionArgs: GwMap | undefined;
    shortcutKey: string | undefined;
    shortcutOpType: undefined | "fireevent" | "openmenu" | "setfocus";
    serverEventId: string | undefined;
    constructor(keyCode: string);
    static copy(source: GwKeyListener): GwKeyListener;
    handlesSameEvent(that: GwKeyListener): boolean;
    withServerEventId(id: string): this;
    withShortcutOpType(shortcutOpType: "fireevent" | "openmenu" | "setfocus"): this;
    withShortcutKey(key: string): this;
    withMeta(): this;
    withAlt(): this;
    withInternalTool(): this;
    withCtrl(): this;
    withShift(): this;
    withEnableDefault(): this;
    withMethodName(name: string): this;
    withReactors(...args: string[]): this;
    useCreateEventDescription(functionType: "reactors" | "server"): this;
    /**
     * This map will me merged onto event descriptions created from this key listener
     * This effectively allows the the "info" args to be provided that normally would trail the "object.method" string
     * @param {GwMap} args
     * @returns {this}
     */
    withEventDescriptionArgs(args: GwMap): this;
    /**
     * Function used by "reactor" key listeners, which map key presses to specific events (such as click)
     * on the target node. If the target node contains a data attribute containing an appropriate event
     * description then returns the parsed description, otherwise returns null.
     */
    applyReactorsForKeyEvent(el: GwDomNode): GwEventDescription | null;
    serverShortcut(): GwEventDescription | null;
}
