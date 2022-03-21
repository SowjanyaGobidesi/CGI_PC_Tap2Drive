package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWRulePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWRulePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (ruleVersion :  RuleVersion, importing :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWRulePopup, {ruleVersion, importing}, 0)
  }
  
  static function push (ruleVersion :  RuleVersion, importing :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWRulePopup, {ruleVersion, importing}, 0).push()
  }
  
  
}