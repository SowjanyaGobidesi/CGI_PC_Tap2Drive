package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/Policy_ContactsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Policy_ContactsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.Policy_ContactsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.Policy_ContactsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}