import { GwMap } from "../types/gwTypes";
import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwPreferences extends GwRegisteredSystem {
    getSystemName(): string;
    private serverPrefs;
    private alteredPrefs;
    private readonly PREF_STATE_DIV_ID;
    private readonly PREF_INPUT_ID_SELECTOR;
    private readonly PREF_DIV_ID;
    /**
     * Stores the given key/value preference under the supplied renderId.
     * These settings are not sent to the server until the next full request.
     */
    storePreference(renderId: string, key: string, value: any, preferenceType: string): void;
    getPreference(renderId: string, key: string): any;
    getPreferences(renderId: string): GwMap;
    forcePersistPreferencesToServer(): void;
    hasPreferencesOfType(prefTypeKey: string): boolean;
    /**
     * Called before a request is sent to the server, adding a hidden input
     * to send the changed preferences to the server, if necessary.
     */
    beforeServerRequest(): void;
    /**
     * Called after a request to the server is complete, flushing the preferences if necessary.
     * The preferences system is initialized before all the other systems as the state of the
     * preferences may affect how they work
     */
    init(): void;
    /**
     * Clears the altered preferences object
     */
    clearPrefs(): void;
    resetPreferencesForId(id: string): void;
}
export declare const gwPreferences: GwPreferences;
