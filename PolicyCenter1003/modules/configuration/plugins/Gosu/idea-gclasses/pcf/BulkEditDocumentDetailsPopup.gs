package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/BulkEditDocumentDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BulkEditDocumentDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (documentDetailsHelper :  gw.document.DocumentDetailsApplicationHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BulkEditDocumentDetailsPopup, {documentDetailsHelper}, 0)
  }
  
  static function push (documentDetailsHelper :  gw.document.DocumentDetailsApplicationHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BulkEditDocumentDetailsPopup, {documentDetailsHelper}, 0).push()
  }
  
  
}