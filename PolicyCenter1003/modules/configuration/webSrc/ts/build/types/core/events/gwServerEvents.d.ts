import { GwMap } from "../../types/gwTypes";
import { GwOrderDependentInitializableSystem } from "../util/GwOrderDependentInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare enum GwServerEventEnum {
    STARTED_EDITING = "STARTED_EDITING",
    CANCELED_EDITING = "CANCELED_EDITING",
    COMMITTED = "COMMITTED",
    FAILED_COMMITTING = "FAILED_COMMITTING",
}
export declare class GwServerEvents extends GwOrderDependentInitializableSystem {
    getSystemName(): string;
    orderSpecificInit(): void;
    processServerEvents(): void;
    handleEvent(event: GwServerEventEnum, args: GwMap): void;
    onStartEditing(args: GwMap): void;
}
export declare const gwServerEvents: GwServerEvents;
