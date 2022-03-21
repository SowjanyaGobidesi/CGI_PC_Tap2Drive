package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/Policy_DocumentSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Policy_DocumentSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  DocumentSearchCriteria, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.Policy_DocumentSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $policyPeriod})
  }
  
  function refreshVariables ($searchCriteria :  DocumentSearchCriteria, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.Policy_DocumentSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $policyPeriod})
  }
  
  
}