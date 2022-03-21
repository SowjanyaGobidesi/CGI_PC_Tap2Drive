package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/PleaseBePatientPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PleaseBePatientPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, helper :  gw.api.web.job.JobWizardHelper, nextStep :  String, context :  gw.web.PatienceContext) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PleaseBePatientPopup, {policyPeriod, helper, nextStep, context}, 0)
  }
  
  static function push (policyPeriod :  PolicyPeriod, helper :  gw.api.web.job.JobWizardHelper, nextStep :  String, context :  gw.web.PatienceContext) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PleaseBePatientPopup, {policyPeriod, helper, nextStep, context}, 0).push()
  }
  
  
}