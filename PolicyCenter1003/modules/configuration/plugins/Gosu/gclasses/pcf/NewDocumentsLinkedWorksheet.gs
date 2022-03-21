package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/NewDocumentsLinkedWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewDocumentsLinkedWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDocumentsLinkedWorksheet, {policyPeriod}, 0)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, documentContainer :  gw.api.domain.linkedobject.LinkedObjectContainer) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDocumentsLinkedWorksheet, {policyPeriod, documentContainer}, 1)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentsLinkedWorksheet, {policyPeriod}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, documentContainer :  gw.api.domain.linkedobject.LinkedObjectContainer) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentsLinkedWorksheet, {policyPeriod, documentContainer}, 1).goInWorkspace()
  }
  
  static function push (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentsLinkedWorksheet, {policyPeriod}, 0).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, documentContainer :  gw.api.domain.linkedobject.LinkedObjectContainer) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentsLinkedWorksheet, {policyPeriod, documentContainer}, 1).push()
  }
  
  
}