import { GwMediaImageWithThumbInfo } from "./GwMediaImageWithThumbInfo";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwMediaImageWithExifDataInfo extends GwMediaImageWithThumbInfo {
    private readonly _hasExifData;
    constructor(jsonString: string);
    hasExifData(): boolean;
    readonly listInfoTitle: string | undefined;
    readonly listedInfo: string[] | undefined;
    readonly lat: string | undefined;
    readonly long: string | undefined;
    readonly fileName: string | undefined;
    readonly exifJSONString: string | undefined;
    readonly paragraphInfo: string | undefined;
}
