package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BADriverScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BADriverScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($thisDriver :  CommercialDriver, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BADriverScreen, SECTION_WIDGET_CLASS).setVariables(false, {$thisDriver, $policyPeriod, $openForEdit})
  }
  
  function refreshVariables ($thisDriver :  CommercialDriver, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BADriverScreen, SECTION_WIDGET_CLASS).setVariables(true, {$thisDriver, $policyPeriod, $openForEdit})
  }
  
  
}