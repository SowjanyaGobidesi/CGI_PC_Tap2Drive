import { GwInitializableSystem } from "../core/util/GwInitializableSystem";
import { GwDomNode, GwEventType, GwMap, GwPartialReloadDetails } from "../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * A PanelRefWidget is a PCF element that can reference another panel.
 * It's only purpose on the client is to be a collapsible container.
 *
 * It wraps all of its children in a gw-panelRefWidget--children div
 * and has a gw-panelRefWidget--titleArea div that will contain a TitleBar widget if it was present in the pcf
 *
 * The collapsed state of the container is persisted in local storage by ID.
 * However, if the container has a data-gw-custom-collapse attribute, then its state is persisted via that string
 *
 * Also, if the container has a data-gw-accordion-group attribute, then when its toggled open, all other
 * containers with the same data-gw-accordion-group value will be closed.
 */
export declare class GwPanelRef extends GwInitializableSystem {
    init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    getSystemName(): string;
    expandAllParents(el: GwDomNode): void;
    toggleCollapsed(el: GwDomNode, args: GwMap, event: GwEventType): void;
    private restoreCollapsedPanelStates();
    private getCollapsedKey(container);
    private restoreCollapsedState(container);
    private forceCollapsedAndStoreState(container);
    private forceExpandedAndStoreState(container);
    private toggleCollapsedAndStoreState(container);
    private getOuterCollapsibleContainerOrThrow(el);
    private updateErrorStatesOnContainer(container, isCollapsed);
}
export declare const gwPanelRef: GwPanelRef;
