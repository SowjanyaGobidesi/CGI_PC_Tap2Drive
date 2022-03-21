package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/NewContact.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewContact extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contactType :  typekey.ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewContact, {contactType}, 0)
  }
  
  static function drilldown (contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContact, {contactType}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContact, {contactType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContact, {contactType}, 0).goInMain()
  }
  
  static function printPage (contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContact, {contactType}, 0).printPage()
  }
  
  static function push (contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContact, {contactType}, 0).push()
  }
  
  
}