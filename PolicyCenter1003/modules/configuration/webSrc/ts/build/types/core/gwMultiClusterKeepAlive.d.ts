import { GwInitializableSystem } from "./util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * Sends "ping" requests to other clusters to keep their sessions alive. We do this on
 * every server request, so that if we talk to our server (and "touch" our session) we'll
 * also touch all the remote sessions as well. The ping request is implemented as an image
 * "source" GET. This is a way to cause a cross origin HTTP request, with cookies, that does
 * not require CORS.
 */
export declare class GwMultiClusterKeepAlive extends GwInitializableSystem {
    getSystemName(): string;
    init(): void;
    private pingKeepAliveUrls();
}
export declare const gwMultiClusterKeepAlive: GwMultiClusterKeepAlive;
