/// <reference types="jquery" />
import ErrorCallback = JQuery.Ajax.ErrorCallback;
import { GwForcedEvent } from "../core/events/GwForcedEvent";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwBreaker {
}
export declare const GW_BREAKER: GwBreaker;
export declare type GwNavigationPredicate = (node: GwDomNode, methodName: GwNavDirection, info: GwMap, event: GwEventType) => boolean;
export declare type GwMap = {
    [key: string]: any;
};
export declare type GwTypedMap<T> = {
    [key: string]: T;
};
export declare type GwNotNullNotUndefined = object | string | number | boolean | symbol;
export declare type GwValueWidgetElement = HTMLDivElement | HTMLSpanElement;
export declare type GwInputElement = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
export declare type GwDomNode = GwValueWidgetElement | GwInputElement | HTMLOptionElement;
export declare type GwClassIdTagOrNode = string | GwDomNode;
export declare type GwContextNode = GwDomNode | HTMLDocument;
export declare type GwDomNodeList = GwDomNode[] | NodeListOf<Element> | JQuery;
export declare type GwIterable = any[] | string | HTMLCollection | NodeList | JQuery | GwMap;
export declare type GwIterationCallback = (value: any, key: string, collection: GwIterable, mockIndex: number) => GwBreaker | void;
export declare type GwIterationMapper = (value: any, key: string, collection: GwIterable, mockIndex: number) => any;
export declare type GwEventType = Event | GwForcedEvent;
export declare type GwAction = (node: GwDomNode, args: GwMap, event?: GwEventType, optCb?: Function) => void;
export declare type GwErrorCallback = ErrorCallback<void>;
export declare type GwEventListener = (this: HTMLElement, ev: Event) => boolean;
export declare const enum GwShortcutOwner {
    CENTER = "CENTER",
    SOUTH = "SOUTH",
    NULL = "NULL",
}
export declare const enum GwPanel {
    NORTH = "N",
    SOUTH = "S",
    WEST = "W",
    CENTER = "C",
}
export declare const enum GwAjaxResponseStatus {
    OK = 0,
    UNEXPECTED_RESPONSE = 1,
    LOGOUT = 2,
    DISPLAYABLE_ERROR = 3,
    FATAL_ERROR = 4,
    TIMEOUT = 5,
}
/**
 * Methods return value corresponds to "should prevent default"
 */
export interface GwKeyboardNavigation {
    up(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
    down(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
    left(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
    right(node: GwDomNode, info: GwMap, event: GwEventType): boolean;
}
export declare type GwNavDirection = "up" | "down" | "left" | "right";
export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
export interface GwValueAndCursorPos {
    value: string;
    cursorPos: number;
}
export interface HTMLCheckboxElement extends HTMLInputElement {
    checked: boolean;
    defaultChecked: boolean;
    value: "on" | string;
    type: "checkbox";
}
export interface HTMLRadioElement extends HTMLInputElement {
    checked: boolean;
    defaultChecked: boolean;
    value: "on" | string;
    type: "radio";
}
export declare type HTMLCheckboxOrRadioElement = HTMLCheckboxElement | HTMLRadioElement;
export interface HTMLTextInputElement extends HTMLInputElement {
    type: "text" | "url" | "tel" | "search" | "password" | "email" | "number" | "date" | "datetime-local" | "hidden";
}
export interface HTMLFileInputElement extends HTMLInputElement {
    type: "file";
}
export declare enum GwPartialReloadReason {
    REPLACE_ITEMS = 0,
    REPLACE_BODY = 1,
    THEME_CHANGE = 2,
    ERROR = 3,
}
export interface GwPartialReloadDetails {
    readonly reason: GwPartialReloadReason;
    readonly ids?: string[];
}
export declare type GwPointerType = "mouse" | "pen" | "touch";
