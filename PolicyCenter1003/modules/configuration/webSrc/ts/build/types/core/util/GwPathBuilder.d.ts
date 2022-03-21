/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwPathBuilder {
    private value;
    private lastCommand;
    private lastArgs;
    private mutable;
    static create(x: number, y: number): GwPathBuilder;
    private addSegment(type, args);
    repeatLast(nTimes?: number): this;
    getPath(): string;
    makeImmutable(): void;
    toString(): string;
    private degreesToRads(angleInDegrees);
    private polarToCartesian(centerX, centerY, radius, angleInDegrees);
    moveBy(x: number, y: number): this;
    moveTo(x: number, y: number): this;
    lineBy(x: number, y: number): this;
    lineTo(x: number, y: number): this;
    hLineBy(x: number): this;
    hLineTo(x: number): this;
    vLineBy(y: number): this;
    vLineTo(y: number): this;
    cubicBy(cX1: number, cY1: number, cX2: number, cY2: number, x: number, y: number): this;
    cubicTo(cX1: number, cY1: number, cX2: number, cY2: number, x: number, y: number): this;
    reflectCubicBy(cX1: number, cY1: number, x: number, y: number): this;
    reflectCubicTo(cX1: number, cY1: number, x: number, y: number): this;
    quadBy(cX1: number, cY1: number, x: number, y: number): this;
    quadTo(cX1: number, cY1: number, x: number, y: number): this;
    reflectQuadBy(x: number, y: number): this;
    reflectQuadTo(x: number, y: number): this;
    arcBy(radiusX: number, radiusY: number, xRotate: number, largeArc: 0 | 1, sweep: 0 | 1, x: number, y: number): this;
    arcTo(radiusX: number, radiusY: number, xRotate: number, largeArc: 0 | 1, sweep: 0 | 1, x: number, y: number): this;
    arcAlongCircle(cx: number, cy: number, radius: number, endAngle: number, largeArcFlag?: 0 | 1): this;
    lineToDegreeOnCircle(x: number, y: number, radius: number, degrees: number): this;
    close(): this;
    moveToStart(): this;
}
