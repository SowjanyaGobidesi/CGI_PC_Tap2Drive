package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/ViewChangeConflictsWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ViewChangeConflictsWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (handler :  gw.job.ApplyChangesResult, myTabLabel :  String, myTitleLabel :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ViewChangeConflictsWorksheet, {handler, myTabLabel, myTitleLabel}, 0)
  }
  
  static function createDestination (handler :  gw.job.ApplyChangesResult, myTabLabel :  String, myTitleLabel :  String, node :  gw.api.tree.RowTreeRootNode) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ViewChangeConflictsWorksheet, {handler, myTabLabel, myTitleLabel, node}, 1)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (handler :  gw.job.ApplyChangesResult, myTabLabel :  String, myTitleLabel :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewChangeConflictsWorksheet, {handler, myTabLabel, myTitleLabel}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (handler :  gw.job.ApplyChangesResult, myTabLabel :  String, myTitleLabel :  String, node :  gw.api.tree.RowTreeRootNode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewChangeConflictsWorksheet, {handler, myTabLabel, myTitleLabel, node}, 1).goInWorkspace()
  }
  
  static function push (handler :  gw.job.ApplyChangesResult, myTabLabel :  String, myTitleLabel :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewChangeConflictsWorksheet, {handler, myTabLabel, myTitleLabel}, 0).push()
  }
  
  static function push (handler :  gw.job.ApplyChangesResult, myTabLabel :  String, myTitleLabel :  String, node :  gw.api.tree.RowTreeRootNode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewChangeConflictsWorksheet, {handler, myTabLabel, myTitleLabel, node}, 1).push()
  }
  
  
}