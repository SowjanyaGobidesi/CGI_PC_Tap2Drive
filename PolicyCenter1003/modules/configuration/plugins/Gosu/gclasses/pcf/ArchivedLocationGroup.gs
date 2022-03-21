package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/archive/ArchivedLocationGroup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ArchivedLocationGroup extends com.guidewire.pl.web.codegen.LocationGroupBase {
  static function createDestination (policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.ArchivedLocationGroup, {policyPeriod}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.ArchivedLocationGroup, {policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.ArchivedLocationGroup, {policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.ArchivedLocationGroup, {policyPeriod}, 0).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.ArchivedLocationGroup, {policyPeriod}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.ArchivedLocationGroup, {policyPeriod}, 0).push()
  }
  
  
}