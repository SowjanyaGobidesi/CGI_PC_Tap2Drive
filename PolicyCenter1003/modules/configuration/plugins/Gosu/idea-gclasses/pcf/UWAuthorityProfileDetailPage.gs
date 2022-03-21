package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UWAuthorityProfileDetailPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWAuthorityProfileDetailPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (profile :  UWAuthorityProfile) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWAuthorityProfileDetailPage, {profile}, 0)
  }
  
  static function drilldown (profile :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWAuthorityProfileDetailPage, {profile}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (profile :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWAuthorityProfileDetailPage, {profile}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (profile :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWAuthorityProfileDetailPage, {profile}, 0).goInMain()
  }
  
  static function printPage (profile :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWAuthorityProfileDetailPage, {profile}, 0).printPage()
  }
  
  static function push (profile :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWAuthorityProfileDetailPage, {profile}, 0).push()
  }
  
  
}