package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/policychange/PolicyChangeWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyChangeWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (policyChange :  PolicyChange, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.PolicyChangeWizard, {policyChange, policyPeriod}, 0)
  }
  
  static function drilldown (policyChange :  PolicyChange, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.PolicyChangeWizard, {policyChange, policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyChange :  PolicyChange, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.PolicyChangeWizard, {policyChange, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyChange :  PolicyChange, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.PolicyChangeWizard, {policyChange, policyPeriod}, 0).goInMain()
  }
  
  static function printPage (policyChange :  PolicyChange, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.PolicyChangeWizard, {policyChange, policyPeriod}, 0).printPage()
  }
  
  static function push (policyChange :  PolicyChange, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.PolicyChangeWizard, {policyChange, policyPeriod}, 0).push()
  }
  
  
}