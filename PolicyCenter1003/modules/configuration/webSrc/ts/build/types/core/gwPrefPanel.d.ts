/**
 * The PrefPanel handles user preferences that are not set automatically by the user taking action, as in components like listview column hiding.
 * When the user presses the "save" button. If there are any dirty preferences, then it persists them to the preference system, and then
 * forces a refresh to update them on the server.
 *
 * On partial page reloads, checkAndHandleIfTopLevelWidgetIsOutOfDate is called to determine files need to be downloaded
 * and then finishes the page load once the files are done downloading. Currently, this is only for theme files.
 * @type {{}}
 */
import { GwValueWidgetElement } from "../types/gwTypes";
import { GwOrderDependentInitializableSystem } from "./util/GwOrderDependentInitializableSystem";
export declare class GwPrefPanel extends GwOrderDependentInitializableSystem {
    getSystemName(): string;
    /** Id of the preferences panel in the DOM */
    private readonly PREF_PANEL_ID;
    /** Key under which to store the pref panel values in the preferences system */
    private readonly PREFERENCES_KEY;
    /** Ids of any preference inputs whose values don't match the values in the preferences system */
    private readonly _dirtyPrefs;
    /** Was the main form dirty when the preference panel was opened? */
    private _formWasDirtyWhenPanelOpened;
    /** Inputs that correspond to preference values that currently differ from the server defaults */
    private readonly _inputsThatDifferFromDefaults;
    private _underlyingPageFocus;
    /**
     * @param isFullPageRefresh
     */
    orderSpecificInit(isFullPageRefresh: boolean): void;
    /**
     * Updates one-off preferences not handled directly by other systems
     */
    preferencesLoaded(): void;
    /**
     * Helper method so other systems can read data from the preferences system with only an id.
     * Handles all conversion of values, and also uses default values from the config system if
     * no preferences are found.
     * @param id
     * @returns {*}
     */
    getPrefValueByPrefName(prefName: string): string | boolean | null | undefined;
    /**
     * Opens the preferences panel, closes all open menus, and sets the UI state.
     */
    open(): void;
    /**
     * Returns true if the preferences panel has any unsaved data.
     * @returns {boolean}
     */
    isDirty(): boolean;
    /**
     * Called by data-gw-change handler. Compare the new value to the original value of the input to determine if
     * the data is dirty.
     * @param el
     */
    change(el: GwValueWidgetElement): void;
    /**
     * Saves all settings. If there is preference data to save then calls refresh to store the data on the server,
     * otherwise just closes the window. If there is preference data to save but the page already contained unsaved data
     * in the main form then check with the user before doing the server refresh.
     */
    save(): void;
    /**
     * If there is dirty data, then reverts any changes made in the UI to whatever is stored in the preferences system.
     * Closes
     */
    cancel(): void;
    /**
     * Reverts all values to original defaults
     */
    reset(): void;
    private onOpen();
    private setupFocusLock();
    private getPrefNameFromDomIdOrName(domIdOrName);
    private close();
    /**
     * Store the currently focused page element
     * Mark all panels with -1 tabindex, and aria-hidden
     */
    private storeUnderlyingPageFocus();
    /**
     * Remove tabindex -1, and aria-hidden from all panels
     * forceFocus onto _underlyingPageFocus
     */
    private restoreUnderlyingPageFocus();
    private getPrimaryPanels();
    private getAllPrefValueWidgets();
    /**
     * @param true if use alternate icon for the MenuActionsWidget
     */
    private setAlternateActionsIcon(bool);
    private setToolbarPrefs();
    private setTextShadowPref();
    private setDatePrefs();
    private setDebugPrefs();
    private setFontSize(fontSize);
    private setGlobalSpacing(globalSpacingModifier);
    private setGeneralPrefs();
    private findInputsThatDifferFromDefaults();
    private differsFromDefaultValue(valueWidget, input);
    private normalizeBooleanDefaultValue(defaultValue);
    private normalizeStringDefaultValue(defaultValue);
    private getDefaultValue(domIdOrName);
    private enableOrDisableRestoreDefaultsButton();
}
export declare const gwPrefPanel: GwPrefPanel;
