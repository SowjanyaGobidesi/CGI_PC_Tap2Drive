package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewBillingContactPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewBillingContactPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, contactType :  typekey.ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewBillingContactPopup, {policyPeriod, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  PolicyBillingContact) : void {
    __widgetOf(this, pcf.NewBillingContactPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyPeriod :  PolicyPeriod, contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewBillingContactPopup, {policyPeriod, contactType}, 0).push()
  }
  
  
}