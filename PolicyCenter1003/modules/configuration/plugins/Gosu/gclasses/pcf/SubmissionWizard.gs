package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/SubmissionWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod}, 0)
  }
  
  static function createDestination (submission :  Submission, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, wizardStep}, 1)
  }
  
  static function createDestination (submission :  Submission, policyPeriod :  PolicyPeriod, locationPublicID :  String, wizardStep :  String) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, locationPublicID, wizardStep}, 2)
  }
  
  static function drilldown (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod}, 0).drilldown()
  }
  
  static function drilldown (submission :  Submission, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, wizardStep}, 1).drilldown()
  }
  
  static function drilldown (submission :  Submission, policyPeriod :  PolicyPeriod, locationPublicID :  String, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, locationPublicID, wizardStep}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (submission :  Submission, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, wizardStep}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (submission :  Submission, policyPeriod :  PolicyPeriod, locationPublicID :  String, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, locationPublicID, wizardStep}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (submission :  Submission, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, wizardStep}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (submission :  Submission, policyPeriod :  PolicyPeriod, locationPublicID :  String, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, locationPublicID, wizardStep}, 2).goInMain()
  }
  
  static function printPage (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod}, 0).printPage()
  }
  
  static function printPage (submission :  Submission, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, wizardStep}, 1).printPage()
  }
  
  static function printPage (submission :  Submission, policyPeriod :  PolicyPeriod, locationPublicID :  String, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, locationPublicID, wizardStep}, 2).printPage()
  }
  
  static function push (submission :  Submission, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod}, 0).push()
  }
  
  static function push (submission :  Submission, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, wizardStep}, 1).push()
  }
  
  static function push (submission :  Submission, policyPeriod :  PolicyPeriod, locationPublicID :  String, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.SubmissionWizard, {submission, policyPeriod, locationPublicID, wizardStep}, 2).push()
  }
  
  
}