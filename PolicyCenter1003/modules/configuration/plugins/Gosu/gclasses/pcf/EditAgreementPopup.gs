package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/EditAgreementPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditAgreementPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (agreement :  RIAgreement, ririsk :  entity.RIRisk, isreadonly :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditAgreementPopup, {agreement, ririsk, isreadonly}, 0)
  }
  
  function pickValueAndCommit (value :  RIAgreement) : void {
    __widgetOf(this, pcf.EditAgreementPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (agreement :  RIAgreement, ririsk :  entity.RIRisk, isreadonly :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAgreementPopup, {agreement, ririsk, isreadonly}, 0).push()
  }
  
  
}