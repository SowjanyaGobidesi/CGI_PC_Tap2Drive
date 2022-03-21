package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingSearchPoliciesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingSearchPoliciesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($allPolicyPeriods :  gw.api.database.IQueryBeanResult<entity.PolicyPeriod>) : void {
    __widgetOf(this, pcf.ImpactTestingSearchPoliciesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$allPolicyPeriods})
  }
  
  function refreshVariables ($allPolicyPeriods :  gw.api.database.IQueryBeanResult<entity.PolicyPeriod>) : void {
    __widgetOf(this, pcf.ImpactTestingSearchPoliciesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$allPolicyPeriods})
  }
  
  
}