package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_AccountSearch.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_AccountSearch extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (currentAccount :  Account, searchReason :  gw.account.AccountSearchReason) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFile_AccountSearch, {currentAccount, searchReason}, 0)
  }
  
  static function drilldown (currentAccount :  Account, searchReason :  gw.account.AccountSearchReason) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_AccountSearch, {currentAccount, searchReason}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (currentAccount :  Account, searchReason :  gw.account.AccountSearchReason) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_AccountSearch, {currentAccount, searchReason}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (currentAccount :  Account, searchReason :  gw.account.AccountSearchReason) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_AccountSearch, {currentAccount, searchReason}, 0).goInMain()
  }
  
  static function printPage (currentAccount :  Account, searchReason :  gw.account.AccountSearchReason) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_AccountSearch, {currentAccount, searchReason}, 0).printPage()
  }
  
  static function push (currentAccount :  Account, searchReason :  gw.account.AccountSearchReason) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_AccountSearch, {currentAccount, searchReason}, 0).push()
  }
  
  
}