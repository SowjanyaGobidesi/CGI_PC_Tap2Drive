package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/ClaimDetailsCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClaimDetailsCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($selectedClaim :  Claim, $showPolicyNumberAndType :  boolean) : void {
    __widgetOf(this, pcf.ClaimDetailsCV, SECTION_WIDGET_CLASS).setVariables(false, {$selectedClaim, $showPolicyNumberAndType})
  }
  
  function refreshVariables ($selectedClaim :  Claim, $showPolicyNumberAndType :  boolean) : void {
    __widgetOf(this, pcf.ClaimDetailsCV, SECTION_WIDGET_CLASS).setVariables(true, {$selectedClaim, $showPolicyNumberAndType})
  }
  
  
}