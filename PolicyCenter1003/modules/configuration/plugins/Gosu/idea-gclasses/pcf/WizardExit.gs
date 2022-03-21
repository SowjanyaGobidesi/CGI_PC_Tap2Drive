package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/WizardExit.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WizardExit extends com.guidewire.pl.web.codegen.LocationGroupBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.WizardExit, {}, 0)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.WizardExit, {}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.WizardExit, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.WizardExit, {}, 0).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.WizardExit, {}, 0).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.WizardExit, {}, 0).push()
  }
  
  
}