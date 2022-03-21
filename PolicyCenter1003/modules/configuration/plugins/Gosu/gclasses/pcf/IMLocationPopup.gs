package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/IMLocationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMLocationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (imLocation :  IMLocation, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IMLocationPopup, {imLocation, openForEdit, startInEdit}, 1)
  }
  
  static function createDestination (imLine :  InlandMarineLine, acctLocation :  AccountLocation, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IMLocationPopup, {imLine, acctLocation, openForEdit, startInEdit}, 2)
  }
  
  static function createDestination (imLine :  InlandMarineLine, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IMLocationPopup, {imLine, openForEdit, startInEdit}, 0)
  }
  
  function pickValueAndCommit (value :  IMLocation) : void {
    __widgetOf(this, pcf.IMLocationPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (imLocation :  IMLocation, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IMLocationPopup, {imLocation, openForEdit, startInEdit}, 1).push()
  }
  
  static function push (imLine :  InlandMarineLine, acctLocation :  AccountLocation, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IMLocationPopup, {imLine, acctLocation, openForEdit, startInEdit}, 2).push()
  }
  
  static function push (imLine :  InlandMarineLine, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IMLocationPopup, {imLine, openForEdit, startInEdit}, 0).push()
  }
  
  
}