package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NewNoteWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewNoteWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate}, 0)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, contingency :  Contingency) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate, contingency}, 2)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, jobContainer :  Job) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate, jobContainer}, 1)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, contingency :  Contingency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate, contingency}, 2).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, jobContainer :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate, jobContainer}, 1).goInWorkspace()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate}, 0).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, contingency :  Contingency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate, contingency}, 2).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, jobContainer :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewNoteWorksheet, {policyPeriod, asOfDate, jobContainer}, 1).push()
  }
  
  
}