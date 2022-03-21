package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/profiler/ProfilerAnalysisPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProfilerAnalysisPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (entryPointType :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPage, {entryPointType}, 0)
  }
  
  static function drilldown (entryPointType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPage, {entryPointType}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (entryPointType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPage, {entryPointType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (entryPointType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPage, {entryPointType}, 0).goInMain()
  }
  
  static function printPage (entryPointType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPage, {entryPointType}, 0).printPage()
  }
  
  static function push (entryPointType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProfilerAnalysisPage, {entryPointType}, 0).push()
  }
  
  
}