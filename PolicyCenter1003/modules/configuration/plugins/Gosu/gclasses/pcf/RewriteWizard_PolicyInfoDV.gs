package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewrite/RewriteWizard_PolicyInfoDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteWizard_PolicyInfoDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $rewrite :  Rewrite, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.RewriteWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $rewrite, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $rewrite :  Rewrite, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.RewriteWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $rewrite, $openForEdit})
  }
  
  
}