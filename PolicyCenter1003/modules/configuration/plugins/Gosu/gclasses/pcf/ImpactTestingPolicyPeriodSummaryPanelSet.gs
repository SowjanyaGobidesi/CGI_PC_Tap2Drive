package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingPolicyPeriodSummaryPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingPolicyPeriodSummaryPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($impactPeriod :  ImpactTestingPolicyPeriod) : void {
    __widgetOf(this, pcf.ImpactTestingPolicyPeriodSummaryPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$impactPeriod})
  }
  
  function refreshVariables ($impactPeriod :  ImpactTestingPolicyPeriod) : void {
    __widgetOf(this, pcf.ImpactTestingPolicyPeriodSummaryPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$impactPeriod})
  }
  
  
}