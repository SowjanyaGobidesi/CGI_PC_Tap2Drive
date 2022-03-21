package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/messaging/MessageSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MessageSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.system.messaging.MessageSearchCriteria) : void {
    __widgetOf(this, pcf.MessageSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.system.messaging.MessageSearchCriteria) : void {
    __widgetOf(this, pcf.MessageSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}