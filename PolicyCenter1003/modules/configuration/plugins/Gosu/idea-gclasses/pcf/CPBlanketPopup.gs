package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPBlanketPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPBlanketPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (cpLine :  CommercialPropertyLine, blanket :  CPBlanket, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPBlanketPopup, {cpLine, blanket, openForEdit, jobWizardHelper}, 0)
  }
  
  function pickValueAndCommit (value :  CPBlanket) : void {
    __widgetOf(this, pcf.CPBlanketPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (cpLine :  CommercialPropertyLine, blanket :  CPBlanket, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPBlanketPopup, {cpLine, blanket, openForEdit, jobWizardHelper}, 0).push()
  }
  
  
}