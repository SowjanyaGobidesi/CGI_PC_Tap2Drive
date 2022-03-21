package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/JobRolesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobRolesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($currentJob :  Job) : void {
    __widgetOf(this, pcf.JobRolesLV, SECTION_WIDGET_CLASS).setVariables(false, {$currentJob})
  }
  
  function refreshVariables ($currentJob :  Job) : void {
    __widgetOf(this, pcf.JobRolesLV, SECTION_WIDGET_CLASS).setVariables(true, {$currentJob})
  }
  
  
}