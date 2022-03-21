package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/EditAgreementPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditAgreementPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (agreement :  RIAgreement) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditAgreementPage, {agreement}, 0)
  }
  
  static function drilldown (agreement :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAgreementPage, {agreement}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (agreement :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAgreementPage, {agreement}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (agreement :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAgreementPage, {agreement}, 0).goInMain()
  }
  
  static function printPage (agreement :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAgreementPage, {agreement}, 0).printPage()
  }
  
  static function push (agreement :  RIAgreement) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAgreementPage, {agreement}, 0).push()
  }
  
  
}