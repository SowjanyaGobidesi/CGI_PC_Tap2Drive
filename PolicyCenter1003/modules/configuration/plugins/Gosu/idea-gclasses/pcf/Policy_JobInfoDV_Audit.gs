package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/Policy_JobInfoDV.Audit.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Policy_JobInfoDV_Audit extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.Policy_JobInfoDV_Audit, SECTION_WIDGET_CLASS).setVariables(false, {$job, $asOfDate})
  }
  
  function refreshVariables ($job :  Job, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.Policy_JobInfoDV_Audit, SECTION_WIDGET_CLASS).setVariables(true, {$job, $asOfDate})
  }
  
  
}