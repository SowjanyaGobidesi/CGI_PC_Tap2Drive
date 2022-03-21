package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingPolicyPeriodPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingPolicyPeriodPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (impactPeriod :  ImpactTestingPolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ImpactTestingPolicyPeriodPopup, {impactPeriod}, 0)
  }
  
  static function push (impactPeriod :  ImpactTestingPolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImpactTestingPolicyPeriodPopup, {impactPeriod}, 0).push()
  }
  
  
}