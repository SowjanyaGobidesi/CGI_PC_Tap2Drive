package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/NewDocumentFromTemplateWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewDocumentFromTemplateWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (activity :  Activity, docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {activity, docContainer}, 2)
  }
  
  static function createDestination (activity :  Activity, docContainer :  gw.api.domain.document.DocumentContainer, docTemplate :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {activity, docContainer, docTemplate}, 3)
  }
  
  static function createDestination (contingency :  Contingency) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {contingency}, 4)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {policyPeriod}, 0)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, jobContainer :  Job) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {policyPeriod, jobContainer}, 1)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity, docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {activity, docContainer}, 2).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity, docContainer :  gw.api.domain.document.DocumentContainer, docTemplate :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {activity, docContainer, docTemplate}, 3).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (contingency :  Contingency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {contingency}, 4).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {policyPeriod}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, jobContainer :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {policyPeriod, jobContainer}, 1).goInWorkspace()
  }
  
  static function push (activity :  Activity, docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {activity, docContainer}, 2).push()
  }
  
  static function push (activity :  Activity, docContainer :  gw.api.domain.document.DocumentContainer, docTemplate :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {activity, docContainer, docTemplate}, 3).push()
  }
  
  static function push (contingency :  Contingency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {contingency}, 4).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {policyPeriod}, 0).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, jobContainer :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDocumentFromTemplateWorksheet, {policyPeriod, jobContainer}, 1).push()
  }
  
  
}