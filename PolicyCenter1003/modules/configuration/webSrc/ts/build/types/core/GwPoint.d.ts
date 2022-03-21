/**
 * Simple class representing a coordinate pair. Has getters for x,y and w,h.
 * Has simple math methods for operating on multiple Vectors.
 * Has dot accessors for get, and none for set. As it's dangerous to send mutable objects around
 * that may be held as references.
 */
export declare class GwPoint {
    static readonly ZERO: GwPoint;
    private readonly _x;
    private readonly _y;
    private readonly _length;
    constructor(x: number, y: number);
    readonly x: number;
    readonly y: number;
    readonly length: number;
    minus(point: GwPoint): GwPoint;
    distanceToPoint(point: GwPoint): number;
    static getElTopLeftVector(el: HTMLElement): GwPoint;
}
