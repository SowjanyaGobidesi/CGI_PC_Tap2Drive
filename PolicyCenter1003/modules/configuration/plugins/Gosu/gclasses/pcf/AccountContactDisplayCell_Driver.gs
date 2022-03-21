package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountContactDisplayCell.Driver.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountContactDisplayCell_Driver extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($acctContactRole :  AccountContactRole) : void {
    __widgetOf(this, pcf.AccountContactDisplayCell_Driver, SECTION_WIDGET_CLASS).setVariables(false, {$acctContactRole})
  }
  
  function refreshVariables ($acctContactRole :  AccountContactRole) : void {
    __widgetOf(this, pcf.AccountContactDisplayCell_Driver, SECTION_WIDGET_CLASS).setVariables(true, {$acctContactRole})
  }
  
  
}