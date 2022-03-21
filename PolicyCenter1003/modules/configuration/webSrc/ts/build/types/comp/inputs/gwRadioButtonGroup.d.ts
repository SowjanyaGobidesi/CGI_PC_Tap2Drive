import { GwRegisteredSystem } from "../../core/util/GwRegisteredSystem";
import { GwDomNode, GwMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 *
 * Radio button groups are usually created by RadioButtonCells. RadioButtonCell is a special control that is used
 * to put a group of radio buttons in different cells of a list view - they can be placed on different rows or even
 * in different columns. The cells are grouped by the radioButtonGroup attribute - a unique name used for all the
 * radio buttons in the group, so that selecting one of the buttons automatically deselects all the others.
 *
 * Unfortunately the straightforward implementation - using an actual input of type="radio" for the radio buttons -
 * breaks keyboard navigation, because when you navigate to a set of radio buttons the browser will force focus to
 * the currently selected button. This feels really weird when the buttons are scattered across an entire LV. So we
 * actually represent a "radio button group" as a group of check box inputs, all with the same name. This gives us
 * predictable keyboard navigation but means we have to do extra event processing to get radio like behavior - for
 * example we have to clear all the other "radio buttons" when a particular member of the group is selected. We also
 * use styling magic to make the actual check boxes invisible, then add divs that are styled to look like radio
 * buttons so the UI looks right.
 *
 * Radio button groups are used in one other place other than RadioButtonCell - the radio buttons on Choice widgets.
 * These are used to select a particular set of inputs - each choice has a radio button and a set of inputs, clicking
 * on the radio button makes the set of inputs active. These choice radio buttons use the same grouping mechanism, and
 * are always post on change so they make a server round trip every time one of the radio buttons is selected.
 */
export declare class GwRadioButtonGroup extends GwRegisteredSystem {
    getSystemName(): string;
    /**
     * Called when a button in the group is clicked. Updates the hidden check box input and artificially fires a change
     * event to trigger the usual change handling (e.g. confirmation).
     * @param radioButtonDiv the div immediately preceding the "radio button" (hidden check box); this is the div that
     *   is styled to look like a radio button
     */
    radioButtonSelect(radioButtonDiv: GwDomNode): void;
    /**
     * Called once a change has been confirmed; updates all the "radio buttons" (actually check boxes) in the
     * group and calls the server if the button is post on change.
     * @param radioButtonWidget the outer div of the value widget enclosing the "radio button" (check box)
     */
    updateRadioGroup(radioButtonWidget: GwDomNode, args: GwMap): void;
    private isConfirmSpecified(radioButtonWidget);
}
export declare const gwRadioButtonGroup: GwRadioButtonGroup;
