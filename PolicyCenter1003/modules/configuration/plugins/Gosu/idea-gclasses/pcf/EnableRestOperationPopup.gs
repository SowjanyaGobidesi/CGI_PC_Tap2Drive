package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/profiler/EnableRestOperationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EnableRestOperationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (enableAlertBar :  boolean[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EnableRestOperationPopup, {enableAlertBar}, 0)
  }
  
  static function push (enableAlertBar :  boolean[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EnableRestOperationPopup, {enableAlertBar}, 0).push()
  }
  
  
}