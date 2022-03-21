package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/CreateUWRule.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateUWRule extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreateUWRule, {}, 0)
  }
  
  static function createDestination (ruleToClone :  UWRule) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreateUWRule, {ruleToClone}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {}, 0).drilldown()
  }
  
  static function drilldown (ruleToClone :  UWRule) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {ruleToClone}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (ruleToClone :  UWRule) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {ruleToClone}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (ruleToClone :  UWRule) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {ruleToClone}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {}, 0).printPage()
  }
  
  static function printPage (ruleToClone :  UWRule) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {ruleToClone}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {}, 0).push()
  }
  
  static function push (ruleToClone :  UWRule) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateUWRule, {ruleToClone}, 1).push()
  }
  
  
}