package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/RatingWorksheetPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingWorksheetPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyLine :  PolicyLine) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RatingWorksheetPopup, {policyLine}, 0)
  }
  
  static function push (policyLine :  PolicyLine) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RatingWorksheetPopup, {policyLine}, 0).push()
  }
  
  
}