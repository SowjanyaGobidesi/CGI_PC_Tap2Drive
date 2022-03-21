package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleImportAllPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleImportAllPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (pageHelper :  gw.bizrules.pcf.RuleExportImportPageHelper, importTask :  RuleImportTask) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RuleImportAllPopup, {pageHelper, importTask}, 0)
  }
  
  static function push (pageHelper :  gw.bizrules.pcf.RuleExportImportPageHelper, importTask :  RuleImportTask) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RuleImportAllPopup, {pageHelper, importTask}, 0).push()
  }
  
  
}