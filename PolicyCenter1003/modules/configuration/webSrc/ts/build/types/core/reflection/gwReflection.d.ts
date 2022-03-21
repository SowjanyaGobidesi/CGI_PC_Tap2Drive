import { GwDomNode } from "../../types/gwTypes";
import { GwReflectionTrigger } from "./GwReflectionTrigger";
import { GwRegisteredSystem } from "../util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * Utility responsible for reflection functionality of the application.
 * See <Reflect> and <ReflectCondition> pcf elements
 *
 * There are two notions which are used in this class: trigger and reflector.
 * Both are wrappers around html elements with additional functionality.
 * A trigger provides functions to listen to change html native events and then dispatch events further to reflectors
 * A reflector provides a functionality to reflect values received from triggers to their internal HTML elements.
 */
export declare class GwReflection extends GwRegisteredSystem {
    getSystemName(): string;
    readonly TRIGGER_IDS_PROP: string;
    readonly REFLECTOR_ID_PROP: string;
    readonly DIRECT_CHANGES_ONLY_PROP: string;
    /**
     * Cache of trigger wrappers
     */
    private triggerCache;
    /**
     * This helps prevents cyclic loops of triggers. It can happen when a reflector and a trigger listen to each other.
     */
    private cycleEventsCache;
    private changeListeners;
    clearCache(): void;
    hasTriggered(id: string): boolean;
    setHasTriggered(id: string): void;
    resetCycleEventsCache(): void;
    notifyTriggerChange(id: string): void;
    isReflectionTrigger(node: GwDomNode): boolean;
    /**
     * For each reflector widget, wrap it into a reflector class, find all of its triggers, wrap them into trigger classes,
     * cache them, then add change listeners to those triggers
     */
    initForNode(widgetEl: GwDomNode): void;
    private parseReflectionInfo(stringValue);
    private validateInfo(reflectionInfo);
    private extractTriggerIds(reflectionInfo);
    /**
     * Handles a trigger change. Sends a request to the server to get the reflected value , based on the trigger value.
     */
    private triggerChangeListener(trigger, allTriggers, reflector);
    /**
     * Handles a response from the server with the reflected value.
     */
    private handleReflectionResponse(trigger, allTriggers, reflector, response);
    /**
     * Reflection expressions which start with "javascript:" need to be executed on the client side, the server returns
     * such expression unchanged as a javascript code. These expression may include following symbols: TRIGGER_INDEX,
     * REFLECTOR, VALUE, VALUE1, .... , VALUEn (n - number of triggers). All these symbols need to be initialized in a
     * local context.
     *
     * All of that is done in this function.
     */
    private evalExpression(trigger, allTriggers, reflector, expression);
    private handleReflectionError(trigger, allTriggers, reflector, reason, response);
    /**
     * Returns trigger from the cache
     */
    getTriggerById(id: string): GwReflectionTrigger;
    /**
     * Wrap trigger node into a trigger wrapper class.
     */
    private triggerify(triggerNode);
    private markAsTrigger(triggerNode);
    private wrapWithEventListener(trigger);
}
export declare const gwReflection: GwReflection;
