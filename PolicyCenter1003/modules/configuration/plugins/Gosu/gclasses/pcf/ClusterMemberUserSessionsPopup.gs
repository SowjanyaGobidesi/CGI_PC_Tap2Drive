package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/cluster/ClusterMemberUserSessionsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClusterMemberUserSessionsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (serverId :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ClusterMemberUserSessionsPopup, {serverId}, 0)
  }
  
  static function push (serverId :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ClusterMemberUserSessionsPopup, {serverId}, 0).push()
  }
  
  
}