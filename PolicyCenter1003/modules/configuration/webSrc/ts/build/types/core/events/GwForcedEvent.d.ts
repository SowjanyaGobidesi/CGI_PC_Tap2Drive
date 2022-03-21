export declare class GwForcedEvent implements Event {
    static isGwForcedEvent(obj: Event | GwForcedEvent): obj is GwForcedEvent;
    readonly target: HTMLElement;
    readonly currentTarget: HTMLElement;
    readonly type: string;
    readonly relatedTarget: HTMLElement;
    readonly bubbles: boolean;
    readonly isForcedEvent: boolean;
    readonly cancelable: boolean;
    readonly defaultPrevented: boolean;
    readonly isTrusted: boolean;
    readonly returnValue: any;
    readonly srcElement: HTMLElement | null;
    readonly timeStamp: number;
    readonly scoped: boolean;
    readonly initEvent: any;
    cancelBubble: boolean;
    eventPhase: number;
    button: number;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
    CAPTURING_PHASE: number;
    constructor(target: HTMLElement, type: string, relatedTarget?: HTMLElement, currentTarget?: HTMLElement);
    stopPropagation(): void;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    deepPath(): EventTarget[];
}
