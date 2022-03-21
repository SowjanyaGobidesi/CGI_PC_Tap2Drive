package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_MovePoliciesSelection.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_MovePoliciesSelection extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (srcAccount :  Account, targetAccount :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFile_MovePoliciesSelection, {srcAccount, targetAccount}, 0)
  }
  
  static function drilldown (srcAccount :  Account, targetAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MovePoliciesSelection, {srcAccount, targetAccount}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (srcAccount :  Account, targetAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MovePoliciesSelection, {srcAccount, targetAccount}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (srcAccount :  Account, targetAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MovePoliciesSelection, {srcAccount, targetAccount}, 0).goInMain()
  }
  
  static function printPage (srcAccount :  Account, targetAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MovePoliciesSelection, {srcAccount, targetAccount}, 0).printPage()
  }
  
  static function push (srcAccount :  Account, targetAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MovePoliciesSelection, {srcAccount, targetAccount}, 0).push()
  }
  
  
}