package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/importexport/ImportWizard_ArrayDiffPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImportWizard_ArrayDiffPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (arrayDifferences :  gw.api.admin.ImportDataArrayDifferences) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ImportWizard_ArrayDiffPopup, {arrayDifferences}, 0)
  }
  
  static function push (arrayDifferences :  gw.api.admin.ImportDataArrayDifferences) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ImportWizard_ArrayDiffPopup, {arrayDifferences}, 0).push()
  }
  
  
}