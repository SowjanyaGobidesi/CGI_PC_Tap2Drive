import { GwOrderDependentInitializableSystem } from "./util/GwOrderDependentInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwStorage extends GwOrderDependentInitializableSystem {
    getSystemName(): string;
    private _sessionId;
    private _retryCount;
    /**
     * Holds a parsed cache object of the entire session storage, to prevent multiple gets from having to JSON.parse each time.
     * Is invalidated on full page reload and localstorage clear.
     */
    private _sessionStorageCache;
    /**
     * Called after every full and partial page reload
     */
    orderSpecificInit(fullPageReload: boolean): void;
    /**
     * @public
     * Sets a key value pair in local storage at a dotDelimted path. k<String>, v<*>
     *     Calls setStorageForSession
     * @param dotPath: dot delimted path.
     * @param value: any valid JSON stringify-able value
     */
    set(dotPath: string, value: any): void;
    /**
     * @public
     * get a value at key in local storage. k<String>, v<String> but the set and get are modified to allow
     * booleans to be set and get as actual booleans, for ease of use.
     * @param dotPath: String, unique
     * @return {*}: if value is "true" or "false" will convert to boolean. if "null" will convert to null;
     */
    get(dotPath: string): any;
    toggleFlag(dotPath: string, optDefault?: boolean): boolean;
    /**
     * Helper method to remove a value. Just calls .set with null
     * @param dotPath
     */
    remove(dotPath: string): void;
    /**
     * @public
     * Deletes local storage for the current session.
     */
    clearStorage(): void;
    /**
     * @debug
     */
    debug_MaxOutStorage(doNotReset?: boolean): void;
    private updateSessionId();
    /**
     * @private
     * Takes a dot delimited path or pathArray and returns the value at the path on the given object.
     * If any path chunks are undefined, then it creates the object and adds it to the provided storage object
     * @param path
     * @param sessionStorageObject
     * @returns {*}
     */
    private getValueAtDotPath(path, sessionStorageObject, returnFirstUndefined?);
    /**
     * @private
     * @param path
     * @returns {{key: String, pathArray: String[]}}
     */
    private getKeyAndPathArray(path);
    /**
     * @private
     * Returns the session storage cache if it exists, or if not, goes and gets it. If still
     * undefined, then creates a new object and returns it.
     * @returns {*}
     */
    private getStorageForSession();
    /**
     * @private
     * Takes an object, stores it in the sessionStorageCache, and sets the object at the session
     * key in local storage, after stringifying it. If the set operation throws an error, then it
     * begins a retry loop of catching error, freeing up storage, setting value again.
     * @param obj
     */
    private setStorageForSession(obj, errorStatePath?, errorStateValue?);
    /**
     * @private
     * This is triggered on attempting to set storage and localStorage throws a full error of error
     * code 22. This method takes the loopCount and increments it, then tries various options to
     * free up local storage space. Based on the value of the loopCount:
     * 1. Deletes other local session storage.
     * 2. Deletes all dirty data storage.
     * 3. Deletes all local storage.
     * 4. Throws its hands up.
     * @param errLoopCount
     * @param e
     */
    private storageIsFull(e);
    /**
     * @private
     * @returns {*}
     */
    private getStoragePathForSession();
}
export declare const gwStorage: GwStorage;
