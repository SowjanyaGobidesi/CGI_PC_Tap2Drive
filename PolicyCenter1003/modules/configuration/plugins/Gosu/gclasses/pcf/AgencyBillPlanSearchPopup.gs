package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AgencyBillPlanSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AgencyBillPlanSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (unselectablePlans :  String[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AgencyBillPlanSearchPopup, {unselectablePlans}, 0)
  }
  
  function pickValueAndCommit (value :  gw.plugin.billing.AgencyBillPlanSummary) : void {
    __widgetOf(this, pcf.AgencyBillPlanSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (unselectablePlans :  String[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AgencyBillPlanSearchPopup, {unselectablePlans}, 0).push()
  }
  
  
}