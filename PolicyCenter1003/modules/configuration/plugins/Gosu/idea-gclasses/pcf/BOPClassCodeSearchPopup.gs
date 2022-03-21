package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPClassCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPClassCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (bopLine :  BOPLine, bopBuilding :  BOPBuilding) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BOPClassCodeSearchPopup, {bopLine, bopBuilding}, 0)
  }
  
  function pickValueAndCommit (value :  BOPClassCode) : void {
    __widgetOf(this, pcf.BOPClassCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (bopLine :  BOPLine, bopBuilding :  BOPBuilding) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BOPClassCodeSearchPopup, {bopLine, bopBuilding}, 0).push()
  }
  
  
}