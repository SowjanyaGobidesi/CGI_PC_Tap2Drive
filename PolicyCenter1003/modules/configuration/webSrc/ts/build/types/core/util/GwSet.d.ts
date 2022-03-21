import { GwIterationCallback, GwTypedMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwSet {
    private _map;
    private _count;
    constructor(values?: string[]);
    static create(...values: string[]): GwSet;
    static createFromArray(values: string[]): GwSet;
    add(...values: string[]): GwSet;
    add(values: string[]): GwSet;
    add(set: GwSet): GwSet;
    private _add(value);
    remove(...values: string[]): GwSet;
    remove(values: string[]): GwSet;
    remove(set: GwSet): GwSet;
    private _remove(value);
    has(...values: string[]): boolean;
    has(values: string[]): boolean;
    has(set: GwSet): boolean;
    hasAny(...values: string[]): boolean;
    hasAny(values: string[]): boolean;
    hasAny(set: GwSet): boolean;
    private _has(value);
    hasOwnProperty(): never;
    clear(): GwTypedMap<boolean>;
    copy(): GwSet;
    count(): number;
    size(): number;
    equals(setB: GwSet): boolean;
    forEach(cb: GwIterationCallback): string[];
    toArray(): string[];
}
