package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewAdditionalNamedInsuredPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAdditionalNamedInsuredPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, contactType :  typekey.ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAdditionalNamedInsuredPopup, {period, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  PolicyAddlNamedInsured) : void {
    __widgetOf(this, pcf.NewAdditionalNamedInsuredPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (period :  PolicyPeriod, contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAdditionalNamedInsuredPopup, {period, contactType}, 0).push()
  }
  
  
}