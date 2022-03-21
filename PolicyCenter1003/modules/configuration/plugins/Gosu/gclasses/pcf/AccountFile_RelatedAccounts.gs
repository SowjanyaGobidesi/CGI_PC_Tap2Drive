package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_RelatedAccounts.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_RelatedAccounts extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (account :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFile_RelatedAccounts, {account}, 0)
  }
  
  static function drilldown (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_RelatedAccounts, {account}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_RelatedAccounts, {account}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_RelatedAccounts, {account}, 0).goInMain()
  }
  
  static function printPage (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_RelatedAccounts, {account}, 0).printPage()
  }
  
  static function push (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_RelatedAccounts, {account}, 0).push()
  }
  
  
}