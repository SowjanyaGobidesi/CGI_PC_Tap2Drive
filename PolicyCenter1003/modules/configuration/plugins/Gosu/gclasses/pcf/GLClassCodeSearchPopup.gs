package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/gl/policy/GLClassCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GLClassCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (glLine :  GLLine) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GLClassCodeSearchPopup, {glLine}, 0)
  }
  
  static function createDestination (glLine :  GLLine, glExposure :  GLExposure) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GLClassCodeSearchPopup, {glLine, glExposure}, 1)
  }
  
  function pickValueAndCommit (value :  GLClassCode) : void {
    __widgetOf(this, pcf.GLClassCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (glLine :  GLLine) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GLClassCodeSearchPopup, {glLine}, 0).push()
  }
  
  static function push (glLine :  GLLine, glExposure :  GLExposure) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GLClassCodeSearchPopup, {glLine, glExposure}, 1).push()
  }
  
  
}