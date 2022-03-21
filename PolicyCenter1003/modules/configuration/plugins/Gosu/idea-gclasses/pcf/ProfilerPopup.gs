package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/profiler/ProfilerPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProfilerPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProfilerPopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProfilerPopup, {}, 0).push()
  }
  
  
}