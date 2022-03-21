package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/ExcelImportPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExcelImportPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ExcelImportPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  org.apache.poi.xssf.usermodel.XSSFWorkbook) : void {
    __widgetOf(this, pcf.ExcelImportPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExcelImportPopup, {}, 0).push()
  }
  
  
}