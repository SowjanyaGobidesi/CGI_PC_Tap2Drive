package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/accountsrec/IMPartTxDetailsPanelSet.IMAccountsRecPart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMPartTxDetailsPanelSet_IMAccountsRecPart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPartTxDetailsPanelSet_IMAccountsRecPart, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPartTxDetailsPanelSet_IMAccountsRecPart, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}