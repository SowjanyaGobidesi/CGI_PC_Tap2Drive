package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyInfoProducerInfoInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyInfoProducerInfoInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $forUseIn :  ProducerStatusUse) : void {
    __widgetOf(this, pcf.PolicyInfoProducerInfoInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $forUseIn})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $forUseIn :  ProducerStatusUse) : void {
    __widgetOf(this, pcf.PolicyInfoProducerInfoInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $forUseIn})
  }
  
  
}