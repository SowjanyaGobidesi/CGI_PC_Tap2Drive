package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/accountsrec/IMARPartLevelInformationDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMARPartLevelInformationDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountsRecPart :  IMAccountsRecPart, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.IMARPartLevelInformationDV, SECTION_WIDGET_CLASS).setVariables(false, {$accountsRecPart, $openForEdit})
  }
  
  function refreshVariables ($accountsRecPart :  IMAccountsRecPart, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.IMARPartLevelInformationDV, SECTION_WIDGET_CLASS).setVariables(true, {$accountsRecPart, $openForEdit})
  }
  
  
}