package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/EditPolicyAddressPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditPolicyAddressPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, isNew :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditPolicyAddressPopup, {period, isNew}, 0)
  }
  
  static function push (period :  PolicyPeriod, isNew :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditPolicyAddressPopup, {period, isNew}, 0).push()
  }
  
  
}