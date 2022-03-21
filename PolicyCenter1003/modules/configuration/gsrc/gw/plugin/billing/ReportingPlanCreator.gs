package gw.plugin.billing

uses gw.api.locale.DisplayKey
uses gw.api.productmodel.AuditSchedulePatternLookup
uses gw.api.system.PCLoggerCategory
uses java.util.List
uses gw.plugin.billing.PaymentPlanInfoSpec

@Export
class ReportingPlanCreator {
  static function createReportingPlansForPlanId(paymentPlan : PaymentPlanInfoSpec): List< ReportingPlanData > {
    var allowedPaymentMethods = paymentPlan.AllowedPaymentMethods.map(\ s ->
        BillingUtilityMethods.convertPaymentMethodToAccountPaymentMethod(s))?.toTypedArray()

    var pcReportingPlans : List< ReportingPlanData > = {}
    var auditSchedulePatterns = AuditSchedulePatternLookup.getAll().where(\elt -> elt.PaymentPlanCode == paymentPlan.PublicID)
    if (auditSchedulePatterns.size() == 0) {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.warn(DisplayKey.get("BillingSystemPlugin.Error.NoAuditSchedulePatternsFound", paymentPlan.PublicID))
    }

    // Add one PC PaymentPlanSummary for each AuditSchedulePattern we found matching the billing system's payment plan Public ID
    for (reportingPattern in auditSchedulePatterns) {
      var newReportingPlan = new ReportingPlanDataImpl ()
      newReportingPlan.BillingId = paymentPlan.PublicID
      newReportingPlan.ReportingPatternCode = reportingPattern.PublicID
      newReportingPlan.AllowedPaymentMethods = allowedPaymentMethods
      newReportingPlan.BillDateOrDueDateBilling = BillingUtilityMethods.getTypeKeyForBillDateOrDueDateBilling(paymentPlan.BillDateOrDueDateBilling)
      pcReportingPlans.add(newReportingPlan)
    }

    return pcReportingPlans
  }
}
