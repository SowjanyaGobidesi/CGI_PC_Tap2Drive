package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/AccountDetailViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountDetailViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.AccountDetailViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.AccountDetailViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}