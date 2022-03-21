package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/PolicyAddressDisplayInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyAddressDisplayInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $showLabel :  boolean) : void {
    __widgetOf(this, pcf.PolicyAddressDisplayInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$period, $showLabel})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $showLabel :  boolean) : void {
    __widgetOf(this, pcf.PolicyAddressDisplayInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$period, $showLabel})
  }
  
  
}