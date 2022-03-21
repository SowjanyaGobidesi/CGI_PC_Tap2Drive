package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policyfile/CommercialProperty_Modifiers.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CommercialProperty_Modifiers extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CommercialProperty_Modifiers, {period, asOfDate}, 0)
  }
  
  static function drilldown (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CommercialProperty_Modifiers, {period, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CommercialProperty_Modifiers, {period, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CommercialProperty_Modifiers, {period, asOfDate}, 0).goInMain()
  }
  
  static function printPage (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CommercialProperty_Modifiers, {period, asOfDate}, 0).printPage()
  }
  
  static function push (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CommercialProperty_Modifiers, {period, asOfDate}, 0).push()
  }
  
  
}