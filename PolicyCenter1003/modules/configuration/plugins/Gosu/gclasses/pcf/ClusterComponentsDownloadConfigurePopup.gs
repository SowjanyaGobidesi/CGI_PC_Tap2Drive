package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/cluster/ClusterComponentsDownloadConfigurePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClusterComponentsDownloadConfigurePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ClusterComponentsDownloadConfigurePopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ClusterComponentsDownloadConfigurePopup, {}, 0).push()
  }
  
  
}