package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookXMLImport.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookXMLImport extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (importFile :  gw.rating.rtm.util.WebFileWrapper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateBookXMLImport, {importFile}, 0)
  }
  
  static function drilldown (importFile :  gw.rating.rtm.util.WebFileWrapper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBookXMLImport, {importFile}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (importFile :  gw.rating.rtm.util.WebFileWrapper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBookXMLImport, {importFile}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (importFile :  gw.rating.rtm.util.WebFileWrapper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBookXMLImport, {importFile}, 0).goInMain()
  }
  
  static function printPage (importFile :  gw.rating.rtm.util.WebFileWrapper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBookXMLImport, {importFile}, 0).printPage()
  }
  
  static function push (importFile :  gw.rating.rtm.util.WebFileWrapper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBookXMLImport, {importFile}, 0).push()
  }
  
  
}