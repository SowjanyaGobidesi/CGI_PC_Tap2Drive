package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (Workflow :  Workflow) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WorkflowDetail, {Workflow}, 0)
  }
  
  static function drilldown (Workflow :  Workflow) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowDetail, {Workflow}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (Workflow :  Workflow) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowDetail, {Workflow}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (Workflow :  Workflow) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowDetail, {Workflow}, 0).goInMain()
  }
  
  static function printPage (Workflow :  Workflow) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowDetail, {Workflow}, 0).printPage()
  }
  
  static function push (Workflow :  Workflow) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowDetail, {Workflow}, 0).push()
  }
  
  
}