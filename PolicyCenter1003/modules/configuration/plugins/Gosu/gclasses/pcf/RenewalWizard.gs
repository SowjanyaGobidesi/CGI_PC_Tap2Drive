package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/RenewalWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod}, 0)
  }
  
  static function createDestination (renewal :  Renewal, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod, wizardStep}, 1)
  }
  
  static function drilldown (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod}, 0).drilldown()
  }
  
  static function drilldown (renewal :  Renewal, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod, wizardStep}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (renewal :  Renewal, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod, wizardStep}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (renewal :  Renewal, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod, wizardStep}, 1).goInMain()
  }
  
  static function printPage (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod}, 0).printPage()
  }
  
  static function printPage (renewal :  Renewal, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod, wizardStep}, 1).printPage()
  }
  
  static function push (renewal :  Renewal, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod}, 0).push()
  }
  
  static function push (renewal :  Renewal, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RenewalWizard, {renewal, policyPeriod, wizardStep}, 1).push()
  }
  
  
}