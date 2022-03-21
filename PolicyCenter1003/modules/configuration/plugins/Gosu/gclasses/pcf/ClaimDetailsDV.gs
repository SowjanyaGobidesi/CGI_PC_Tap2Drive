package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/ClaimDetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClaimDetailsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($claimDetail :  ClaimDetail, $showPolicyNumberAndType :  boolean) : void {
    __widgetOf(this, pcf.ClaimDetailsDV, SECTION_WIDGET_CLASS).setVariables(false, {$claimDetail, $showPolicyNumberAndType})
  }
  
  function refreshVariables ($claimDetail :  ClaimDetail, $showPolicyNumberAndType :  boolean) : void {
    __widgetOf(this, pcf.ClaimDetailsDV, SECTION_WIDGET_CLASS).setVariables(true, {$claimDetail, $showPolicyNumberAndType})
  }
  
  
}