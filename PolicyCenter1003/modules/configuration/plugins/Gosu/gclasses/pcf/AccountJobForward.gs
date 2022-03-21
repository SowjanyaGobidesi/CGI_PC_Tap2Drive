package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountJobForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountJobForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (job :  Job) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountJobForward, {job}, 0)
  }
  
  static function drilldown (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountJobForward, {job}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountJobForward, {job}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountJobForward, {job}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountJobForward, {job}, 0).goInWorkspace()
  }
  
  static function printPage (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountJobForward, {job}, 0).printPage()
  }
  
  static function push (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountJobForward, {job}, 0).push()
  }
  
  
}