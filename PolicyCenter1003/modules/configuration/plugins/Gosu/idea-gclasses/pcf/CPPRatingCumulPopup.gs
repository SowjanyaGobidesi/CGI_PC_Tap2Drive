package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policy/CPPRatingCumulPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPPRatingCumulPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, line :  PolicyLine, isEditable :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPPRatingCumulPopup, {period, line, isEditable, jobWizardHelper}, 0)
  }
  
  static function push (period :  PolicyPeriod, line :  PolicyLine, isEditable :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPPRatingCumulPopup, {period, line, isEditable, jobWizardHelper}, 0).push()
  }
  
  
}