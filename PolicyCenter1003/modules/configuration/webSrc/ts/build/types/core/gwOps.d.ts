import { GwMap } from "../types/gwTypes";
import { GwOrderDependentInitializableSystem } from "./util/GwOrderDependentInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare enum GwClientCommand {
    REDIRECT = "REDIRECT",
    POPUP = "POPUP",
    REGISTER_DROPZONES = "REGISTER_DROPZONES",
    DEFERRED_DOWNLOAD = "DEFERRED_DOWNLOAD",
    FOCUS = "FOCUS",
}
export declare class GwOps extends GwOrderDependentInitializableSystem {
    getSystemName(): string;
    orderSpecificInit(): void;
    processClientOps(): void;
    handleCommand(command: GwClientCommand, args: GwMap): void;
    redirect(method: string, url: string, parameters: GwMap, isMultiClusterNav: string, isLogout: boolean): void;
    popup(url?: string, target?: string, features?: string): void;
}
export declare const gwOps: GwOps;
