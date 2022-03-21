package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/NoteSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NoteSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  NoteSearchCriteria, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.NoteSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $policyPeriod})
  }
  
  function refreshVariables ($searchCriteria :  NoteSearchCriteria, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.NoteSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $policyPeriod})
  }
  
  
}