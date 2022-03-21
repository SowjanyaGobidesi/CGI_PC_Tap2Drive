import { GwMap } from "../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwFileRequest {
    private static readonly REQUEST_ID_PARAM;
    private static readonly STATUS_PARAM;
    private static readonly WAIT_TILL_STATUS_REQUEST;
    private readonly _requestId;
    private readonly _isInline;
    constructor(inline: boolean);
    downloadDirectly(parameters: GwMap): void;
    postDownloadRequest(eventSource: string): void;
    /**
     * Submit main form in a regular way (w/o ajax Form plugin)
     * @param action: form action
     * @param parameters: additional parameters to submit
     */
    private submitForm(action, parameters);
    private wrapWithParameters(form, parameters, formCode);
    private createInput(form, name, value);
    private checkDownloadStatus(downloadWindow);
    private createDownloadWindow(target);
    private closeDownloadWindow(download);
    private generateId();
}
