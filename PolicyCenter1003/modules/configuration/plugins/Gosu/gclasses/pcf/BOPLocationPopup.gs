package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPLocationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPLocationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountLocation :  AccountLocation, bopLocation :  BOPLocation, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BOPLocationPopup, {accountLocation, bopLocation, policyPeriod, openForEdit, startInEdit, jobWizardHelper}, 0)
  }
  
  function pickValueAndCommit (value :  BOPLocation) : void {
    __widgetOf(this, pcf.BOPLocationPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (accountLocation :  AccountLocation, bopLocation :  BOPLocation, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BOPLocationPopup, {accountLocation, bopLocation, policyPeriod, openForEdit, startInEdit, jobWizardHelper}, 0).push()
  }
  
  
}