package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/BranchesSearchLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BranchesSearchLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($branches :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.BranchesSearchLV, SECTION_WIDGET_CLASS).setVariables(false, {$branches})
  }
  
  function refreshVariables ($branches :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.BranchesSearchLV, SECTION_WIDGET_CLASS).setVariables(true, {$branches})
  }
  
  
}