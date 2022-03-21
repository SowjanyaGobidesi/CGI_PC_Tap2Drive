package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/EditAuditInformationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditAuditInformationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, auditInformation :  AuditInformation) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditAuditInformationPopup, {policyPeriod, auditInformation}, 0)
  }
  
  static function push (policyPeriod :  PolicyPeriod, auditInformation :  AuditInformation) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAuditInformationPopup, {policyPeriod, auditInformation}, 0).push()
  }
  
  
}