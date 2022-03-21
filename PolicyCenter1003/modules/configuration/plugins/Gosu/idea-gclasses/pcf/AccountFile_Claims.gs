package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_Claims.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_Claims extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (account :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account}, 0)
  }
  
  static function createDestination (account :  Account, searchOnEnter :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account, searchOnEnter}, 1)
  }
  
  static function drilldown (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account}, 0).drilldown()
  }
  
  static function drilldown (account :  Account, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account, searchOnEnter}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (account :  Account, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account, searchOnEnter}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (account :  Account, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account, searchOnEnter}, 1).goInMain()
  }
  
  static function printPage (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account}, 0).printPage()
  }
  
  static function printPage (account :  Account, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account, searchOnEnter}, 1).printPage()
  }
  
  static function push (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account}, 0).push()
  }
  
  static function push (account :  Account, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountFile_Claims, {account, searchOnEnter}, 1).push()
  }
  
  
}