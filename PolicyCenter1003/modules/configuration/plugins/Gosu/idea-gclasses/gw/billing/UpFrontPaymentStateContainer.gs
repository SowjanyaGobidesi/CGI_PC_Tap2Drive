package gw.billing

uses gw.pl.currency.MonetaryAmount

/**
 * This class is a helper class for the Up Front Payment section of the billing payment page. It provides states and
 * methods that facilitate rendering of the page.
 *
 */
@Export
interface UpFrontPaymentStateContainer {

  property get UpFrontPaymentMethod() : UpFrontPaymentMethod
  property set UpFrontPaymentMethod(method : UpFrontPaymentMethod)

  property get UpFrontPaymentInstrument() : String
  property set UpFrontPaymentInstrument(instrument : String)

  property get AgentAmount() : MonetaryAmount
  property set AgentAmount(amount : MonetaryAmount)

  property get CheckAmount() : MonetaryAmount
  property set CheckAmount(amount : MonetaryAmount)

  property get CashAmount() : MonetaryAmount
  property set CashAmount(amount : MonetaryAmount)

  property get ElectronicAmount() : MonetaryAmount
  property set ElectronicAmount(amount : MonetaryAmount)

  property get Reference() : String
  property set Reference(reference : String)

  function synchronizePendingPaymentGatewayTransactions(policyPeriod : PolicyPeriod)

  function createPayment()

  @Param("billingStateContainer", "Current state of all object for open policy period")
  @Param("policyPeriod", "A policy period for which payment will be created")
  @Param("saveForFutureUse", "value of checkbox that indicates new payment instrument creation")
  function createElectronicPayment(billingStateContainer : PolicyPeriodBillingInstructionsManager,
                                   policyPeriod : PolicyPeriod,
                                   saveForFutureUse : boolean)
  /**
   * Removes the UpFrontPayment entity and re-initializes this object and the pcf iterator
   * only when credit transaction is successful.
   */
  function removePayment(payment : UpFrontPayment)
}