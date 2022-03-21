package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/util/GoogleSearch.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GoogleSearch extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GoogleSearch, {}, 0)
  }
  
  static function createDestination (SearchText :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GoogleSearch, {SearchText}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.GoogleSearch, {}, 0).drilldown()
  }
  
  static function drilldown (SearchText :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GoogleSearch, {SearchText}, 1).drilldown()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.GoogleSearch, {}, 0).printPage()
  }
  
  static function printPage (SearchText :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GoogleSearch, {SearchText}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.GoogleSearch, {}, 0).push()
  }
  
  static function push (SearchText :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GoogleSearch, {SearchText}, 1).push()
  }
  
  
}