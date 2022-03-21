package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/renmgr/RenewalGroupDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalGroupDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (renewalGroup :  RenewalGroup) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RenewalGroupDetail, {renewalGroup}, 0)
  }
  
  static function drilldown (renewalGroup :  RenewalGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RenewalGroupDetail, {renewalGroup}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (renewalGroup :  RenewalGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RenewalGroupDetail, {renewalGroup}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (renewalGroup :  RenewalGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RenewalGroupDetail, {renewalGroup}, 0).goInMain()
  }
  
  static function printPage (renewalGroup :  RenewalGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RenewalGroupDetail, {renewalGroup}, 0).printPage()
  }
  
  static function push (renewalGroup :  RenewalGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RenewalGroupDetail, {renewalGroup}, 0).push()
  }
  
  
}