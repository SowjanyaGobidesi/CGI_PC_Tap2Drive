package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleImportDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleImportDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, importTask :  RuleImportTask, completed :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RuleImportDetailsPopup, {navigationSupport, importTask, completed}, 0)
  }
  
  static function push (navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, importTask :  RuleImportTask, completed :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RuleImportDetailsPopup, {navigationSupport, importTask, completed}, 0).push()
  }
  
  
}