package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/OrganizationDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (organization :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationDetail, {organization}, 0)
  }
  
  static function drilldown (organization :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationDetail, {organization}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (organization :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationDetail, {organization}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (organization :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationDetail, {organization}, 0).goInMain()
  }
  
  static function printPage (organization :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationDetail, {organization}, 0).printPage()
  }
  
  static function push (organization :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationDetail, {organization}, 0).push()
  }
  
  
}