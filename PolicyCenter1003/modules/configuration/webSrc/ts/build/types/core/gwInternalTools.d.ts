import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwInternalTools extends GwRegisteredSystem {
    getSystemName(): string;
    showPcfStructure(): void;
    showFullPcfStructure(): void;
    reloadPCF(): void;
    goToInternalTools(): void;
    goToProfiler(): void;
    editCurrentPageInStudio(): void;
}
export declare const gwInternalTools: GwInternalTools;
