package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/profiler/ProfilerAnalysisPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProfilerAnalysisPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPopup, {}, 0).push()
  }
  
  
}