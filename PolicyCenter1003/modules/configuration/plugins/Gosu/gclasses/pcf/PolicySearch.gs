package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/PolicySearch.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicySearch extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicySearch, {}, 0)
  }
  
  static function createDestination (errorMessage :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicySearch, {errorMessage}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {}, 0).drilldown()
  }
  
  static function drilldown (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {errorMessage}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {errorMessage}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {errorMessage}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {}, 0).printPage()
  }
  
  static function printPage (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {errorMessage}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {}, 0).push()
  }
  
  static function push (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicySearch, {errorMessage}, 1).push()
  }
  
  
}