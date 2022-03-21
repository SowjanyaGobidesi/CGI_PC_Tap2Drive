package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/ExcelExportPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExcelExportPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (cpLine :  CommercialPropertyLine) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ExcelExportPopup, {cpLine}, 0)
  }
  
  static function push (cpLine :  CommercialPropertyLine) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ExcelExportPopup, {cpLine}, 0).push()
  }
  
  
}