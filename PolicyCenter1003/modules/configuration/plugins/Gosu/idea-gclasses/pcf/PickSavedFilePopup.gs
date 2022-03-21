package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/profiler/PickSavedFilePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PickSavedFilePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PickSavedFilePopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.profiler.ProfilerDataSource) : void {
    __widgetOf(this, pcf.PickSavedFilePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.PickSavedFilePopup, {}, 0).push()
  }
  
  
}