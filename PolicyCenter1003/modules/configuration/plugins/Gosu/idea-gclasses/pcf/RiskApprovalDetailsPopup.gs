package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/RiskApprovalDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RiskApprovalDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (issues :  UWIssue[], canEdit :  boolean, usingApproveAllPermission :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RiskApprovalDetailsPopup, {issues, canEdit, usingApproveAllPermission}, 0)
  }
  
  static function push (issues :  UWIssue[], canEdit :  boolean, usingApproveAllPermission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RiskApprovalDetailsPopup, {issues, canEdit, usingApproveAllPermission}, 0).push()
  }
  
  
}