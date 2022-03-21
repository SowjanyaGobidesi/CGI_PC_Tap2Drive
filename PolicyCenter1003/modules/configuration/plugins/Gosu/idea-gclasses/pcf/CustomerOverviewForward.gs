package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/CustomerOverviewForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CustomerOverviewForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (PublicID :  String, Phone :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CustomerOverviewForward, {PublicID, Phone}, 0)
  }
  
  static function drilldown (PublicID :  String, Phone :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CustomerOverviewForward, {PublicID, Phone}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (PublicID :  String, Phone :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CustomerOverviewForward, {PublicID, Phone}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (PublicID :  String, Phone :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CustomerOverviewForward, {PublicID, Phone}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (PublicID :  String, Phone :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CustomerOverviewForward, {PublicID, Phone}, 0).goInWorkspace()
  }
  
  static function printPage (PublicID :  String, Phone :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CustomerOverviewForward, {PublicID, Phone}, 0).printPage()
  }
  
  static function push (PublicID :  String, Phone :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CustomerOverviewForward, {PublicID, Phone}, 0).push()
  }
  
  
}