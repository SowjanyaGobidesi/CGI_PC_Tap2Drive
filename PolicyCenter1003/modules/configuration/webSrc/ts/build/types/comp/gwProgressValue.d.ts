import { GwInitializableSystem } from "../core/util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwProgressValue extends GwInitializableSystem {
    getSystemName(): string;
    private readonly currentPollTargets;
    private _interval;
    /**
     * Hard coded interval at which the client checks to see if there are any targets for polling the server
     * @type {number}
     */
    readonly pollInterval: number;
    /**
     * Searches for progress bars that need to update
     */
    init(): void;
    /**
     * Checks to see if there are any targets for which to poll the server for progress updates.
     * Double checks the list of polling targets and resets polling information if it finds the targets
     * are no longer available on the current page.
     */
    private pollProgressWidgets();
    private requestProgressInputUpdates(updateTargets);
    private updateProgressInputs(updateReqResponse);
    private setProgressWidgetProgress(update);
    private updateProgressBar(el, progressPercent);
    private updateStatus(el, status);
    /**
     * Check in polling targets to see if a disabledEvents call has been triggered for the corresponding progress input.
     * Used to prevent calling disabledEvents multiple times for a progress input that is configured with an action on
     * completion.  Also used during cleanup of orphaned progress input polling requests.
     * @param targetKey
     * @returns {boolean}
     */
    private disabledEventsTriggered(targetKey);
    /**
     * Clean up progress input state for a given progress input target.
     * @param targetKey
     */
    private resetProgressInfo(targetKey);
    private parseInfo(progressValueWidget);
    /**
     * Checks the status for a given progress input on the current page.  If the progress input is configured
     * with an action on completion, triggers the event when the progress input is complete.
     * @param pvw ProgressInput element.
     */
    private checkProgress(pvw);
    private startInterval();
}
export declare const gwProgressValue: GwProgressValue;
