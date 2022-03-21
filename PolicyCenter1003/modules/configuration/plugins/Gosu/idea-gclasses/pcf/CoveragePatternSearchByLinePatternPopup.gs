package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/CoveragePatternSearchByLinePatternPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoveragePatternSearchByLinePatternPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyLinePattern :  gw.api.productmodel.PolicyLinePattern, searchType :  CoveragePatternSearchType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CoveragePatternSearchByLinePatternPopup, {policyLinePattern, searchType}, 0)
  }
  
  function pickValueAndCommit (value :  String) : void {
    __widgetOf(this, pcf.CoveragePatternSearchByLinePatternPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyLinePattern :  gw.api.productmodel.PolicyLinePattern, searchType :  CoveragePatternSearchType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CoveragePatternSearchByLinePatternPopup, {policyLinePattern, searchType}, 0).push()
  }
  
  
}