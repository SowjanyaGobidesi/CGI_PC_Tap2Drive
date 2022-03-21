package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/PolicyClaimsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyClaimsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (claimHelper :  gw.api.web.dashboard.ui.claims.ClaimHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyClaimsPopup, {claimHelper}, 0)
  }
  
  static function push (claimHelper :  gw.api.web.dashboard.ui.claims.ClaimHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyClaimsPopup, {claimHelper}, 0).push()
  }
  
  
}