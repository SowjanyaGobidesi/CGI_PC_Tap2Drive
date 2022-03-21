import { GwOrderDependentInitializableSystem } from "./util/GwOrderDependentInitializableSystem";
import { GwMap, GwPartialReloadDetails } from "../types/gwTypes";
import { GwMessageEvent, GwNotificationType } from "../types/gwCrossOriginTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * Together with GwCrossOriginExternal, this class makes up the API for for the GW Application Cross Origin Messaging System
 * Messages and Actions can be sent to embedded Widgets with windows hosting external domains.
 *
 * These external domains should include the code located in GwCrossOriginExternal to complete the API
 *
 * All communication across domains is done via window.postMessage which is a source for cross site scripting attacks.
 * So be aware whenever working in these 2 files.
 *
 * MDN window reference documentation:
 * Window.open (to spawn a new window and then reference it),
 * Window.opener (to reference the window that spawned this one),
 * HTMLIFrameElement.contentWindow (to reference an embedded <iframe> from its parent window),
 * Window.parent (to reference the parent window from within an embedded <iframe>), or
 * Window.frames + an index value (named or numeric).
 */
export declare class GwCrossOriginInternal extends GwOrderDependentInitializableSystem {
    private readonly _crossOriginWindowsById;
    private readonly _crossOriginEventListenersByBroadcasterThenEvent;
    private _nextId;
    orderSpecificInit(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    getSystemName(): string;
    /**
     * Uses window.open to spawn or replace a window connected to a specified widgetId and popup window or tab name
     * @param {string} embeddedWidgetId
     * @param {string} url
     * @param {string} popUpOrTabName
     * @param {string} windowFeatures
     * @param logicalNameToIdMap
     * @returns {Window}
     */
    createPopupWindow(embeddedWidgetId: string, url: string, popUpOrTabName: string, logicalNameToIdMap?: GwMap, windowFeatures?: string): Window;
    sendGwNotificationEventToAllTargetWindows(type: GwNotificationType, info: any): void;
    /**
     * Primary router for receiving messages from target window.
     * Is bound the the "message" event listener on the application window.
     * Should not be called directly.
     * @param {GwMessageEvent} event
     */
    receiveMessageFromTargetWindow(event: GwMessageEvent): void;
    private getWindowInfoForEvent(event);
    /**
     * Receives a crossOrigin broadcast from one window, looks up if any other windows are listening to it and forwards it on.
     * @param {number} messageId
     * @param eventNameAndInfo
     * @param {GwWindowInfo} windowInfo
     */
    private receiveBroadcastCrossOriginEventFromTargetWindow(messageId, eventNameAndInfo, windowInfo);
    private receiveRemoveCrossOriginEventListenerFromTargetWindow(messageId, eventRequest, windowInfo);
    private receiveAddCrossOriginEventListenerFromTargetWindow(messageId, eventRequest, windowInfo);
    private receiveNonBlockingServerRequestMessageFromTargetWindow(messageId, map, windowInfo);
    private sendNonBlockingServerRequestResponse(windowName, info, responseToMessageId?, status?);
    private receiveFireActionMessageFromTargetWindow(messageId, map, windowInfo);
    private receiveSetValuesMessageFromTargetWindow(messageId, logicalNamesToValues, windowInfo);
    private receiveGetValuesMessageFromTargetWindow(messageId, logicalNames, windowInfo);
    sendConfirmationToTargetWindow(windowName: string, responseToMessageId: number, error: Error | string | null): number;
    /**
     * The Primary means of communicating with targetWindows. All current API is implemented as helper methods that eventually call this method.
     * @param {string} windowName
     * @param {GwMessagesFromGW} action
     * @param data
     * @param {number | null} responseToMessageId
     * @param {GwMessageStatus} status
     * @returns {number}
     */
    private sendMessageToTargetWindow(windowName, action, data?, responseToMessageId?, status?);
    private unregisterObsoleteEmbeddedWidgets();
    private removeAllCrossOriginEventListenersFor(id);
    /**
     * Called by orderDependentInit
     * 1. looks for EmbeddedWidgets in the DOM.
     * 2. reads various inline data attributes off of them.
     * 3. builds an iframe using the attributes
     * 4. initializes the iframe with an initial get or post request
     * 5. registers the iframe, so we can receive messages from it (and post them back)
     */
    private iterateEmbeddedWidgets();
    private createIFrame(parentElement);
    private submitGetToIFrame(iframe, url, contextProviderMap?);
    private createAndSubmitFormToIFrame(parentElement, iframe, url, contextProviderMap?);
    private registerWindow(id, windowOrigin, targetWindow, logicalNameToIdMap?);
    private verifyOrigin(eventUrl, expectedOriginUrl);
    private getOriginUrl(fullURL);
    private translateLogicalNameToId(windowInfo, logicalName);
    private translateIdToLogicalName(windowInfo, id);
    private registerCustomEventHandlers();
}
export declare const gwCrossOriginInternal: GwCrossOriginInternal;
