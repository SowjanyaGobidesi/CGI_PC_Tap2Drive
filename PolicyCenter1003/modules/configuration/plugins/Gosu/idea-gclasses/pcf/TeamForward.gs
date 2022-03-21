package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/team/TeamForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TeamForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TeamForward, {}, 0)
  }
  
  static function createDestination (oldPage :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage}, 1)
  }
  
  static function createDestination (oldPage :  String, teamModel :  gw.api.team.TeamModel) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage, teamModel}, 2)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {}, 0).drilldown()
  }
  
  static function drilldown (oldPage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage}, 1).drilldown()
  }
  
  static function drilldown (oldPage :  String, teamModel :  gw.api.team.TeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage, teamModel}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (oldPage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (oldPage :  String, teamModel :  gw.api.team.TeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage, teamModel}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (oldPage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (oldPage :  String, teamModel :  gw.api.team.TeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage, teamModel}, 2).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace () : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (oldPage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage}, 1).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (oldPage :  String, teamModel :  gw.api.team.TeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage, teamModel}, 2).goInWorkspace()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {}, 0).printPage()
  }
  
  static function printPage (oldPage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage}, 1).printPage()
  }
  
  static function printPage (oldPage :  String, teamModel :  gw.api.team.TeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage, teamModel}, 2).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {}, 0).push()
  }
  
  static function push (oldPage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage}, 1).push()
  }
  
  static function push (oldPage :  String, teamModel :  gw.api.team.TeamModel) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TeamForward, {oldPage, teamModel}, 2).push()
  }
  
  
}