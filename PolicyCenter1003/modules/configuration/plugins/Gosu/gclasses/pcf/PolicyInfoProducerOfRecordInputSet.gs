package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyInfoProducerOfRecordInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyInfoProducerOfRecordInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $forUseIn :  ProducerStatusUse) : void {
    __widgetOf(this, pcf.PolicyInfoProducerOfRecordInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $forUseIn})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $forUseIn :  ProducerStatusUse) : void {
    __widgetOf(this, pcf.PolicyInfoProducerOfRecordInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $forUseIn})
  }
  
  
}