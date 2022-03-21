package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/RiskClassSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RiskClassSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($riskClasses :  gw.api.database.IQueryBeanResult<RiskClass>, $policyLinePattern :  gw.api.productmodel.PolicyLinePattern) : void {
    __widgetOf(this, pcf.RiskClassSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$riskClasses, $policyLinePattern})
  }
  
  function refreshVariables ($riskClasses :  gw.api.database.IQueryBeanResult<RiskClass>, $policyLinePattern :  gw.api.productmodel.PolicyLinePattern) : void {
    __widgetOf(this, pcf.RiskClassSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$riskClasses, $policyLinePattern})
  }
  
  
}