package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/prerenewal/PreRenewalDirectionPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PreRenewalDirectionPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, policy :  Policy, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PreRenewalDirectionPage, {policyPeriod, policy, asOfDate}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, policy :  Policy, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalDirectionPage, {policyPeriod, policy, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, policy :  Policy, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalDirectionPage, {policyPeriod, policy, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, policy :  Policy, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalDirectionPage, {policyPeriod, policy, asOfDate}, 0).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, policy :  Policy, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalDirectionPage, {policyPeriod, policy, asOfDate}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, policy :  Policy, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalDirectionPage, {policyPeriod, policy, asOfDate}, 0).push()
  }
  
  
}