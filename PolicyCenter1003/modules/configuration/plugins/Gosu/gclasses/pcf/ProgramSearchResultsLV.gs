package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/ProgramSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProgramSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($programs :  gw.api.database.IQueryBeanResult<RIProgram>) : void {
    __widgetOf(this, pcf.ProgramSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$programs})
  }
  
  function refreshVariables ($programs :  gw.api.database.IQueryBeanResult<RIProgram>) : void {
    __widgetOf(this, pcf.ProgramSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$programs})
  }
  
  
}