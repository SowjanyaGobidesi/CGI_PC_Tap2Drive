package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/affinitygroup/AffinityGroupSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AffinityGroupSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AffinityGroupSearchPopup, {period}, 0)
  }
  
  function pickValueAndCommit (value :  AffinityGroup) : void {
    __widgetOf(this, pcf.AffinityGroupSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (period :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AffinityGroupSearchPopup, {period}, 0).push()
  }
  
  
}