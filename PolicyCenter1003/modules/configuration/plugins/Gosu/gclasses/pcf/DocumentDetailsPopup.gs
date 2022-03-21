package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/DocumentDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (document :  Document) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DocumentDetailsPopup, {document}, 0)
  }
  
  static function createDestination (document :  Document, viewOnly :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DocumentDetailsPopup, {document, viewOnly}, 1)
  }
  
  static function push (document :  Document) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DocumentDetailsPopup, {document}, 0).push()
  }
  
  static function push (document :  Document, viewOnly :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DocumentDetailsPopup, {document, viewOnly}, 1).push()
  }
  
  
}