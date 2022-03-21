package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/team/FederatedTeamActivitiesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedTeamActivitiesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($teamModel :  gw.api.web.team.PCTeamModel) : void {
    __widgetOf(this, pcf.FederatedTeamActivitiesLV, SECTION_WIDGET_CLASS).setVariables(false, {$teamModel})
  }
  
  function refreshVariables ($teamModel :  gw.api.web.team.PCTeamModel) : void {
    __widgetOf(this, pcf.FederatedTeamActivitiesLV, SECTION_WIDGET_CLASS).setVariables(true, {$teamModel})
  }
  
  
}