package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/StartRuleImportPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class StartRuleImportPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.StartRuleImportPopup, {navigationSupport}, 0)
  }
  
  function pickValueAndCommit (value :  RuleImportTask) : void {
    __widgetOf(this, pcf.StartRuleImportPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport) : pcf.api.Location {
    return __newDestinationForLocation(pcf.StartRuleImportPopup, {navigationSupport}, 0).push()
  }
  
  
}