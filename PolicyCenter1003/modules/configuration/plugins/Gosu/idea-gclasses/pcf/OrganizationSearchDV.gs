package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/OrganizationSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  OrganizationSearchCriteria, $activeProducersOnly :  boolean) : void {
    __widgetOf(this, pcf.OrganizationSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $activeProducersOnly})
  }
  
  function refreshVariables ($searchCriteria :  OrganizationSearchCriteria, $activeProducersOnly :  boolean) : void {
    __widgetOf(this, pcf.OrganizationSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $activeProducersOnly})
  }
  
  
}