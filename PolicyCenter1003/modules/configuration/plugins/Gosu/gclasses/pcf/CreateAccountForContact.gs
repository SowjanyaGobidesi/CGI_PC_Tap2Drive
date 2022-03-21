package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/CreateAccountForContact.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateAccountForContact extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contact :  Contact, forNewSubmission :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreateAccountForContact, {contact, forNewSubmission}, 0)
  }
  
  static function drilldown (contact :  Contact, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccountForContact, {contact, forNewSubmission}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccountForContact, {contact, forNewSubmission}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccountForContact, {contact, forNewSubmission}, 0).goInMain()
  }
  
  static function printPage (contact :  Contact, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccountForContact, {contact, forNewSubmission}, 0).printPage()
  }
  
  static function push (contact :  Contact, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccountForContact, {contact, forNewSubmission}, 0).push()
  }
  
  
}