package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewPolicyDriverPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewPolicyDriverPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (line :  PersonalAutoLine, contactType :  ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewPolicyDriverPopup, {line, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  PolicyDriver) : void {
    __widgetOf(this, pcf.NewPolicyDriverPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (line :  PersonalAutoLine, contactType :  ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPolicyDriverPopup, {line, contactType}, 0).push()
  }
  
  
}