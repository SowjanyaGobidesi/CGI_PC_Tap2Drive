package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (audit :  Audit, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.AuditWizard, {audit, policyPeriod}, 0)
  }
  
  static function drilldown (audit :  Audit, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.AuditWizard, {audit, policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (audit :  Audit, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.AuditWizard, {audit, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (audit :  Audit, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.AuditWizard, {audit, policyPeriod}, 0).goInMain()
  }
  
  static function printPage (audit :  Audit, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.AuditWizard, {audit, policyPeriod}, 0).printPage()
  }
  
  static function push (audit :  Audit, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.AuditWizard, {audit, policyPeriod}, 0).push()
  }
  
  
}