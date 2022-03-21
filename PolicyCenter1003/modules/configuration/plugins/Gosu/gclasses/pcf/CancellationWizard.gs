package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/cancellation/CancellationWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CancellationWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (cancellation :  Cancellation, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.CancellationWizard, {cancellation, policyPeriod}, 0)
  }
  
  static function drilldown (cancellation :  Cancellation, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.CancellationWizard, {cancellation, policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (cancellation :  Cancellation, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.CancellationWizard, {cancellation, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (cancellation :  Cancellation, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.CancellationWizard, {cancellation, policyPeriod}, 0).goInMain()
  }
  
  static function printPage (cancellation :  Cancellation, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.CancellationWizard, {cancellation, policyPeriod}, 0).printPage()
  }
  
  static function push (cancellation :  Cancellation, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.CancellationWizard, {cancellation, policyPeriod}, 0).push()
  }
  
  
}