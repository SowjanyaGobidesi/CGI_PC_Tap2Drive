package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ContactFile_Accounts.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactFile_Accounts extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contact :  Contact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactFile_Accounts, {contact}, 0)
  }
  
  static function drilldown (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Accounts, {contact}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Accounts, {contact}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Accounts, {contact}, 0).goInMain()
  }
  
  static function printPage (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Accounts, {contact}, 0).printPage()
  }
  
  static function push (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Accounts, {contact}, 0).push()
  }
  
  
}