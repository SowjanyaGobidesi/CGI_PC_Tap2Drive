package gw.billing.paymentplansstate

uses gw.billing.PaymentPlansStateContainer
uses gw.plugin.billing.PaymentPlanData
uses gw.plugin.billing.ReportingPlanData

uses java.math.BigDecimal

/**
 * PaymentPlanState assists the PolicyPeriodBillingInstructionsManager and the UI in doing the appropriate thing based on the
 * current PaymentPlan selection
 */
@Export
interface PaymentPlansState {

  /**
   * @return true if the selected PaymentPlan is a non-null Reporting Plan
   */
  property get ReportingPlanSelected() : boolean

  /**
   * @return PaymentPlan selected cast to a ReportingPlan or null if PaymentPlan is null
   */
  property get ReportingPlanChoice() : ReportingPlanData

  /**
   * @return Deposit Amount or null if PaymentPlan is Installment or null
   */
  property get ReportingDefaultDepositPct() : BigDecimal

  /**
   * @return true if the selected PaymentPlan is a non-null Installments Plan
   */
  property get InstallmentsPlanSelected() : boolean

  /**
   * @return true if the current state supports responsive/manual payment
   */
  property get AllowResponsive() : boolean
}