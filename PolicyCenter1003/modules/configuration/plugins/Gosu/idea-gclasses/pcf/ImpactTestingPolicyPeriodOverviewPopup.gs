package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingPolicyPeriodOverviewPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingPolicyPeriodOverviewPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (impactPeriod :  ImpactTestingPolicyPeriod, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ImpactTestingPolicyPeriodOverviewPopup, {impactPeriod, policyPeriod}, 0)
  }
  
  static function push (impactPeriod :  ImpactTestingPolicyPeriod, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImpactTestingPolicyPeriodOverviewPopup, {impactPeriod, policyPeriod}, 0).push()
  }
  
  
}