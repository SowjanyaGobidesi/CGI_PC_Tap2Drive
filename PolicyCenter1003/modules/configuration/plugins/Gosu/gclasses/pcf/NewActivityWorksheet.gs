package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/NewActivityWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewActivityWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (account :  Account, activityPattern :  ActivityPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {account, activityPattern}, 2)
  }
  
  static function createDestination (contingency :  Contingency) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {contingency}, 3)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, activityPattern :  ActivityPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {policyPeriod, activityPattern}, 0)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, policy :  Policy, activityPattern :  ActivityPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {policyPeriod, policy, activityPattern}, 1)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (account :  Account, activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {account, activityPattern}, 2).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (contingency :  Contingency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {contingency}, 3).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {policyPeriod, activityPattern}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, policy :  Policy, activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {policyPeriod, policy, activityPattern}, 1).goInWorkspace()
  }
  
  static function push (account :  Account, activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {account, activityPattern}, 2).push()
  }
  
  static function push (contingency :  Contingency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {contingency}, 3).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {policyPeriod, activityPattern}, 0).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, policy :  Policy, activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewActivityWorksheet, {policyPeriod, policy, activityPattern}, 1).push()
  }
  
  
}