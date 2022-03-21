package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/accountsrec/IMPartCumulDetailsPanelSet.IMAccountsRecPart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMPartCumulDetailsPanelSet_IMAccountsRecPart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMPartCumulDetailsPanelSet_IMAccountsRecPart, SECTION_WIDGET_CLASS).setVariables(false, {$imLine})
  }
  
  function refreshVariables ($imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMPartCumulDetailsPanelSet_IMAccountsRecPart, SECTION_WIDGET_CLASS).setVariables(true, {$imLine})
  }
  
  
}