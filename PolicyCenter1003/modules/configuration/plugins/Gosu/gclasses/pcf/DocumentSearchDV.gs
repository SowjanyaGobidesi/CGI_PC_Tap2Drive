package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/DocumentSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  DocumentSearchCriteria, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.DocumentSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $policyPeriod})
  }
  
  function refreshVariables ($searchCriteria :  DocumentSearchCriteria, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.DocumentSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $policyPeriod})
  }
  
  
}