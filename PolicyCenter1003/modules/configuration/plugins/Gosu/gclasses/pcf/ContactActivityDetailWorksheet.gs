package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/ContactActivityDetailWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactActivityDetailWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (activity :  Activity, accountContact :  AccountContact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactActivityDetailWorksheet, {activity, accountContact}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity, accountContact :  AccountContact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactActivityDetailWorksheet, {activity, accountContact}, 0).goInWorkspace()
  }
  
  static function push (activity :  Activity, accountContact :  AccountContact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactActivityDetailWorksheet, {activity, accountContact}, 0).push()
  }
  
  
}