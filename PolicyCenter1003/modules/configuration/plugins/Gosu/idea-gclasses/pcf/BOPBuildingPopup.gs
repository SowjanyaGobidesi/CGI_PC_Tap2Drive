package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPBuildingPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPBuildingPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (bopLine :  BOPLine, bopLocation :  BOPLocation, building :  BOPBuilding, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BOPBuildingPopup, {bopLine, bopLocation, building, openForEdit, startInEdit, jobWizardHelper}, 0)
  }
  
  function pickValueAndCommit (value :  BOPBuilding) : void {
    __widgetOf(this, pcf.BOPBuildingPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (bopLine :  BOPLine, bopLocation :  BOPLocation, building :  BOPBuilding, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BOPBuildingPopup, {bopLine, bopLocation, building, openForEdit, startInEdit, jobWizardHelper}, 0).push()
  }
  
  
}