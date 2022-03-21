package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/profiler/TimeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TimeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TimeSearchPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.profiler.ProfilerDataSource) : void {
    __widgetOf(this, pcf.TimeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.TimeSearchPopup, {}, 0).push()
  }
  
  
}