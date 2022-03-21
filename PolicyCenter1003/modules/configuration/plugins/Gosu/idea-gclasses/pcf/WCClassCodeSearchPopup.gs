package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCClassCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCClassCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (locationWM :  PolicyLocation, wcLine :  WorkersCompLine, previousWCClassCode :  WCClassCode) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WCClassCodeSearchPopup, {locationWM, wcLine, previousWCClassCode}, 0)
  }
  
  static function createDestination (domain :  WCClassCodeFederalDomains, locationWM :  PolicyLocation, wcLine :  WorkersCompLine, previousWCClassCode :  WCClassCode) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WCClassCodeSearchPopup, {domain, locationWM, wcLine, previousWCClassCode}, 1)
  }
  
  function pickValueAndCommit (value :  WCClassCode) : void {
    __widgetOf(this, pcf.WCClassCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (locationWM :  PolicyLocation, wcLine :  WorkersCompLine, previousWCClassCode :  WCClassCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WCClassCodeSearchPopup, {locationWM, wcLine, previousWCClassCode}, 0).push()
  }
  
  static function push (domain :  WCClassCodeFederalDomains, locationWM :  PolicyLocation, wcLine :  WorkersCompLine, previousWCClassCode :  WCClassCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WCClassCodeSearchPopup, {domain, locationWM, wcLine, previousWCClassCode}, 1).push()
  }
  
  
}