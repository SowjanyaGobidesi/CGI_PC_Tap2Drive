package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/navigator/DisplayBeanPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DisplayBeanPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (bean :  KeyableBean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DisplayBeanPopup, {bean}, 0)
  }
  
  static function push (bean :  KeyableBean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DisplayBeanPopup, {bean}, 0).push()
  }
  
  
}