package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/Job_HistoryScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Job_HistoryScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.Job_HistoryScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $asOfDate})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.Job_HistoryScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $asOfDate})
  }
  
  
}