package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/cluster/ClusterComponentsFilterByComponentPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ClusterComponentsFilterByComponentPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (data :  gw.api.tools.ClusterComponentsData) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ClusterComponentsFilterByComponentPopup, {data}, 0)
  }
  
  static function push (data :  gw.api.tools.ClusterComponentsData) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ClusterComponentsFilterByComponentPopup, {data}, 0).push()
  }
  
  
}