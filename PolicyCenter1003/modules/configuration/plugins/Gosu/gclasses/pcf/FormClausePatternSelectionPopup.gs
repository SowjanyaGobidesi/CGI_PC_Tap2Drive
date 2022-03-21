package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormClausePatternSelectionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormClausePatternSelectionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (formPattern :  FormPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FormClausePatternSelectionPopup, {formPattern}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.productmodel.ClausePattern) : void {
    __widgetOf(this, pcf.FormClausePatternSelectionPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormClausePatternSelectionPopup, {formPattern}, 0).push()
  }
  
  
}