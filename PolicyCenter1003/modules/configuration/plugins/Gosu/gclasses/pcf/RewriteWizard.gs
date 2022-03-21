package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewrite/RewriteWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (rewrite :  Rewrite, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod}, 0)
  }
  
  static function createDestination (rewrite :  Rewrite, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod, wizardStep}, 1)
  }
  
  static function drilldown (rewrite :  Rewrite, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod}, 0).drilldown()
  }
  
  static function drilldown (rewrite :  Rewrite, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod, wizardStep}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rewrite :  Rewrite, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rewrite :  Rewrite, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod, wizardStep}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rewrite :  Rewrite, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rewrite :  Rewrite, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod, wizardStep}, 1).goInMain()
  }
  
  static function printPage (rewrite :  Rewrite, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod}, 0).printPage()
  }
  
  static function printPage (rewrite :  Rewrite, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod, wizardStep}, 1).printPage()
  }
  
  static function push (rewrite :  Rewrite, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod}, 0).push()
  }
  
  static function push (rewrite :  Rewrite, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteWizard, {rewrite, policyPeriod, wizardStep}, 1).push()
  }
  
  
}