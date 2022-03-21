package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPLocationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPLocationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (cpLocation :  CPLocation, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPLocationPopup, {cpLocation, openForEdit, startInEdit, jobWizardHelper}, 1)
  }
  
  static function createDestination (cpLine :  CommercialPropertyLine, acctLocation :  AccountLocation, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPLocationPopup, {cpLine, acctLocation, openForEdit, startInEdit, jobWizardHelper}, 2)
  }
  
  static function createDestination (cpLine :  CommercialPropertyLine, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPLocationPopup, {cpLine, openForEdit, startInEdit, jobWizardHelper}, 0)
  }
  
  function pickValueAndCommit (value :  CPLocation) : void {
    __widgetOf(this, pcf.CPLocationPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (cpLocation :  CPLocation, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPLocationPopup, {cpLocation, openForEdit, startInEdit, jobWizardHelper}, 1).push()
  }
  
  static function push (cpLine :  CommercialPropertyLine, acctLocation :  AccountLocation, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPLocationPopup, {cpLine, acctLocation, openForEdit, startInEdit, jobWizardHelper}, 2).push()
  }
  
  static function push (cpLine :  CommercialPropertyLine, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPLocationPopup, {cpLine, openForEdit, startInEdit, jobWizardHelper}, 0).push()
  }
  
  
}