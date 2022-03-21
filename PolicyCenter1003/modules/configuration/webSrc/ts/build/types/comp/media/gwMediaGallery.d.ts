import { GwDomNode, GwMap, GwPartialReloadDetails } from "../../types/gwTypes";
import { GwInitializableSystem } from "../../core/util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwMediaGallery extends GwInitializableSystem {
    private readonly MAKE_SECONDARY_EXIF_LOOKUPS;
    /**
     * Prebuilt gallery entries by: galleryId -> pageNumber -> imageDiv
     */
    private readonly galleryData;
    init(isFullPageReload: boolean, partialReloadDetails?: GwPartialReloadDetails): void;
    getSystemName(): string;
    first(el: GwDomNode): void;
    prev(el: GwDomNode): void;
    next(el: GwDomNode): void;
    last(el: GwDomNode): void;
    private pagingButtonClicked(buttonType, buttonEl);
    private getGalleryFromEl(el);
    private buildGalleries();
    private buildGallery(gallery);
    private buildGalleryImageEntry(jsonNode);
    private storePageNumberForGallery(galleryId, pageNum);
    private getStoredPageNumberForGallery(galleryId);
    private showGalleryPage(galleryId, pageNum);
    private updatePagingWidgetForGallery(gallery);
    private getLastPageNum(galleryId);
    onThumbLoad(e: Event): void;
    onThumbError(e: Event): void;
    thumbClick(node: GwDomNode, args: GwMap, e: Event): void;
    private getThumbContainerFromImg(e);
    private showModalGalleryTile(galleryTileEl, fullSizeImageUrl);
    private getGalleryTileEl(childNode);
    private buildMetaDataSectionOfModalImage(wrapper, tagData);
}
export declare const gwMediaGallery: GwMediaGallery;
