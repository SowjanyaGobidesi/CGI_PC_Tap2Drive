package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountInfoInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountInfoInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.AccountInfoInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$period})
  }
  
  function refreshVariables ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.AccountInfoInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$period})
  }
  
  
}