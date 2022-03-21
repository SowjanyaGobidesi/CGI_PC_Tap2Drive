package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/NewSecondaryNamedInsuredPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewSecondaryNamedInsuredPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewSecondaryNamedInsuredPopup, {period}, 0)
  }
  
  function pickValueAndCommit (value :  PolicySecNamedInsured) : void {
    __widgetOf(this, pcf.NewSecondaryNamedInsuredPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (period :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSecondaryNamedInsuredPopup, {period}, 0).push()
  }
  
  
}