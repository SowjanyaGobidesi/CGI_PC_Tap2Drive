package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/CovPatternSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CovPatternSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyLine :  typekey.PolicyLine, linePattern :  gw.api.productmodel.PolicyLinePattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CovPatternSearchPopup, {policyLine, linePattern}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.productmodel.CoveragePattern) : void {
    __widgetOf(this, pcf.CovPatternSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyLine :  typekey.PolicyLine, linePattern :  gw.api.productmodel.PolicyLinePattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CovPatternSearchPopup, {policyLine, linePattern}, 0).push()
  }
  
  
}