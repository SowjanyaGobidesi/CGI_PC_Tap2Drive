package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/losshistory/LossHistoryInputSet.man.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LossHistoryInputSet_man extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.LossHistoryInputSet_man, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.LossHistoryInputSet_man, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}