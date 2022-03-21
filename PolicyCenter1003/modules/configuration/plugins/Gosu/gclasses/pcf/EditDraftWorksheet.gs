package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/integration/EditDraftWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditDraftWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (info :  gw.integration.document.production.web.DocumentProductionInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditDraftWorksheet, {info}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (info :  gw.integration.document.production.web.DocumentProductionInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditDraftWorksheet, {info}, 0).goInWorkspace()
  }
  
  static function push (info :  gw.integration.document.production.web.DocumentProductionInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditDraftWorksheet, {info}, 0).push()
  }
  
  
}