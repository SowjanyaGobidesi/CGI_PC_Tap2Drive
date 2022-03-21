package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/IMRatingCumulPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMRatingCumulPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (imLine :  InlandMarineLine, imPartSubtype :  typekey.IMCoveragePart) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IMRatingCumulPopup, {imLine, imPartSubtype}, 0)
  }
  
  static function push (imLine :  InlandMarineLine, imPartSubtype :  typekey.IMCoveragePart) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IMRatingCumulPopup, {imLine, imPartSubtype}, 0).push()
  }
  
  
}