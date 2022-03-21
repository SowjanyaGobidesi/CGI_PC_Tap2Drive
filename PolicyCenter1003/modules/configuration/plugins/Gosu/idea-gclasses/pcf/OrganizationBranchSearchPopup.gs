package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/OrganizationBranchSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationBranchSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationBranchSearchPopup, {}, 0)
  }
  
  static function createDestination (organizationSelection :  OrganizationSelection) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationBranchSearchPopup, {organizationSelection}, 1)
  }
  
  function pickValueAndCommit (value :  Group) : void {
    __widgetOf(this, pcf.OrganizationBranchSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationBranchSearchPopup, {}, 0).push()
  }
  
  static function push (organizationSelection :  OrganizationSelection) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationBranchSearchPopup, {organizationSelection}, 1).push()
  }
  
  
}