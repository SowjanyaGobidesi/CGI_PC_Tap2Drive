package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/AgreementSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AgreementSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (ririsk :  RIRisk) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AgreementSearchPopup, {ririsk}, 1)
  }
  
  static function createDestination (searchType :  int, currency :  Currency, toExcludes :  RIAgreement[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AgreementSearchPopup, {searchType, currency, toExcludes}, 0)
  }
  
  function pickValueAndCommit (value :  RIAgreement[]) : void {
    __widgetOf(this, pcf.AgreementSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (ririsk :  RIRisk) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AgreementSearchPopup, {ririsk}, 1).push()
  }
  
  static function push (searchType :  int, currency :  Currency, toExcludes :  RIAgreement[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AgreementSearchPopup, {searchType, currency, toExcludes}, 0).push()
  }
  
  
}