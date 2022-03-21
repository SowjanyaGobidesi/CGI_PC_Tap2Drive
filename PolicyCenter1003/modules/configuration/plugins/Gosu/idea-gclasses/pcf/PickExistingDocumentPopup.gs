package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/PickExistingDocumentPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PickExistingDocumentPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PickExistingDocumentPopup, {docContainer}, 0)
  }
  
  function pickValueAndCommit (value :  Document) : void {
    __widgetOf(this, pcf.PickExistingDocumentPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PickExistingDocumentPopup, {docContainer}, 0).push()
  }
  
  
}