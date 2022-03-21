package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/PolicyContactListViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyContactListViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $asOfDate :  Date) : void {
    __widgetOf(this, pcf.PolicyContactListViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $asOfDate})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $asOfDate :  Date) : void {
    __widgetOf(this, pcf.PolicyContactListViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $asOfDate})
  }
  
  
}