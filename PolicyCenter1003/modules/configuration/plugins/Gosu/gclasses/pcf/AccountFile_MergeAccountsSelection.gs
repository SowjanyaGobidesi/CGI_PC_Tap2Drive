package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_MergeAccountsSelection.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_MergeAccountsSelection extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (victimAccount :  Account, survivingAccount :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFile_MergeAccountsSelection, {victimAccount, survivingAccount}, 0)
  }
  
  static function drilldown (victimAccount :  Account, survivingAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MergeAccountsSelection, {victimAccount, survivingAccount}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (victimAccount :  Account, survivingAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MergeAccountsSelection, {victimAccount, survivingAccount}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (victimAccount :  Account, survivingAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MergeAccountsSelection, {victimAccount, survivingAccount}, 0).goInMain()
  }
  
  static function printPage (victimAccount :  Account, survivingAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MergeAccountsSelection, {victimAccount, survivingAccount}, 0).printPage()
  }
  
  static function push (victimAccount :  Account, survivingAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_MergeAccountsSelection, {victimAccount, survivingAccount}, 0).push()
  }
  
  
}