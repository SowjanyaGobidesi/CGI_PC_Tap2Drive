package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/BillingAdjustmentPreviewPaymentsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BillingAdjustmentPreviewPaymentsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (paymentPlanName :  String, installmentsPreview :  gw.plugin.billing.BillingPaymentsPreview, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BillingAdjustmentPreviewPaymentsPopup, {paymentPlanName, installmentsPreview, policyPeriod}, 0)
  }
  
  static function push (paymentPlanName :  String, installmentsPreview :  gw.plugin.billing.BillingPaymentsPreview, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BillingAdjustmentPreviewPaymentsPopup, {paymentPlanName, installmentsPreview, policyPeriod}, 0).push()
  }
  
  
}