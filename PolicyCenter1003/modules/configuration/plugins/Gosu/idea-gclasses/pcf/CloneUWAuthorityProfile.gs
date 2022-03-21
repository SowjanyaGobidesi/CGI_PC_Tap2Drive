package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/CloneUWAuthorityProfile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CloneUWAuthorityProfile extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (profileToClone :  UWAuthorityProfile) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CloneUWAuthorityProfile, {profileToClone}, 0)
  }
  
  static function drilldown (profileToClone :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CloneUWAuthorityProfile, {profileToClone}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (profileToClone :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CloneUWAuthorityProfile, {profileToClone}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (profileToClone :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CloneUWAuthorityProfile, {profileToClone}, 0).goInMain()
  }
  
  static function printPage (profileToClone :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CloneUWAuthorityProfile, {profileToClone}, 0).printPage()
  }
  
  static function push (profileToClone :  UWAuthorityProfile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CloneUWAuthorityProfile, {profileToClone}, 0).push()
  }
  
  
}