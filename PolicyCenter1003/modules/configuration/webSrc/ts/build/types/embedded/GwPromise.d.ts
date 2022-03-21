export declare type GwResolve = (value: any) => void;
export declare type GwReject = (reason: any) => never;
export declare type GwCallbackOnFulfilled = (value: any) => void;
export declare type GwCallbackOnRejected = (reason: any) => void;
export declare type GWPromiseExecutor = (resolve: GwResolve, reject: GwReject) => void;
export declare const enum GwPromiseState {
    /** Promise not yet resolved */
    PENDING = 0,
    /** Promise resolved successfully */
    FULFILLED = 1,
    /** Promise rejected */
    REJECTED = 2,
    /** Promise rejected, but the error was handled so it won't propagate to chained promises */
    REJECTED_BUT_HANDLED = 3,
}
export interface GwSubscriberPackage {
    subscriber: GwPromise;
    isFinally: boolean;
    onFulfill: GwCallbackOnFulfilled | undefined;
    onReject: GwCallbackOnRejected | undefined;
}
export interface IGwThenable {
    then(onFulfill: GwCallbackOnFulfilled, onReject?: GwCallbackOnRejected): IGwThenable;
}
/**
 * This file polyfills Promise on the window, if window.Promise is not of type 'function'
 * It's a stand alone file, without any imports, so can also be easily handed off to the embedded application if needed
 */
export declare class GwPromise implements IGwThenable {
    private readonly subscriberPackages;
    private result;
    constructor(executor: GWPromiseExecutor | null);
    /**
     * From MDN: The static Promise.reject function returns a Promise that is rejected.
     * For debugging purposes and selective error catching, it is useful to make reason an instanceof Error
     * @param reason
     * @returns {GwPromise}
     */
    static reject(reason: any): GwPromise;
    /**
     * From MDN: The Promise.resolve(value) method returns a Promise object that is resolved with the given value.
     * If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method),
     * the returned promise will "follow" that thenable, adopting its eventual state;
     * otherwise the returned promise will be fulfilled with the value.
     *
     * @param value
     * @returns {GwPromise}
     */
    static resolve(thenableOrValue: any): GwPromise;
    /**
     * From MDN: The Promise.all(iterable) method returns a single Promise that resolves when all of the promises in the iterable argument have resolved
     * or when the iterable argument contains no promises.
     * It rejects with the reason of the first promise that rejects.
     *
     * Returns
     * - An already resolved Promise if the iterable passed is empty or contains no promises.
     * - A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously (as soon as the stack is empty)
     *   when all the promises in the given iterable have resolved,
     *   or if any of the promises reject.
     *
     * Returned values will be in order of the Promises passed, regardless of completion order.
     */
    static all(promises: GwPromise[]): GwPromise;
    /**
     * From MDN: The Promise.race(iterable) method returns a promise
     * that resolves or rejects as soon as one of the promises in the iterable resolves or rejects,
     * with the value or reason from that promise.
     *
     * If the iterable passed is empty, the promise returned will be forever pending.
     *
     * If the iterable contains one or more non-promise value and/or an already resolved/rejected promise,
     * then Promise.race will resolve to the first of these values found in the iterable.
     *
     * @param {GwPromise[]} promises
     * @returns {GwPromise}
     */
    static race(promises: (GwPromise | IGwThenable | any)[]): GwPromise;
    /**
     * From MDN: Return A Promise in the pending state.
     * The handler function (onFulfilled or onRejected) then gets called asynchronously (as soon as the stack is empty).
     * After the invocation of the handler function, if the handler function:
     *
     * - returns a value, the promise returned by then gets resolved with the returned value as its value;
     * - throws an error, the promise returned by then gets rejected with the thrown error as its value;
     * - returns an already resolved promise, the promise returned by then gets resolved with that promise's value as its value;
     * - returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value.
     * - returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler.
     *   Also, the value of the promise returned by then will be the same as the value of the promise returned by the handler.
     *
     * @param {GwCallbackOnFulfilled | undefined} onFulfill
     * @param {GwCallbackOnRejected} onReject
     * @returns {GwPromise}
     */
    then(onFulfill: GwCallbackOnFulfilled | undefined, onReject?: GwCallbackOnRejected): GwPromise;
    /**
     * From MDN: The catch() method returns a Promise and deals with rejected cases only.
     * It behaves the same as calling Promise.prototype.then(undefined, onRejected)
     * (in fact, calling obj.catch(onRejected) internally calls obj.then(undefined, onRejected)).
     * @param {GwCallbackOnRejected} onError
     * @returns {GwPromise}
     */
    catch(onError: GwCallbackOnRejected): GwPromise;
    /**
     * From MDN: The finally() method can be useful if you want to do some processing or cleanup once the promise is settled, regardless of its outcome.
     * @param {Function} onFinally
     * @returns {GwPromise}
     */
    finally(onFinally: Function): GwPromise;
    private addSubscriber(isFinally, onFulfill, onReject?);
    private notifySubscribers();
    /**
     * The specs require support for non Promise objects that still support calling .then()
     * @param value
     * @returns {value is IGwThenable}
     */
    static isThenable(value: any): value is IGwThenable;
    /**
     * Uses "hidden" private variable to ensure that locking in is a one-way door
     * This is mostly just extra armor to ensure the guts of the promise are functioning correctly.
     */
    private lockIn();
    private isLockedIn();
    /**
     * Uses "hidden" private variable to ensure that setting state can only advance
     * Throws when trying to set state, and the state is already something other than pending
     * This is mostly just extra armor to ensure the guts of the promise are functioning correctly
     * @param {GwPromiseState} state
     */
    state: GwPromiseState;
    /**
     * This method will be called recursively if the value in a thenable.
     * However, this could be called multiple times during a "race". But we only want the first one to proceed.
     * So we tell the promise that it's been "locked in" once this has been called once and we bail on subsequent calls.
     * But if the value is a promise...then it wants to call this recursively...so we give it the "forceToRunEvenIfLocked" option
     *
     * @param thenableOrValue
     * @param {boolean} forceToRunEvenIfLocked
     * @returns {this}
     */
    private beResolved(thenableOrValue, forceToRunEvenIfLocked?);
    private beRejected(reason, forceToRunEvenIfLocked?, rejectionWasHandled?);
    getResult(): any;
    isSettled(): boolean;
    isPending(): boolean;
    isFulfilled(): boolean;
    isRejected(): boolean;
    private static isObjectOrFunction(val);
    private static isFunction(val);
}
