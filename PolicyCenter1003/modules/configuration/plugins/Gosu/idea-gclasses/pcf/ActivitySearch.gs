package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ActivitySearch.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivitySearch extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivitySearch, {}, 0)
  }
  
  static function createDestination (activityStatus :  ActivityStatus) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivitySearch, {activityStatus}, 1)
  }
  
  static function createDestination (user :  User, activityStatus :  ActivityStatus) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivitySearch, {user, activityStatus}, 2)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {}, 0).drilldown()
  }
  
  static function drilldown (activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {activityStatus}, 1).drilldown()
  }
  
  static function drilldown (user :  User, activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {user, activityStatus}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {activityStatus}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (user :  User, activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {user, activityStatus}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {activityStatus}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (user :  User, activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {user, activityStatus}, 2).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {}, 0).printPage()
  }
  
  static function printPage (activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {activityStatus}, 1).printPage()
  }
  
  static function printPage (user :  User, activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {user, activityStatus}, 2).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {}, 0).push()
  }
  
  static function push (activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {activityStatus}, 1).push()
  }
  
  static function push (user :  User, activityStatus :  ActivityStatus) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivitySearch, {user, activityStatus}, 2).push()
  }
  
  
}