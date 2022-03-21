package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/PolicyAddlInterestPanelSet.BAVhcleAddlInterest.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyAddlInterestPanelSet_BAVhcleAddlInterest extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyAddlInterest :  PolicyAddlInterest) : void {
    __widgetOf(this, pcf.PolicyAddlInterestPanelSet_BAVhcleAddlInterest, SECTION_WIDGET_CLASS).setVariables(false, {$policyAddlInterest})
  }
  
  function refreshVariables ($policyAddlInterest :  PolicyAddlInterest) : void {
    __widgetOf(this, pcf.PolicyAddlInterestPanelSet_BAVhcleAddlInterest, SECTION_WIDGET_CLASS).setVariables(true, {$policyAddlInterest})
  }
  
  
}