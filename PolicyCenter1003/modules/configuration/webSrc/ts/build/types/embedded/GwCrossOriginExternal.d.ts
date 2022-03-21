import { GwCrossOriginEventListenerCallback, GwCrossOriginEventName, GwCrossOriginWindowName, GwKeyValue, GwMessageEvent, GwNotificationCallback, GwNotificationType } from "../types/gwCrossOriginTypes";
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
export declare abstract class GwCrossOriginExternal {
    private static nextMessageId;
    private static initialized;
    private static originForGwApp;
    private static readonly messagesAwaitingResponse;
    private static readonly crossOriginEventCallbackByBroadcasterThenEvent;
    private static readonly gwNotificationListeners;
    private static whiteListedDomains;
    private static ownerWindow;
    private static messageEventListener;
    private constructor();
    /**
     * Required Initializer for the GwCrossOriginExternal API.
     * Adds a 'message' event listener to the global window
     * @param {string} originForGwApp - the origin of the window (running the GW Application) that spawned this window
     * @param {Window} forcedOwnerWindow - primarily used for testing and mocking. Replaces all calls to the global window.
     */
    static init(originForGwApp: string, whiteListedDomains: GwKeyValue<true> | "*", forcedOwnerWindow?: Window): void;
    static isInitialized(): boolean;
    /**
     * Disables the API. Removing any setup done in the init method.
     */
    static kill(): void;
    private static throwIfUntrustedOrigin(event);
    /**
     * The Primary Router for All Messages Received from the GW Application
     * It is bound the "message" event listener on the parent window.
     *
     * THERE IS NO REASON TO CALL THIS METHOD DIRECTLY
     * @param {GwMessageEvent} event
     */
    static receiveMessageFromGwApp(event: GwMessageEvent): void;
    /**
     * Helper. Retrieves GwMessageAwaitingResponseInfo while logging errors along the way
     * @param {GwMessageData} data
     * @returns {GwMessageAwaitingResponseInfo<any> | null}
     */
    private static getAwaitingInfoForCorrespondingMessageData(data);
    /**
     * Promise Resolver.
     * Takes a GwMessageData object.
     * Locates locally stored promises relating the the message, and fires fulfil or reject based on message status.
     * @param {GwMessageData} data
     */
    private static receiveMessage(data);
    private static receiveNonBlockingServerRequestReponseMessage(data);
    private static receiveValuesMessage(data);
    private static receiveConfirmationOnlyMessage(data);
    private static receiveCrossOriginEvent(data);
    private static receiveGwNotification(data);
    private static receiveNonConformingMessageTypeFromGwApp(event);
    /**
     * Private Primary router for all outgoing messages to the Gw Application.
     * @param {GwMessagesToGW} messageType
     * @param payload
     * @param {number | null} responseToMessageId
     * @returns {Promise<any>}
     */
    private static sendMessage(messageType, payload, responseToMessageId?);
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
    static setValues(logicalNameToValueMap: GwKeyValue<string>): Promise<GwKeyValue<string>>;
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
    static getValues(logicalNames: string[]): Promise<GwKeyValue<string>>;
    /**
     * Calls the Embedded Widget's server side ACTION HANDLER with the given JSON
     * object as its argument. This will cause a full UI refresh.
     *
     * The returned promise is only for confirmation that the message was successful, not the result of the action on the server
     * @param {string} jsonPayload
     * @returns {Promise<any>}
     */
    static fireActionOnServer(payload: GwKeyValue<any>): Promise<any>;
    /**
     * Calls the Embedded Widget's server side UPDATE HANDLER with the given object
     * object as its argument. This will not block or refresh the GW Application UI.
     *
     * NOTE: The Promise returned by this method will contain the payload from this request.
     */
    static makeNonBlockingServerRequest(payload: GwKeyValue<any>): Promise<any>;
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
    static addCrossOriginEventListener(broadcasterWindowName: GwCrossOriginWindowName, eventName: GwCrossOriginEventName, callback: GwCrossOriginEventListenerCallback): Promise<any>;
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
    static removeCrossOriginEventListener(broadcasterWindowName: GwCrossOriginWindowName, eventName: GwCrossOriginEventName): Promise<any>;
    /**
     * Broadcasts a Cross Origin Event (Message) to the GW Application client. The GW Application then routes the message event
     * and information package on to any other embedded windows in the application that are listening to the origin and event name.
     * See GwCrossOriginExternal.addCrossOriginEventListener.
     *
     * @param {string} eventName
     * @returns {Promise<any>}
     */
    static broadcastCrossOriginEvent(eventName: GwCrossOriginEventName, info: any): Promise<any>;
    /**
     * The Gw Application sends 'events' for some predefined client related notifications, such as the Theme Changing, or the Locale changing.
     * There is also a GENERAL category that exists mainly for future proofing. Additional events may be configured in the future.
     * @param {GwNotificationType} notificationType
     * @param {GwNotificationCallback} callback
     */
    static addCallbackForGwNotificationType(notificationType: GwNotificationType, callback: GwNotificationCallback): void;
    /**
     * The Gw Application sends 'events' for some predefined client related notifications, such as the Theme Changing, or the Locale changing.
     * There is also a GENERAL category that exists mainly for future proofing. Additional events may be configured in the future.
     * @param {GwNotificationType} notificationType
     * @param {GwNotificationCallback} callback
     */
    static removeCallbackForGwNotificationType(notificationType: GwNotificationType): void;
}
