package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/ratingoverride/RatingOverridePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingOverridePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, line :  PolicyLine, jobWizardHelper :  gw.api.web.job.JobWizardHelper, startInEditMode :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RatingOverridePopup, {period, line, jobWizardHelper, startInEditMode}, 0)
  }
  
  static function push (period :  PolicyPeriod, line :  PolicyLine, jobWizardHelper :  gw.api.web.job.JobWizardHelper, startInEditMode :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RatingOverridePopup, {period, line, jobWizardHelper, startInEditMode}, 0).push()
  }
  
  
}