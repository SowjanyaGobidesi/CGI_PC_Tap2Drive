import { GwDomNode, GwMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwReflector {
    readonly id: string;
    readonly widget: GwDomNode;
    private readonly _reflectDirectChangesOnly;
    /**
     * Wrap reflector node into a Reflector class
     */
    constructor(widgetEl: GwDomNode, reflectionInfo: GwMap);
    /**
     * Returns true, if this reflector is allowed to reflect values. May return false, in case if it is a trigger
     * itself and already has been changed by a user (cycle loops) or if in the configuration, this reflector is marked
     * as a reflector which reflects only direct changes, and this change is not direct
     */
    shouldReflect(isDirectChange?: boolean): boolean;
    reflectValue(value: any): void;
    reflectOptions(options: any[]): void;
    reflectMask(mask: string): void;
    reflectAvailable(available: boolean): void;
    setEnabled(enabled?: boolean): void;
}
