package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFileForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFileForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (retrievedPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod}, 5)
  }
  
  static function createDestination (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate}, 2)
  }
  
  static function createDestination (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step}, 3)
  }
  
  static function createDestination (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String, args :  Object[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step, args}, 4)
  }
  
  static function createDestination (policyNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber}, 0)
  }
  
  static function createDestination (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber, retrieveAsOfDate}, 1)
  }
  
  static function drilldown (retrievedPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod}, 5).drilldown()
  }
  
  static function drilldown (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate}, 2).drilldown()
  }
  
  static function drilldown (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step}, 3).drilldown()
  }
  
  static function drilldown (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String, args :  Object[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step, args}, 4).drilldown()
  }
  
  static function drilldown (policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber}, 0).drilldown()
  }
  
  static function drilldown (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber, retrieveAsOfDate}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (retrievedPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod}, 5).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step}, 3).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String, args :  Object[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step, args}, 4).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber, retrieveAsOfDate}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (retrievedPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod}, 5).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate}, 2).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step}, 3).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String, args :  Object[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step, args}, 4).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber, retrieveAsOfDate}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (retrievedPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod}, 5).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate}, 2).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step}, 3).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String, args :  Object[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step, args}, 4).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber, retrieveAsOfDate}, 1).goInWorkspace()
  }
  
  static function printPage (retrievedPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod}, 5).printPage()
  }
  
  static function printPage (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate}, 2).printPage()
  }
  
  static function printPage (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step}, 3).printPage()
  }
  
  static function printPage (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String, args :  Object[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step, args}, 4).printPage()
  }
  
  static function printPage (policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber}, 0).printPage()
  }
  
  static function printPage (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber, retrieveAsOfDate}, 1).printPage()
  }
  
  static function push (retrievedPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod}, 5).push()
  }
  
  static function push (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate}, 2).push()
  }
  
  static function push (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step}, 3).push()
  }
  
  static function push (retrievedPeriod :  PolicyPeriod, retrieveAsOfDate :  java.util.Date, step :  String, args :  Object[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {retrievedPeriod, retrieveAsOfDate, step, args}, 4).push()
  }
  
  static function push (policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber}, 0).push()
  }
  
  static function push (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForward, {policyNumber, retrieveAsOfDate}, 1).push()
  }
  
  
}