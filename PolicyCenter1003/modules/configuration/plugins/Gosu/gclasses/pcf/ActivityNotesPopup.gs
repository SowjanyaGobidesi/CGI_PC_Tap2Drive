package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/ActivityNotesPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityNotesPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (activity :  Activity, account :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityNotesPopup, {activity, account}, 1)
  }
  
  static function createDestination (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityNotesPopup, {activity, policyPeriod}, 0)
  }
  
  static function push (activity :  Activity, account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityNotesPopup, {activity, account}, 1).push()
  }
  
  static function push (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityNotesPopup, {activity, policyPeriod}, 0).push()
  }
  
  
}