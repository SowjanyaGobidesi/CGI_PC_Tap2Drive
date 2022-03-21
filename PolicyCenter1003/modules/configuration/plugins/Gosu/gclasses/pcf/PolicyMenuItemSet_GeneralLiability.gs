package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/gl/policyfile/PolicyMenuItemSet.GeneralLiability.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyMenuItemSet_GeneralLiability extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.PolicyMenuItemSet_GeneralLiability, SECTION_WIDGET_CLASS).setVariables(false, {$period, $asOfDate})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $asOfDate :  java.util.Date) : void {
    __widgetOf(this, pcf.PolicyMenuItemSet_GeneralLiability, SECTION_WIDGET_CLASS).setVariables(true, {$period, $asOfDate})
  }
  
  
}