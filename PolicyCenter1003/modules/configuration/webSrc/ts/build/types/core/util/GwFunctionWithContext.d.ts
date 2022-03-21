export declare class GwFunctionWithContext {
    readonly context: object;
    readonly func: Function;
    constructor(context: object, func: Function);
    execute(...args: any[]): any;
}
