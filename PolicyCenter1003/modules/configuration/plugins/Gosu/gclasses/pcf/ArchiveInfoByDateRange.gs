package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/ArchiveInfoByDateRange.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ArchiveInfoByDateRange extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (archiveCountSummaryByDatamodelVersion :  gw.api.archiving.ArchiveCountSummaryByDatamodelVersion, beginTime :  java.util.Date, endTime :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ArchiveInfoByDateRange, {archiveCountSummaryByDatamodelVersion, beginTime, endTime}, 0)
  }
  
  static function drilldown (archiveCountSummaryByDatamodelVersion :  gw.api.archiving.ArchiveCountSummaryByDatamodelVersion, beginTime :  java.util.Date, endTime :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ArchiveInfoByDateRange, {archiveCountSummaryByDatamodelVersion, beginTime, endTime}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (archiveCountSummaryByDatamodelVersion :  gw.api.archiving.ArchiveCountSummaryByDatamodelVersion, beginTime :  java.util.Date, endTime :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ArchiveInfoByDateRange, {archiveCountSummaryByDatamodelVersion, beginTime, endTime}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (archiveCountSummaryByDatamodelVersion :  gw.api.archiving.ArchiveCountSummaryByDatamodelVersion, beginTime :  java.util.Date, endTime :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ArchiveInfoByDateRange, {archiveCountSummaryByDatamodelVersion, beginTime, endTime}, 0).goInMain()
  }
  
  static function printPage (archiveCountSummaryByDatamodelVersion :  gw.api.archiving.ArchiveCountSummaryByDatamodelVersion, beginTime :  java.util.Date, endTime :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ArchiveInfoByDateRange, {archiveCountSummaryByDatamodelVersion, beginTime, endTime}, 0).printPage()
  }
  
  static function push (archiveCountSummaryByDatamodelVersion :  gw.api.archiving.ArchiveCountSummaryByDatamodelVersion, beginTime :  java.util.Date, endTime :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ArchiveInfoByDateRange, {archiveCountSummaryByDatamodelVersion, beginTime, endTime}, 0).push()
  }
  
  
}