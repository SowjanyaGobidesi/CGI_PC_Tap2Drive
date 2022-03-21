package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/WorkQueueRawDataDownloadConfigurePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkQueueRawDataDownloadConfigurePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WorkQueueRawDataDownloadConfigurePopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkQueueRawDataDownloadConfigurePopup, {}, 0).push()
  }
  
  
}