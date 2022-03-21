package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountLocationDetailInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountLocationDetailInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountLocation :  AccountLocation) : void {
    __widgetOf(this, pcf.AccountLocationDetailInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$accountLocation})
  }
  
  function refreshVariables ($accountLocation :  AccountLocation) : void {
    __widgetOf(this, pcf.AccountLocationDetailInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$accountLocation})
  }
  
  
}