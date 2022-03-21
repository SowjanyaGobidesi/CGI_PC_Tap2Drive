package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/renmgr/RenewalGroupJobsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalGroupJobsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($renewalGroup :  RenewalGroup) : void {
    __widgetOf(this, pcf.RenewalGroupJobsLV, SECTION_WIDGET_CLASS).setVariables(false, {$renewalGroup})
  }
  
  function refreshVariables ($renewalGroup :  RenewalGroup) : void {
    __widgetOf(this, pcf.RenewalGroupJobsLV, SECTION_WIDGET_CLASS).setVariables(true, {$renewalGroup})
  }
  
  
}