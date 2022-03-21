package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFileForwardWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFileForwardWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (account :  Account, conditionType :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFileForwardWorksheet, {account, conditionType}, 0)
  }
  
  static function drilldown (account :  Account, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileForwardWorksheet, {account, conditionType}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (account :  Account, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileForwardWorksheet, {account, conditionType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (account :  Account, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileForwardWorksheet, {account, conditionType}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (account :  Account, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileForwardWorksheet, {account, conditionType}, 0).goInWorkspace()
  }
  
  static function printPage (account :  Account, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileForwardWorksheet, {account, conditionType}, 0).printPage()
  }
  
  static function push (account :  Account, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFileForwardWorksheet, {account, conditionType}, 0).push()
  }
  
  
}