package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/JobsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($jobs :  Job[], $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobsLV, SECTION_WIDGET_CLASS).setVariables(false, {$jobs, $policyPeriod})
  }
  
  function refreshVariables ($jobs :  Job[], $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobsLV, SECTION_WIDGET_CLASS).setVariables(true, {$jobs, $policyPeriod})
  }
  
  
}