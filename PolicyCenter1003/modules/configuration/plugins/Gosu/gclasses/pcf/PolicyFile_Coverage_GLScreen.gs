package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/gl/policyfile/PolicyFile_Coverage_GLScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Coverage_GLScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyFile_Coverage_GLScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyFile_Coverage_GLScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}