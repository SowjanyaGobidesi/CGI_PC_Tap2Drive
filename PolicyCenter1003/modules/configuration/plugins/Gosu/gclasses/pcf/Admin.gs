package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/Admin.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Admin extends com.guidewire.pl.web.codegen.LocationGroupBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.Admin, {}, 0)
  }
  
  static function createDestination (affinityGroup :  AffinityGroup) : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.Admin, {affinityGroup}, 3)
  }
  
  static function createDestination (group :  Group) : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.Admin, {group}, 1)
  }
  
  static function createDestination (org :  Organization) : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.Admin, {org}, 2)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {}, 0).drilldown()
  }
  
  static function drilldown (affinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {affinityGroup}, 3).drilldown()
  }
  
  static function drilldown (group :  Group) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {group}, 1).drilldown()
  }
  
  static function drilldown (org :  Organization) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {org}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (affinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {affinityGroup}, 3).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (group :  Group) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {group}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (org :  Organization) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {org}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (affinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {affinityGroup}, 3).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (group :  Group) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {group}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (org :  Organization) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {org}, 2).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {}, 0).printPage()
  }
  
  static function printPage (affinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {affinityGroup}, 3).printPage()
  }
  
  static function printPage (group :  Group) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {group}, 1).printPage()
  }
  
  static function printPage (org :  Organization) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {org}, 2).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {}, 0).push()
  }
  
  static function push (affinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {affinityGroup}, 3).push()
  }
  
  static function push (group :  Group) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {group}, 1).push()
  }
  
  static function push (org :  Organization) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.Admin, {org}, 2).push()
  }
  
  
}