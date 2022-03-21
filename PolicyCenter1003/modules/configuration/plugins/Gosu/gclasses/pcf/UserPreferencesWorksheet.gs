package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/user/UserPreferencesWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserPreferencesWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserPreferencesWorksheet, {}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace () : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserPreferencesWorksheet, {}, 0).goInWorkspace()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserPreferencesWorksheet, {}, 0).push()
  }
  
  
}