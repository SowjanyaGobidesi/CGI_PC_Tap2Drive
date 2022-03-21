package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.forms.FormPatternSearchCriteria) : void {
    __widgetOf(this, pcf.FormPatternSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.forms.FormPatternSearchCriteria) : void {
    __widgetOf(this, pcf.FormPatternSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}