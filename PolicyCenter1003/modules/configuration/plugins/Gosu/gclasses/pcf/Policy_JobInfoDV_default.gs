package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/Policy_JobInfoDV.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Policy_JobInfoDV_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.Policy_JobInfoDV_default, SECTION_WIDGET_CLASS).setVariables(false, {$job, $asOfDate})
  }
  
  function refreshVariables ($job :  Job, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.Policy_JobInfoDV_default, SECTION_WIDGET_CLASS).setVariables(true, {$job, $asOfDate})
  }
  
  
}