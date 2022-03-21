package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/RICededPremiums_AgreementsOverTimePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RICededPremiums_AgreementsOverTimePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (ririsk :  RIRisk) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RICededPremiums_AgreementsOverTimePopup, {ririsk}, 0)
  }
  
  static function push (ririsk :  RIRisk) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RICededPremiums_AgreementsOverTimePopup, {ririsk}, 0).push()
  }
  
  
}