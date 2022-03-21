package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard extends com.guidewire.pl.web.codegen.WizardBase {
  static function createDestination (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod}, 0)
  }
  
  static function createDestination (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Destination {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod, wizardStep}, 1)
  }
  
  static function drilldown (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod}, 0).drilldown()
  }
  
  static function drilldown (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod, wizardStep}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod, wizardStep}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod, wizardStep}, 1).goInMain()
  }
  
  static function printPage (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod}, 0).printPage()
  }
  
  static function printPage (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod, wizardStep}, 1).printPage()
  }
  
  static function push (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod}, 0).push()
  }
  
  static function push (rewriteNewAccount :  RewriteNewAccount, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForWizard(pcf.RewriteNewAccountWizard, {rewriteNewAccount, policyPeriod, wizardStep}, 1).push()
  }
  
  
}