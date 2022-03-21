package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPClassCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPClassCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (cpLine :  CommercialPropertyLine, cpBuilding :  CPBuilding) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPClassCodeSearchPopup, {cpLine, cpBuilding}, 0)
  }
  
  function pickValueAndCommit (value :  CPClassCode) : void {
    __widgetOf(this, pcf.CPClassCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (cpLine :  CommercialPropertyLine, cpBuilding :  CPBuilding) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPClassCodeSearchPopup, {cpLine, cpBuilding}, 0).push()
  }
  
  
}