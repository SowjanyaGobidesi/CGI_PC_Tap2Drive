package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/NewAgreementPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAgreementPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (agreementType :  typekey.RIAgreement) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType}, 0)
  }
  
  static function createDestination (agreementType :  typekey.RIAgreement, basedOn :  RIAgreement) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType, basedOn}, 1)
  }
  
  static function drilldown (agreementType :  typekey.RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType}, 0).drilldown()
  }
  
  static function drilldown (agreementType :  typekey.RIAgreement, basedOn :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType, basedOn}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (agreementType :  typekey.RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (agreementType :  typekey.RIAgreement, basedOn :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType, basedOn}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (agreementType :  typekey.RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (agreementType :  typekey.RIAgreement, basedOn :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType, basedOn}, 1).goInMain()
  }
  
  static function printPage (agreementType :  typekey.RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType}, 0).printPage()
  }
  
  static function printPage (agreementType :  typekey.RIAgreement, basedOn :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType, basedOn}, 1).printPage()
  }
  
  static function push (agreementType :  typekey.RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType}, 0).push()
  }
  
  static function push (agreementType :  typekey.RIAgreement, basedOn :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAgreementPage, {agreementType, basedOn}, 1).push()
  }
  
  
}