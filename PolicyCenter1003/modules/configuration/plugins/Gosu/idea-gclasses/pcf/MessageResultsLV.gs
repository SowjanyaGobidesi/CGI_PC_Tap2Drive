package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/messaging/MessageResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MessageResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($messageQuery :  gw.api.database.IQueryBeanResult<Message>) : void {
    __widgetOf(this, pcf.MessageResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$messageQuery})
  }
  
  function refreshVariables ($messageQuery :  gw.api.database.IQueryBeanResult<Message>) : void {
    __widgetOf(this, pcf.MessageResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$messageQuery})
  }
  
  
}