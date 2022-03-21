/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwPerfAnalyzer {
    private enabled;
    private eventId;
    private requestStartTimeStamp;
    private requestSentTimeStamp;
    private responseReceivedTimeStamp;
    /**
     * Array of information sent back to the server, contains:
     * [eventId, requestPrepElapsed, serverRequestElapsed, responseProcessElapsed, responseDoneTime, requestId, agent]
     */
    private infoArray;
    private getPerfInput();
    private getPerfInputOrThrow();
    elapsed(earlier: number, later: number): number;
    startRequest(requestEventId: string): void;
    requestSent(): void;
    responseReceived(): void;
    responseProcessed(): void;
}
export declare const gwPerfAnalyzer: GwPerfAnalyzer;
