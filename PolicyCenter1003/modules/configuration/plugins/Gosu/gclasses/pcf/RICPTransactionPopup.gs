package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/RICPTransactionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RICPTransactionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (transaction :  RICededPremiumTransaction) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RICPTransactionPopup, {transaction}, 0)
  }
  
  static function push (transaction :  RICededPremiumTransaction) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RICPTransactionPopup, {transaction}, 0).push()
  }
  
  
}