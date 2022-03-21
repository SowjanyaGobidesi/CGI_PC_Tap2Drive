/// <reference types="jquery" />
import { GwRegisteredSystem } from "./GwRegisteredSystem";
import { GwAjaxResponseStatus, GwMap } from "../../types/gwTypes";
import ErrorTextStatus = JQuery.Ajax.ErrorTextStatus;
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare type SuccessCallback = (response: any) => void;
export declare type ErrorCallback = (request: JQueryXHR, response: any, errorType: GwAjaxResponseStatus, httpErrorString: string | null) => boolean | void;
export declare class GwAjax extends GwRegisteredSystem {
    private ajaxRequestCount;
    getSystemName(): string;
    /**
     * Returns true if there any requests pending
     */
    hasPendingAjaxRequests(): boolean;
    /**
     * Gets the current CSRF token for a new request to the server.
     */
    getCsrfToken(): string;
    /**
     * @public
     * utility method for making a custom Ajax request to the server. If the call succeeds the given callback
     * is called, with the response, status text and Ajax request object as arguments. If the call fails the
     * optional error callback is called with optional GwAjaxResponseStatus and optional response as arguments; it should just be used
     * to clean up but if certain errorCallback wants to take over displaying the message it can return true
     * to indicate no standard error display is needed after the errorCallback. Any actual error handling will be dealt with
     * by the standard "handleFailedRequest" routine.
     */
    ajaxRequest(parameters: GwMap, successCallback: SuccessCallback, errorCallback?: ErrorCallback): void;
    /**
     * Called on a successful response from the server. Inspects the response for errors, if none are present hands
     * the response off to the registered callback.
     */
    private onRequestSuccess(request, response, successCallback, errorCallback?);
    /**
     * Called on a failed request to the server, either because the request itself failed or because
     * the server responded that an error occurred during processing.
     *
     * Gives the caller's ErrorCallback a chance to handle the issue. If it isn't handled,
     * the general error handling takes over.
     */
    onRequestError(request: any, errorStatus: ErrorTextStatus | null, httpErrorString: string, errorCallback?: ErrorCallback, response?: any): void;
    private determineErrorType(response, status);
    private readonly serverErrorHandlers;
    /**
     * Adds a custom error handler that will be called when an ajax request fails.
     */
    addServerErrorHandler(errorHandler: ErrorCallback): ErrorCallback;
    /**
     * Removes the given error handler from the current set of handlers.
     */
    removeServerErrorHandler(errorHandler: ErrorCallback): void;
    /**
     * Handles a failed Ajax request, calling any registered error handlers. An Ajax request is considered
     * "failed" if the server did not respond at all, either a timeout occurs, or some other 500 is returned
     * by the server.
     */
    handleFailedRequest(request: JQueryXHR, response: any, errorType: GwAjaxResponseStatus, httpErrorString: string): void;
    private callServerErrorHandlers(request, response, errorType, httpErrorString);
    private timedOut(request, response, errorType);
    private loggedOut(request, response);
    private httpError(request, response, errorType, httpErrorString);
    private alertDisplayable(request, response);
    private badResponse(request, response, errorType);
}
export declare const gwAjax: GwAjax;
