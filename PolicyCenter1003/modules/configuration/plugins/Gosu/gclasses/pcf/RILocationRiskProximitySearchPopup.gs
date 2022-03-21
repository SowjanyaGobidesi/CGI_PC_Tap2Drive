package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/RILocationRiskProximitySearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RILocationRiskProximitySearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (targetLocationRisk :  LocationRisk) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RILocationRiskProximitySearchPopup, {targetLocationRisk}, 0)
  }
  
  static function push (targetLocationRisk :  LocationRisk) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RILocationRiskProximitySearchPopup, {targetLocationRisk}, 0).push()
  }
  
  
}