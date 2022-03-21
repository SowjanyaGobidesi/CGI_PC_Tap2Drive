import { GwRegisteredSystem } from "../../core/util/GwRegisteredSystem";
import { GwClassIdTagOrNode, GwDomNode, GwMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwRangeValue extends GwRegisteredSystem {
    getSystemName(): string;
    private getShuttleBoxInputs(classIdTagOrNode);
    setOptions(widget: GwDomNode, options: GwMap[]): void;
    isMultiple(classIdTagOrNode: GwClassIdTagOrNode): boolean;
    private updateButtons(shuttleBoxInfo);
    private clearInternalShuttleSelect(shuttleSelect);
    /**
     * Returns an object that contains the values that were added or removed along with the overall set of selected values
     * after the adds/removes are made.
     * @param {GwShuttleBoxInfo} shuttleBoxInfo
     * @param {"add" | "remove"} shuttleDirection
     * @returns {selectedValues: string[], newValues: string[]} values that were moved and the resultant array of
     *     selected values for the shuttle widget
     */
    private buildUpdatedValuesForShuttleWidget(shuttleBoxInfo, shuttleDirection);
    private moveOptionsAcrossShuttle(buttonEl, shuttleDirection);
    updateAvailableAndSelectedShuttleLists(el: HTMLSelectElement): void;
    moveRight(buttonEl: GwDomNode): void;
    moveLeft(buttonEl: GwDomNode): void;
}
export declare const gwRangeValue: GwRangeValue;
