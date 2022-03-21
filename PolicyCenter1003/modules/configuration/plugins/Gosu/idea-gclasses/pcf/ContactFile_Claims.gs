package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ContactFile_Claims.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactFile_Claims extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contact :  Contact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact}, 0)
  }
  
  static function createDestination (contact :  Contact, searchOnEnter :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact, searchOnEnter}, 1)
  }
  
  static function drilldown (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact}, 0).drilldown()
  }
  
  static function drilldown (contact :  Contact, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact, searchOnEnter}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact, searchOnEnter}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact, searchOnEnter}, 1).goInMain()
  }
  
  static function printPage (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact}, 0).printPage()
  }
  
  static function printPage (contact :  Contact, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact, searchOnEnter}, 1).printPage()
  }
  
  static function push (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact}, 0).push()
  }
  
  static function push (contact :  Contact, searchOnEnter :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactFile_Claims, {contact, searchOnEnter}, 1).push()
  }
  
  
}