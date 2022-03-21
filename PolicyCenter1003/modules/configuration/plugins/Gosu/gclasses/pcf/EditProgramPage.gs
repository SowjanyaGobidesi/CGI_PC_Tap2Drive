package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/EditProgramPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditProgramPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (program :  RIProgram) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditProgramPage, {program}, 0)
  }
  
  static function drilldown (program :  RIProgram) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditProgramPage, {program}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (program :  RIProgram) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditProgramPage, {program}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (program :  RIProgram) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditProgramPage, {program}, 0).goInMain()
  }
  
  static function printPage (program :  RIProgram) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditProgramPage, {program}, 0).printPage()
  }
  
  static function push (program :  RIProgram) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditProgramPage, {program}, 0).push()
  }
  
  
}