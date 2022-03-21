package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/NewAccountSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAccountSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.account.AccountSearchCriteria) : void {
    __widgetOf(this, pcf.NewAccountSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.account.AccountSearchCriteria) : void {
    __widgetOf(this, pcf.NewAccountSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}