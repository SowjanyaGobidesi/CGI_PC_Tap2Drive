package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/cluster/ClusterComponentHistoryPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClusterComponentHistoryPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (data :  gw.api.tools.ClusterComponentsData, component :  gw.api.system.cluster.ComponentInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ClusterComponentHistoryPopup, {data, component}, 0)
  }
  
  static function push (data :  gw.api.tools.ClusterComponentsData, component :  gw.api.system.cluster.ComponentInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ClusterComponentHistoryPopup, {data, component}, 0).push()
  }
  
  
}