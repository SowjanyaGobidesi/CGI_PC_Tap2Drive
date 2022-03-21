import { GwMediaImageInfo } from "./GwMediaImageInfo";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwMediaImageWithThumbInfo extends GwMediaImageInfo {
    constructor(jsonString: string);
    readonly thumbUrl: string;
}
