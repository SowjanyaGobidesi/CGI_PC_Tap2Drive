import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
import { GwDomNode } from "../types/gwTypes";
export declare class GwShortcuts extends GwRegisteredSystem {
    getSystemName(): string;
    private registerShortcut(widgetEl, shortcutAttribute);
    registerShortcuts(widgetEl: GwDomNode): void;
}
export declare const gwShortcuts: GwShortcuts;
