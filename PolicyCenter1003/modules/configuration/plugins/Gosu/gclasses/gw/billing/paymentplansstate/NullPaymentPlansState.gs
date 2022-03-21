package gw.billing.paymentplansstate

uses gw.billing.PaymentPlansStateContainerImpl
uses gw.plugin.billing.PaymentPlanData

@Export
class NullPaymentPlansState extends AbstractPaymentPlansState {

  construct(container: PaymentPlansStateContainerImpl) {
    super(container)
  }

  override function updateUsing(plan: PaymentPlanData, container : PaymentPlansStateContainerImpl) : AbstractPaymentPlansState {
    if (plan == null) {
      return this
    }
    return PaymentPlansStateFactory.createPaymentPlansState(plan, container)
  }
}