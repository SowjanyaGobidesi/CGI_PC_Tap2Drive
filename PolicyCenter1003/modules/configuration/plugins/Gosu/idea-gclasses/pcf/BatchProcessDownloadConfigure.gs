package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/BatchProcessDownloadConfigure.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BatchProcessDownloadConfigure extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (batchProcessType :  BatchProcessType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BatchProcessDownloadConfigure, {batchProcessType}, 0)
  }
  
  static function drilldown (batchProcessType :  BatchProcessType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BatchProcessDownloadConfigure, {batchProcessType}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (batchProcessType :  BatchProcessType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BatchProcessDownloadConfigure, {batchProcessType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (batchProcessType :  BatchProcessType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BatchProcessDownloadConfigure, {batchProcessType}, 0).goInMain()
  }
  
  static function printPage (batchProcessType :  BatchProcessType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BatchProcessDownloadConfigure, {batchProcessType}, 0).printPage()
  }
  
  static function push (batchProcessType :  BatchProcessType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BatchProcessDownloadConfigure, {batchProcessType}, 0).push()
  }
  
  
}