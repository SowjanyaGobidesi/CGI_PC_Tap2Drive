package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PADriversPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PADriversPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $paLine :  PersonalAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PADriversPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $paLine, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $paLine :  PersonalAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PADriversPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $paLine, $openForEdit})
  }
  
  
}