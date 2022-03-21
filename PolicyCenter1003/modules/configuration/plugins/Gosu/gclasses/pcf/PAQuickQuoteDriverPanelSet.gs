package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PAQuickQuoteDriverPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PAQuickQuoteDriverPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($paLine :  PersonalAutoLine, $policyDriver :  PolicyDriver, $accountDriver :  Driver, $driverNum :  int, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PAQuickQuoteDriverPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$paLine, $policyDriver, $accountDriver, $driverNum, $openForEdit})
  }
  
  function refreshVariables ($paLine :  PersonalAutoLine, $policyDriver :  PolicyDriver, $accountDriver :  Driver, $driverNum :  int, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PAQuickQuoteDriverPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$paLine, $policyDriver, $accountDriver, $driverNum, $openForEdit})
  }
  
  
}