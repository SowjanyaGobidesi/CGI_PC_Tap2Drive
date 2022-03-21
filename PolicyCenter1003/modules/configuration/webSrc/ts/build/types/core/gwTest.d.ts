import { GwMap } from "../types/gwTypes";
import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwTest extends GwRegisteredSystem {
    getSystemName(): string;
    private readyCounter;
    private timeoutReadyCounter;
    private animationFrameReadyCounter;
    private readonly logOptions;
    private readonly eventFieldsToBeLogged;
    private originalConsoleLogFunction;
    private savedLogOutput;
    /**
     * Used for making sure the UI has settled from any previous action when testing the UI. Callers should first
     * call this method, which will return a non negative and non zero count value. Then they should call isUiReady
     * repeatedly with the count returned by this method as its argument, until it returns true
     * @returns {number}
     */
    prepareForUiReady(): number;
    /**
     * Used for making sure the UI has settled from any previous action when testing the UI. Callers should first
     * call this prepareForUiReady, which will return a non negative and non zero count value. Then they should call
     * this method repeatedly with the count returned by prepareForUiReady as its argument, until it returns true
     * @returns {boolean}
     */
    isUiReady(count: number): boolean;
    private elementToString(el);
    private svgElementToString(el);
    private eventToString(event);
    private formatLogArgument(arg);
    private appendToSavedLog();
    /**
     * Call to start recording logs to a string that can be returned by a later call to stopRecordingLogs. The
     * argument to this function is an object containing boolean fields corresponding to the application logging
     * to be turned on while logs are being recorded.
     *
     * If logs are already being recorded then calling this function will change what is being logged, according
     * to the logsToEnable argument, but will not affect what's already been recorded.
     *
     * @param logsToEnable object specifying which logging to turn on: showDevLogs, showEventLogs, showTraceInLogs
     */
    startRecordingLogs(logsToEnable: GwMap): void;
    /**
     * Call to stop recording logs and turn off any application logging turned on by startRecording logs. If logs
     * are not being recorded then calling this function still turns off any application logging but will just return
     * the empty string.
     * @returns {string} string containing all the log messages generated since startRecordingLogs was called
     */
    stopRecordingLogs(): string;
}
export declare const gwTest: GwTest;
