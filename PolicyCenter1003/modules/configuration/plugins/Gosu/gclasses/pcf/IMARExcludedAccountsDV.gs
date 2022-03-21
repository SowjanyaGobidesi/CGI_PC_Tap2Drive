package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/accountsrec/IMARExcludedAccountsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMARExcludedAccountsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountsRecPart :  IMAccountsRecPart, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.IMARExcludedAccountsDV, SECTION_WIDGET_CLASS).setVariables(false, {$accountsRecPart, $openForEdit})
  }
  
  function refreshVariables ($accountsRecPart :  IMAccountsRecPart, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.IMARExcludedAccountsDV, SECTION_WIDGET_CLASS).setVariables(true, {$accountsRecPart, $openForEdit})
  }
  
  
}