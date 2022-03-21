package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/AccountSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($relatedToAccount :  Account) : void {
    __widgetOf(this, pcf.AccountSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$relatedToAccount})
  }
  
  function refreshVariables ($relatedToAccount :  Account) : void {
    __widgetOf(this, pcf.AccountSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$relatedToAccount})
  }
  
  
}