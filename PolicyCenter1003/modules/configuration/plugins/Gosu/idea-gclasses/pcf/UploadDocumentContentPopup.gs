package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/UploadDocumentContentPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UploadDocumentContentPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (document :  Document) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UploadDocumentContentPopup, {document}, 0)
  }
  
  static function push (document :  Document) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UploadDocumentContentPopup, {document}, 0).push()
  }
  
  
}