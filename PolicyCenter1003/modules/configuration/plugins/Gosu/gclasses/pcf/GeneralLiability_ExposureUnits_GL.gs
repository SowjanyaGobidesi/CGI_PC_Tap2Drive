package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policyfile/GeneralLiability_ExposureUnits_GL.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GeneralLiability_ExposureUnits_GL extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GeneralLiability_ExposureUnits_GL, {policyPeriod, asOfDate}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GeneralLiability_ExposureUnits_GL, {policyPeriod, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GeneralLiability_ExposureUnits_GL, {policyPeriod, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GeneralLiability_ExposureUnits_GL, {policyPeriod, asOfDate}, 0).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GeneralLiability_ExposureUnits_GL, {policyPeriod, asOfDate}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GeneralLiability_ExposureUnits_GL, {policyPeriod, asOfDate}, 0).push()
  }
  
  
}