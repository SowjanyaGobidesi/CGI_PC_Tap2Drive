package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BAVehiclePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BAVehiclePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (vehicle :  BusinessVehicle, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BAVehiclePopup, {vehicle, policyPeriod, openForEdit, startInEdit, jobWizardHelper}, 0)
  }
  
  function pickValueAndCommit (value :  BusinessVehicle) : void {
    __widgetOf(this, pcf.BAVehiclePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (vehicle :  BusinessVehicle, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BAVehiclePopup, {vehicle, policyPeriod, openForEdit, startInEdit, jobWizardHelper}, 0).push()
  }
  
  
}