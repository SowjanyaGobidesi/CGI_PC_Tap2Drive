import { GwMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwMediaImageInfo {
    protected readonly data: GwMap;
    constructor(jsonString: string);
    readonly url: string;
    readonly badgeLabel: string;
    readonly badgeStyleCss: string;
    readonly objectFitCss: string;
    readonly imageStyleCss: string;
    readonly altText: string;
}
