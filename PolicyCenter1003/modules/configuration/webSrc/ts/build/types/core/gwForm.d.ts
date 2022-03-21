import { GwDomNode, GwInputElement, GwValueWidgetElement } from "../types/gwTypes";
import { GwInputValue } from "./inputs/gwInputs";
import { GwInitializableSystem } from "./util/GwInitializableSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwForm extends GwInitializableSystem {
    getSystemName(): string;
    private readonly CURRENT_EDIT_CONTROLLERS_KEY;
    readonly FORM_EDIT_VALUES_BY_ID_KEY: string;
    private readonly CHANGED_CSS_CLASS;
    private readonly EDIT_CONTROLLER_DATA_ATTR;
    private readonly EDIT_CONTROLLER_NO_TRACK_ATTR;
    private readonly NO_TRACK_CSS_CLASS;
    private readonly ADDED_ENTRY_VALUE;
    init(isFullPage: boolean): void;
    isDirty(): boolean;
    isInputDirty(el: GwInputElement | GwValueWidgetElement): boolean;
    findEnclosingValueWidget(el: GwDomNode): GwValueWidgetElement | null;
    getValueWidgetOriginalServerValue(el: GwValueWidgetElement, controllerId?: string): GwInputValue;
    private updateChangedBasedOnOriginalServerValue(valueWidget, serverValue);
    private markMultiselectOptionsAsDirty(valueWidget, currentVal, serverVal);
    private markCheckboxgroupOptionsAsDirty(valueWidget, currentVal, serverVal);
    private getEditableValueWidgetsForController(controller);
    /**
     * This is called whenever the server sends us an updated list of edit controllers
     * But we could have an edit controller present without the screen widget in the DOM
     * So we check if the screen widget is present, and then remove it from the map if it is
     */
    private handleNewEditableControllers();
    private addNewController(controllerId);
    private getScreenElWithEditControllerId(editId);
    private updateDirtyStatusOfInputs(editableControllerIds);
    /**
     * @public
     * Called by the onChange and onInput event listener in events.js;
     * @param el
     */
    inputElementChanged(el: GwInputElement | GwValueWidgetElement): void;
    private getCurrentEditableControllers();
    private setCurrentEditableControllers(ids);
    private getOriginalServerValue(el);
    private isFromAddedEntry(serverVal);
    /**
     * Normally we just use the fully qualified id of an element as a key. But in the case of an
     * editable iterator the ids of items inside entries depend on the entry index. So, for example,
     * if we noticed that a value in row 2 of an LV had changed we might store a value under the id
     * SomeLV-1-SomeCell (row 2 has index 1). But if we then deleted row 1 then what was row
     * 2 would become row 0, and our SomeLV-1-SomeCell id would now refer to some other value.
     * We can't change the way we generate entry ids because a lot of other code (and tests) rely
     * on the existing approach.
     *
     * To solve this problem the server side adds a "data-gw-entry-value-ids" attribute to top level
     * elements in editable entries. This attribute contains a comma separated list of integer ids
     * that correspond to the values in the entry (for nested iterators a single element may
     * correspond to more than one value). These ids remain stable as the entry indexes change. This
     * getValueId method builds a unique id based on these values by concatenating all the enclosing
     * value ids, separated by commas, and then appending the usual render id but with all "index ids"
     * replaced by zero. So, for example, our example SomeLV-1-SomeCell might become 3,SomeLV-0-SomeCell,
     * where 3 is the value id of the value in that row of the LV. This id will still be unique but
     * because it uses value ids rather than index ids it will remain stable if iterator entries move
     * around.
     *
     * The same mechanism is used to handle a couple of other cases where ids might not be sufficiently
     * unique/stable - the "value ids" of the current card and the current list view selection are
     * added in to card view panels, so all values within the panel will be scoped by those value ids.
     *
     * @param {GwValueWidgetElement} el a value widget
     * @returns {string} a stable id for referring to the value widget
     */
    private getValueId(el);
}
export declare const gwForm: GwForm;
