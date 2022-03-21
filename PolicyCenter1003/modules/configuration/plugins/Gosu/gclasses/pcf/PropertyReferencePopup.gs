package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/PropertyReferencePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PropertyReferencePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (fragment :  gw.bizrules.pcf.PropertyReferenceExpressionFragmentHolder) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PropertyReferencePopup, {fragment}, 0)
  }
  
  static function push (fragment :  gw.bizrules.pcf.PropertyReferenceExpressionFragmentHolder) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PropertyReferencePopup, {fragment}, 0).push()
  }
  
  
}