package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policyfile/IMPolicyFilePartScreen.IMAccountsRecPart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMPolicyFilePartScreen_IMAccountsRecPart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPolicyFilePartScreen_IMAccountsRecPart, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPolicyFilePartScreen_IMAccountsRecPart, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}