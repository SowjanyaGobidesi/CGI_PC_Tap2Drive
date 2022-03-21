import { GwDomNode, GwEventType, GwKeyboardNavigation, GwMap, GwPartialReloadDetails } from "../../types/gwTypes";
import { GwInitializableSystem } from "../../core/util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * Builds the show/hide and group/ungroup menu items in the special list view column menu. Also contains the code
 * for keyboard navigation within these menu items. The navigation code relies on the structure of the menu items
 * so any change to how the menu items are built will probably require corresponding changes to the navigation code.
 */
export declare class GwListViewColumnMenu extends GwInitializableSystem implements GwKeyboardNavigation {
    private readonly CUSTOM_MENU_ITEM_CLASS;
    private readonly VISIBILITY_TOGGLE_CLASS;
    private readonly GROUPING_TOGGLE_CLASS;
    getSystemName(): string;
    init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    addColumnMenuItems(listview: GwDomNode, headerRow: HTMLTableRowElement, columnsButton: GwDomNode): boolean;
    /**
     * Amends the currently grouped header cell label to the beginning of each of the group row labels.
     * @param groupedTd
     * @param listview
     */
    private modifyGroupRowLabels(groupedTd, listview);
    up(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
    down(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
    left(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
    right(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
    private switchBetweenToggles(toggle, startingToggleClass);
    private focusOnMatchingToggle(menuItem, toggle);
    private otherToggleClass(toggle);
    private toggleClass(toggle);
}
export declare const gwListViewColumnMenu: GwListViewColumnMenu;
