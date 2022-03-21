package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/importexport/ImportResults.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImportResults extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ImportResults, {pcImportDataInfo}, 0)
  }
  
  static function drilldown (pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImportResults, {pcImportDataInfo}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImportResults, {pcImportDataInfo}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImportResults, {pcImportDataInfo}, 0).goInMain()
  }
  
  static function printPage (pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImportResults, {pcImportDataInfo}, 0).printPage()
  }
  
  static function push (pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImportResults, {pcImportDataInfo}, 0).push()
  }
  
  
}