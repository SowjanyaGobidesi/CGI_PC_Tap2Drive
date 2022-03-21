package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UWBlockProgressIssuesPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWBlockProgressIssuesPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWBlockProgressIssuesPopup, {policyPeriod}, 1)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, jobWizardHelper :  gw.api.web.job.JobWizardHelper, blockingPoint :  UWIssueBlockingPoint, blockingIssues :  entity.UWIssue[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWBlockProgressIssuesPopup, {policyPeriod, jobWizardHelper, blockingPoint, blockingIssues}, 0)
  }
  
  static function push (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWBlockProgressIssuesPopup, {policyPeriod}, 1).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, jobWizardHelper :  gw.api.web.job.JobWizardHelper, blockingPoint :  UWIssueBlockingPoint, blockingIssues :  entity.UWIssue[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWBlockProgressIssuesPopup, {policyPeriod, jobWizardHelper, blockingPoint, blockingIssues}, 0).push()
  }
  
  
}