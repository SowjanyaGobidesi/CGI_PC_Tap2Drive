package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/archive/RequestRestorePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RequestRestorePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyTerm :  PolicyTerm) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RequestRestorePopup, {policyTerm}, 0)
  }
  
  static function push (policyTerm :  PolicyTerm) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RequestRestorePopup, {policyTerm}, 0).push()
  }
  
  
}