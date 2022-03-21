package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/CommissionPlanSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CommissionPlanSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (tier :  Tier, unselectablePlanNames :  String[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CommissionPlanSearchPopup, {tier, unselectablePlanNames}, 0)
  }
  
  function pickValueAndCommit (value :  java.lang.String) : void {
    __widgetOf(this, pcf.CommissionPlanSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (tier :  Tier, unselectablePlanNames :  String[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CommissionPlanSearchPopup, {tier, unselectablePlanNames}, 0).push()
  }
  
  
}