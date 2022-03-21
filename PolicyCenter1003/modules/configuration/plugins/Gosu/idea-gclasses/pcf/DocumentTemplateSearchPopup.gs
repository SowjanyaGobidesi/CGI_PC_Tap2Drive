package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/DocumentTemplateSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentTemplateSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, account :  Account, documentCreationInfo :  gw.document.DocumentCreationInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DocumentTemplateSearchPopup, {policyPeriod, account, documentCreationInfo}, 0)
  }
  
  static function createDestination (symbolProvider :  gw.document.SymbolProvider) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DocumentTemplateSearchPopup, {symbolProvider}, 1)
  }
  
  function pickValueAndCommit (value :  gw.plugin.document.IDocumentTemplateDescriptor) : void {
    __widgetOf(this, pcf.DocumentTemplateSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyPeriod :  PolicyPeriod, account :  Account, documentCreationInfo :  gw.document.DocumentCreationInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DocumentTemplateSearchPopup, {policyPeriod, account, documentCreationInfo}, 0).push()
  }
  
  static function push (symbolProvider :  gw.document.SymbolProvider) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DocumentTemplateSearchPopup, {symbolProvider}, 1).push()
  }
  
  
}