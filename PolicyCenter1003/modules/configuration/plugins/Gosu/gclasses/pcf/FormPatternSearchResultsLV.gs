package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($formPatterns :  gw.api.database.IQueryBeanResult<FormPattern>) : void {
    __widgetOf(this, pcf.FormPatternSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$formPatterns})
  }
  
  function refreshVariables ($formPatterns :  gw.api.database.IQueryBeanResult<FormPattern>) : void {
    __widgetOf(this, pcf.FormPatternSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$formPatterns})
  }
  
  
}