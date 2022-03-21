package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/prerenewal/NonRenewalExplanationPatternsPagePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NonRenewalExplanationPatternsPagePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policy :  Policy, policyPeriod :  PolicyPeriod, descriptions :  String[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NonRenewalExplanationPatternsPagePopup, {policy, policyPeriod, descriptions}, 0)
  }
  
  function pickValueAndCommit (value :  entity.NonRenewalExplanation[]) : void {
    __widgetOf(this, pcf.NonRenewalExplanationPatternsPagePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policy :  Policy, policyPeriod :  PolicyPeriod, descriptions :  String[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NonRenewalExplanationPatternsPagePopup, {policy, policyPeriod, descriptions}, 0).push()
  }
  
  
}