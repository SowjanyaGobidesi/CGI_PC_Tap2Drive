package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policyfile/InlandMarine_PolicyFilePart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InlandMarine_PolicyFilePart extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, part :  IMCoveragePart) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.InlandMarine_PolicyFilePart, {policyPeriod, asOfDate, part}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, part :  IMCoveragePart) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InlandMarine_PolicyFilePart, {policyPeriod, asOfDate, part}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, part :  IMCoveragePart) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InlandMarine_PolicyFilePart, {policyPeriod, asOfDate, part}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, part :  IMCoveragePart) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InlandMarine_PolicyFilePart, {policyPeriod, asOfDate, part}, 0).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, part :  IMCoveragePart) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InlandMarine_PolicyFilePart, {policyPeriod, asOfDate, part}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, part :  IMCoveragePart) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InlandMarine_PolicyFilePart, {policyPeriod, asOfDate, part}, 0).push()
  }
  
  
}