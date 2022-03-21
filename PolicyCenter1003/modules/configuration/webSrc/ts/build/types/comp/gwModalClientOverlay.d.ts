import { GwRegisteredSystem } from "../core/util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwModalClientOverlay extends GwRegisteredSystem {
    getSystemName(): string;
    close(): void;
    closeButtonClicked(): void;
    openWithImage(url: string | null): void;
    openWithElementContainer(el: HTMLElement): void;
    private build(el);
}
export declare const gwModalClientOverlay: GwModalClientOverlay;
