package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/JobGroupRiskAnalysisLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobGroupRiskAnalysisLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($jobGroup :  JobGroup) : void {
    __widgetOf(this, pcf.JobGroupRiskAnalysisLV, SECTION_WIDGET_CLASS).setVariables(false, {$jobGroup})
  }
  
  function refreshVariables ($jobGroup :  JobGroup) : void {
    __widgetOf(this, pcf.JobGroupRiskAnalysisLV, SECTION_WIDGET_CLASS).setVariables(true, {$jobGroup})
  }
  
  
}