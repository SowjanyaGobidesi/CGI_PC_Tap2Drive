package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/RiskAssessmentPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RiskAssessmentPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLocation :  PolicyLocation, $riskAssessmentBroker :  gw.web.policylocation.riskassessment.LocationRiskAssessmentBroker) : void {
    __widgetOf(this, pcf.RiskAssessmentPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyLocation, $riskAssessmentBroker})
  }
  
  function refreshVariables ($policyLocation :  PolicyLocation, $riskAssessmentBroker :  gw.web.policylocation.riskassessment.LocationRiskAssessmentBroker) : void {
    __widgetOf(this, pcf.RiskAssessmentPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyLocation, $riskAssessmentBroker})
  }
  
  
}