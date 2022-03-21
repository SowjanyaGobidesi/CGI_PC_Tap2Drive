import { GwValueWidgetElement } from "../types/gwTypes";
import { GwEventDescription } from "./events/GwEventDescription";
import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwConfirm extends GwRegisteredSystem {
    private _lastEventWasConfirmed;
    getSystemName(): string;
    /**
     * Save the current value of an input after a user has confirmed they want the change. Only
     * called for nodes that require confirmation before a value change. Does nothing if
     * node is not an input.
     * Assumption: we don't support multiselect select controls
     */
    saveConfirmedValue(el: GwValueWidgetElement): void;
    /**
     * True if the last event we processed caused a confirmation dialog to be shown and the user
     * then decided the event should go ahead. Used to prevent further alerts/confirmations from
     * happening as a result of the event.
     */
    lastEventWasConfirmed(): boolean;
    private cancelValueChange(el);
    private getConfirmDataValueOrDefault(el);
    /**
     * @private
     * Based on the inputType of {@param node}, check to see if the current value
     * differs from the default value.
     *
     * @param node node for which current and default values will be compared
     * @returns {boolean} return true if the current value differs from the default value
     *     else returns false
     */
    private valueDiffersFromLastChangedOrDefault(el);
    /**
     * @public
     * Check if executing the given event needs user confirmation. If so display a confirmation dialog
     * to the user, giving them a chance to cancel it. The event description is the result of calling
     * getEventDescription and contains details of the target node, event type and the method to be
     * executed plus its arguments.
     *
     * @return {boolean} true if the event should proceed, false if it has been cancelled by the user
     */
    confirmEvent(eventDescription: GwEventDescription): boolean;
    closeProblematicTemporyElementsDuringConfirmAndPrompt(): void;
}
export declare const gwConfirm: GwConfirm;
