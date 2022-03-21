package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_Notes.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Notes extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, activity}, 1)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate}, 0)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, activity :  Activity) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate, activity}, 2)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, activity}, 1).drilldown()
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate}, 0).drilldown()
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate, activity}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, activity}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate, activity}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, activity}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate, activity}, 2).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, activity}, 1).printPage()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate}, 0).printPage()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate, activity}, 2).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, activity}, 1).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate}, 0).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Notes, {policyPeriod, asOfDate, activity}, 2).push()
  }
  
  
}