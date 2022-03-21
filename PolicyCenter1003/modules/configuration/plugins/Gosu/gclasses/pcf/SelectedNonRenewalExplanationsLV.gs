package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/prerenewal/SelectedNonRenewalExplanationsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SelectedNonRenewalExplanationsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policy :  Policy, $policyPeriod :  PolicyPeriod, $descriptions :  String[]) : void {
    __widgetOf(this, pcf.SelectedNonRenewalExplanationsLV, SECTION_WIDGET_CLASS).setVariables(false, {$policy, $policyPeriod, $descriptions})
  }
  
  function refreshVariables ($policy :  Policy, $policyPeriod :  PolicyPeriod, $descriptions :  String[]) : void {
    __widgetOf(this, pcf.SelectedNonRenewalExplanationsLV, SECTION_WIDGET_CLASS).setVariables(true, {$policy, $policyPeriod, $descriptions})
  }
  
  
}