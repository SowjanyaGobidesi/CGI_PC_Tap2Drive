package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFileDoRetrievalForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFileDoRetrievalForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFileDoRetrievalForward, {accountNumber}, 0)
  }
  
  static function drilldown (accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileDoRetrievalForward, {accountNumber}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileDoRetrievalForward, {accountNumber}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileDoRetrievalForward, {accountNumber}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileDoRetrievalForward, {accountNumber}, 0).goInWorkspace()
  }
  
  static function printPage (accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileDoRetrievalForward, {accountNumber}, 0).printPage()
  }
  
  static function push (accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileDoRetrievalForward, {accountNumber}, 0).push()
  }
  
  
}