package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/RenewalWizard_RenewalPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalWizard_RenewalPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RenewalWizard_RenewalPopup, {renewal, policyPeriod}, 0)
  }
  
  static function push (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RenewalWizard_RenewalPopup, {renewal, policyPeriod}, 0).push()
  }
  
  
}