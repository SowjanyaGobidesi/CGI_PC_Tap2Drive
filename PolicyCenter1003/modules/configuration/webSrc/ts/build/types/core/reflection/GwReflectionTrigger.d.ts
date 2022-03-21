import { GwDomNode } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwReflectionTrigger {
    readonly listeners: Function[];
    readonly id: string;
    readonly widget: GwDomNode;
    constructor(triggerNode: GwDomNode);
    getValue(): any;
    /**
     * Returns true, if this triggered has already triggered
     */
    hasTriggered(): boolean;
    /**
     * Dispatch trigger change event.
     * @param isDirectChange indicates that this change is direct event from the input. false, by default
     */
    dispatchChangeEvent(isDirectChange?: boolean): void;
    addChangeListener(listener: Function): void;
    /**
     * For internal use. All direct changes need to trigger events with use of this function.
     * @private
     */
    internalDispatchChangeEvent(): void;
}
