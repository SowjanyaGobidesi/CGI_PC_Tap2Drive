package gw.billing.paymentplansstate

uses gw.billing.PaymentPlansStateContainerImpl
uses gw.plugin.billing.PaymentPlanData
uses gw.plugin.billing.ReportingPlanData

uses java.math.BigDecimal

@Export
class ReportingPlansState extends AbstractPaymentPlansState {

  construct(container: PaymentPlansStateContainerImpl) {
    super(container)
  }

  override function updateUsing(plan: PaymentPlanData, container : PaymentPlansStateContainerImpl) : AbstractPaymentPlansState {
    if (plan?.ReportingPlan) {
      return this
    }
    return PaymentPlansStateFactory.createPaymentPlansState(plan, container)
  }

  function saveStateToPolicyPeriod(period : PolicyPeriod) {
    period.DepositOverridePct = Container.DepositOverridePct
  }

  override property get ReportingPlanSelected() : boolean {
    return true
  }

  override property get ReportingPlanChoice() : ReportingPlanData {
    return PaymentPlanChoice as ReportingPlanData
  }

  override property get ReportingDefaultDepositPct() : BigDecimal {
    return PaymentPlanChoice.createPaymentPlanSummary(Bundle).ReportingPattern.ReportingDefaultDepositPct
  }

  override function getResetPaymentMethod() : PaymentMethod {
    if (ReportingPlans.HasElements) {
      return PaymentMethod.TC_REPORTINGPLAN
    }
    return super.getResetPaymentMethod()
  }

  override function refreshContainer() {
    super.refreshContainer()
    Container.setFieldsFromNewReportingPlan()
    Container.updateUpFrontPaymentStateContainer()
  }
}