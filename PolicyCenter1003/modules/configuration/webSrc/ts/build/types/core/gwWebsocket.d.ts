import { GwMap } from "../types/gwTypes";
import { GwInitializableSystem } from "./util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * Websocket System
 * Any other client system, defined by its lowercase property name on the gw global object, meaning gw.currency, gw.ProgressValue etc
 * can implement a method named onWebSocket on its own object, ie: gw.currency.onWebSocket
 * and that method will be called with the data.info from the server message if the data.system name matches.
 * ie: data = {system: currency, info: blah}, so: gw.currency.websocket(data.info);
 * @type {{}}
 */
export declare class GwWebsocket extends GwInitializableSystem {
    getSystemName(): string;
    private sendQueue;
    private errorCount;
    private readonly systemNameReg;
    private socket;
    init(isFullPageReload: boolean): void;
    private getSocket();
    /**
     * @private
     * Builds the URL to make the socket upgrade request.
     * If there's an existing socket, then tests what state it's in before deciding what to do.
     */
    private askServerForSocket();
    private asyncAskForSocketAndCountErrors();
    private clearQueue();
    private onOpen();
    private onClose();
    private onError();
    /**
     * @private
     * parses the event data into system<String> and info<Object(Map)>
     *     then calls gw[system].onWebSocket(info)
     * @param event
     */
    private onMessageFromServer(event);
    private encodeSystemAndInfoForTransport(system, info);
    /**
     * infoMap is required to be an object (hashmap). This allows the server to generically process the info
     * and get it to the correct system far more easily.
     * @param system
     * @param infoMap
     */
    sendInfoToServer(system: string, infoMap: GwMap): void;
    echo(): void;
}
export declare const gwWebsocket: GwWebsocket;
