package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/ConsistencyChecksChangeNumOfWorkersPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ConsistencyChecksChangeNumOfWorkersPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (CCPageHelper :  gw.api.tools.ConsistencyChecksRunsPageHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ConsistencyChecksChangeNumOfWorkersPopup, {CCPageHelper}, 0)
  }
  
  static function push (CCPageHelper :  gw.api.tools.ConsistencyChecksRunsPageHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ConsistencyChecksChangeNumOfWorkersPopup, {CCPageHelper}, 0).push()
  }
  
  
}