package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/overview/AccountOverviewDetailViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountOverviewDetailViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $lossRatioHelper :  gw.api.web.dashboard.ui.claims.LossRatioHelper) : void {
    __widgetOf(this, pcf.AccountOverviewDetailViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$account, $lossRatioHelper})
  }
  
  function refreshVariables ($account :  Account, $lossRatioHelper :  gw.api.web.dashboard.ui.claims.LossRatioHelper) : void {
    __widgetOf(this, pcf.AccountOverviewDetailViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$account, $lossRatioHelper})
  }
  
  
}