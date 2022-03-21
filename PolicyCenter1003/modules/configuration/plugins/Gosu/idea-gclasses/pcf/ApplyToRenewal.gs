package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/ApplyToRenewal.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ApplyToRenewal extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (currentBranch :  PolicyPeriod, futureBranch :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ApplyToRenewal, {currentBranch, futureBranch}, 0)
  }
  
  static function drilldown (currentBranch :  PolicyPeriod, futureBranch :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ApplyToRenewal, {currentBranch, futureBranch}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (currentBranch :  PolicyPeriod, futureBranch :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ApplyToRenewal, {currentBranch, futureBranch}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (currentBranch :  PolicyPeriod, futureBranch :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ApplyToRenewal, {currentBranch, futureBranch}, 0).goInMain()
  }
  
  static function printPage (currentBranch :  PolicyPeriod, futureBranch :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ApplyToRenewal, {currentBranch, futureBranch}, 0).printPage()
  }
  
  static function push (currentBranch :  PolicyPeriod, futureBranch :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ApplyToRenewal, {currentBranch, futureBranch}, 0).push()
  }
  
  
}