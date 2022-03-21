package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/OracleOutlineDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OracleOutlineDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (outline :  gw.api.database.DatabaseOutlineInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OracleOutlineDetailsPopup, {outline}, 0)
  }
  
  static function push (outline :  gw.api.database.DatabaseOutlineInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OracleOutlineDetailsPopup, {outline}, 0).push()
  }
  
  
}