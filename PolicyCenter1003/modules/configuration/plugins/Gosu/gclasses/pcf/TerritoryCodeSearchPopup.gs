package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/TerritoryCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TerritoryCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, territoryCode :  TerritoryCode) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TerritoryCodeSearchPopup, {policyPeriod, territoryCode}, 0)
  }
  
  function pickValueAndCommit (value :  String) : void {
    __widgetOf(this, pcf.TerritoryCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyPeriod :  PolicyPeriod, territoryCode :  TerritoryCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TerritoryCodeSearchPopup, {policyPeriod, territoryCode}, 0).push()
  }
  
  
}