package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/overview/CurrentPolicyTermsListViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CurrentPolicyTermsListViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $lossRatioHelper :  gw.api.web.dashboard.ui.claims.LossRatioHelper) : void {
    __widgetOf(this, pcf.CurrentPolicyTermsListViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$account, $lossRatioHelper})
  }
  
  function refreshVariables ($account :  Account, $lossRatioHelper :  gw.api.web.dashboard.ui.claims.LossRatioHelper) : void {
    __widgetOf(this, pcf.CurrentPolicyTermsListViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$account, $lossRatioHelper})
  }
  
  
}