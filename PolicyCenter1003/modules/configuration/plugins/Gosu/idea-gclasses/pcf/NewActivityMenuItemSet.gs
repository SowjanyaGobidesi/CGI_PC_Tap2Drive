package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/NewActivityMenuItemSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewActivityMenuItemSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $policy :  Policy, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.NewActivityMenuItemSet, SECTION_WIDGET_CLASS).setVariables(false, {$account, $policy, $policyPeriod})
  }
  
  function refreshVariables ($account :  Account, $policy :  Policy, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.NewActivityMenuItemSet, SECTION_WIDGET_CLASS).setVariables(true, {$account, $policy, $policyPeriod})
  }
  
  
}