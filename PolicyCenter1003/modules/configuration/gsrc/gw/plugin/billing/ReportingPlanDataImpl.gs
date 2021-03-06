package gw.plugin.billing

uses gw.api.productmodel.AuditSchedulePattern
uses gw.api.productmodel.AuditSchedulePatternLookup

uses java.lang.IllegalArgumentException
uses java.lang.Override
uses java.math.BigDecimal

@Export
class ReportingPlanDataImpl extends AbstractPaymentPlanData implements ReportingPlanData {
  var _reportingPatternCode: String as ReportingPatternCode

  private property get AuditSchedulePattern(): AuditSchedulePattern {
    return AuditSchedulePatternLookup.selectByPublicID(this.ReportingPatternCode)
  }

  @Override
  property get Name(): String {
    return AuditSchedulePattern.Name
  }

  property get DefaultDepositPercent(): BigDecimal {
    return AuditSchedulePattern.ReportingDefaultDepositPct
  }

  override function doCreatePaymentPlanSummary(paymentPlanSummary: PaymentPlanSummary) {
    paymentPlanSummary.PaymentPlanType = PaymentMethod.TC_REPORTINGPLAN
    paymentPlanSummary.ReportingPatternCode = _reportingPatternCode
    paymentPlanSummary.Name = Name
  }

  override function doPopulateFromPaymentPlanSummary(paymentPlanSummary: PaymentPlanSummary) {
    if (paymentPlanSummary.PaymentPlanType != PaymentMethod.TC_REPORTINGPLAN) {
      throw new IllegalArgumentException("Cannot populate a ReportingPlanDataImpl from a PaymentPlanSummary that does not have PaymentPlanType of ReportingPlan")
    }
    _reportingPatternCode = paymentPlanSummary.ReportingPatternCode
  }

  override function isSameBillingPaymentPlan(summary: PaymentPlanSummary): boolean {
    if(summary == null) {
      return false
    } else {
      return ((summary.BillingId == this.BillingId) and (summary.ReportingPatternCode == this.ReportingPatternCode))
    }
  }

  override function isSameBillingPaymentPlan(otherPlan : PaymentPlanData) : boolean {
    return (otherPlan != null)
        and (otherPlan.ReportingPlan)
        and (otherPlan.BillingId == this.BillingId)
        and ((otherPlan as ReportingPlanData).ReportingPatternCode == this.ReportingPatternCode)
  }

  override property get ReportingPlan() : boolean {
    return true
  }
}