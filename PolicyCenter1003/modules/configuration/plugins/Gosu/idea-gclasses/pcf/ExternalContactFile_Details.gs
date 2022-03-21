package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ExternalContactFile_Details.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExternalContactFile_Details extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ExternalContactFile_Details, {contactSearchResult}, 0)
  }
  
  static function drilldown (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExternalContactFile_Details, {contactSearchResult}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExternalContactFile_Details, {contactSearchResult}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExternalContactFile_Details, {contactSearchResult}, 0).goInMain()
  }
  
  static function printPage (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExternalContactFile_Details, {contactSearchResult}, 0).printPage()
  }
  
  static function push (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExternalContactFile_Details, {contactSearchResult}, 0).push()
  }
  
  
}