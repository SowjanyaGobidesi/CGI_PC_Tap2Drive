package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UWIssueTypeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWIssueTypeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (profile :  entity.UWAuthorityProfile, issueTypeName :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWIssueTypeSearchPopup, {profile, issueTypeName}, 0)
  }
  
  function pickValueAndCommit (value :  UWIssueType) : void {
    __widgetOf(this, pcf.UWIssueTypeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (profile :  entity.UWAuthorityProfile, issueTypeName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWIssueTypeSearchPopup, {profile, issueTypeName}, 0).push()
  }
  
  
}