package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_Pricing.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Pricing extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (refPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Pricing, {refPeriod, asOfDate}, 0)
  }
  
  static function drilldown (refPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Pricing, {refPeriod, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (refPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Pricing, {refPeriod, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (refPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Pricing, {refPeriod, asOfDate}, 0).goInMain()
  }
  
  static function printPage (refPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Pricing, {refPeriod, asOfDate}, 0).printPage()
  }
  
  static function push (refPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Pricing, {refPeriod, asOfDate}, 0).push()
  }
  
  
}