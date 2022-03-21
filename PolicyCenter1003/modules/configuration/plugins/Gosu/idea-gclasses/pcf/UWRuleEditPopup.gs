package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWRuleEditPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWRuleEditPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (importEntry :  RuleImportTaskEntry, importHelper :  gw.bizrules.pcf.RuleExportImportPageHelper, chosenSide :  RuleImportSide) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWRuleEditPopup, {importEntry, importHelper, chosenSide}, 0)
  }
  
  function pickValueAndCommit (value :  RuleImportTaskEntry) : void {
    __widgetOf(this, pcf.UWRuleEditPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (importEntry :  RuleImportTaskEntry, importHelper :  gw.bizrules.pcf.RuleExportImportPageHelper, chosenSide :  RuleImportSide) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWRuleEditPopup, {importEntry, importHelper, chosenSide}, 0).push()
  }
  
  
}