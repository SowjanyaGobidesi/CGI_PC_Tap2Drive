package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternCoverablePropertyPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternCoverablePropertyPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (formPattern :  FormPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FormPatternCoverablePropertyPopup, {formPattern}, 0)
  }
  
  function pickValueAndCommit (value :  gw.lang.reflect.IPropertyInfo) : void {
    __widgetOf(this, pcf.FormPatternCoverablePropertyPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormPatternCoverablePropertyPopup, {formPattern}, 0).push()
  }
  
  
}