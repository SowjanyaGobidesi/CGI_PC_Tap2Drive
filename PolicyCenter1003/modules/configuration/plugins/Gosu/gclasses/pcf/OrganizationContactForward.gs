package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/OrganizationContactForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationContactForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contact :  Contact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationContactForward, {contact}, 0)
  }
  
  static function drilldown (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationContactForward, {contact}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationContactForward, {contact}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationContactForward, {contact}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationContactForward, {contact}, 0).goInWorkspace()
  }
  
  static function printPage (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationContactForward, {contact}, 0).printPage()
  }
  
  static function push (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationContactForward, {contact}, 0).push()
  }
  
  
}