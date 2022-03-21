package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/CoverageWrapperSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoverageWrapperSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (PolicyLinePatternCode :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CoverageWrapperSearchPopup, {PolicyLinePatternCode}, 0)
  }
  
  function pickValueAndCommit (value :  String) : void {
    __widgetOf(this, pcf.CoverageWrapperSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (PolicyLinePatternCode :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CoverageWrapperSearchPopup, {PolicyLinePatternCode}, 0).push()
  }
  
  
}