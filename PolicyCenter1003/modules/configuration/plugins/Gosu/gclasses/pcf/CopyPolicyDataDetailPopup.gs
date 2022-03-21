package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/CopyPolicyDataDetailPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyPolicyDataDetailPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (targetPeriod :  PolicyPeriod, initialSourcePeriod :  PolicyPeriod, initialSourceSliceDate :  java.util.Date, isJob :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CopyPolicyDataDetailPopup, {targetPeriod, initialSourcePeriod, initialSourceSliceDate, isJob}, 0)
  }
  
  static function push (targetPeriod :  PolicyPeriod, initialSourcePeriod :  PolicyPeriod, initialSourceSliceDate :  java.util.Date, isJob :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CopyPolicyDataDetailPopup, {targetPeriod, initialSourcePeriod, initialSourceSliceDate, isJob}, 0).push()
  }
  
  
}