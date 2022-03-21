package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/team/TeamActivitiesScreen.federated.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TeamActivitiesScreen_federated extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($teamModel :  gw.api.web.team.PCTeamModel) : void {
    __widgetOf(this, pcf.TeamActivitiesScreen_federated, SECTION_WIDGET_CLASS).setVariables(false, {$teamModel})
  }
  
  function refreshVariables ($teamModel :  gw.api.web.team.PCTeamModel) : void {
    __widgetOf(this, pcf.TeamActivitiesScreen_federated, SECTION_WIDGET_CLASS).setVariables(true, {$teamModel})
  }
  
  
}