import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwDisplayKey extends GwRegisteredSystem {
    getSystemName(): string;
    get(key: string, ...varArgs: any[]): string;
}
export declare const gwDisplayKey: GwDisplayKey;
