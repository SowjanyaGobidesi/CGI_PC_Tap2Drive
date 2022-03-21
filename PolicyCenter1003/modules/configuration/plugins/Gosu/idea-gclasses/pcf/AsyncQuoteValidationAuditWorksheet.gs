package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AsyncQuoteValidationAuditWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AsyncQuoteValidationAuditWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AsyncQuoteValidationAuditWorksheet, {policyPeriod}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AsyncQuoteValidationAuditWorksheet, {policyPeriod}, 0).goInWorkspace()
  }
  
  static function push (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AsyncQuoteValidationAuditWorksheet, {policyPeriod}, 0).push()
  }
  
  
}