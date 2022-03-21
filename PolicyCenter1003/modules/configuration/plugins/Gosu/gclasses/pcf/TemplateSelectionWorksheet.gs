package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/integration/TemplateSelectionWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TemplateSelectionWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (info :  gw.integration.document.production.web.DocumentProductionInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TemplateSelectionWorksheet, {info}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (info :  gw.integration.document.production.web.DocumentProductionInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TemplateSelectionWorksheet, {info}, 0).goInWorkspace()
  }
  
  static function push (info :  gw.integration.document.production.web.DocumentProductionInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TemplateSelectionWorksheet, {info}, 0).push()
  }
  
  
}