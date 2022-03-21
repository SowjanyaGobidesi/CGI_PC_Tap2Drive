package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/CopyNotesDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyNotesDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($copier :  gw.policy.PolicyPeriodCopier, $sourcePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CopyNotesDV, SECTION_WIDGET_CLASS).setVariables(false, {$copier, $sourcePeriod})
  }
  
  function refreshVariables ($copier :  gw.policy.PolicyPeriodCopier, $sourcePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CopyNotesDV, SECTION_WIDGET_CLASS).setVariables(true, {$copier, $sourcePeriod})
  }
  
  
}