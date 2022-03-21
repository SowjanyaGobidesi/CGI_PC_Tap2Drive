package gw.billing

uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.InstallmentPlanData
uses gw.plugin.billing.PaymentPlanData
uses gw.plugin.billing.ReportingPlanData

uses java.math.BigDecimal

/**
 * PaymentPlansStateContainer manages the collections of payment plans, their selection and the implications of the different
 * types of plans.  Internally, it uses a PaymentPlansState to determine how to act based on the type of plan chosen.
 * As part of managing PaymentPlans, the Container also takes care of calls to the Plugin and caching the results
 */
@Export
interface PaymentPlansStateContainer {

  /**
   * Represents the PaymentPlan selected for the PolicyPeriod
   * @return PaymentPlanData that represents the on-screen selected
   */
  property get PaymentPlanChoice() : PaymentPlanData

  /**
   * Set the PaymentPlan selected for the PolicyPeriod displayed on-screen
   */
  property set PaymentPlanChoice(plan : PaymentPlanData)

  /**
   * Sets the PaymentPlan selected and updates all the containers based on the selection
   */
  function selectPaymentPlan(plan : PaymentPlanData)

  /**
   * When things change on-screen, need to refresh invoice streams
   */
  function updateInvoiceStreamAccordingToPaymentPlan()

  /**
   * Selected PaymentMethod based on selected PaymentPlan
   * @return PaymentMethod based on selected PaymentPlan
   */
  property get PaymentMethodChoice() : PaymentMethod

  /**
   * Update default and paymentPlan choices based on paymentMethod
   * @param paymentMethod PaymentMethod to use for PaymentPlan choices
   */
  property set PaymentMethodChoice(paymentMethod : PaymentMethod)

  /**
   * @return selected PaymentPlan cast to InstallmentPlan
   */
  property get InstallmentPlan() : InstallmentPlanData

  /**
   * @return Available InstallmentPlans
   */
  property get InstallmentPlans() : InstallmentPlanData[]

  /**
   * @return Available ReportingPlans
   */
  property get ReportingPlans() : ReportingPlanData[]

  /**
   * @return Fees assoicated with selected InstallmentPlan
   */
  property get InstallmentFees() : MonetaryAmount

  /**
   * @return true if a ReportingPlan has been selected
   */
  property get ReportingPlanSelected() : boolean

  /**
   * @return PaymentPlanChoice cast to ReportingPlanData
   */
  property get ReportingPlanChoice() : ReportingPlanData

  /**
   * Set chosen payment plan to provided plan
   * @param plan ReportingPlan to be selected plan
   */
  property set ReportingPlanChoice(plan : ReportingPlanData)

  property get ReportingDefaultDepositPct() : BigDecimal

  /**
   * Return an array either containing the selected {@link InstallmentPlanData} or empty if it is a {@ReportingPlanData}
   * or nothing was selected in the first place.
   *
   * @return An array containing the selected installment plan if it exists
   */
  property get MaybeGetInstallmentPlanAsArray() : InstallmentPlanData[]

  /**
   * @return true if the selected payment plan supports responsive/manual payments
   */
  property get AllowResponsive(): boolean

  /**
   * @return true if both Installments and Reporting plans are available as possible selections
   */
  property get HasBothInstallmentsAndReportPlans() : boolean

  /**
   * Will automatically set the PaymentPlan chosen to be one of the available plans
   */
  function chooseDefaultPaymentPlan()
}