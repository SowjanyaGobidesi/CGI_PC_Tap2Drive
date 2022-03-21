package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ContactFile_Details.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactFile_Details extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contact :  Contact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact}, 0)
  }
  
  static function createDestination (contact :  Contact, startEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact, startEdit}, 1)
  }
  
  static function drilldown (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact}, 0).drilldown()
  }
  
  static function drilldown (contact :  Contact, startEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact, startEdit}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact, startEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact, startEdit}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact, startEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact, startEdit}, 1).goInMain()
  }
  
  static function printPage (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact}, 0).printPage()
  }
  
  static function printPage (contact :  Contact, startEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact, startEdit}, 1).printPage()
  }
  
  static function push (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact}, 0).push()
  }
  
  static function push (contact :  Contact, startEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Details, {contact, startEdit}, 1).push()
  }
  
  
}