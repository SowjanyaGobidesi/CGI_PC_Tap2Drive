package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/NewContingencyPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewContingencyPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contingencyCreator :  gw.api.contingency.ContingencyCreator) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewContingencyPopup, {contingencyCreator}, 0)
  }
  
  static function push (contingencyCreator :  gw.api.contingency.ContingencyCreator) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContingencyPopup, {contingencyCreator}, 0).push()
  }
  
  
}