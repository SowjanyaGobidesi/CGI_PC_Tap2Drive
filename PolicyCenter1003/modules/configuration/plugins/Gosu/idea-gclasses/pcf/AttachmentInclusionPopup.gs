package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/AttachmentInclusionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AttachmentInclusionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (agreement :  RIAgreement, risk :  RIRisk) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AttachmentInclusionPopup, {agreement, risk}, 0)
  }
  
  static function push (agreement :  RIAgreement, risk :  RIRisk) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AttachmentInclusionPopup, {agreement, risk}, 0).push()
  }
  
  
}