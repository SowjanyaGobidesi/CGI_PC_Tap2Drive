package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/ExcelImportFilePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExcelImportFilePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ExcelImportFilePopup, {period, jobWizardHelper}, 0)
  }
  
  static function push (period :  PolicyPeriod, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExcelImportFilePopup, {period, jobWizardHelper}, 0).push()
  }
  
  
}