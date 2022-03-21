package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/issuance/IssuanceWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IssuanceWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (issuance :  Issuance, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.IssuanceWizard, {issuance, policyPeriod}, 0)
  }
  
  static function drilldown (issuance :  Issuance, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.IssuanceWizard, {issuance, policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (issuance :  Issuance, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.IssuanceWizard, {issuance, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (issuance :  Issuance, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.IssuanceWizard, {issuance, policyPeriod}, 0).goInMain()
  }
  
  static function printPage (issuance :  Issuance, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.IssuanceWizard, {issuance, policyPeriod}, 0).printPage()
  }
  
  static function push (issuance :  Issuance, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.IssuanceWizard, {issuance, policyPeriod}, 0).push()
  }
  
  
}