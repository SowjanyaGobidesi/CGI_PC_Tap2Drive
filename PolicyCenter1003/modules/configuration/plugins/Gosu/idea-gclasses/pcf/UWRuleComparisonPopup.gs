package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWRuleComparisonPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWRuleComparisonPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (importEntry :  RuleImportTaskEntry, importHelper :  gw.bizrules.pcf.RuleExportImportPageHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWRuleComparisonPopup, {importEntry, importHelper}, 1)
  }
  
  static function createDestination (version1 :  RuleVersion, version2 :  RuleVersion) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWRuleComparisonPopup, {version1, version2}, 0)
  }
  
  static function push (importEntry :  RuleImportTaskEntry, importHelper :  gw.bizrules.pcf.RuleExportImportPageHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWRuleComparisonPopup, {importEntry, importHelper}, 1).push()
  }
  
  static function push (version1 :  RuleVersion, version2 :  RuleVersion) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWRuleComparisonPopup, {version1, version2}, 0).push()
  }
  
  
}