package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/ContingencyPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContingencyPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contingency :  Contingency) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContingencyPopup, {contingency}, 0)
  }
  
  static function push (contingency :  Contingency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContingencyPopup, {contingency}, 0).push()
  }
  
  
}