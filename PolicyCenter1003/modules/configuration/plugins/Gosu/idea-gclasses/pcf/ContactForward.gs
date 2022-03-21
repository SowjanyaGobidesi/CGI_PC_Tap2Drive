package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ContactForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactForward, {}, 0)
  }
  
  static function createDestination (contact :  Contact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactForward, {contact}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {}, 0).drilldown()
  }
  
  static function drilldown (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {contact}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {contact}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {contact}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {contact}, 1).goInWorkspace()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {}, 0).printPage()
  }
  
  static function printPage (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {contact}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {}, 0).push()
  }
  
  static function push (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactForward, {contact}, 1).push()
  }
  
  
}