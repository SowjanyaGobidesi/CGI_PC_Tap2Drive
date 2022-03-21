package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/new/NewSubmission.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewSubmission extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewSubmission, {}, 0)
  }
  
  static function createDestination (acct :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewSubmission, {acct}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {}, 0).drilldown()
  }
  
  static function drilldown (acct :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {acct}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (acct :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {acct}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (acct :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {acct}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {}, 0).printPage()
  }
  
  static function printPage (acct :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {acct}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {}, 0).push()
  }
  
  static function push (acct :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewSubmission, {acct}, 1).push()
  }
  
  
}