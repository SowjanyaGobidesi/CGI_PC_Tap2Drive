import { GwDomNode, GwEventType, GwMap, GwValueWidgetElement, HTMLInputEvent } from "../types/gwTypes";
import { GwRegisteredSystem } from "../core/util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwFileValue extends GwRegisteredSystem {
    static readonly BYTES_PER_MB: number;
    getSystemName(): string;
    private readonly fileInputSuffix;
    private readonly fileTextSuffix;
    browseHandler(node: GwDomNode, args: GwMap, event: GwEventType): void;
    fileChangeHandler(valueWidget: GwValueWidgetElement, args: GwMap, event: GwEventType): void;
    registerDropzone(dropzoneMap: GwMap): void;
    private addFileUploadAreaToScreenWidget(screenWidget, fileInputElementId);
    input(node: HTMLInputElement, args: GwMap, e: HTMLInputEvent): void;
    pasteFileHandler(node: GwDomNode, args: GwMap, event: ClipboardEvent): void;
    dropFileHandler(node: GwDomNode, args: GwMap, event: DragEvent): void;
    private handleNewFiles(id, files);
    dragover(node: GwDomNode, args: GwMap, e: DragEvent): void;
    dragenter(node: GwDomNode, args: GwMap, e: DragEvent): void;
    dragleave(node: GwDomNode, args: GwMap, e: DragEvent): void;
    dragend(node: GwDomNode, args: GwMap, e: DragEvent): void;
    private convertToMB(size);
    private showAlert(messageText);
    private uploadSizeError(sizeLimit, tooBigFileNames);
    private uploadTotalSizeError(numRejectedFiles, totalSize, availableSpace);
    private uploadTotalCountError(numRejectedFiles, availableCount);
    private uploadOtherError(otherErrors);
    private processUploadResponse(response);
    private verifyUploadFiles(fileWidgetId, files);
    private uploadFiles(fileWidgetId, files, completeCallback);
    downloadManually(parameters: GwMap): void;
    downloadHandler(node: GwDomNode, args: GwMap, event: GwEventType): void;
    private postOnChange(fileWidgetId);
    private getFileInput(fileWidgetId);
    private getFileInputOrThrow(fileWidgetId);
    private createFormData(widgetId, files);
    private clearFileInput(fileInput);
    private fileListAsArray(files);
}
export declare const gwFileValue: GwFileValue;
