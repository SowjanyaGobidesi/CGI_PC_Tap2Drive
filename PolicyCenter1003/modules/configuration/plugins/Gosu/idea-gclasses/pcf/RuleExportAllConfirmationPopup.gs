package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleExportAllConfirmationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleExportAllConfirmationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (helper :  gw.bizrules.pcf.RuleExportPageHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RuleExportAllConfirmationPopup, {helper}, 0)
  }
  
  static function push (helper :  gw.bizrules.pcf.RuleExportPageHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RuleExportAllConfirmationPopup, {helper}, 0).push()
  }
  
  
}