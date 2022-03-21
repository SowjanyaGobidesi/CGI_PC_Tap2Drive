import { GwInitializableSystem } from "../core/util/GwInitializableSystem";
import { GwDomNode, GwMap, GwPartialReloadDetails, HTMLInputEvent } from "../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwMediaUploader extends GwInitializableSystem {
    private readonly MAX_FILES;
    private mediaUploadersByIdFileMap;
    private readonly validImageFileTypes;
    private nextRowIndex;
    init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    getSystemName(): string;
    /**
     * Not currently used. Leaving in case we decide there's a memory leak problem
     * @param {GwDomNode} node
     * @param {GwMap} args
     * @param {HTMLInputEvent} e
     */
    chooserChanged(node: GwDomNode, args: GwMap, e: HTMLInputEvent): void;
    drop(node: GwDomNode, args: GwMap, e: DragEvent): void;
    dragover(node: GwDomNode, args: GwMap, e: DragEvent): void;
    private processFileSize(num);
    private isValidImageFileType(file);
    private clearFileListForContainer(container);
    private getNumFilesSelectedForContainer(container);
    private addNewFilesToPreviewList(container, files);
    private exifDoneProcessing(img, containerId, rowId, exifData);
    private buildFilePreviewRow(isValidFile, rowId, fileName, imageEl, fileSize, modDate, hasInput);
    private validateBuildAndCachePreviewRowFromFile(container, file);
    private newFilesAdded(container, files);
    private getContainerWidget(childNode);
    private getChooser(containerWidget);
    private getUploadButton(containerWidget);
    private getClearButton(containerWidget);
    private getImportButton(containerWidget);
    private getPasteFilesInput(containerWidget);
    private getPreviewListInner(containerWidget);
    private updateButtons(container);
    clear(node: GwDomNode, args: GwMap, e: Event): void;
    deleteRow(node: GwDomNode, args: GwMap, e: Event): void;
    private uploadComplete(containerId, e);
    private uploadProgress(containerId, e);
    private uploadError(containerId, e);
    private uploadAbort(containerId, e);
    private uploadCompletedErroredOrAborted(containerId, e);
    input(node: HTMLInputElement, args: GwMap, e: HTMLInputEvent): void;
    filesPasted(node: GwDomNode, args: GwMap, e: ClipboardEvent): void;
    upload(node: GwDomNode, args: GwMap, e: ProgressEvent): void;
}
export declare const gwMediaUploader: GwMediaUploader;
