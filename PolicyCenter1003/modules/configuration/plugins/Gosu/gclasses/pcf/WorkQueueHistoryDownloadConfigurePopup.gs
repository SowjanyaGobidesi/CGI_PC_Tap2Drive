package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/WorkQueueHistoryDownloadConfigurePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkQueueHistoryDownloadConfigurePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (WorkQueueDisplayInfo :  gw.api.web.tools.WorkQueueDisplayInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WorkQueueHistoryDownloadConfigurePopup, {WorkQueueDisplayInfo}, 0)
  }
  
  static function push (WorkQueueDisplayInfo :  gw.api.web.tools.WorkQueueDisplayInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkQueueHistoryDownloadConfigurePopup, {WorkQueueDisplayInfo}, 0).push()
  }
  
  
}