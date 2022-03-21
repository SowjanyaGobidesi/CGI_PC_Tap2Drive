(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-import-side-effect */
__export(__webpack_require__(1));
__export(__webpack_require__(2));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * =================================
 * PRIMARY CLASS
 * =================================
 * This entire file is a stand alone implementation of the Gw cross origin window messaging system.
 * It's sole purpose is to be used in a cross origin window environment for embedded applications.
 *
 * This Static Class is the only API, and this file relies on no other imports (apart from some TypeScript
 * type definitions, shared with the internal APIs)
 *
 * If the external application plans to support browsers or environments that don't natively support es6 Promise,
 * then it will need a Promise polyfill. GwPromise.ts is one option, and is a stand alone polyfill.
 */
var GwCrossOriginExternal = /** @class */ (function () {
    function GwCrossOriginExternal() {
        throw new Error("Static class. Use GwCrossOriginExternal.init()");
    }
    //==============================================
    //==== INITIALIZATION
    //==============================================
    /**
     * Required Initializer for the GwCrossOriginExternal API.
     * Adds a 'message' event listener to the global window
     * @param {string} originForGwApp - the origin of the window (running the GW Application) that spawned this window
     * @param {Window} forcedOwnerWindow - primarily used for testing and mocking. Replaces all calls to the global window.
     */
    GwCrossOriginExternal.init = function (originForGwApp, whiteListedDomains, forcedOwnerWindow) {
        this.ownerWindow = forcedOwnerWindow || window.parent;
        this.whiteListedDomains = whiteListedDomains;
        this.originForGwApp = originForGwApp;
        this.initialized = true;
        this.messageEventListener = this.receiveMessageFromGwApp.bind(this);
        window.addEventListener("message", this.messageEventListener, false);
    };
    GwCrossOriginExternal.isInitialized = function () {
        return this.initialized;
    };
    /**
     * Disables the API. Removing any setup done in the init method.
     */
    GwCrossOriginExternal.kill = function () {
        this.initialized = false;
        this.originForGwApp = undefined;
        if (this.messageEventListener) {
            this.ownerWindow.removeEventListener("message", this.messageEventListener, false);
            this.messageEventListener = undefined;
        }
    };
    //==============================================
    //==== RECEIVE MESSAGES FROM GW APP
    //==============================================
    GwCrossOriginExternal.throwIfUntrustedOrigin = function (event) {
        if (this.ownerWindow !== event.source || this.originForGwApp !== event.origin) {
            throw new Error("Received untrusted message from origin: " + event.origin);
        }
        if (event.data.gwNonGwOriginIfAny) {
            if (this.whiteListedDomains !== "*" && !this.whiteListedDomains[event.data.gwNonGwOriginIfAny]) {
                throw new Error("Received message from trusted GW Application origin, but from an originating origin not on the whitelist.");
            }
        }
    };
    /**
     * The Primary Router for All Messages Received from the GW Application
     * It is bound the "message" event listener on the parent window.
     *
     * THERE IS NO REASON TO CALL THIS METHOD DIRECTLY
     * @param {GwMessageEvent} event
     */
    GwCrossOriginExternal.receiveMessageFromGwApp = function (event) {
        if (!this.initialized) {
            return;
        }
        this.throwIfUntrustedOrigin(event);
        var data = event.data;
        switch (data.gwMessageType) {
            case 0 /* VALUES */:
                this.receiveValuesMessage(data);
                break;
            case 1 /* RESPONSE_FROM_NON_BLOCKING_SERVER_REQUEST */:
                this.receiveNonBlockingServerRequestReponseMessage(data);
                break;
            case 2 /* CONFIRMATION_ONLY */:
                this.receiveConfirmationOnlyMessage(data);
                break;
            case 3 /* RECEIVE_CROSS_ORIGIN_EVENT */:
                this.receiveCrossOriginEvent(data);
                break;
            case 4 /* RECEIVE_GW_NOTIFICATION */:
                this.receiveGwNotification(data);
                break;
            default:
                this.receiveNonConformingMessageTypeFromGwApp(event);
        }
    };
    /**
     * Helper. Retrieves GwMessageAwaitingResponseInfo while logging errors along the way
     * @param {GwMessageData} data
     * @returns {GwMessageAwaitingResponseInfo<any> | null}
     */
    GwCrossOriginExternal.getAwaitingInfoForCorrespondingMessageData = function (data) {
        var responseToMessageId = data.gwResponseToMessageId;
        if (!responseToMessageId && responseToMessageId !== 0) {
            console.error("Received values payload with no responseToMessageId identifier: ", data);
            return null;
        }
        var info = this.messagesAwaitingResponse[responseToMessageId];
        if (window.GwTestEnv) {
            return info;
        }
        if (!info) {
            console.error("Received values payload with a responseToMessageId: " + responseToMessageId + ". But could not locate a corresponding Promise. Data: ", data);
            return null;
        }
        return info;
    };
    /**
     * Promise Resolver.
     * Takes a GwMessageData object.
     * Locates locally stored promises relating the the message, and fires fulfil or reject based on message status.
     * @param {GwMessageData} data
     */
    GwCrossOriginExternal.receiveMessage = function (data) {
        var payload = data.gwPayload;
        var status = data.gwStatus;
        var info = this.getAwaitingInfoForCorrespondingMessageData(data);
        if (!info) {
            return;
        }
        var callback = (status === 2 /* FAILED */) ? info.reject : info.fulfill;
        if (callback) {
            callback(payload);
        }
    };
    GwCrossOriginExternal.receiveNonBlockingServerRequestReponseMessage = function (data) {
        this.receiveMessage(data);
    };
    GwCrossOriginExternal.receiveValuesMessage = function (data) {
        this.receiveMessage(data);
    };
    GwCrossOriginExternal.receiveConfirmationOnlyMessage = function (data) {
        this.receiveMessage(data);
    };
    GwCrossOriginExternal.receiveCrossOriginEvent = function (data) {
        var ev = data.gwPayload;
        var events = this.crossOriginEventCallbackByBroadcasterThenEvent[ev.broadcasterWindowId];
        if (!events) {
            console.warn("Received cross origin event from a broadcast window not currently being listened to.");
            return;
        }
        var eventListenerCallback = events[ev.eventName] || events["*"];
        if (!eventListenerCallback) {
            console.warn("Received cross origin event for an event type without a registered callback: " + ev.broadcasterWindowId + ":" + ev.eventName);
        }
        eventListenerCallback(ev);
    };
    GwCrossOriginExternal.receiveGwNotification = function (data) {
        var notification = data.gwPayload;
        var callback = this.gwNotificationListeners[notification.type];
        if (callback) {
            callback(notification);
        }
    };
    GwCrossOriginExternal.receiveNonConformingMessageTypeFromGwApp = function (event) {
        var possibleCustomMethodName = this[event.data.gwMessageType];
        if (typeof possibleCustomMethodName === "function") {
            this[possibleCustomMethodName](event);
            return;
        }
        console.warn("--- Received MessageEvent from GwApp without a gwMessageType that matched a method on GwCrossOriginExternal.\n" +
            "--- This is likely an Error.\n" +
            "--- However, receiveNonConformingMessageTypeFromGwApp can be overridden in GwCrossOriginExternal.\n" +
            "--- This allows custom logic based on any MessageEvent that does not implement GwMessageEvent. But consider MessageType.FIRE_CUSTOM_EVENT instead.");
    };
    //==============================================
    //==== SEND MESSAGES TO GW APP
    //==============================================
    /**
     * Private Primary router for all outgoing messages to the Gw Application.
     * @param {GwMessagesToGW} messageType
     * @param payload
     * @param {number | null} responseToMessageId
     * @returns {Promise<any>}
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.sendMessage = function (messageType, payload, responseToMessageId) {
        if (responseToMessageId === void 0) { responseToMessageId = null; }
        if (!this.ownerWindow) {
            return Promise.reject(new Error("Attempting to send a message to a null GwApp window. Ensure that this window was spawned by a Guidwire Application."));
        }
        var messageId = this.nextMessageId++;
        var data = {
            gwMessageType: messageType,
            gwPayload: payload,
            gwStatus: 3 /* PENDING */,
            gwMessageId: messageId,
            gwResponseToMessageId: responseToMessageId
        };
        var messageAwaitingResponse = {
            messageId: messageId,
            timestamp: window.performance.now()
        };
        this.messagesAwaitingResponse[messageId] = messageAwaitingResponse;
        try {
            var promise = new Promise(function (fulfill, reject) {
                messageAwaitingResponse.fulfill = fulfill;
                messageAwaitingResponse.reject = reject;
            });
            this.ownerWindow.postMessage(data, this.originForGwApp);
            return promise;
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    /**
     * Tells the GW Application to update the DOM Elements (for the widgets whose IDs correspond to the logical name mapping), with new values.
     * NOTE: this does not automatically update server values for the elements. Only the values in the DOM in the GW Application.
     * If the Page is in readonly mode, or the user cancels the changes, the changes will be lost.
     *
     * See: GwCrossOriginExternal.fireActionOnServer, or GwCrossOriginExternal.makeNonBlockingServerRequest for direct
     * communication with the Gw Application Server.
     *
     * The returned promise is only for confirmation that the message was successful
     *
     * @param {GwValueMap} logicalNameToValueMap - 'Logical Names' are exposed as a mapping in EmbeddingWidget API.
     * And correspond to a set of widget IDs in a given instance of the EmbeddingWidget. ie:
     * Logical Name: AddressLine1 => WidgetId-page9-panel8-addresssection7-addressline1.
     * Ligical Name: ZipCode => WidgetId-page9-panel8-addresssection7-zipcode.
     * See the PCF fields for EmbeddingWidget
     * @returns {Promise<GwValueMap>}
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.setValues = function (logicalNameToValueMap) {
        return this.sendMessage(0 /* SET_VALUES */, logicalNameToValueMap);
    };
    /**
     * Returns the values of the corresponding widgets as currently represented in the DOM.
     * Note: this returns the values as currently represented in the DOM. These values COULD be different
     * from the persisted server values for any number of reasons: the user modified them locally, client reflection
     * modified them, etc.
     *
     * The returned promise will contain the values when fulfilled
     * @param {string[]} logicalNames - 'Logical Names' are exposed as a mapping in EmbeddingWidget API.
     * And correspond to a set of widget IDs in a given instance of the EmbeddingWidget. ie:
     * Logical Name: AddressLine1 => WidgetId-page9-panel8-addresssection7-addressline1.
     * Ligical Name: ZipCode => WidgetId-page9-panel8-addresssection7-zipcode.
     * See the PCF fields for EmbeddingWidget
     * @returns {Promise<GwValueMap>}
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.getValues = function (logicalNames) {
        return this.sendMessage(1 /* GET_VALUES */, logicalNames);
    };
    /**
     * Calls the Embedded Widget's server side ACTION HANDLER with the given JSON
     * object as its argument. This will cause a full UI refresh.
     *
     * The returned promise is only for confirmation that the message was successful, not the result of the action on the server
     * @param {string} jsonPayload
     * @returns {Promise<any>}
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.fireActionOnServer = function (payload) {
        return this.sendMessage(2 /* FIRE_ACTION */, payload);
    };
    /**
     * Calls the Embedded Widget's server side UPDATE HANDLER with the given object
     * object as its argument. This will not block or refresh the GW Application UI.
     *
     * NOTE: The Promise returned by this method will contain the payload from this request.
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.makeNonBlockingServerRequest = function (payload) {
        return this.sendMessage(3 /* NON_BLOCKING_SERVER_REQUEST */, payload);
    };
    /**
     * Subscribe to another External Cross Origin window's messages.
     * Imagine that the Gw Application has 2 embedded iframe's. The Blue Window, and the Red Window.
     * Blue window can broadcast a custom cross origin event. Let's say "GO_BANANAS". And include some information: {numberOfBananas: 12}
     * Blue window will send that package to the GwApplication via broadcastCrossOriginEvent.
     * Red window will never hear about this message.
     *
     * But if Red Window calls addCrossOriginEventListener, passing "redWindow" and "GO_BANANAS" then the Gw Application
     * will route the message event to the blue window, and call the provided callback function.
     *
     * Like get/set values this function uses logical names, as given to the embedded widget via
     * the EmbeddedWidgetRef element. Though in this case the logical names refer to another
     * embedded widget rather than to an input.
     *
     * NOTE: to receive messages from any other external windows, they must be explicitly whitelisted via the
     * GwCrossOriginExternal.init method, either by domain, or by specifying a wildcard domain.
     *
     * The returned promise is only for confirmation that the message was successful
     * @param broadcasterWindowName the logical name of the window you want to listen to
     * @param {string} eventName name of the event, or "*" to listen to any event
     * @param {GwEventInfoCallback} callback
     * @returns {Promise<any>}
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.addCrossOriginEventListener = function (broadcasterWindowName, eventName, callback) {
        var currentlyListenedToEvents = this.crossOriginEventCallbackByBroadcasterThenEvent[broadcasterWindowName] = this.crossOriginEventCallbackByBroadcasterThenEvent[broadcasterWindowName] || {};
        if (currentlyListenedToEvents["*"]) {
            return Promise.reject(new Error("There is already an 'all' listener (`*`) for this broadcaster. Remove it before adding any other listeners: " + broadcasterWindowName + ":" + eventName));
        }
        if (currentlyListenedToEvents[eventName]) {
            return Promise.reject(new Error("Cannot register multiple callbacks for the same broadcaster and event: " + broadcasterWindowName + ":" + eventName));
        }
        if (eventName === "*" && Object.keys(currentlyListenedToEvents).length > 0) {
            console.warn("Adding an 'all' listener of '*' to a broadcaster that already has more specific listener. All specific listeners will be removed. In order to avoid this warning, remove known listeners manually before adding.");
            currentlyListenedToEvents = this.crossOriginEventCallbackByBroadcasterThenEvent[broadcasterWindowName] = {};
        }
        currentlyListenedToEvents[eventName] = callback;
        return this.sendMessage(5 /* ADD_CROSS_ORIGIN_EVENT_LISTENER */, { broadcasterWindowName: broadcasterWindowName, eventName: eventName });
    };
    /**
     * Removes the Cross Origin Event Listener from the GW Application window
     * See GwCrossOriginExternal.addCrossOriginEventListener.
     *
     * Like get/set values this function uses logical names, as given to the embedded widget via
     * the EmbeddedWidgetRef element. Though in this case the logical names refer to another
     * embedded widget rather than to an input.
     *
     * The returned promise is only for confirmation that the message was successful
     * @param broadcasterWindowName the logical name of the window you want to stop listening to
     * @param {string} eventName name of the event, or "*" if registerd to listen to any event
     * @returns {Promise<any>}
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.removeCrossOriginEventListener = function (broadcasterWindowName, eventName) {
        var byBroadcaster = this.crossOriginEventCallbackByBroadcasterThenEvent[broadcasterWindowName];
        if (byBroadcaster) {
            if (eventName === "*") {
                delete this.crossOriginEventCallbackByBroadcasterThenEvent[broadcasterWindowName];
            }
            else {
                delete byBroadcaster[eventName];
            }
        }
        return this.sendMessage(6 /* REMOVE_CROSS_ORIGIN_EVENT_LISTENER */, { broadcasterWindowName: broadcasterWindowName, eventName: eventName });
    };
    /**
     * Broadcasts a Cross Origin Event (Message) to the GW Application client. The GW Application then routes the message event
     * and information package on to any other embedded windows in the application that are listening to the origin and event name.
     * See GwCrossOriginExternal.addCrossOriginEventListener.
     *
     * @param {string} eventName
     * @returns {Promise<any>}
     */
    // tslint:disable-next-line:promise-function-async
    GwCrossOriginExternal.broadcastCrossOriginEvent = function (eventName, info) {
        if (eventName.length === 0 || eventName === "*") {
            return Promise.reject(new Error("Illegal eventName passed to fireCrossOriginEvent. Cannot be empty or the single `*` character: " + eventName));
        }
        return this.sendMessage(4 /* BROADCAST_CROSS_ORIGIN_EVENT */, { eventName: eventName, info: info });
    };
    /**
     * The Gw Application sends 'events' for some predefined client related notifications, such as the Theme Changing, or the Locale changing.
     * There is also a GENERAL category that exists mainly for future proofing. Additional events may be configured in the future.
     * @param {GwNotificationType} notificationType
     * @param {GwNotificationCallback} callback
     */
    GwCrossOriginExternal.addCallbackForGwNotificationType = function (notificationType, callback) {
        if (this.gwNotificationListeners[notificationType]) {
            throw new Error("Attempting to load multiple callbacks for notification type: " + notificationType + ". call removeCallbackBackForGWNotificationType first.");
        }
        else if (this.gwNotificationListeners["*"]) {
            throw new Error("Attempting to load a notification listener when their is already a * listener. New listener: " + notificationType);
        }
        this.gwNotificationListeners[notificationType] = callback;
    };
    /**
     * The Gw Application sends 'events' for some predefined client related notifications, such as the Theme Changing, or the Locale changing.
     * There is also a GENERAL category that exists mainly for future proofing. Additional events may be configured in the future.
     * @param {GwNotificationType} notificationType
     * @param {GwNotificationCallback} callback
     */
    GwCrossOriginExternal.removeCallbackForGwNotificationType = function (notificationType) {
        if (!this.gwNotificationListeners[notificationType]) {
            console.warn("Attempting to remove a non existent notification listener for: " + notificationType);
        }
        delete this.gwNotificationListeners[notificationType];
    };
    GwCrossOriginExternal.nextMessageId = 1000;
    GwCrossOriginExternal.initialized = false;
    GwCrossOriginExternal.messagesAwaitingResponse = {};
    GwCrossOriginExternal.crossOriginEventCallbackByBroadcasterThenEvent = {};
    GwCrossOriginExternal.gwNotificationListeners = {};
    GwCrossOriginExternal.whiteListedDomains = {};
    return GwCrossOriginExternal;
}());
exports.GwCrossOriginExternal = GwCrossOriginExternal;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file polyfills Promise on the window, if window.Promise is not of type 'function'
 * It's a stand alone file, without any imports, so can also be easily handed off to the embedded application if needed
 */
var GwPromise = /** @class */ (function () {
    function GwPromise(executor) {
        this.subscriberPackages = [];
        this.result = undefined;
        if (executor) {
            try {
                executor(this.beResolved.bind(this), this.beRejected.bind(this));
            }
            catch (e) {
                this.beRejected(e);
            }
        }
    }
    /**
     * From MDN: The static Promise.reject function returns a Promise that is rejected.
     * For debugging purposes and selective error catching, it is useful to make reason an instanceof Error
     * @param reason
     * @returns {GwPromise}
     */
    GwPromise.reject = function (reason) {
        var promise = new GwPromise(null);
        return promise.beRejected(reason);
    };
    /**
     * From MDN: The Promise.resolve(value) method returns a Promise object that is resolved with the given value.
     * If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method),
     * the returned promise will "follow" that thenable, adopting its eventual state;
     * otherwise the returned promise will be fulfilled with the value.
     *
     * @param value
     * @returns {GwPromise}
     */
    GwPromise.resolve = function (thenableOrValue) {
        if (thenableOrValue instanceof GwPromise) {
            return thenableOrValue;
        }
        var promise = new GwPromise(null);
        return promise.beResolved(thenableOrValue);
    };
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
    GwPromise.all = function (promises) {
        var _this = this;
        if (promises.length === 0) {
            return GwPromise.resolve([]);
        }
        var results = [];
        var remaining = promises.length;
        var asyncMapperFulfill = function (i, value) {
            if (!returnPromise.isPending()) {
                return;
            }
            results[i] = value;
            remaining--;
            if (remaining === 0) {
                returnPromise.beResolved(results);
            }
        };
        var returnPromise = new GwPromise(function (notused, reject) {
            for (var i = 0; i < promises.length; i++) {
                var thenableOrVal = promises[i];
                if (GwPromise.isThenable(thenableOrVal)) {
                    thenableOrVal.then(asyncMapperFulfill.bind(_this, i), reject);
                }
                else {
                    asyncMapperFulfill(i, thenableOrVal);
                }
            }
        });
        return returnPromise;
    };
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
    GwPromise.race = function (promises) {
        var executor = function (resolve, reject) {
            for (var i = 0; i < promises.length; i++) {
                var thenableOrValue = promises[i];
                if (GwPromise.isThenable(thenableOrValue)) {
                    thenableOrValue.then(resolve, reject);
                }
                else {
                    resolve(thenableOrValue);
                }
            }
        };
        var returnPromise = new GwPromise(executor);
        return returnPromise;
    };
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
    GwPromise.prototype.then = function (onFulfill, onReject) {
        return this.addSubscriber(false, onFulfill, onReject);
    };
    /**
     * From MDN: The catch() method returns a Promise and deals with rejected cases only.
     * It behaves the same as calling Promise.prototype.then(undefined, onRejected)
     * (in fact, calling obj.catch(onRejected) internally calls obj.then(undefined, onRejected)).
     * @param {GwCallbackOnRejected} onError
     * @returns {GwPromise}
     */
    GwPromise.prototype.catch = function (onError) {
        return this.then(undefined, onError);
    };
    /**
     * From MDN: The finally() method can be useful if you want to do some processing or cleanup once the promise is settled, regardless of its outcome.
     * @param {Function} onFinally
     * @returns {GwPromise}
     */
    GwPromise.prototype.finally = function (onFinally) {
        var callOnFinally = function (val) {
            onFinally();
            return val;
        };
        return this.addSubscriber(true, callOnFinally, callOnFinally);
    };
    GwPromise.prototype.addSubscriber = function (isFinally, onFulfill, onReject) {
        var _this = this;
        var subscriber = new GwPromise(null);
        this.subscriberPackages.push({ subscriber: subscriber, isFinally: isFinally, onFulfill: onFulfill, onReject: onReject });
        if (this.isFulfilled() || this.isRejected()) {
            setTimeout(function () { return _this.notifySubscribers(); });
        }
        return subscriber;
    };
    GwPromise.prototype.notifySubscribers = function () {
        var _this = this;
        var propagateSuccess = this.state !== 2 /* REJECTED */;
        this.subscriberPackages.forEach(function (subscriberPackage) {
            var callback = propagateSuccess ? subscriberPackage.onFulfill : subscriberPackage.onReject;
            var error;
            var finalValue = _this.result;
            if (callback) {
                try {
                    finalValue = callback(_this.result);
                }
                catch (e) {
                    error = e;
                }
            }
            var subscriber = subscriberPackage.subscriber;
            if (error) {
                subscriber.beRejected(error);
            }
            else if (propagateSuccess) {
                subscriber.beResolved(finalValue);
            }
            else {
                subscriber.beRejected(finalValue, false, callback && !subscriberPackage.isFinally);
            }
        });
        this.subscriberPackages.length = 0;
    };
    /**
     * The specs require support for non Promise objects that still support calling .then()
     * @param value
     * @returns {value is IGwThenable}
     */
    GwPromise.isThenable = function (value) {
        return this.isObjectOrFunction(value) && this.isFunction(value.then);
    };
    /**
     * Uses "hidden" private variable to ensure that locking in is a one-way door
     * This is mostly just extra armor to ensure the guts of the promise are functioning correctly.
     */
    GwPromise.prototype.lockIn = function () {
        this._lockedIn = true;
    };
    GwPromise.prototype.isLockedIn = function () {
        return !!this._lockedIn;
    };
    Object.defineProperty(GwPromise.prototype, "state", {
        get: function () {
            return this._state || 0 /* PENDING */;
        },
        /**
         * Uses "hidden" private variable to ensure that setting state can only advance
         * Throws when trying to set state, and the state is already something other than pending
         * This is mostly just extra armor to ensure the guts of the promise are functioning correctly
         * @param {GwPromiseState} state
         */
        set: function (state) {
            if (this.isSettled()) {
                throw new Error("Attempted to set state on a promise that's already been settled.");
            }
            this._state = state;
            this.lockIn();
        },
        enumerable: true,
        configurable: true
    });
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
    GwPromise.prototype.beResolved = function (thenableOrValue, forceToRunEvenIfLocked) {
        var _this = this;
        if (forceToRunEvenIfLocked === void 0) { forceToRunEvenIfLocked = false; }
        if (thenableOrValue === this) {
            throw new Error("Cannot resolve a promise with itself.");
        }
        //Unless the chain of resolution has called this method with "forceToRunEvenIfLocked" then bail if locked
        if (!forceToRunEvenIfLocked && this.isLockedIn()) {
            return this;
        }
        // Always bail if we're already settled
        if (this.isSettled()) {
            return this;
        }
        this.lockIn();
        if (GwPromise.isThenable(thenableOrValue)) {
            thenableOrValue.then(function (val) { return _this.beResolved(val, true); }, function (val) { return _this.beRejected(val, true); });
            return this;
        }
        this.state = 1 /* FULFILLED */;
        this.result = thenableOrValue;
        this.notifySubscribers();
        return this;
    };
    GwPromise.prototype.beRejected = function (reason, forceToRunEvenIfLocked, rejectionWasHandled) {
        if (forceToRunEvenIfLocked === void 0) { forceToRunEvenIfLocked = false; }
        if (rejectionWasHandled === void 0) { rejectionWasHandled = false; }
        if (reason === this) {
            throw new Error("Cannot resolve a promise with itself.");
        }
        //Unless the chain of resolution has called this method with "forceToRunEvenIfLocked" then bail if locked
        if (!forceToRunEvenIfLocked && this.isLockedIn()) {
            return this;
        }
        // Always bail if we're already settled
        if (this.isSettled()) {
            return this;
        }
        this.lockIn();
        this.state = rejectionWasHandled ? 3 /* REJECTED_BUT_HANDLED */ : 2 /* REJECTED */;
        this.result = reason;
        this.notifySubscribers();
        return this;
    };
    GwPromise.prototype.getResult = function () {
        return this.result;
    };
    GwPromise.prototype.isSettled = function () {
        return this.isFulfilled() || this.isRejected();
    };
    GwPromise.prototype.isPending = function () {
        return this.state === 0 /* PENDING */;
    };
    GwPromise.prototype.isFulfilled = function () {
        return this.state === 1 /* FULFILLED */;
    };
    GwPromise.prototype.isRejected = function () {
        return this.state === 2 /* REJECTED */ || this.state === 3 /* REJECTED_BUT_HANDLED */;
    };
    GwPromise.isObjectOrFunction = function (val) {
        if (val === null || val === undefined) {
            return false;
        }
        var type = typeof val;
        return val !== null && (type === "object" || type === "function");
    };
    GwPromise.isFunction = function (val) {
        return typeof val === "function";
    };
    return GwPromise;
}());
exports.GwPromise = GwPromise;
// Polyfill
if (window && typeof window.Promise !== "function") {
    window.Promise = GwPromise;
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5MjhhMjhlMTY0NDVjN2E2NGY2OSIsIndlYnBhY2s6Ly8vLi9idWlsZC9lbWJlZGRlZC1pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9lbWJlZGRlZC9Hd0Nyb3NzT3JpZ2luRXh0ZXJuYWwudHMiLCJ3ZWJwYWNrOi8vLy4vZW1iZWRkZWQvR3dQcm9taXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REEsMENBQTBDO0FBQzFDLGlDQUFrRDtBQUNsRCxpQ0FBc0M7Ozs7Ozs7Ozs7QUNZdEM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0g7SUFZRTtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELHFCQUFxQjtJQUNyQixnREFBZ0Q7SUFFaEQ7Ozs7O09BS0c7SUFDSSwwQkFBSSxHQUFYLFVBQWEsY0FBc0IsRUFBRSxrQkFBMEMsRUFBRSxpQkFBMEI7UUFDekcs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QUFBRCxDQUFDO0FBblZZLDhCQUFTO0FBcVZ0QixXQUFXO0FBQ1gsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQVEsTUFBYyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzNELE1BQWMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3RDLENBQUMiLCJmaWxlIjoiZ3ctZW1iZWRkZWQtdHMtZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5MjhhMjhlMTY0NDVjN2E2NGY2OSIsIi8qIHRzbGludDpkaXNhYmxlOm5vLWltcG9ydC1zaWRlLWVmZmVjdCAqL1xuZXhwb3J0ICogZnJvbSBcIi4uL2VtYmVkZGVkL0d3Q3Jvc3NPcmlnaW5FeHRlcm5hbFwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL2VtYmVkZGVkL0d3UHJvbWlzZVwiO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2J1aWxkL2VtYmVkZGVkLWluZGV4LnRzIiwiaW1wb3J0IHtHd0V2ZW50TGlzdGVuZXIsIEd3VHlwZWRNYXB9IGZyb20gXCIuLi90eXBlcy9nd1R5cGVzXCI7XG5pbXBvcnQge1xuICBHd0Nyb3NzT3JpZ2luRXZlbnQsIEd3Q3Jvc3NPcmlnaW5FdmVudExpc3RlbmVyQ2FsbGJhY2ssIEd3Q3Jvc3NPcmlnaW5FdmVudE5hbWUsIEd3Q3Jvc3NPcmlnaW5XaW5kb3dOYW1lLFxuICBHd0tleVZhbHVlLCBHd01lc3NhZ2VEYXRhLCBHd01lc3NhZ2VFdmVudCwgR3dNZXNzYWdlc0Zyb21HVywgR3dNZXNzYWdlU3RhdHVzLFxuICBHd01lc3NhZ2VzVG9HVywgR3dOb3RpZmljYXRpb24sIEd3Tm90aWZpY2F0aW9uQ2FsbGJhY2ssIEd3Tm90aWZpY2F0aW9uVHlwZVxufSBmcm9tIFwiLi4vdHlwZXMvZ3dDcm9zc09yaWdpblR5cGVzXCI7XG5cbmludGVyZmFjZSBHd01lc3NhZ2VBd2FpdGluZ1Jlc3BvbnNlSW5mbyB7XG4gIG1lc3NhZ2VJZDogbnVtYmVyO1xuICBmdWxmaWxsPzogRnVuY3Rpb247XG4gIHJlamVjdD86IEZ1bmN0aW9uO1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbn1cblxuLyoqXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFBSSU1BUlkgQ0xBU1NcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogVGhpcyBlbnRpcmUgZmlsZSBpcyBhIHN0YW5kIGFsb25lIGltcGxlbWVudGF0aW9uIG9mIHRoZSBHdyBjcm9zcyBvcmlnaW4gd2luZG93IG1lc3NhZ2luZyBzeXN0ZW0uXG4gKiBJdCdzIHNvbGUgcHVycG9zZSBpcyB0byBiZSB1c2VkIGluIGEgY3Jvc3Mgb3JpZ2luIHdpbmRvdyBlbnZpcm9ubWVudCBmb3IgZW1iZWRkZWQgYXBwbGljYXRpb25zLlxuICpcbiAqIFRoaXMgU3RhdGljIENsYXNzIGlzIHRoZSBvbmx5IEFQSSwgYW5kIHRoaXMgZmlsZSByZWxpZXMgb24gbm8gb3RoZXIgaW1wb3J0cyAoYXBhcnQgZnJvbSBzb21lIFR5cGVTY3JpcHRcbiAqIHR5cGUgZGVmaW5pdGlvbnMsIHNoYXJlZCB3aXRoIHRoZSBpbnRlcm5hbCBBUElzKVxuICpcbiAqIElmIHRoZSBleHRlcm5hbCBhcHBsaWNhdGlvbiBwbGFucyB0byBzdXBwb3J0IGJyb3dzZXJzIG9yIGVudmlyb25tZW50cyB0aGF0IGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgZXM2IFByb21pc2UsXG4gKiB0aGVuIGl0IHdpbGwgbmVlZCBhIFByb21pc2UgcG9seWZpbGwuIEd3UHJvbWlzZS50cyBpcyBvbmUgb3B0aW9uLCBhbmQgaXMgYSBzdGFuZCBhbG9uZSBwb2x5ZmlsbC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEd3Q3Jvc3NPcmlnaW5FeHRlcm5hbCB7XG4gIHByaXZhdGUgc3RhdGljIG5leHRNZXNzYWdlSWQ6IG51bWJlciA9IDEwMDA7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdGF0aWMgb3JpZ2luRm9yR3dBcHA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbWVzc2FnZXNBd2FpdGluZ1Jlc3BvbnNlOiBHd0tleVZhbHVlPEd3TWVzc2FnZUF3YWl0aW5nUmVzcG9uc2VJbmZvPiA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjcm9zc09yaWdpbkV2ZW50Q2FsbGJhY2tCeUJyb2FkY2FzdGVyVGhlbkV2ZW50OiBHd0tleVZhbHVlPEd3S2V5VmFsdWU8R3dDcm9zc09yaWdpbkV2ZW50TGlzdGVuZXJDYWxsYmFjaz4+ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGd3Tm90aWZpY2F0aW9uTGlzdGVuZXJzOiBHd0tleVZhbHVlPEd3Tm90aWZpY2F0aW9uQ2FsbGJhY2s+ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHdoaXRlTGlzdGVkRG9tYWluczogR3dLZXlWYWx1ZTx0cnVlPiB8IFwiKlwiID0ge307XG4gIHByaXZhdGUgc3RhdGljIG93bmVyV2luZG93OiBXaW5kb3c7XG4gIHByaXZhdGUgc3RhdGljIG1lc3NhZ2VFdmVudExpc3RlbmVyOiBHd0V2ZW50TGlzdGVuZXIgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RhdGljIGNsYXNzLiBVc2UgR3dDcm9zc09yaWdpbkV4dGVybmFsLmluaXQoKVwiKTtcbiAgfVxuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLz09PT0gSU5JVElBTElaQVRJT05cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIFJlcXVpcmVkIEluaXRpYWxpemVyIGZvciB0aGUgR3dDcm9zc09yaWdpbkV4dGVybmFsIEFQSS5cbiAgICogQWRkcyBhICdtZXNzYWdlJyBldmVudCBsaXN0ZW5lciB0byB0aGUgZ2xvYmFsIHdpbmRvd1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luRm9yR3dBcHAgLSB0aGUgb3JpZ2luIG9mIHRoZSB3aW5kb3cgKHJ1bm5pbmcgdGhlIEdXIEFwcGxpY2F0aW9uKSB0aGF0IHNwYXduZWQgdGhpcyB3aW5kb3dcbiAgICogQHBhcmFtIHtXaW5kb3d9IGZvcmNlZE93bmVyV2luZG93IC0gcHJpbWFyaWx5IHVzZWQgZm9yIHRlc3RpbmcgYW5kIG1vY2tpbmcuIFJlcGxhY2VzIGFsbCBjYWxscyB0byB0aGUgZ2xvYmFsIHdpbmRvdy5cbiAgICovXG4gIHN0YXRpYyBpbml0IChvcmlnaW5Gb3JHd0FwcDogc3RyaW5nLCB3aGl0ZUxpc3RlZERvbWFpbnM6IEd3S2V5VmFsdWU8dHJ1ZT4gfCBcIipcIiwgZm9yY2VkT3duZXJXaW5kb3c/OiBXaW5kb3cpOiB2b2lkIHtcbiAgICB0aGlzLm93bmVyV2luZG93ID0gZm9yY2VkT3duZXJXaW5kb3cgfHwgd2luZG93LnBhcmVudDtcbiAgICB0aGlzLndoaXRlTGlzdGVkRG9tYWlucyA9IHdoaXRlTGlzdGVkRG9tYWlucztcbiAgICB0aGlzLm9yaWdpbkZvckd3QXBwID0gb3JpZ2luRm9yR3dBcHA7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5tZXNzYWdlRXZlbnRMaXN0ZW5lciA9IHRoaXMucmVjZWl2ZU1lc3NhZ2VGcm9tR3dBcHAuYmluZCh0aGlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5tZXNzYWdlRXZlbnRMaXN0ZW5lciEsIGZhbHNlKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0luaXRpYWxpemVkICgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlcyB0aGUgQVBJLiBSZW1vdmluZyBhbnkgc2V0dXAgZG9uZSBpbiB0aGUgaW5pdCBtZXRob2QuXG4gICAqL1xuICBzdGF0aWMga2lsbCAoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIHRoaXMub3JpZ2luRm9yR3dBcHAgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubWVzc2FnZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHRoaXMub3duZXJXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5tZXNzYWdlRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgdGhpcy5tZXNzYWdlRXZlbnRMaXN0ZW5lciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy89PT09IFJFQ0VJVkUgTUVTU0FHRVMgRlJPTSBHVyBBUFBcbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdGhyb3dJZlVudHJ1c3RlZE9yaWdpbiAoZXZlbnQ6IEd3TWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3duZXJXaW5kb3cgIT09IGV2ZW50LnNvdXJjZSB8fCB0aGlzLm9yaWdpbkZvckd3QXBwICE9PSBldmVudC5vcmlnaW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlY2VpdmVkIHVudHJ1c3RlZCBtZXNzYWdlIGZyb20gb3JpZ2luOiBcIiArIGV2ZW50Lm9yaWdpbik7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmRhdGEuZ3dOb25Hd09yaWdpbklmQW55KSB7XG4gICAgICBpZiAodGhpcy53aGl0ZUxpc3RlZERvbWFpbnMgIT09IFwiKlwiICYmICF0aGlzLndoaXRlTGlzdGVkRG9tYWluc1tldmVudC5kYXRhLmd3Tm9uR3dPcmlnaW5JZkFueV0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVjZWl2ZWQgbWVzc2FnZSBmcm9tIHRydXN0ZWQgR1cgQXBwbGljYXRpb24gb3JpZ2luLCBidXQgZnJvbSBhbiBvcmlnaW5hdGluZyBvcmlnaW4gbm90IG9uIHRoZSB3aGl0ZWxpc3QuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgUHJpbWFyeSBSb3V0ZXIgZm9yIEFsbCBNZXNzYWdlcyBSZWNlaXZlZCBmcm9tIHRoZSBHVyBBcHBsaWNhdGlvblxuICAgKiBJdCBpcyBib3VuZCB0aGUgXCJtZXNzYWdlXCIgZXZlbnQgbGlzdGVuZXIgb24gdGhlIHBhcmVudCB3aW5kb3cuXG4gICAqXG4gICAqIFRIRVJFIElTIE5PIFJFQVNPTiBUTyBDQUxMIFRISVMgTUVUSE9EIERJUkVDVExZXG4gICAqIEBwYXJhbSB7R3dNZXNzYWdlRXZlbnR9IGV2ZW50XG4gICAqL1xuICBzdGF0aWMgcmVjZWl2ZU1lc3NhZ2VGcm9tR3dBcHAgKGV2ZW50OiBHd01lc3NhZ2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudGhyb3dJZlVudHJ1c3RlZE9yaWdpbihldmVudCk7XG5cbiAgICBjb25zdCBkYXRhOiBHd01lc3NhZ2VEYXRhID0gZXZlbnQuZGF0YTtcblxuICAgIHN3aXRjaCAoZGF0YS5nd01lc3NhZ2VUeXBlKSB7XG4gICAgICBjYXNlIEd3TWVzc2FnZXNGcm9tR1cuVkFMVUVTOlxuICAgICAgICB0aGlzLnJlY2VpdmVWYWx1ZXNNZXNzYWdlKGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR3dNZXNzYWdlc0Zyb21HVy5SRVNQT05TRV9GUk9NX05PTl9CTE9DS0lOR19TRVJWRVJfUkVRVUVTVDpcbiAgICAgICAgdGhpcy5yZWNlaXZlTm9uQmxvY2tpbmdTZXJ2ZXJSZXF1ZXN0UmVwb25zZU1lc3NhZ2UoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHd01lc3NhZ2VzRnJvbUdXLkNPTkZJUk1BVElPTl9PTkxZOlxuICAgICAgICB0aGlzLnJlY2VpdmVDb25maXJtYXRpb25Pbmx5TWVzc2FnZShkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEd3TWVzc2FnZXNGcm9tR1cuUkVDRUlWRV9DUk9TU19PUklHSU5fRVZFTlQ6XG4gICAgICAgIHRoaXMucmVjZWl2ZUNyb3NzT3JpZ2luRXZlbnQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHd01lc3NhZ2VzRnJvbUdXLlJFQ0VJVkVfR1dfTk9USUZJQ0FUSU9OOlxuICAgICAgICB0aGlzLnJlY2VpdmVHd05vdGlmaWNhdGlvbihkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnJlY2VpdmVOb25Db25mb3JtaW5nTWVzc2FnZVR5cGVGcm9tR3dBcHAoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIuIFJldHJpZXZlcyBHd01lc3NhZ2VBd2FpdGluZ1Jlc3BvbnNlSW5mbyB3aGlsZSBsb2dnaW5nIGVycm9ycyBhbG9uZyB0aGUgd2F5XG4gICAqIEBwYXJhbSB7R3dNZXNzYWdlRGF0YX0gZGF0YVxuICAgKiBAcmV0dXJucyB7R3dNZXNzYWdlQXdhaXRpbmdSZXNwb25zZUluZm88YW55PiB8IG51bGx9XG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBnZXRBd2FpdGluZ0luZm9Gb3JDb3JyZXNwb25kaW5nTWVzc2FnZURhdGEgKGRhdGE6IEd3TWVzc2FnZURhdGEpOiBHd01lc3NhZ2VBd2FpdGluZ1Jlc3BvbnNlSW5mbyB8IG51bGwge1xuICAgIGNvbnN0IHJlc3BvbnNlVG9NZXNzYWdlSWQgPSBkYXRhLmd3UmVzcG9uc2VUb01lc3NhZ2VJZDtcblxuICAgIGlmICghcmVzcG9uc2VUb01lc3NhZ2VJZCAmJiByZXNwb25zZVRvTWVzc2FnZUlkICE9PSAwKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiUmVjZWl2ZWQgdmFsdWVzIHBheWxvYWQgd2l0aCBubyByZXNwb25zZVRvTWVzc2FnZUlkIGlkZW50aWZpZXI6IFwiLCBkYXRhKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGluZm86IEd3TWVzc2FnZUF3YWl0aW5nUmVzcG9uc2VJbmZvID0gdGhpcy5tZXNzYWdlc0F3YWl0aW5nUmVzcG9uc2VbcmVzcG9uc2VUb01lc3NhZ2VJZF07XG5cbiAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLkd3VGVzdEVudikge1xuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiUmVjZWl2ZWQgdmFsdWVzIHBheWxvYWQgd2l0aCBhIHJlc3BvbnNlVG9NZXNzYWdlSWQ6IFwiICsgcmVzcG9uc2VUb01lc3NhZ2VJZCArIFwiLiBCdXQgY291bGQgbm90IGxvY2F0ZSBhIGNvcnJlc3BvbmRpbmcgUHJvbWlzZS4gRGF0YTogXCIsIGRhdGEpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZm87XG4gIH1cblxuICAvKipcbiAgICogUHJvbWlzZSBSZXNvbHZlci5cbiAgICogVGFrZXMgYSBHd01lc3NhZ2VEYXRhIG9iamVjdC5cbiAgICogTG9jYXRlcyBsb2NhbGx5IHN0b3JlZCBwcm9taXNlcyByZWxhdGluZyB0aGUgdGhlIG1lc3NhZ2UsIGFuZCBmaXJlcyBmdWxmaWwgb3IgcmVqZWN0IGJhc2VkIG9uIG1lc3NhZ2Ugc3RhdHVzLlxuICAgKiBAcGFyYW0ge0d3TWVzc2FnZURhdGF9IGRhdGFcbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlY2VpdmVNZXNzYWdlIChkYXRhOiBHd01lc3NhZ2VEYXRhKTogdm9pZCB7XG4gICAgY29uc3QgcGF5bG9hZDogR3dLZXlWYWx1ZTxhbnk+IHwgRXJyb3IgfCBudWxsID0gZGF0YS5nd1BheWxvYWQ7XG4gICAgY29uc3Qgc3RhdHVzOiBHd01lc3NhZ2VTdGF0dXMgPSBkYXRhLmd3U3RhdHVzO1xuXG4gICAgY29uc3QgaW5mbzogR3dNZXNzYWdlQXdhaXRpbmdSZXNwb25zZUluZm8gfCBudWxsID0gdGhpcy5nZXRBd2FpdGluZ0luZm9Gb3JDb3JyZXNwb25kaW5nTWVzc2FnZURhdGEoZGF0YSk7XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2FsbGJhY2sgPSAoc3RhdHVzID09PSBHd01lc3NhZ2VTdGF0dXMuRkFJTEVEKSA/IGluZm8ucmVqZWN0IDogaW5mby5mdWxmaWxsO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2socGF5bG9hZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVjZWl2ZU5vbkJsb2NraW5nU2VydmVyUmVxdWVzdFJlcG9uc2VNZXNzYWdlIChkYXRhOiBHd01lc3NhZ2VEYXRhKTogdm9pZCB7XG4gICAgdGhpcy5yZWNlaXZlTWVzc2FnZShkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlY2VpdmVWYWx1ZXNNZXNzYWdlIChkYXRhOiBHd01lc3NhZ2VEYXRhKTogdm9pZCB7XG4gICAgdGhpcy5yZWNlaXZlTWVzc2FnZShkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlY2VpdmVDb25maXJtYXRpb25Pbmx5TWVzc2FnZSAoZGF0YTogR3dNZXNzYWdlRGF0YSk6IHZvaWQge1xuICAgIHRoaXMucmVjZWl2ZU1lc3NhZ2UoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZWNlaXZlQ3Jvc3NPcmlnaW5FdmVudCAoZGF0YTogR3dNZXNzYWdlRGF0YSk6IHZvaWQge1xuICAgIGNvbnN0IGV2OiBHd0Nyb3NzT3JpZ2luRXZlbnQgPSBkYXRhLmd3UGF5bG9hZDtcblxuICAgIGNvbnN0IGV2ZW50czogR3dUeXBlZE1hcDxHd0Nyb3NzT3JpZ2luRXZlbnRMaXN0ZW5lckNhbGxiYWNrPiA9IHRoaXMuY3Jvc3NPcmlnaW5FdmVudENhbGxiYWNrQnlCcm9hZGNhc3RlclRoZW5FdmVudFtldi5icm9hZGNhc3RlcldpbmRvd0lkXTtcblxuICAgIGlmICghZXZlbnRzKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJSZWNlaXZlZCBjcm9zcyBvcmlnaW4gZXZlbnQgZnJvbSBhIGJyb2FkY2FzdCB3aW5kb3cgbm90IGN1cnJlbnRseSBiZWluZyBsaXN0ZW5lZCB0by5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnRMaXN0ZW5lckNhbGxiYWNrID0gZXZlbnRzW2V2LmV2ZW50TmFtZV0gfHwgZXZlbnRzW1wiKlwiXTtcblxuICAgIGlmICghZXZlbnRMaXN0ZW5lckNhbGxiYWNrKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJSZWNlaXZlZCBjcm9zcyBvcmlnaW4gZXZlbnQgZm9yIGFuIGV2ZW50IHR5cGUgd2l0aG91dCBhIHJlZ2lzdGVyZWQgY2FsbGJhY2s6IFwiICsgZXYuYnJvYWRjYXN0ZXJXaW5kb3dJZCArIFwiOlwiICsgZXYuZXZlbnROYW1lKTtcbiAgICB9XG5cbiAgICBldmVudExpc3RlbmVyQ2FsbGJhY2soZXYpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVjZWl2ZUd3Tm90aWZpY2F0aW9uIChkYXRhOiBHd01lc3NhZ2VEYXRhKTogdm9pZCB7XG4gICAgY29uc3Qgbm90aWZpY2F0aW9uOiBHd05vdGlmaWNhdGlvbiA9IGRhdGEuZ3dQYXlsb2FkO1xuXG4gICAgY29uc3QgY2FsbGJhY2s6IEd3Tm90aWZpY2F0aW9uQ2FsbGJhY2sgPSB0aGlzLmd3Tm90aWZpY2F0aW9uTGlzdGVuZXJzW25vdGlmaWNhdGlvbi50eXBlXTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKG5vdGlmaWNhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVjZWl2ZU5vbkNvbmZvcm1pbmdNZXNzYWdlVHlwZUZyb21Hd0FwcCAoZXZlbnQ6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBvc3NpYmxlQ3VzdG9tTWV0aG9kTmFtZSA9ICh0aGlzIGFzIGFueSlbZXZlbnQuZGF0YS5nd01lc3NhZ2VUeXBlXTtcblxuICAgIGlmICh0eXBlb2YgcG9zc2libGVDdXN0b21NZXRob2ROYW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICh0aGlzIGFzIGFueSlbcG9zc2libGVDdXN0b21NZXRob2ROYW1lXShldmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIi0tLSBSZWNlaXZlZCBNZXNzYWdlRXZlbnQgZnJvbSBHd0FwcCB3aXRob3V0IGEgZ3dNZXNzYWdlVHlwZSB0aGF0IG1hdGNoZWQgYSBtZXRob2Qgb24gR3dDcm9zc09yaWdpbkV4dGVybmFsLlxcblwiICtcbiAgICAgICAgXCItLS0gVGhpcyBpcyBsaWtlbHkgYW4gRXJyb3IuXFxuXCIgK1xuICAgICAgICBcIi0tLSBIb3dldmVyLCByZWNlaXZlTm9uQ29uZm9ybWluZ01lc3NhZ2VUeXBlRnJvbUd3QXBwIGNhbiBiZSBvdmVycmlkZGVuIGluIEd3Q3Jvc3NPcmlnaW5FeHRlcm5hbC5cXG5cIiArXG4gICAgICAgIFwiLS0tIFRoaXMgYWxsb3dzIGN1c3RvbSBsb2dpYyBiYXNlZCBvbiBhbnkgTWVzc2FnZUV2ZW50IHRoYXQgZG9lcyBub3QgaW1wbGVtZW50IEd3TWVzc2FnZUV2ZW50LiBCdXQgY29uc2lkZXIgTWVzc2FnZVR5cGUuRklSRV9DVVNUT01fRVZFTlQgaW5zdGVhZC5cIlxuICAgICk7XG4gIH1cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy89PT09IFNFTkQgTUVTU0FHRVMgVE8gR1cgQVBQXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIFByaW1hcnkgcm91dGVyIGZvciBhbGwgb3V0Z29pbmcgbWVzc2FnZXMgdG8gdGhlIEd3IEFwcGxpY2F0aW9uLlxuICAgKiBAcGFyYW0ge0d3TWVzc2FnZXNUb0dXfSBtZXNzYWdlVHlwZVxuICAgKiBAcGFyYW0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge251bWJlciB8IG51bGx9IHJlc3BvbnNlVG9NZXNzYWdlSWRcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcm9taXNlLWZ1bmN0aW9uLWFzeW5jXG4gIHByaXZhdGUgc3RhdGljIHNlbmRNZXNzYWdlIChtZXNzYWdlVHlwZTogR3dNZXNzYWdlc1RvR1csIHBheWxvYWQ6IGFueSwgcmVzcG9uc2VUb01lc3NhZ2VJZDogbnVtYmVyIHwgbnVsbCA9IG51bGwpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICghdGhpcy5vd25lcldpbmRvdykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkF0dGVtcHRpbmcgdG8gc2VuZCBhIG1lc3NhZ2UgdG8gYSBudWxsIEd3QXBwIHdpbmRvdy4gRW5zdXJlIHRoYXQgdGhpcyB3aW5kb3cgd2FzIHNwYXduZWQgYnkgYSBHdWlkd2lyZSBBcHBsaWNhdGlvbi5cIikpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IHRoaXMubmV4dE1lc3NhZ2VJZCsrO1xuXG4gICAgY29uc3QgZGF0YTogR3dNZXNzYWdlRGF0YSA9IHtcbiAgICAgIGd3TWVzc2FnZVR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgZ3dQYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgZ3dTdGF0dXM6IEd3TWVzc2FnZVN0YXR1cy5QRU5ESU5HLFxuICAgICAgZ3dNZXNzYWdlSWQ6IG1lc3NhZ2VJZCxcbiAgICAgIGd3UmVzcG9uc2VUb01lc3NhZ2VJZDogcmVzcG9uc2VUb01lc3NhZ2VJZFxuICAgIH07XG5cbiAgICBjb25zdCBtZXNzYWdlQXdhaXRpbmdSZXNwb25zZTogR3dNZXNzYWdlQXdhaXRpbmdSZXNwb25zZUluZm8gPSB7XG4gICAgICBtZXNzYWdlSWQsXG4gICAgICB0aW1lc3RhbXA6IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIH07XG4gICAgdGhpcy5tZXNzYWdlc0F3YWl0aW5nUmVzcG9uc2VbbWVzc2FnZUlkXSA9IG1lc3NhZ2VBd2FpdGluZ1Jlc3BvbnNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG1lc3NhZ2VBd2FpdGluZ1Jlc3BvbnNlLmZ1bGZpbGwgPSBmdWxmaWxsO1xuICAgICAgICBtZXNzYWdlQXdhaXRpbmdSZXNwb25zZS5yZWplY3QgPSByZWplY3Q7XG4gICAgICB9KTtcbiAgICAgIHRoaXMub3duZXJXaW5kb3cucG9zdE1lc3NhZ2UoZGF0YSwgdGhpcy5vcmlnaW5Gb3JHd0FwcCEpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB0aGUgR1cgQXBwbGljYXRpb24gdG8gdXBkYXRlIHRoZSBET00gRWxlbWVudHMgKGZvciB0aGUgd2lkZ2V0cyB3aG9zZSBJRHMgY29ycmVzcG9uZCB0byB0aGUgbG9naWNhbCBuYW1lIG1hcHBpbmcpLCB3aXRoIG5ldyB2YWx1ZXMuXG4gICAqIE5PVEU6IHRoaXMgZG9lcyBub3QgYXV0b21hdGljYWxseSB1cGRhdGUgc2VydmVyIHZhbHVlcyBmb3IgdGhlIGVsZW1lbnRzLiBPbmx5IHRoZSB2YWx1ZXMgaW4gdGhlIERPTSBpbiB0aGUgR1cgQXBwbGljYXRpb24uXG4gICAqIElmIHRoZSBQYWdlIGlzIGluIHJlYWRvbmx5IG1vZGUsIG9yIHRoZSB1c2VyIGNhbmNlbHMgdGhlIGNoYW5nZXMsIHRoZSBjaGFuZ2VzIHdpbGwgYmUgbG9zdC5cbiAgICpcbiAgICogU2VlOiBHd0Nyb3NzT3JpZ2luRXh0ZXJuYWwuZmlyZUFjdGlvbk9uU2VydmVyLCBvciBHd0Nyb3NzT3JpZ2luRXh0ZXJuYWwubWFrZU5vbkJsb2NraW5nU2VydmVyUmVxdWVzdCBmb3IgZGlyZWN0XG4gICAqIGNvbW11bmljYXRpb24gd2l0aCB0aGUgR3cgQXBwbGljYXRpb24gU2VydmVyLlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBvbmx5IGZvciBjb25maXJtYXRpb24gdGhhdCB0aGUgbWVzc2FnZSB3YXMgc3VjY2Vzc2Z1bFxuICAgKlxuICAgKiBAcGFyYW0ge0d3VmFsdWVNYXB9IGxvZ2ljYWxOYW1lVG9WYWx1ZU1hcCAtICdMb2dpY2FsIE5hbWVzJyBhcmUgZXhwb3NlZCBhcyBhIG1hcHBpbmcgaW4gRW1iZWRkaW5nV2lkZ2V0IEFQSS5cbiAgICogQW5kIGNvcnJlc3BvbmQgdG8gYSBzZXQgb2Ygd2lkZ2V0IElEcyBpbiBhIGdpdmVuIGluc3RhbmNlIG9mIHRoZSBFbWJlZGRpbmdXaWRnZXQuIGllOlxuICAgKiBMb2dpY2FsIE5hbWU6IEFkZHJlc3NMaW5lMSA9PiBXaWRnZXRJZC1wYWdlOS1wYW5lbDgtYWRkcmVzc3NlY3Rpb243LWFkZHJlc3NsaW5lMS5cbiAgICogTGlnaWNhbCBOYW1lOiBaaXBDb2RlID0+IFdpZGdldElkLXBhZ2U5LXBhbmVsOC1hZGRyZXNzc2VjdGlvbjctemlwY29kZS5cbiAgICogU2VlIHRoZSBQQ0YgZmllbGRzIGZvciBFbWJlZGRpbmdXaWRnZXRcbiAgICogQHJldHVybnMge1Byb21pc2U8R3dWYWx1ZU1hcD59XG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJvbWlzZS1mdW5jdGlvbi1hc3luY1xuICBzdGF0aWMgc2V0VmFsdWVzIChsb2dpY2FsTmFtZVRvVmFsdWVNYXA6IEd3S2V5VmFsdWU8c3RyaW5nPik6IFByb21pc2U8R3dLZXlWYWx1ZTxzdHJpbmc+PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UoR3dNZXNzYWdlc1RvR1cuU0VUX1ZBTFVFUywgbG9naWNhbE5hbWVUb1ZhbHVlTWFwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZXMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgd2lkZ2V0cyBhcyBjdXJyZW50bHkgcmVwcmVzZW50ZWQgaW4gdGhlIERPTS5cbiAgICogTm90ZTogdGhpcyByZXR1cm5zIHRoZSB2YWx1ZXMgYXMgY3VycmVudGx5IHJlcHJlc2VudGVkIGluIHRoZSBET00uIFRoZXNlIHZhbHVlcyBDT1VMRCBiZSBkaWZmZXJlbnRcbiAgICogZnJvbSB0aGUgcGVyc2lzdGVkIHNlcnZlciB2YWx1ZXMgZm9yIGFueSBudW1iZXIgb2YgcmVhc29uczogdGhlIHVzZXIgbW9kaWZpZWQgdGhlbSBsb2NhbGx5LCBjbGllbnQgcmVmbGVjdGlvblxuICAgKiBtb2RpZmllZCB0aGVtLCBldGMuXG4gICAqXG4gICAqIFRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgY29udGFpbiB0aGUgdmFsdWVzIHdoZW4gZnVsZmlsbGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGxvZ2ljYWxOYW1lcyAtICdMb2dpY2FsIE5hbWVzJyBhcmUgZXhwb3NlZCBhcyBhIG1hcHBpbmcgaW4gRW1iZWRkaW5nV2lkZ2V0IEFQSS5cbiAgICogQW5kIGNvcnJlc3BvbmQgdG8gYSBzZXQgb2Ygd2lkZ2V0IElEcyBpbiBhIGdpdmVuIGluc3RhbmNlIG9mIHRoZSBFbWJlZGRpbmdXaWRnZXQuIGllOlxuICAgKiBMb2dpY2FsIE5hbWU6IEFkZHJlc3NMaW5lMSA9PiBXaWRnZXRJZC1wYWdlOS1wYW5lbDgtYWRkcmVzc3NlY3Rpb243LWFkZHJlc3NsaW5lMS5cbiAgICogTGlnaWNhbCBOYW1lOiBaaXBDb2RlID0+IFdpZGdldElkLXBhZ2U5LXBhbmVsOC1hZGRyZXNzc2VjdGlvbjctemlwY29kZS5cbiAgICogU2VlIHRoZSBQQ0YgZmllbGRzIGZvciBFbWJlZGRpbmdXaWRnZXRcbiAgICogQHJldHVybnMge1Byb21pc2U8R3dWYWx1ZU1hcD59XG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJvbWlzZS1mdW5jdGlvbi1hc3luY1xuICBzdGF0aWMgZ2V0VmFsdWVzIChsb2dpY2FsTmFtZXM6IHN0cmluZ1tdKTogUHJvbWlzZTxHd0tleVZhbHVlPHN0cmluZz4+IHtcbiAgICByZXR1cm4gdGhpcy5zZW5kTWVzc2FnZShHd01lc3NhZ2VzVG9HVy5HRVRfVkFMVUVTLCBsb2dpY2FsTmFtZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBFbWJlZGRlZCBXaWRnZXQncyBzZXJ2ZXIgc2lkZSBBQ1RJT04gSEFORExFUiB3aXRoIHRoZSBnaXZlbiBKU09OXG4gICAqIG9iamVjdCBhcyBpdHMgYXJndW1lbnQuIFRoaXMgd2lsbCBjYXVzZSBhIGZ1bGwgVUkgcmVmcmVzaC5cbiAgICpcbiAgICogVGhlIHJldHVybmVkIHByb21pc2UgaXMgb25seSBmb3IgY29uZmlybWF0aW9uIHRoYXQgdGhlIG1lc3NhZ2Ugd2FzIHN1Y2Nlc3NmdWwsIG5vdCB0aGUgcmVzdWx0IG9mIHRoZSBhY3Rpb24gb24gdGhlIHNlcnZlclxuICAgKiBAcGFyYW0ge3N0cmluZ30ganNvblBheWxvYWRcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcm9taXNlLWZ1bmN0aW9uLWFzeW5jXG4gIHN0YXRpYyBmaXJlQWN0aW9uT25TZXJ2ZXIgKHBheWxvYWQ6IEd3S2V5VmFsdWU8YW55Pik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UoR3dNZXNzYWdlc1RvR1cuRklSRV9BQ1RJT04sIHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBFbWJlZGRlZCBXaWRnZXQncyBzZXJ2ZXIgc2lkZSBVUERBVEUgSEFORExFUiB3aXRoIHRoZSBnaXZlbiBvYmplY3RcbiAgICogb2JqZWN0IGFzIGl0cyBhcmd1bWVudC4gVGhpcyB3aWxsIG5vdCBibG9jayBvciByZWZyZXNoIHRoZSBHVyBBcHBsaWNhdGlvbiBVSS5cbiAgICpcbiAgICogTk9URTogVGhlIFByb21pc2UgcmV0dXJuZWQgYnkgdGhpcyBtZXRob2Qgd2lsbCBjb250YWluIHRoZSBwYXlsb2FkIGZyb20gdGhpcyByZXF1ZXN0LlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByb21pc2UtZnVuY3Rpb24tYXN5bmNcbiAgc3RhdGljIG1ha2VOb25CbG9ja2luZ1NlcnZlclJlcXVlc3QgKHBheWxvYWQ6IEd3S2V5VmFsdWU8YW55Pik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UoR3dNZXNzYWdlc1RvR1cuTk9OX0JMT0NLSU5HX1NFUlZFUl9SRVFVRVNULCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gYW5vdGhlciBFeHRlcm5hbCBDcm9zcyBPcmlnaW4gd2luZG93J3MgbWVzc2FnZXMuXG4gICAqIEltYWdpbmUgdGhhdCB0aGUgR3cgQXBwbGljYXRpb24gaGFzIDIgZW1iZWRkZWQgaWZyYW1lJ3MuIFRoZSBCbHVlIFdpbmRvdywgYW5kIHRoZSBSZWQgV2luZG93LlxuICAgKiBCbHVlIHdpbmRvdyBjYW4gYnJvYWRjYXN0IGEgY3VzdG9tIGNyb3NzIG9yaWdpbiBldmVudC4gTGV0J3Mgc2F5IFwiR09fQkFOQU5BU1wiLiBBbmQgaW5jbHVkZSBzb21lIGluZm9ybWF0aW9uOiB7bnVtYmVyT2ZCYW5hbmFzOiAxMn1cbiAgICogQmx1ZSB3aW5kb3cgd2lsbCBzZW5kIHRoYXQgcGFja2FnZSB0byB0aGUgR3dBcHBsaWNhdGlvbiB2aWEgYnJvYWRjYXN0Q3Jvc3NPcmlnaW5FdmVudC5cbiAgICogUmVkIHdpbmRvdyB3aWxsIG5ldmVyIGhlYXIgYWJvdXQgdGhpcyBtZXNzYWdlLlxuICAgKlxuICAgKiBCdXQgaWYgUmVkIFdpbmRvdyBjYWxscyBhZGRDcm9zc09yaWdpbkV2ZW50TGlzdGVuZXIsIHBhc3NpbmcgXCJyZWRXaW5kb3dcIiBhbmQgXCJHT19CQU5BTkFTXCIgdGhlbiB0aGUgR3cgQXBwbGljYXRpb25cbiAgICogd2lsbCByb3V0ZSB0aGUgbWVzc2FnZSBldmVudCB0byB0aGUgYmx1ZSB3aW5kb3csIGFuZCBjYWxsIHRoZSBwcm92aWRlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICpcbiAgICogTGlrZSBnZXQvc2V0IHZhbHVlcyB0aGlzIGZ1bmN0aW9uIHVzZXMgbG9naWNhbCBuYW1lcywgYXMgZ2l2ZW4gdG8gdGhlIGVtYmVkZGVkIHdpZGdldCB2aWFcbiAgICogdGhlIEVtYmVkZGVkV2lkZ2V0UmVmIGVsZW1lbnQuIFRob3VnaCBpbiB0aGlzIGNhc2UgdGhlIGxvZ2ljYWwgbmFtZXMgcmVmZXIgdG8gYW5vdGhlclxuICAgKiBlbWJlZGRlZCB3aWRnZXQgcmF0aGVyIHRoYW4gdG8gYW4gaW5wdXQuXG4gICAqXG4gICAqIE5PVEU6IHRvIHJlY2VpdmUgbWVzc2FnZXMgZnJvbSBhbnkgb3RoZXIgZXh0ZXJuYWwgd2luZG93cywgdGhleSBtdXN0IGJlIGV4cGxpY2l0bHkgd2hpdGVsaXN0ZWQgdmlhIHRoZVxuICAgKiBHd0Nyb3NzT3JpZ2luRXh0ZXJuYWwuaW5pdCBtZXRob2QsIGVpdGhlciBieSBkb21haW4sIG9yIGJ5IHNwZWNpZnlpbmcgYSB3aWxkY2FyZCBkb21haW4uXG4gICAqXG4gICAqIFRoZSByZXR1cm5lZCBwcm9taXNlIGlzIG9ubHkgZm9yIGNvbmZpcm1hdGlvbiB0aGF0IHRoZSBtZXNzYWdlIHdhcyBzdWNjZXNzZnVsXG4gICAqIEBwYXJhbSBicm9hZGNhc3RlcldpbmRvd05hbWUgdGhlIGxvZ2ljYWwgbmFtZSBvZiB0aGUgd2luZG93IHlvdSB3YW50IHRvIGxpc3RlbiB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIG5hbWUgb2YgdGhlIGV2ZW50LCBvciBcIipcIiB0byBsaXN0ZW4gdG8gYW55IGV2ZW50XG4gICAqIEBwYXJhbSB7R3dFdmVudEluZm9DYWxsYmFja30gY2FsbGJhY2tcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcm9taXNlLWZ1bmN0aW9uLWFzeW5jXG4gIHN0YXRpYyBhZGRDcm9zc09yaWdpbkV2ZW50TGlzdGVuZXIgKGJyb2FkY2FzdGVyV2luZG93TmFtZTogR3dDcm9zc09yaWdpbldpbmRvd05hbWUsIGV2ZW50TmFtZTogR3dDcm9zc09yaWdpbkV2ZW50TmFtZSwgY2FsbGJhY2s6IEd3Q3Jvc3NPcmlnaW5FdmVudExpc3RlbmVyQ2FsbGJhY2spOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCBjdXJyZW50bHlMaXN0ZW5lZFRvRXZlbnRzID0gdGhpcy5jcm9zc09yaWdpbkV2ZW50Q2FsbGJhY2tCeUJyb2FkY2FzdGVyVGhlbkV2ZW50W2Jyb2FkY2FzdGVyV2luZG93TmFtZV0gPSB0aGlzLmNyb3NzT3JpZ2luRXZlbnRDYWxsYmFja0J5QnJvYWRjYXN0ZXJUaGVuRXZlbnRbYnJvYWRjYXN0ZXJXaW5kb3dOYW1lXSB8fCB7fTtcblxuICAgIGlmIChjdXJyZW50bHlMaXN0ZW5lZFRvRXZlbnRzW1wiKlwiXSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlRoZXJlIGlzIGFscmVhZHkgYW4gJ2FsbCcgbGlzdGVuZXIgKGAqYCkgZm9yIHRoaXMgYnJvYWRjYXN0ZXIuIFJlbW92ZSBpdCBiZWZvcmUgYWRkaW5nIGFueSBvdGhlciBsaXN0ZW5lcnM6IFwiICsgYnJvYWRjYXN0ZXJXaW5kb3dOYW1lICsgXCI6XCIgKyBldmVudE5hbWUpKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudGx5TGlzdGVuZWRUb0V2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHJlZ2lzdGVyIG11bHRpcGxlIGNhbGxiYWNrcyBmb3IgdGhlIHNhbWUgYnJvYWRjYXN0ZXIgYW5kIGV2ZW50OiBcIiArIGJyb2FkY2FzdGVyV2luZG93TmFtZSArIFwiOlwiICsgZXZlbnROYW1lKSk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gXCIqXCIgJiYgT2JqZWN0LmtleXMoY3VycmVudGx5TGlzdGVuZWRUb0V2ZW50cykubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS53YXJuKFwiQWRkaW5nIGFuICdhbGwnIGxpc3RlbmVyIG9mICcqJyB0byBhIGJyb2FkY2FzdGVyIHRoYXQgYWxyZWFkeSBoYXMgbW9yZSBzcGVjaWZpYyBsaXN0ZW5lci4gQWxsIHNwZWNpZmljIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuIEluIG9yZGVyIHRvIGF2b2lkIHRoaXMgd2FybmluZywgcmVtb3ZlIGtub3duIGxpc3RlbmVycyBtYW51YWxseSBiZWZvcmUgYWRkaW5nLlwiKTtcbiAgICAgIGN1cnJlbnRseUxpc3RlbmVkVG9FdmVudHMgPSB0aGlzLmNyb3NzT3JpZ2luRXZlbnRDYWxsYmFja0J5QnJvYWRjYXN0ZXJUaGVuRXZlbnRbYnJvYWRjYXN0ZXJXaW5kb3dOYW1lXSA9IHt9O1xuICAgIH1cblxuICAgIGN1cnJlbnRseUxpc3RlbmVkVG9FdmVudHNbZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xuXG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UoR3dNZXNzYWdlc1RvR1cuQUREX0NST1NTX09SSUdJTl9FVkVOVF9MSVNURU5FUiwge2Jyb2FkY2FzdGVyV2luZG93TmFtZSwgZXZlbnROYW1lfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgQ3Jvc3MgT3JpZ2luIEV2ZW50IExpc3RlbmVyIGZyb20gdGhlIEdXIEFwcGxpY2F0aW9uIHdpbmRvd1xuICAgKiBTZWUgR3dDcm9zc09yaWdpbkV4dGVybmFsLmFkZENyb3NzT3JpZ2luRXZlbnRMaXN0ZW5lci5cbiAgICpcbiAgICogTGlrZSBnZXQvc2V0IHZhbHVlcyB0aGlzIGZ1bmN0aW9uIHVzZXMgbG9naWNhbCBuYW1lcywgYXMgZ2l2ZW4gdG8gdGhlIGVtYmVkZGVkIHdpZGdldCB2aWFcbiAgICogdGhlIEVtYmVkZGVkV2lkZ2V0UmVmIGVsZW1lbnQuIFRob3VnaCBpbiB0aGlzIGNhc2UgdGhlIGxvZ2ljYWwgbmFtZXMgcmVmZXIgdG8gYW5vdGhlclxuICAgKiBlbWJlZGRlZCB3aWRnZXQgcmF0aGVyIHRoYW4gdG8gYW4gaW5wdXQuXG4gICAqXG4gICAqIFRoZSByZXR1cm5lZCBwcm9taXNlIGlzIG9ubHkgZm9yIGNvbmZpcm1hdGlvbiB0aGF0IHRoZSBtZXNzYWdlIHdhcyBzdWNjZXNzZnVsXG4gICAqIEBwYXJhbSBicm9hZGNhc3RlcldpbmRvd05hbWUgdGhlIGxvZ2ljYWwgbmFtZSBvZiB0aGUgd2luZG93IHlvdSB3YW50IHRvIHN0b3AgbGlzdGVuaW5nIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgbmFtZSBvZiB0aGUgZXZlbnQsIG9yIFwiKlwiIGlmIHJlZ2lzdGVyZCB0byBsaXN0ZW4gdG8gYW55IGV2ZW50XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJvbWlzZS1mdW5jdGlvbi1hc3luY1xuICBzdGF0aWMgcmVtb3ZlQ3Jvc3NPcmlnaW5FdmVudExpc3RlbmVyIChicm9hZGNhc3RlcldpbmRvd05hbWU6IEd3Q3Jvc3NPcmlnaW5XaW5kb3dOYW1lLCBldmVudE5hbWU6IEd3Q3Jvc3NPcmlnaW5FdmVudE5hbWUpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGJ5QnJvYWRjYXN0ZXIgPSB0aGlzLmNyb3NzT3JpZ2luRXZlbnRDYWxsYmFja0J5QnJvYWRjYXN0ZXJUaGVuRXZlbnRbYnJvYWRjYXN0ZXJXaW5kb3dOYW1lXTtcblxuICAgIGlmIChieUJyb2FkY2FzdGVyKSB7XG4gICAgICBpZiAoZXZlbnROYW1lID09PSBcIipcIikge1xuICAgICAgICBkZWxldGUgdGhpcy5jcm9zc09yaWdpbkV2ZW50Q2FsbGJhY2tCeUJyb2FkY2FzdGVyVGhlbkV2ZW50W2Jyb2FkY2FzdGVyV2luZG93TmFtZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgYnlCcm9hZGNhc3RlcltldmVudE5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbmRNZXNzYWdlKEd3TWVzc2FnZXNUb0dXLlJFTU9WRV9DUk9TU19PUklHSU5fRVZFTlRfTElTVEVORVIsIHticm9hZGNhc3RlcldpbmRvd05hbWUsIGV2ZW50TmFtZX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEJyb2FkY2FzdHMgYSBDcm9zcyBPcmlnaW4gRXZlbnQgKE1lc3NhZ2UpIHRvIHRoZSBHVyBBcHBsaWNhdGlvbiBjbGllbnQuIFRoZSBHVyBBcHBsaWNhdGlvbiB0aGVuIHJvdXRlcyB0aGUgbWVzc2FnZSBldmVudFxuICAgKiBhbmQgaW5mb3JtYXRpb24gcGFja2FnZSBvbiB0byBhbnkgb3RoZXIgZW1iZWRkZWQgd2luZG93cyBpbiB0aGUgYXBwbGljYXRpb24gdGhhdCBhcmUgbGlzdGVuaW5nIHRvIHRoZSBvcmlnaW4gYW5kIGV2ZW50IG5hbWUuXG4gICAqIFNlZSBHd0Nyb3NzT3JpZ2luRXh0ZXJuYWwuYWRkQ3Jvc3NPcmlnaW5FdmVudExpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJvbWlzZS1mdW5jdGlvbi1hc3luY1xuICBzdGF0aWMgYnJvYWRjYXN0Q3Jvc3NPcmlnaW5FdmVudCAoZXZlbnROYW1lOiBHd0Nyb3NzT3JpZ2luRXZlbnROYW1lLCBpbmZvOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChldmVudE5hbWUubGVuZ3RoID09PSAwIHx8IGV2ZW50TmFtZSA9PT0gXCIqXCIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbGxlZ2FsIGV2ZW50TmFtZSBwYXNzZWQgdG8gZmlyZUNyb3NzT3JpZ2luRXZlbnQuIENhbm5vdCBiZSBlbXB0eSBvciB0aGUgc2luZ2xlIGAqYCBjaGFyYWN0ZXI6IFwiICsgZXZlbnROYW1lKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UoR3dNZXNzYWdlc1RvR1cuQlJPQURDQVNUX0NST1NTX09SSUdJTl9FVkVOVCwge2V2ZW50TmFtZSwgaW5mb30pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBHdyBBcHBsaWNhdGlvbiBzZW5kcyAnZXZlbnRzJyBmb3Igc29tZSBwcmVkZWZpbmVkIGNsaWVudCByZWxhdGVkIG5vdGlmaWNhdGlvbnMsIHN1Y2ggYXMgdGhlIFRoZW1lIENoYW5naW5nLCBvciB0aGUgTG9jYWxlIGNoYW5naW5nLlxuICAgKiBUaGVyZSBpcyBhbHNvIGEgR0VORVJBTCBjYXRlZ29yeSB0aGF0IGV4aXN0cyBtYWlubHkgZm9yIGZ1dHVyZSBwcm9vZmluZy4gQWRkaXRpb25hbCBldmVudHMgbWF5IGJlIGNvbmZpZ3VyZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICogQHBhcmFtIHtHd05vdGlmaWNhdGlvblR5cGV9IG5vdGlmaWNhdGlvblR5cGVcbiAgICogQHBhcmFtIHtHd05vdGlmaWNhdGlvbkNhbGxiYWNrfSBjYWxsYmFja1xuICAgKi9cbiAgc3RhdGljIGFkZENhbGxiYWNrRm9yR3dOb3RpZmljYXRpb25UeXBlIChub3RpZmljYXRpb25UeXBlOiBHd05vdGlmaWNhdGlvblR5cGUsIGNhbGxiYWNrOiBHd05vdGlmaWNhdGlvbkNhbGxiYWNrKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3dOb3RpZmljYXRpb25MaXN0ZW5lcnNbbm90aWZpY2F0aW9uVHlwZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRpbmcgdG8gbG9hZCBtdWx0aXBsZSBjYWxsYmFja3MgZm9yIG5vdGlmaWNhdGlvbiB0eXBlOiBcIiArIG5vdGlmaWNhdGlvblR5cGUgKyBcIi4gY2FsbCByZW1vdmVDYWxsYmFja0JhY2tGb3JHV05vdGlmaWNhdGlvblR5cGUgZmlyc3QuXCIpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5nd05vdGlmaWNhdGlvbkxpc3RlbmVyc1tcIipcIl0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRpbmcgdG8gbG9hZCBhIG5vdGlmaWNhdGlvbiBsaXN0ZW5lciB3aGVuIHRoZWlyIGlzIGFscmVhZHkgYSAqIGxpc3RlbmVyLiBOZXcgbGlzdGVuZXI6IFwiICsgbm90aWZpY2F0aW9uVHlwZSk7XG4gICAgfVxuICAgIHRoaXMuZ3dOb3RpZmljYXRpb25MaXN0ZW5lcnNbbm90aWZpY2F0aW9uVHlwZV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgR3cgQXBwbGljYXRpb24gc2VuZHMgJ2V2ZW50cycgZm9yIHNvbWUgcHJlZGVmaW5lZCBjbGllbnQgcmVsYXRlZCBub3RpZmljYXRpb25zLCBzdWNoIGFzIHRoZSBUaGVtZSBDaGFuZ2luZywgb3IgdGhlIExvY2FsZSBjaGFuZ2luZy5cbiAgICogVGhlcmUgaXMgYWxzbyBhIEdFTkVSQUwgY2F0ZWdvcnkgdGhhdCBleGlzdHMgbWFpbmx5IGZvciBmdXR1cmUgcHJvb2ZpbmcuIEFkZGl0aW9uYWwgZXZlbnRzIG1heSBiZSBjb25maWd1cmVkIGluIHRoZSBmdXR1cmUuXG4gICAqIEBwYXJhbSB7R3dOb3RpZmljYXRpb25UeXBlfSBub3RpZmljYXRpb25UeXBlXG4gICAqIEBwYXJhbSB7R3dOb3RpZmljYXRpb25DYWxsYmFja30gY2FsbGJhY2tcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDYWxsYmFja0Zvckd3Tm90aWZpY2F0aW9uVHlwZSAobm90aWZpY2F0aW9uVHlwZTogR3dOb3RpZmljYXRpb25UeXBlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmd3Tm90aWZpY2F0aW9uTGlzdGVuZXJzW25vdGlmaWNhdGlvblR5cGVdKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJBdHRlbXB0aW5nIHRvIHJlbW92ZSBhIG5vbiBleGlzdGVudCBub3RpZmljYXRpb24gbGlzdGVuZXIgZm9yOiBcIiArIG5vdGlmaWNhdGlvblR5cGUpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5nd05vdGlmaWNhdGlvbkxpc3RlbmVyc1tub3RpZmljYXRpb25UeXBlXTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZW1iZWRkZWQvR3dDcm9zc09yaWdpbkV4dGVybmFsLnRzIiwiZXhwb3J0IHR5cGUgR3dSZXNvbHZlID0gKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBHd1JlamVjdCA9IChyZWFzb246IGFueSkgPT4gbmV2ZXI7XG5leHBvcnQgdHlwZSBHd0NhbGxiYWNrT25GdWxmaWxsZWQgPSAodmFsdWU6IGFueSkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIEd3Q2FsbGJhY2tPblJlamVjdGVkID0gKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgR1dQcm9taXNlRXhlY3V0b3IgPSAocmVzb2x2ZTogR3dSZXNvbHZlLCByZWplY3Q6IEd3UmVqZWN0KSA9PiB2b2lkO1xuXG5leHBvcnQgY29uc3QgZW51bSBHd1Byb21pc2VTdGF0ZSB7XG4gIC8qKiBQcm9taXNlIG5vdCB5ZXQgcmVzb2x2ZWQgKi9cbiAgUEVORElORyA9IDAsXG4gIC8qKiBQcm9taXNlIHJlc29sdmVkIHN1Y2Nlc3NmdWxseSAqL1xuICBGVUxGSUxMRUQsXG4gIC8qKiBQcm9taXNlIHJlamVjdGVkICovXG4gIFJFSkVDVEVELFxuICAvKiogUHJvbWlzZSByZWplY3RlZCwgYnV0IHRoZSBlcnJvciB3YXMgaGFuZGxlZCBzbyBpdCB3b24ndCBwcm9wYWdhdGUgdG8gY2hhaW5lZCBwcm9taXNlcyAqL1xuICBSRUpFQ1RFRF9CVVRfSEFORExFRFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEd3U3Vic2NyaWJlclBhY2thZ2Uge1xuICBzdWJzY3JpYmVyOiBHd1Byb21pc2U7XG4gIGlzRmluYWxseTogYm9vbGVhbjtcbiAgb25GdWxmaWxsOiBHd0NhbGxiYWNrT25GdWxmaWxsZWQgfCB1bmRlZmluZWQ7XG4gIG9uUmVqZWN0OiBHd0NhbGxiYWNrT25SZWplY3RlZCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJR3dUaGVuYWJsZSB7XG4gIHRoZW4gKG9uRnVsZmlsbDogR3dDYWxsYmFja09uRnVsZmlsbGVkLCBvblJlamVjdD86IEd3Q2FsbGJhY2tPblJlamVjdGVkKTogSUd3VGhlbmFibGU7XG59XG5cbi8qKlxuICogVGhpcyBmaWxlIHBvbHlmaWxscyBQcm9taXNlIG9uIHRoZSB3aW5kb3csIGlmIHdpbmRvdy5Qcm9taXNlIGlzIG5vdCBvZiB0eXBlICdmdW5jdGlvbidcbiAqIEl0J3MgYSBzdGFuZCBhbG9uZSBmaWxlLCB3aXRob3V0IGFueSBpbXBvcnRzLCBzbyBjYW4gYWxzbyBiZSBlYXNpbHkgaGFuZGVkIG9mZiB0byB0aGUgZW1iZWRkZWQgYXBwbGljYXRpb24gaWYgbmVlZGVkXG4gKi9cbmV4cG9ydCBjbGFzcyBHd1Byb21pc2UgaW1wbGVtZW50cyBJR3dUaGVuYWJsZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaWJlclBhY2thZ2VzOiBHd1N1YnNjcmliZXJQYWNrYWdlW10gPSBbXTtcbiAgcHJpdmF0ZSByZXN1bHQ6IGFueSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvciAoZXhlY3V0b3I6IEdXUHJvbWlzZUV4ZWN1dG9yIHwgbnVsbCkge1xuICAgIGlmIChleGVjdXRvcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXhlY3V0b3IodGhpcy5iZVJlc29sdmVkLmJpbmQodGhpcyksIHRoaXMuYmVSZWplY3RlZC5iaW5kKHRoaXMpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5iZVJlamVjdGVkKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIE1ETjogVGhlIHN0YXRpYyBQcm9taXNlLnJlamVjdCBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IGlzIHJlamVjdGVkLlxuICAgKiBGb3IgZGVidWdnaW5nIHB1cnBvc2VzIGFuZCBzZWxlY3RpdmUgZXJyb3IgY2F0Y2hpbmcsIGl0IGlzIHVzZWZ1bCB0byBtYWtlIHJlYXNvbiBhbiBpbnN0YW5jZW9mIEVycm9yXG4gICAqIEBwYXJhbSByZWFzb25cbiAgICogQHJldHVybnMge0d3UHJvbWlzZX1cbiAgICovXG4gIHN0YXRpYyByZWplY3QgKHJlYXNvbjogYW55KTogR3dQcm9taXNlIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IEd3UHJvbWlzZShudWxsKTtcbiAgICByZXR1cm4gcHJvbWlzZS5iZVJlamVjdGVkKHJlYXNvbik7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSBNRE46IFRoZSBQcm9taXNlLnJlc29sdmUodmFsdWUpIG1ldGhvZCByZXR1cm5zIGEgUHJvbWlzZSBvYmplY3QgdGhhdCBpcyByZXNvbHZlZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICogSWYgdGhlIHZhbHVlIGlzIGEgcHJvbWlzZSwgdGhhdCBwcm9taXNlIGlzIHJldHVybmVkOyBpZiB0aGUgdmFsdWUgaXMgYSB0aGVuYWJsZSAoaS5lLiBoYXMgYSBcInRoZW5cIiBtZXRob2QpLFxuICAgKiB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIFwiZm9sbG93XCIgdGhhdCB0aGVuYWJsZSwgYWRvcHRpbmcgaXRzIGV2ZW50dWFsIHN0YXRlO1xuICAgKiBvdGhlcndpc2UgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSBmdWxmaWxsZWQgd2l0aCB0aGUgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7R3dQcm9taXNlfVxuICAgKi9cbiAgc3RhdGljIHJlc29sdmUgKHRoZW5hYmxlT3JWYWx1ZTogYW55KTogR3dQcm9taXNlIHtcbiAgICBpZiAodGhlbmFibGVPclZhbHVlIGluc3RhbmNlb2YgR3dQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdGhlbmFibGVPclZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgR3dQcm9taXNlKG51bGwpO1xuICAgIHJldHVybiBwcm9taXNlLmJlUmVzb2x2ZWQodGhlbmFibGVPclZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIE1ETjogVGhlIFByb21pc2UuYWxsKGl0ZXJhYmxlKSBtZXRob2QgcmV0dXJucyBhIHNpbmdsZSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgb2YgdGhlIHByb21pc2VzIGluIHRoZSBpdGVyYWJsZSBhcmd1bWVudCBoYXZlIHJlc29sdmVkXG4gICAqIG9yIHdoZW4gdGhlIGl0ZXJhYmxlIGFyZ3VtZW50IGNvbnRhaW5zIG5vIHByb21pc2VzLlxuICAgKiBJdCByZWplY3RzIHdpdGggdGhlIHJlYXNvbiBvZiB0aGUgZmlyc3QgcHJvbWlzZSB0aGF0IHJlamVjdHMuXG4gICAqXG4gICAqIFJldHVybnNcbiAgICogLSBBbiBhbHJlYWR5IHJlc29sdmVkIFByb21pc2UgaWYgdGhlIGl0ZXJhYmxlIHBhc3NlZCBpcyBlbXB0eSBvciBjb250YWlucyBubyBwcm9taXNlcy5cbiAgICogLSBBIHBlbmRpbmcgUHJvbWlzZSBpbiBhbGwgb3RoZXIgY2FzZXMuIFRoaXMgcmV0dXJuZWQgcHJvbWlzZSBpcyB0aGVuIHJlc29sdmVkL3JlamVjdGVkIGFzeW5jaHJvbm91c2x5IChhcyBzb29uIGFzIHRoZSBzdGFjayBpcyBlbXB0eSlcbiAgICogICB3aGVuIGFsbCB0aGUgcHJvbWlzZXMgaW4gdGhlIGdpdmVuIGl0ZXJhYmxlIGhhdmUgcmVzb2x2ZWQsXG4gICAqICAgb3IgaWYgYW55IG9mIHRoZSBwcm9taXNlcyByZWplY3QuXG4gICAqXG4gICAqIFJldHVybmVkIHZhbHVlcyB3aWxsIGJlIGluIG9yZGVyIG9mIHRoZSBQcm9taXNlcyBwYXNzZWQsIHJlZ2FyZGxlc3Mgb2YgY29tcGxldGlvbiBvcmRlci5cbiAgICovXG4gIHN0YXRpYyBhbGwgKHByb21pc2VzOiBHd1Byb21pc2VbXSk6IEd3UHJvbWlzZSB7XG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIEd3UHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuICAgIGxldCByZW1haW5pbmc6IG51bWJlciA9IHByb21pc2VzLmxlbmd0aDtcblxuICAgIGNvbnN0IGFzeW5jTWFwcGVyRnVsZmlsbCA9IChpOiBudW1iZXIsIHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIGlmICghcmV0dXJuUHJvbWlzZS5pc1BlbmRpbmcoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHNbaV0gPSB2YWx1ZTtcbiAgICAgIHJlbWFpbmluZy0tO1xuICAgICAgaWYgKHJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICByZXR1cm5Qcm9taXNlLmJlUmVzb2x2ZWQocmVzdWx0cyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHJldHVyblByb21pc2UgPSBuZXcgR3dQcm9taXNlKChub3R1c2VkOiBHd1Jlc29sdmUsIHJlamVjdDogR3dSZWplY3QpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvbWlzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGhlbmFibGVPclZhbCA9IHByb21pc2VzW2ldO1xuICAgICAgICBpZiAoR3dQcm9taXNlLmlzVGhlbmFibGUodGhlbmFibGVPclZhbCkpIHtcbiAgICAgICAgICB0aGVuYWJsZU9yVmFsLnRoZW4oYXN5bmNNYXBwZXJGdWxmaWxsLmJpbmQodGhpcywgaSksIHJlamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXN5bmNNYXBwZXJGdWxmaWxsKGksIHRoZW5hYmxlT3JWYWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIE1ETjogVGhlIFByb21pc2UucmFjZShpdGVyYWJsZSkgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlXG4gICAqIHRoYXQgcmVzb2x2ZXMgb3IgcmVqZWN0cyBhcyBzb29uIGFzIG9uZSBvZiB0aGUgcHJvbWlzZXMgaW4gdGhlIGl0ZXJhYmxlIHJlc29sdmVzIG9yIHJlamVjdHMsXG4gICAqIHdpdGggdGhlIHZhbHVlIG9yIHJlYXNvbiBmcm9tIHRoYXQgcHJvbWlzZS5cbiAgICpcbiAgICogSWYgdGhlIGl0ZXJhYmxlIHBhc3NlZCBpcyBlbXB0eSwgdGhlIHByb21pc2UgcmV0dXJuZWQgd2lsbCBiZSBmb3JldmVyIHBlbmRpbmcuXG4gICAqXG4gICAqIElmIHRoZSBpdGVyYWJsZSBjb250YWlucyBvbmUgb3IgbW9yZSBub24tcHJvbWlzZSB2YWx1ZSBhbmQvb3IgYW4gYWxyZWFkeSByZXNvbHZlZC9yZWplY3RlZCBwcm9taXNlLFxuICAgKiB0aGVuIFByb21pc2UucmFjZSB3aWxsIHJlc29sdmUgdG8gdGhlIGZpcnN0IG9mIHRoZXNlIHZhbHVlcyBmb3VuZCBpbiB0aGUgaXRlcmFibGUuXG4gICAqXG4gICAqIEBwYXJhbSB7R3dQcm9taXNlW119IHByb21pc2VzXG4gICAqIEByZXR1cm5zIHtHd1Byb21pc2V9XG4gICAqL1xuICBzdGF0aWMgcmFjZSAocHJvbWlzZXM6IChHd1Byb21pc2UgfCBJR3dUaGVuYWJsZSB8IGFueSlbXSk6IEd3UHJvbWlzZSB7XG4gICAgY29uc3QgZXhlY3V0b3IgPSAocmVzb2x2ZTogR3dSZXNvbHZlLCByZWplY3Q6IEd3UmVqZWN0KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb21pc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRoZW5hYmxlT3JWYWx1ZSA9IHByb21pc2VzW2ldO1xuXG4gICAgICAgIGlmIChHd1Byb21pc2UuaXNUaGVuYWJsZSh0aGVuYWJsZU9yVmFsdWUpKSB7XG4gICAgICAgICAgdGhlbmFibGVPclZhbHVlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHRoZW5hYmxlT3JWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcmV0dXJuUHJvbWlzZSA9IG5ldyBHd1Byb21pc2UoZXhlY3V0b3IpO1xuXG4gICAgcmV0dXJuIHJldHVyblByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSBNRE46IFJldHVybiBBIFByb21pc2UgaW4gdGhlIHBlbmRpbmcgc3RhdGUuXG4gICAqIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCBvciBvblJlamVjdGVkKSB0aGVuIGdldHMgY2FsbGVkIGFzeW5jaHJvbm91c2x5IChhcyBzb29uIGFzIHRoZSBzdGFjayBpcyBlbXB0eSkuXG4gICAqIEFmdGVyIHRoZSBpbnZvY2F0aW9uIG9mIHRoZSBoYW5kbGVyIGZ1bmN0aW9uLCBpZiB0aGUgaGFuZGxlciBmdW5jdGlvbjpcbiAgICpcbiAgICogLSByZXR1cm5zIGEgdmFsdWUsIHRoZSBwcm9taXNlIHJldHVybmVkIGJ5IHRoZW4gZ2V0cyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm5lZCB2YWx1ZSBhcyBpdHMgdmFsdWU7XG4gICAqIC0gdGhyb3dzIGFuIGVycm9yLCB0aGUgcHJvbWlzZSByZXR1cm5lZCBieSB0aGVuIGdldHMgcmVqZWN0ZWQgd2l0aCB0aGUgdGhyb3duIGVycm9yIGFzIGl0cyB2YWx1ZTtcbiAgICogLSByZXR1cm5zIGFuIGFscmVhZHkgcmVzb2x2ZWQgcHJvbWlzZSwgdGhlIHByb21pc2UgcmV0dXJuZWQgYnkgdGhlbiBnZXRzIHJlc29sdmVkIHdpdGggdGhhdCBwcm9taXNlJ3MgdmFsdWUgYXMgaXRzIHZhbHVlO1xuICAgKiAtIHJldHVybnMgYW4gYWxyZWFkeSByZWplY3RlZCBwcm9taXNlLCB0aGUgcHJvbWlzZSByZXR1cm5lZCBieSB0aGVuIGdldHMgcmVqZWN0ZWQgd2l0aCB0aGF0IHByb21pc2UncyB2YWx1ZSBhcyBpdHMgdmFsdWUuXG4gICAqIC0gcmV0dXJucyBhbm90aGVyIHBlbmRpbmcgcHJvbWlzZSBvYmplY3QsIHRoZSByZXNvbHV0aW9uL3JlamVjdGlvbiBvZiB0aGUgcHJvbWlzZSByZXR1cm5lZCBieSB0aGVuIHdpbGwgYmUgc3Vic2VxdWVudCB0byB0aGUgcmVzb2x1dGlvbi9yZWplY3Rpb24gb2YgdGhlIHByb21pc2UgcmV0dXJuZWQgYnkgdGhlIGhhbmRsZXIuXG4gICAqICAgQWxzbywgdGhlIHZhbHVlIG9mIHRoZSBwcm9taXNlIHJldHVybmVkIGJ5IHRoZW4gd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgdmFsdWUgb2YgdGhlIHByb21pc2UgcmV0dXJuZWQgYnkgdGhlIGhhbmRsZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7R3dDYWxsYmFja09uRnVsZmlsbGVkIHwgdW5kZWZpbmVkfSBvbkZ1bGZpbGxcbiAgICogQHBhcmFtIHtHd0NhbGxiYWNrT25SZWplY3RlZH0gb25SZWplY3RcbiAgICogQHJldHVybnMge0d3UHJvbWlzZX1cbiAgICovXG4gIHRoZW4gKG9uRnVsZmlsbDogR3dDYWxsYmFja09uRnVsZmlsbGVkIHwgdW5kZWZpbmVkLCBvblJlamVjdD86IEd3Q2FsbGJhY2tPblJlamVjdGVkKTogR3dQcm9taXNlIHtcbiAgICByZXR1cm4gdGhpcy5hZGRTdWJzY3JpYmVyKGZhbHNlLCBvbkZ1bGZpbGwsIG9uUmVqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIE1ETjogVGhlIGNhdGNoKCkgbWV0aG9kIHJldHVybnMgYSBQcm9taXNlIGFuZCBkZWFscyB3aXRoIHJlamVjdGVkIGNhc2VzIG9ubHkuXG4gICAqIEl0IGJlaGF2ZXMgdGhlIHNhbWUgYXMgY2FsbGluZyBQcm9taXNlLnByb3RvdHlwZS50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZClcbiAgICogKGluIGZhY3QsIGNhbGxpbmcgb2JqLmNhdGNoKG9uUmVqZWN0ZWQpIGludGVybmFsbHkgY2FsbHMgb2JqLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKSkuXG4gICAqIEBwYXJhbSB7R3dDYWxsYmFja09uUmVqZWN0ZWR9IG9uRXJyb3JcbiAgICogQHJldHVybnMge0d3UHJvbWlzZX1cbiAgICovXG4gIGNhdGNoIChvbkVycm9yOiBHd0NhbGxiYWNrT25SZWplY3RlZCk6IEd3UHJvbWlzZSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uRXJyb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyb20gTUROOiBUaGUgZmluYWxseSgpIG1ldGhvZCBjYW4gYmUgdXNlZnVsIGlmIHlvdSB3YW50IHRvIGRvIHNvbWUgcHJvY2Vzc2luZyBvciBjbGVhbnVwIG9uY2UgdGhlIHByb21pc2UgaXMgc2V0dGxlZCwgcmVnYXJkbGVzcyBvZiBpdHMgb3V0Y29tZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25GaW5hbGx5XG4gICAqIEByZXR1cm5zIHtHd1Byb21pc2V9XG4gICAqL1xuICBmaW5hbGx5IChvbkZpbmFsbHk6IEZ1bmN0aW9uKTogR3dQcm9taXNlIHtcbiAgICBjb25zdCBjYWxsT25GaW5hbGx5ID0gKHZhbDogYW55KSA9PiB7XG4gICAgICBvbkZpbmFsbHkoKTtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5hZGRTdWJzY3JpYmVyKHRydWUsIGNhbGxPbkZpbmFsbHksIGNhbGxPbkZpbmFsbHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTdWJzY3JpYmVyIChpc0ZpbmFsbHk6IGJvb2xlYW4sIG9uRnVsZmlsbDogR3dDYWxsYmFja09uRnVsZmlsbGVkIHwgdW5kZWZpbmVkLCBvblJlamVjdD86IEd3Q2FsbGJhY2tPblJlamVjdGVkKTogR3dQcm9taXNlIHtcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gbmV3IEd3UHJvbWlzZShudWxsKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlclBhY2thZ2VzLnB1c2goe3N1YnNjcmliZXIsIGlzRmluYWxseSwgb25GdWxmaWxsLCBvblJlamVjdH0pO1xuXG4gICAgaWYgKHRoaXMuaXNGdWxmaWxsZWQoKSB8fCB0aGlzLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnlTdWJzY3JpYmVycyAoKTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGFnYXRlU3VjY2VzcyA9ICB0aGlzLnN0YXRlICE9PSBHd1Byb21pc2VTdGF0ZS5SRUpFQ1RFRDtcbiAgICB0aGlzLnN1YnNjcmliZXJQYWNrYWdlcy5mb3JFYWNoKChzdWJzY3JpYmVyUGFja2FnZSkgPT4ge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBwcm9wYWdhdGVTdWNjZXNzID8gc3Vic2NyaWJlclBhY2thZ2Uub25GdWxmaWxsIDogc3Vic2NyaWJlclBhY2thZ2Uub25SZWplY3Q7XG4gICAgICBsZXQgZXJyb3I7XG4gICAgICBsZXQgZmluYWxWYWx1ZSA9IHRoaXMucmVzdWx0O1xuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaW5hbFZhbHVlID0gY2FsbGJhY2sodGhpcy5yZXN1bHQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZXJyb3IgPSBlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBzdWJzY3JpYmVyUGFja2FnZS5zdWJzY3JpYmVyO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHN1YnNjcmliZXIuYmVSZWplY3RlZChlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHByb3BhZ2F0ZVN1Y2Nlc3MpIHtcbiAgICAgICAgc3Vic2NyaWJlci5iZVJlc29sdmVkKGZpbmFsVmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Vic2NyaWJlci5iZVJlamVjdGVkKGZpbmFsVmFsdWUsIGZhbHNlLCBjYWxsYmFjayAmJiAhc3Vic2NyaWJlclBhY2thZ2UuaXNGaW5hbGx5KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc3Vic2NyaWJlclBhY2thZ2VzLmxlbmd0aCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNwZWNzIHJlcXVpcmUgc3VwcG9ydCBmb3Igbm9uIFByb21pc2Ugb2JqZWN0cyB0aGF0IHN0aWxsIHN1cHBvcnQgY2FsbGluZyAudGhlbigpXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7dmFsdWUgaXMgSUd3VGhlbmFibGV9XG4gICAqL1xuICBzdGF0aWMgaXNUaGVuYWJsZSAodmFsdWU6IGFueSk6IHZhbHVlIGlzIElHd1RoZW5hYmxlIHtcbiAgICByZXR1cm4gdGhpcy5pc09iamVjdE9yRnVuY3Rpb24odmFsdWUpICYmIHRoaXMuaXNGdW5jdGlvbigodmFsdWUgYXMgYW55KS50aGVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VzIFwiaGlkZGVuXCIgcHJpdmF0ZSB2YXJpYWJsZSB0byBlbnN1cmUgdGhhdCBsb2NraW5nIGluIGlzIGEgb25lLXdheSBkb29yXG4gICAqIFRoaXMgaXMgbW9zdGx5IGp1c3QgZXh0cmEgYXJtb3IgdG8gZW5zdXJlIHRoZSBndXRzIG9mIHRoZSBwcm9taXNlIGFyZSBmdW5jdGlvbmluZyBjb3JyZWN0bHkuXG4gICAqL1xuICBwcml2YXRlIGxvY2tJbiAoKTogdm9pZCB7XG4gICAgKHRoaXMgYXMgYW55KS5fbG9ja2VkSW4gPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0xvY2tlZEluICgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEodGhpcyBhcyBhbnkpLl9sb2NrZWRJbjtcbiAgfVxuXG4gIGdldCBzdGF0ZSAoKTogR3dQcm9taXNlU3RhdGUge1xuICAgIHJldHVybiAodGhpcyBhcyBhbnkpLl9zdGF0ZSB8fCBHd1Byb21pc2VTdGF0ZS5QRU5ESU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXMgXCJoaWRkZW5cIiBwcml2YXRlIHZhcmlhYmxlIHRvIGVuc3VyZSB0aGF0IHNldHRpbmcgc3RhdGUgY2FuIG9ubHkgYWR2YW5jZVxuICAgKiBUaHJvd3Mgd2hlbiB0cnlpbmcgdG8gc2V0IHN0YXRlLCBhbmQgdGhlIHN0YXRlIGlzIGFscmVhZHkgc29tZXRoaW5nIG90aGVyIHRoYW4gcGVuZGluZ1xuICAgKiBUaGlzIGlzIG1vc3RseSBqdXN0IGV4dHJhIGFybW9yIHRvIGVuc3VyZSB0aGUgZ3V0cyBvZiB0aGUgcHJvbWlzZSBhcmUgZnVuY3Rpb25pbmcgY29ycmVjdGx5XG4gICAqIEBwYXJhbSB7R3dQcm9taXNlU3RhdGV9IHN0YXRlXG4gICAqL1xuICBzZXQgc3RhdGUgKHN0YXRlOiBHd1Byb21pc2VTdGF0ZSkge1xuICAgIGlmICh0aGlzLmlzU2V0dGxlZCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdHRlbXB0ZWQgdG8gc2V0IHN0YXRlIG9uIGEgcHJvbWlzZSB0aGF0J3MgYWxyZWFkeSBiZWVuIHNldHRsZWQuXCIpO1xuICAgIH1cblxuICAgICh0aGlzIGFzIGFueSkuX3N0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5sb2NrSW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCByZWN1cnNpdmVseSBpZiB0aGUgdmFsdWUgaW4gYSB0aGVuYWJsZS5cbiAgICogSG93ZXZlciwgdGhpcyBjb3VsZCBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgXCJyYWNlXCIuIEJ1dCB3ZSBvbmx5IHdhbnQgdGhlIGZpcnN0IG9uZSB0byBwcm9jZWVkLlxuICAgKiBTbyB3ZSB0ZWxsIHRoZSBwcm9taXNlIHRoYXQgaXQncyBiZWVuIFwibG9ja2VkIGluXCIgb25jZSB0aGlzIGhhcyBiZWVuIGNhbGxlZCBvbmNlIGFuZCB3ZSBiYWlsIG9uIHN1YnNlcXVlbnQgY2FsbHMuXG4gICAqIEJ1dCBpZiB0aGUgdmFsdWUgaXMgYSBwcm9taXNlLi4udGhlbiBpdCB3YW50cyB0byBjYWxsIHRoaXMgcmVjdXJzaXZlbHkuLi5zbyB3ZSBnaXZlIGl0IHRoZSBcImZvcmNlVG9SdW5FdmVuSWZMb2NrZWRcIiBvcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHRoZW5hYmxlT3JWYWx1ZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlVG9SdW5FdmVuSWZMb2NrZWRcbiAgICogQHJldHVybnMge3RoaXN9XG4gICAqL1xuICBwcml2YXRlIGJlUmVzb2x2ZWQgKHRoZW5hYmxlT3JWYWx1ZTogYW55LCBmb3JjZVRvUnVuRXZlbklmTG9ja2VkOiBib29sZWFuID0gZmFsc2UpOiB0aGlzIHtcbiAgICBpZiAodGhlbmFibGVPclZhbHVlID09PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGYuXCIpO1xuICAgIH1cblxuICAgIC8vVW5sZXNzIHRoZSBjaGFpbiBvZiByZXNvbHV0aW9uIGhhcyBjYWxsZWQgdGhpcyBtZXRob2Qgd2l0aCBcImZvcmNlVG9SdW5FdmVuSWZMb2NrZWRcIiB0aGVuIGJhaWwgaWYgbG9ja2VkXG4gICAgaWYgKCFmb3JjZVRvUnVuRXZlbklmTG9ja2VkICYmIHRoaXMuaXNMb2NrZWRJbigpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBBbHdheXMgYmFpbCBpZiB3ZSdyZSBhbHJlYWR5IHNldHRsZWRcbiAgICBpZiAodGhpcy5pc1NldHRsZWQoKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5sb2NrSW4oKTtcblxuICAgIGlmIChHd1Byb21pc2UuaXNUaGVuYWJsZSh0aGVuYWJsZU9yVmFsdWUpKSB7XG4gICAgICB0aGVuYWJsZU9yVmFsdWUudGhlbigodmFsKSA9PiB0aGlzLmJlUmVzb2x2ZWQodmFsLCB0cnVlKSwgKHZhbCkgPT4gdGhpcy5iZVJlamVjdGVkKHZhbCwgdHJ1ZSkpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IEd3UHJvbWlzZVN0YXRlLkZVTEZJTExFRDtcbiAgICB0aGlzLnJlc3VsdCA9IHRoZW5hYmxlT3JWYWx1ZTtcblxuICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgYmVSZWplY3RlZCAocmVhc29uOiBhbnksIGZvcmNlVG9SdW5FdmVuSWZMb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZSwgcmVqZWN0aW9uV2FzSGFuZGxlZDogYm9vbGVhbiA9IGZhbHNlKTogdGhpcyB7XG4gICAgaWYgKHJlYXNvbiA9PT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmLlwiKTtcbiAgICB9XG5cbiAgICAvL1VubGVzcyB0aGUgY2hhaW4gb2YgcmVzb2x1dGlvbiBoYXMgY2FsbGVkIHRoaXMgbWV0aG9kIHdpdGggXCJmb3JjZVRvUnVuRXZlbklmTG9ja2VkXCIgdGhlbiBiYWlsIGlmIGxvY2tlZFxuICAgIGlmICghZm9yY2VUb1J1bkV2ZW5JZkxvY2tlZCAmJiB0aGlzLmlzTG9ja2VkSW4oKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gQWx3YXlzIGJhaWwgaWYgd2UncmUgYWxyZWFkeSBzZXR0bGVkXG4gICAgaWYgKHRoaXMuaXNTZXR0bGVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMubG9ja0luKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlamVjdGlvbldhc0hhbmRsZWQgPyBHd1Byb21pc2VTdGF0ZS5SRUpFQ1RFRF9CVVRfSEFORExFRCA6IEd3UHJvbWlzZVN0YXRlLlJFSkVDVEVEO1xuICAgIHRoaXMucmVzdWx0ID0gcmVhc29uO1xuXG4gICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycygpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0UmVzdWx0ICgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgfVxuXG4gIGlzU2V0dGxlZCAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNGdWxmaWxsZWQoKSB8fCB0aGlzLmlzUmVqZWN0ZWQoKTtcbiAgfVxuXG4gIGlzUGVuZGluZyAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IEd3UHJvbWlzZVN0YXRlLlBFTkRJTkc7XG4gIH1cblxuICBpc0Z1bGZpbGxlZCAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IEd3UHJvbWlzZVN0YXRlLkZVTEZJTExFRDtcbiAgfVxuXG4gIGlzUmVqZWN0ZWQgKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBHd1Byb21pc2VTdGF0ZS5SRUpFQ1RFRCB8fCB0aGlzLnN0YXRlID09PSBHd1Byb21pc2VTdGF0ZS5SRUpFQ1RFRF9CVVRfSEFORExFRDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzT2JqZWN0T3JGdW5jdGlvbiAodmFsOiBhbnkpOiB2YWwgaXMgb2JqZWN0IHwgRnVuY3Rpb24ge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbDtcbiAgICByZXR1cm4gdmFsICE9PSBudWxsICYmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiZnVuY3Rpb25cIik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc0Z1bmN0aW9uICh2YWw6IGFueSk6IHZhbCBpcyBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwiZnVuY3Rpb25cIjtcbiAgfVxufVxuXG4vLyBQb2x5ZmlsbFxuaWYgKHdpbmRvdyAmJiB0eXBlb2YgKHdpbmRvdyBhcyBhbnkpLlByb21pc2UgIT09IFwiZnVuY3Rpb25cIikge1xuICAod2luZG93IGFzIGFueSkuUHJvbWlzZSA9IEd3UHJvbWlzZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2VtYmVkZGVkL0d3UHJvbWlzZS50cyJdLCJzb3VyY2VSb290IjoiIn0=