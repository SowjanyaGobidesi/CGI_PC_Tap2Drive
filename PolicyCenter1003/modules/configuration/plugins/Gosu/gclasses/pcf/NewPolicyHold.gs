package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/NewPolicyHold.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewPolicyHold extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewPolicyHold, {}, 0)
  }
  
  static function createDestination (policyHoldToCopy :  PolicyHold, copyRules :  boolean, copyRegions :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewPolicyHold, {policyHoldToCopy, copyRules, copyRegions}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {}, 0).drilldown()
  }
  
  static function drilldown (policyHoldToCopy :  PolicyHold, copyRules :  boolean, copyRegions :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {policyHoldToCopy, copyRules, copyRegions}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyHoldToCopy :  PolicyHold, copyRules :  boolean, copyRegions :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {policyHoldToCopy, copyRules, copyRegions}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyHoldToCopy :  PolicyHold, copyRules :  boolean, copyRegions :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {policyHoldToCopy, copyRules, copyRegions}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {}, 0).printPage()
  }
  
  static function printPage (policyHoldToCopy :  PolicyHold, copyRules :  boolean, copyRegions :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {policyHoldToCopy, copyRules, copyRegions}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {}, 0).push()
  }
  
  static function push (policyHoldToCopy :  PolicyHold, copyRules :  boolean, copyRegions :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyHold, {policyHoldToCopy, copyRules, copyRegions}, 1).push()
  }
  
  
}