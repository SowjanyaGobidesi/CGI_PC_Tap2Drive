package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/JobCompleteDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobCompleteDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobCompleteDV, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobCompleteDV, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod})
  }
  
  
}