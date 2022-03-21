import { GwMap, GwTypedMap } from "../types/gwTypes";
import { GwOrderDependentInitializableSystem } from "./util/GwOrderDependentInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwConfig extends GwOrderDependentInitializableSystem {
    getSystemName(): string;
    private values;
    orderSpecificInit(isFullPageReload: boolean): void;
    serverTimeoutMillis(): number;
    prefPanelDefaults(): GwTypedMap<string | boolean>;
    jicEraPrefixes(): string[];
    _setPrefPanelDefaults(map: GwMap): void;
    /** Only used for testing */
    _setServerTimeoutSeconds(seconds: number): void;
}
export declare const gwConfig: GwConfig;
