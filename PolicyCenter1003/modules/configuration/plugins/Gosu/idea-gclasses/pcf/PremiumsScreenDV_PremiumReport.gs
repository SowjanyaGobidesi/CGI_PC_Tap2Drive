package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/PremiumsScreenDV.PremiumReport.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PremiumsScreenDV_PremiumReport extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $audit :  Audit) : void {
    __widgetOf(this, pcf.PremiumsScreenDV_PremiumReport, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $audit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $audit :  Audit) : void {
    __widgetOf(this, pcf.PremiumsScreenDV_PremiumReport, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $audit})
  }
  
  
}