package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/ClaimsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClaimsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($claims :  Claim[], $filterSet :  gw.losshistory.ClaimPolicyPeriodFilterSet, $preferredCurrency :  Currency) : void {
    __widgetOf(this, pcf.ClaimsLV, SECTION_WIDGET_CLASS).setVariables(false, {$claims, $filterSet, $preferredCurrency})
  }
  
  function refreshVariables ($claims :  Claim[], $filterSet :  gw.losshistory.ClaimPolicyPeriodFilterSet, $preferredCurrency :  Currency) : void {
    __widgetOf(this, pcf.ClaimsLV, SECTION_WIDGET_CLASS).setVariables(true, {$claims, $filterSet, $preferredCurrency})
  }
  
  
}