package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/QuickSubmissionWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class QuickSubmissionWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.QuickSubmissionWizard, {submission, policyPeriod}, 0)
  }
  
  static function drilldown (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.QuickSubmissionWizard, {submission, policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.QuickSubmissionWizard, {submission, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.QuickSubmissionWizard, {submission, policyPeriod}, 0).goInMain()
  }
  
  static function printPage (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.QuickSubmissionWizard, {submission, policyPeriod}, 0).printPage()
  }
  
  static function push (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.QuickSubmissionWizard, {submission, policyPeriod}, 0).push()
  }
  
  
}