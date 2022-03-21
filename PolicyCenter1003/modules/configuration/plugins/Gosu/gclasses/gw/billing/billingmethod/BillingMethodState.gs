package gw.billing.billingmethod

uses gw.plugin.billing.BillingAccountSearchResult

/**
 * This interface defines the properties and behaviors of billing method types.
 */
@Export
interface BillingMethodState {

  /**
   * Get the BillingMethod typekey.
   */
  property get BillingMethod() : BillingMethod

  /**
   * Get the billing account number.
   */
  property get BillingAccountNumber() : String

  /**
   * Indicate whether the alternate biller should be visible or not.
   */
  property get AlternateBillerVisible() : boolean

  /**
   * Indicate whether alternate biller is required.
   */
  property get AlternateBillerRequired() : boolean

  /**
   * Indicate whether the sub accounts should be visible or not.
   */
  property get SubAccountsVisible() : boolean

  /**
   * Indicate whether the billing contact should be visible or not.
   */
  property get BillingContactVisible() : boolean

  /**
   * Indicate whether the account search popup should be enabled or not.
   */
  property get EnableAccountSearchPopup() : boolean

  /**
   * Indicate whether the billing account search popup should be enabled or not.
   */
  property get EnableBillingAccountSearchPopup() : boolean

  /**
   * Indicate whether new invoicing is allowed or not.
   */
  property get AllowNewInvoicing() : boolean

  /**
   * Indicate whether custom billing is allowed or not.
   */
  property get AllowCustomBilling() : boolean

  /**
   * Indicate whether overridden invoice stream is allowed or not.
   */
  property get AllowOverriddenInvoiceStream() : boolean

  /**
   * Indicate whether the invoicing label should be shown or not.
   */
  property get ShowInvoicingLabel() : boolean

  /**
   * Indicate whether invoicing selection should be enabled or not.
   */
  property get EnableInvoicingSelection() : boolean

  /**
   * Indicate whether an empty invoice stream list view should be shown or not if there are no invoice streams.
   */
  property get AllowEmptyInvoiceStreamLV() : boolean

  /**
   * Filter out accounts that are not for this billing method type.
   *
   * @param accounts a list accounts to check
   * @return the list of accounts for this billing method type only.
   */
  function filterAccountsForBillingMethodType(accounts : BillingAccountSearchResult[]) : BillingAccountSearchResult[]

  /**
   * Update the {@link PolicyPeriodBillingInstructionsManager} context for this billing method state.
   * It is used to update the context when transitioning from a different BillingMethodState to this BillingMethodState.
   */
  function updateContainer()

  /*
   * Update the Billing Method State. If the specified BillingMethod type is the same, nothing is done.
   */
  function updateBillingMethodType(type : BillingMethod)
}