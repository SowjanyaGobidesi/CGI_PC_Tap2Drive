package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/HVQSearch.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HVQSearch extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.HVQSearch, {}, 0)
  }
  
  static function createDestination (errorMessage :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.HVQSearch, {errorMessage}, 1)
  }
  
  static function createDestination (defaultQuoteKey :  gw.api.quoting.QuoteKey) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.HVQSearch, {defaultQuoteKey}, 2)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {}, 0).drilldown()
  }
  
  static function drilldown (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {errorMessage}, 1).drilldown()
  }
  
  static function drilldown (defaultQuoteKey :  gw.api.quoting.QuoteKey) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {defaultQuoteKey}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {errorMessage}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (defaultQuoteKey :  gw.api.quoting.QuoteKey) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {defaultQuoteKey}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {errorMessage}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (defaultQuoteKey :  gw.api.quoting.QuoteKey) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {defaultQuoteKey}, 2).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {}, 0).printPage()
  }
  
  static function printPage (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {errorMessage}, 1).printPage()
  }
  
  static function printPage (defaultQuoteKey :  gw.api.quoting.QuoteKey) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {defaultQuoteKey}, 2).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {}, 0).push()
  }
  
  static function push (errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {errorMessage}, 1).push()
  }
  
  static function push (defaultQuoteKey :  gw.api.quoting.QuoteKey) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQSearch, {defaultQuoteKey}, 2).push()
  }
  
  
}