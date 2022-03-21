package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policyfile/PolicyMenuItemSet.InlandMarine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyMenuItemSet_InlandMarine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.PolicyMenuItemSet_InlandMarine, SECTION_WIDGET_CLASS).setVariables(false, {$period, $asOfDate})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.PolicyMenuItemSet_InlandMarine, SECTION_WIDGET_CLASS).setVariables(true, {$period, $asOfDate})
  }
  
  
}