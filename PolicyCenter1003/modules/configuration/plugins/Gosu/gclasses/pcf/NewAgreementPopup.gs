package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/NewAgreementPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAgreementPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (agreementType :  typekey.RIAgreement, ririsk :  entity.RIRisk) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAgreementPopup, {agreementType, ririsk}, 0)
  }
  
  function pickValueAndCommit (value :  RIAgreement) : void {
    __widgetOf(this, pcf.NewAgreementPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (agreementType :  typekey.RIAgreement, ririsk :  entity.RIRisk) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPopup, {agreementType, ririsk}, 0).push()
  }
  
  
}