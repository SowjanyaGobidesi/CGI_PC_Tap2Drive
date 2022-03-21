package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleExportDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleExportDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, exportTask :  RuleExportTask) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RuleExportDetailsPopup, {navigationSupport, exportTask}, 0)
  }
  
  static function push (navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, exportTask :  RuleExportTask) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RuleExportDetailsPopup, {navigationSupport, exportTask}, 0).push()
  }
  
  
}