package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/signs/IMPartTxDetailsPanelSet.IMSignPart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMPartTxDetailsPanelSet_IMSignPart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPartTxDetailsPanelSet_IMSignPart, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPartTxDetailsPanelSet_IMSignPart, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}