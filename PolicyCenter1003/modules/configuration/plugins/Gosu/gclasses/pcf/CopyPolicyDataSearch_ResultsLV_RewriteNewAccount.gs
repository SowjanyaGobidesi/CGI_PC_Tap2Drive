package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/CopyPolicyDataSearch_ResultsLV.RewriteNewAccount.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyPolicyDataSearch_ResultsLV_RewriteNewAccount extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchResults :  gw.api.database.IQueryBeanResult<PolicyPeriodSummary>, $destPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CopyPolicyDataSearch_ResultsLV_RewriteNewAccount, SECTION_WIDGET_CLASS).setVariables(false, {$searchResults, $destPeriod})
  }
  
  function refreshVariables ($searchResults :  gw.api.database.IQueryBeanResult<PolicyPeriodSummary>, $destPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CopyPolicyDataSearch_ResultsLV_RewriteNewAccount, SECTION_WIDGET_CLASS).setVariables(true, {$searchResults, $destPeriod})
  }
  
  
}