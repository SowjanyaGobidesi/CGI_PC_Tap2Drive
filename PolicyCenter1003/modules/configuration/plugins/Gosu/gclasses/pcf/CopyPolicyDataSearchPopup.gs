package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/CopyPolicyDataSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyPolicyDataSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (destPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CopyPolicyDataSearchPopup, {destPeriod}, 0)
  }
  
  static function push (destPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CopyPolicyDataSearchPopup, {destPeriod}, 0).push()
  }
  
  
}