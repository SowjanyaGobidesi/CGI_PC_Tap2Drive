import { GwPartialReloadDetails } from "../../types/gwTypes";
import { GwRegisteredSystem } from "./GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare abstract class GwInitializableSystem extends GwRegisteredSystem {
    private static readonly _initializableSystems;
    constructor();
    protected availableToInitialize(): boolean;
    abstract init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    /**
     * This method registers an object to be notified on every page reload, partial or full; on each reload the "init"
     * method will be called on the given object.
     *
     * Subclasses of GwInitializableSystem are automatically registered: register is called by the GwInitializableSystem
     * constructor.
     *
     * This method should NOT be used for the global systems that are ORDER DEPENDENT. These systems should extend
     * GwOrderDependentInitializableSystem, and be manually placed in order in gwApp.getInitializationOrderSpecificSystems
     * @param {GwInitializableSystem} system
     */
    static register(system: {
        getSystemName(): string;
        init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    }): void;
    static initializeSystems(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
}
