package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleExportImportFailurePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleExportImportFailurePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (reason :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RuleExportImportFailurePopup, {reason}, 0)
  }
  
  static function push (reason :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RuleExportImportFailurePopup, {reason}, 0).push()
  }
  
  
}