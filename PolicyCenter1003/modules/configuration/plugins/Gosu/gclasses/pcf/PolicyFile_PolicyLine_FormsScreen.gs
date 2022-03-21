package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_PolicyLine_FormsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_PolicyLine_FormsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.PolicyFile_PolicyLine_FormsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $policyLine})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.PolicyFile_PolicyLine_FormsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $policyLine})
  }
  
  
}