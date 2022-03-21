package gw.billing.paymentplansstate

uses gw.billing.PaymentPlansStateContainerImpl
uses gw.pl.persistence.core.Bundle
uses gw.plugin.billing.InstallmentPlanData
uses gw.plugin.billing.PaymentPlanData
uses gw.plugin.billing.ReportingPlanData

uses java.math.BigDecimal

@Export
abstract class AbstractPaymentPlansState implements PaymentPlansState {
  var _container : PaymentPlansStateContainerImpl as Container

  construct(container: PaymentPlansStateContainerImpl) {
    _container = container
  }

  function saveStateToPolicyPeriod(period : PolicyPeriod) {
    period.DepositOverridePct = null
  }

  protected property get PaymentPlanChoice() : PaymentPlanData {
    return Container.PaymentPlanChoice
  }

  protected property get ReportingPlans() : ReportingPlanData[] {
    return Container.ReportingPlans
  }

  protected property get InstallmentPlans() : InstallmentPlanData[] {
    return Container.InstallmentPlans
  }

  protected property get Bundle() : Bundle {
    return Container.Bundle
  }

  /**
   * Create the appropriate PaymentPlansState given the information provided
   * @param plan The new PaymentPlan selected
   * @param container The PaymentPlansStateContainer holding the state information
   * @return this if appropriate, otherwise, create the appropriate PaymentPlansState
   */
  abstract function updateUsing(plan: PaymentPlanData, container : PaymentPlansStateContainerImpl) : AbstractPaymentPlansState

  override property get ReportingPlanSelected() : boolean {
    return false
  }

  override property get ReportingPlanChoice() : ReportingPlanData {
    return null
  }

  override property get ReportingDefaultDepositPct() : BigDecimal {
    return null
  }

  override property get InstallmentsPlanSelected() : boolean {
    return false
  }

  function refreshContainer() {
    // do nothing
  }

  override property get AllowResponsive() : boolean {
    return true
  }

  function getResetPaymentMethod() : PaymentMethod {
    if (ReportingPlans.HasElements) {
      return PaymentMethod.TC_REPORTINGPLAN
    }
    if (InstallmentPlans.HasElements) {
      return PaymentMethod.TC_INSTALLMENTS
    }
    return null
  }
}