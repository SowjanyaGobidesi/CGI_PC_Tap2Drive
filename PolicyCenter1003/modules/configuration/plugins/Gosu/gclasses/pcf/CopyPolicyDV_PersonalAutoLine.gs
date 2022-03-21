package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/CopyPolicyDV.PersonalAutoLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyPolicyDV_PersonalAutoLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($copier :  gw.policy.PolicyPeriodCopier) : void {
    __widgetOf(this, pcf.CopyPolicyDV_PersonalAutoLine, SECTION_WIDGET_CLASS).setVariables(false, {$copier})
  }
  
  function refreshVariables ($copier :  gw.policy.PolicyPeriodCopier) : void {
    __widgetOf(this, pcf.CopyPolicyDV_PersonalAutoLine, SECTION_WIDGET_CLASS).setVariables(true, {$copier})
  }
  
  
}