package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/organizationselect/OrganizationGroupTreePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationGroupTreePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {}, 0)
  }
  
  static function createDestination (organizationSelection :  OrganizationSelection) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {organizationSelection}, 1)
  }
  
  static function createDestination (organizationSelection :  OrganizationSelection, showOrganizationSelection :  Boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {organizationSelection, showOrganizationSelection}, 2)
  }
  
  static function createDestination (organizationSelection :  OrganizationSelection, showOrganizationSelection :  Boolean, canSelectRootGroup :  Boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {organizationSelection, showOrganizationSelection, canSelectRootGroup}, 3)
  }
  
  function pickValueAndCommit (value :  Group) : void {
    __widgetOf(this, pcf.OrganizationGroupTreePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {}, 0).push()
  }
  
  static function push (organizationSelection :  OrganizationSelection) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {organizationSelection}, 1).push()
  }
  
  static function push (organizationSelection :  OrganizationSelection, showOrganizationSelection :  Boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {organizationSelection, showOrganizationSelection}, 2).push()
  }
  
  static function push (organizationSelection :  OrganizationSelection, showOrganizationSelection :  Boolean, canSelectRootGroup :  Boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationGroupTreePopup, {organizationSelection, showOrganizationSelection, canSelectRootGroup}, 3).push()
  }
  
  
}