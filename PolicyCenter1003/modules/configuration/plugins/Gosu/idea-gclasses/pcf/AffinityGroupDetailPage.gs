package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/affinitygroup/AffinityGroupDetailPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AffinityGroupDetailPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (AffinityGroup :  AffinityGroup) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AffinityGroupDetailPage, {AffinityGroup}, 0)
  }
  
  static function drilldown (AffinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AffinityGroupDetailPage, {AffinityGroup}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (AffinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AffinityGroupDetailPage, {AffinityGroup}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (AffinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AffinityGroupDetailPage, {AffinityGroup}, 0).goInMain()
  }
  
  static function printPage (AffinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AffinityGroupDetailPage, {AffinityGroup}, 0).printPage()
  }
  
  static function push (AffinityGroup :  AffinityGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AffinityGroupDetailPage, {AffinityGroup}, 0).push()
  }
  
  
}