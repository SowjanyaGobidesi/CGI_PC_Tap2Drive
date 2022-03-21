package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewOwnerOfficerPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewOwnerOfficerPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (line :  WorkersCompLine, contactType :  ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewOwnerOfficerPopup, {line, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  PolicyOwnerOfficer) : void {
    __widgetOf(this, pcf.NewOwnerOfficerPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (line :  WorkersCompLine, contactType :  ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewOwnerOfficerPopup, {line, contactType}, 0).push()
  }
  
  
}