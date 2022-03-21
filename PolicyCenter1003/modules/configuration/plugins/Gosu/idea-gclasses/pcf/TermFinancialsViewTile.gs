package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/TermFinancialsViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TermFinancialsViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $lossRatioHelper :  gw.api.web.dashboard.ui.claims.LossRatioHelper) : void {
    __widgetOf(this, pcf.TermFinancialsViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$period, $lossRatioHelper})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $lossRatioHelper :  gw.api.web.dashboard.ui.claims.LossRatioHelper) : void {
    __widgetOf(this, pcf.TermFinancialsViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$period, $lossRatioHelper})
  }
  
  
}