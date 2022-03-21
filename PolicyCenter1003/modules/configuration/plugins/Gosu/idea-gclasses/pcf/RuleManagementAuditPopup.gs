package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleManagementAuditPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleManagementAuditPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (controller :  gw.bizrules.pcf.RuleManagementAuditController, initialVersion :  RuleVersion) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RuleManagementAuditPopup, {controller, initialVersion}, 0)
  }
  
  static function push (controller :  gw.bizrules.pcf.RuleManagementAuditController, initialVersion :  RuleVersion) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RuleManagementAuditPopup, {controller, initialVersion}, 0).push()
  }
  
  
}