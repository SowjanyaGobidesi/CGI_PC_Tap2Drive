package gw.billing.paymentplansstate

uses gw.billing.PaymentPlansStateContainerImpl
uses gw.plugin.billing.PaymentPlanData

/**
 * Create a payment plans state based on the type of plan chosen
 */
@Export
class PaymentPlansStateFactory {

  static function createPaymentPlansState(plan: PaymentPlanData, container : PaymentPlansStateContainerImpl) : AbstractPaymentPlansState {
    if (plan == null) {
      return new NullPaymentPlansState(container)
    }
    if (plan.ReportingPlan) {
      return new ReportingPlansState(container)
    }
    return new InstallmentsPlansState(container)
  }
}