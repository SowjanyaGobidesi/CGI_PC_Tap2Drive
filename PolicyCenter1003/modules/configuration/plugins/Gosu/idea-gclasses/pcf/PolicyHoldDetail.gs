package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/PolicyHoldDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyHoldDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyHold :  PolicyHold) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyHoldDetail, {policyHold}, 0)
  }
  
  static function drilldown (policyHold :  PolicyHold) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyHoldDetail, {policyHold}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyHold :  PolicyHold) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyHoldDetail, {policyHold}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyHold :  PolicyHold) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyHoldDetail, {policyHold}, 0).goInMain()
  }
  
  static function printPage (policyHold :  PolicyHold) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyHoldDetail, {policyHold}, 0).printPage()
  }
  
  static function push (policyHold :  PolicyHold) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyHoldDetail, {policyHold}, 0).push()
  }
  
  
}