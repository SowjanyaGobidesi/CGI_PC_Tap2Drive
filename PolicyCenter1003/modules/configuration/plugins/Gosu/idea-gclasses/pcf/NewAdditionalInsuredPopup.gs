package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewAdditionalInsuredPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAdditionalInsuredPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (line :  PolicyLine, contactType :  typekey.ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAdditionalInsuredPopup, {line, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  PolicyAddlInsuredDetail) : void {
    __widgetOf(this, pcf.NewAdditionalInsuredPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (line :  PolicyLine, contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAdditionalInsuredPopup, {line, contactType}, 0).push()
  }
  
  
}