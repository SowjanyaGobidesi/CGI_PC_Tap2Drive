package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/HandlePreemptionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HandlePreemptionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (wizard :  pcf.api.Wizard, jobWizardHelper :  gw.api.web.job.JobWizardHelper, policyPeriod :  PolicyPeriod, allowWithdraw :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.HandlePreemptionPopup, {wizard, jobWizardHelper, policyPeriod, allowWithdraw}, 0)
  }
  
  static function push (wizard :  pcf.api.Wizard, jobWizardHelper :  gw.api.web.job.JobWizardHelper, policyPeriod :  PolicyPeriod, allowWithdraw :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HandlePreemptionPopup, {wizard, jobWizardHelper, policyPeriod, allowWithdraw}, 0).push()
  }
  
  
}