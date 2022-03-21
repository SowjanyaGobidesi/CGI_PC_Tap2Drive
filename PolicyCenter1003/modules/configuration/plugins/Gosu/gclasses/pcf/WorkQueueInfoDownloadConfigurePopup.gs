package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/WorkQueueInfoDownloadConfigurePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkQueueInfoDownloadConfigurePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WorkQueueInfoDownloadConfigurePopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkQueueInfoDownloadConfigurePopup, {}, 0).push()
  }
  
  
}