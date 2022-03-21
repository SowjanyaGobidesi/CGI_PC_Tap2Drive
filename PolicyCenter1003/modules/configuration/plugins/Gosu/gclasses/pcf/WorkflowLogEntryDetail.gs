package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowLogEntryDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowLogEntryDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (Workflow :  Workflow, LogEntry :  WorkflowTextLog) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WorkflowLogEntryDetail, {Workflow, LogEntry}, 0)
  }
  
  static function drilldown (Workflow :  Workflow, LogEntry :  WorkflowTextLog) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowLogEntryDetail, {Workflow, LogEntry}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (Workflow :  Workflow, LogEntry :  WorkflowTextLog) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowLogEntryDetail, {Workflow, LogEntry}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (Workflow :  Workflow, LogEntry :  WorkflowTextLog) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowLogEntryDetail, {Workflow, LogEntry}, 0).goInMain()
  }
  
  static function printPage (Workflow :  Workflow, LogEntry :  WorkflowTextLog) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowLogEntryDetail, {Workflow, LogEntry}, 0).printPage()
  }
  
  static function push (Workflow :  Workflow, LogEntry :  WorkflowTextLog) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WorkflowLogEntryDetail, {Workflow, LogEntry}, 0).push()
  }
  
  
}