package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/cluster/ClusterMembersDownloadConfigurePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClusterMembersDownloadConfigurePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ClusterMembersDownloadConfigurePopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ClusterMembersDownloadConfigurePopup, {}, 0).push()
  }
  
  
}