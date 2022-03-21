package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/HVQAccountSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HVQAccountSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (quoteStoreSummary :  gw.quoting.QuoteSummarySearchResult) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.HVQAccountSearchPopup, {quoteStoreSummary}, 0)
  }
  
  static function push (quoteStoreSummary :  gw.quoting.QuoteSummarySearchResult) : pcf.api.Location {
    return __newDestinationForLocation(pcf.HVQAccountSearchPopup, {quoteStoreSummary}, 0).push()
  }
  
  
}