package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatementWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatementWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (reinstatement :  Reinstatement, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.ReinstatementWizard, {reinstatement, policyPeriod}, 0)
  }
  
  static function drilldown (reinstatement :  Reinstatement, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.ReinstatementWizard, {reinstatement, policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (reinstatement :  Reinstatement, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.ReinstatementWizard, {reinstatement, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (reinstatement :  Reinstatement, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.ReinstatementWizard, {reinstatement, policyPeriod}, 0).goInMain()
  }
  
  static function printPage (reinstatement :  Reinstatement, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.ReinstatementWizard, {reinstatement, policyPeriod}, 0).printPage()
  }
  
  static function push (reinstatement :  Reinstatement, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.ReinstatementWizard, {reinstatement, policyPeriod}, 0).push()
  }
  
  
}