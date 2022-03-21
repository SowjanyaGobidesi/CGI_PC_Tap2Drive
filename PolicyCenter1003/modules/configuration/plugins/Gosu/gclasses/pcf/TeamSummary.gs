package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/team/TeamSummary.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TeamSummary extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (teamModel :  gw.api.web.team.PCTeamModel) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TeamSummary, {teamModel}, 0)
  }
  
  static function drilldown (teamModel :  gw.api.web.team.PCTeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamSummary, {teamModel}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (teamModel :  gw.api.web.team.PCTeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamSummary, {teamModel}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (teamModel :  gw.api.web.team.PCTeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamSummary, {teamModel}, 0).goInMain()
  }
  
  static function printPage (teamModel :  gw.api.web.team.PCTeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamSummary, {teamModel}, 0).printPage()
  }
  
  static function push (teamModel :  gw.api.web.team.PCTeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamSummary, {teamModel}, 0).push()
  }
  
  
}