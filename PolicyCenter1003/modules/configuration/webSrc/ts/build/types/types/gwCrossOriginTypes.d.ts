export declare type GwKeyValue<T> = {
    [key: string]: T;
};
/**
 * Types used by embedded widgets when communicating with InsuranceSuite via the GwCrossOriginExternal API
 */
export declare const enum GwMessagesToGW {
    SET_VALUES = 0,
    GET_VALUES = 1,
    FIRE_ACTION = 2,
    NON_BLOCKING_SERVER_REQUEST = 3,
    BROADCAST_CROSS_ORIGIN_EVENT = 4,
    ADD_CROSS_ORIGIN_EVENT_LISTENER = 5,
    REMOVE_CROSS_ORIGIN_EVENT_LISTENER = 6,
}
export declare const enum GwMessagesFromGW {
    VALUES = 0,
    RESPONSE_FROM_NON_BLOCKING_SERVER_REQUEST = 1,
    CONFIRMATION_ONLY = 2,
    RECEIVE_CROSS_ORIGIN_EVENT = 3,
    RECEIVE_GW_NOTIFICATION = 4,
}
export declare const enum GwNotificationType {
    LOCALE_CHANGED = 0,
    THEME_CHANGED = 1,
    GENERAL = 2,
}
export declare const enum GwMessageStatus {
    SUCCEEDED = 0,
    WARNING = 1,
    FAILED = 2,
    PENDING = 3,
    NONE = 4,
}
export interface GwMessageData {
    [key: string]: any;
    gwMessageType: GwMessagesFromGW | GwMessagesToGW;
    gwPayload: any;
    gwStatus: GwMessageStatus;
    gwMessageId: number;
    gwResponseToMessageId: number | null;
    gwNonGwOriginIfAny?: string;
}
export interface GwMessageEvent extends MessageEvent {
    data: GwMessageData;
}
export interface GwNotification {
    type: GwNotificationType;
    timestamp: number;
    info: any;
}
export declare type GwNotificationCallback = (notification: GwNotification) => void;
export interface GwCrossOriginEvent {
    eventName: GwCrossOriginEventName;
    broadcasterWindowId: GwCrossOriginWindowName;
    timestamp: number;
    info: any;
}
export declare type GwCrossOriginEventListenerCallback = (eventInfo: GwCrossOriginEvent) => void;
export declare type GwCrossOriginWindowName = string;
export declare type GwCrossOriginEventName = string;
export declare type GwCrossOriginEventRequest = {
    broadcasterWindowName: GwCrossOriginWindowName;
    eventName: GwCrossOriginEventName;
};
