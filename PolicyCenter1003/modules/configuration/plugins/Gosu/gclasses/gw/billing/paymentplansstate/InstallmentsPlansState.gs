package gw.billing.paymentplansstate

uses gw.billing.PaymentPlansStateContainerImpl
uses gw.plugin.billing.PaymentPlanData

@Export
class InstallmentsPlansState extends AbstractPaymentPlansState {

  construct(container: PaymentPlansStateContainerImpl) {
    super(container)
  }

  override function updateUsing(plan: PaymentPlanData, container : PaymentPlansStateContainerImpl): AbstractPaymentPlansState {
    if (plan?.InstallmentsPlan) {
      return this
    }
    return PaymentPlansStateFactory.createPaymentPlansState(plan, container)
  }

  override property get InstallmentsPlanSelected() : boolean {
    return true
  }

  override function refreshContainer() {
    super.refreshContainer()
    Container.clearInvoiceStreamOverridesAttributes()
    Container.updateInvoiceStreamAccordingToPaymentPlan()
    Container.updateUpFrontPaymentStateContainer()
  }

  override function getResetPaymentMethod() : PaymentMethod {
    if (InstallmentPlans.HasElements) {
      return PaymentMethod.TC_INSTALLMENTS
    }
    return super.getResetPaymentMethod()
  }

  override property get AllowResponsive() : boolean {
    return PaymentPlanChoice.AllowedPaymentMethods.contains(AccountPaymentMethod.TC_RESPONSIVE)
  }
}