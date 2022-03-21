package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/DocumentsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($docQuery :  gw.api.database.IQueryBeanResult<Document>, $searchCriteria :  DocumentSearchCriteria, $viewOnly :  boolean) : void {
    __widgetOf(this, pcf.DocumentsLV, SECTION_WIDGET_CLASS).setVariables(false, {$docQuery, $searchCriteria, $viewOnly})
  }
  
  function refreshVariables ($docQuery :  gw.api.database.IQueryBeanResult<Document>, $searchCriteria :  DocumentSearchCriteria, $viewOnly :  boolean) : void {
    __widgetOf(this, pcf.DocumentsLV, SECTION_WIDGET_CLASS).setVariables(true, {$docQuery, $searchCriteria, $viewOnly})
  }
  
  
}