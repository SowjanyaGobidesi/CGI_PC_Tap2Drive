package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/DeployConfirmationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DeployConfirmationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (pageHelper :  gw.bizrules.pcf.RuleDeploymentPageHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DeployConfirmationPopup, {pageHelper}, 0)
  }
  
  static function push (pageHelper :  gw.bizrules.pcf.RuleDeploymentPageHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DeployConfirmationPopup, {pageHelper}, 0).push()
  }
  
  
}