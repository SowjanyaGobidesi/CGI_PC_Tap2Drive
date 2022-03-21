package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternCovTermPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternCovTermPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (formPattern :  FormPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FormPatternCovTermPopup, {formPattern}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.productmodel.CovTermPattern) : void {
    __widgetOf(this, pcf.FormPatternCovTermPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormPatternCovTermPopup, {formPattern}, 0).push()
  }
  
  
}