package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/RiskClassSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RiskClassSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyLinePattern :  gw.api.productmodel.PolicyLinePattern, coveragePattern :  gw.api.productmodel.CoveragePattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RiskClassSearchPopup, {policyLinePattern, coveragePattern}, 0)
  }
  
  function pickValueAndCommit (value :  RiskClass) : void {
    __widgetOf(this, pcf.RiskClassSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyLinePattern :  gw.api.productmodel.PolicyLinePattern, coveragePattern :  gw.api.productmodel.CoveragePattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RiskClassSearchPopup, {policyLinePattern, coveragePattern}, 0).push()
  }
  
  
}