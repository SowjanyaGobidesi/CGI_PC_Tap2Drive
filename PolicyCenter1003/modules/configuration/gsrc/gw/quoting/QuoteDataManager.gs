package gw.quoting

uses gw.account.AccountSearchCriteria
uses gw.api.quoting.QuoteKey
uses gw.api.quoting.QuoteRepresentation
uses gw.api.quoting.RestoreQuoteRepresentation

/**
 * This interface defines the quote generation, storage, and retrieval methods.
 *
 * Typical flow:
 * 1) Given a PolicyPeriod containing the quote request, generate and export a quote on the HVQ instance by calling
 *    {@link #generateAndExportQuote(PolicyPeriod)}.
 *    - Generates a quote by populating the passed-in PolicyPeriod with cost objects.
 *    - Converts the quote PolicyPeriod to a storable format (e.g.: XML files)
 *    - Sends the storable PolicyPeriod to an external storage via the QuoteStore.
 *
 * 2) On the SoR instance, find an existing Account that matches the contact information defined in the quote.
 *    Call {@link #createAccountSearchCriteria(QuoteAdditionalInfoWrapper)} to get an {@link AccountSearchCriteria} populated
 *    with contact information from quote.
 *
 * 3) Reconstitute a quote using an existing Account by calling {@link #reconstituteQuote(RestoreQuoteRepresentation, Account)}.
 *    If a new Account is to be used, don't specify the Account.
 */
@Export
interface QuoteDataManager {
  /**
   * Returns a unique ID associated with PolicyPeriod quote.
   *
   * @param requestPeriod the unquoted PolicyPeriod which needs to be quoted. The caller of this
   *                     method should add the policyPeriod in a non-persistent bundle.
   * @return QuoteKey lookup key associated with a quote
   */
  function generateAndExportQuote(requestPeriod : PolicyPeriod) : QuoteKey

  /**
   * Retrieve the quote associated with the specified {@link QuoteKey} from the Quote Store.
   *
   * @param quoteKey lookup key associated with a quote
   * @return RestoreQuoteRepresentation
   */
  function retrieveQuote(quoteKey : QuoteKey) : RestoreQuoteRepresentation

  /**
   * Create an {@link AccountSearchCriteria} that is populated with values defined in the quote. The search criteria
   * values are defined in the specified <i>quoteAdditionalInfo</i> param
   *
   * The created AccountSeacrhCriteria can be used to find existing Accounts in the SoR. The caller can then pick one
   * of these existing Accounts to link up with the quote.
   *
   * @param quoteAdditionalInfo Contains search criteria used for account search
   * @return AccountSearchCriteria
   */
  function createAccountSearchCriteria(quoteRepresentation : QuoteRepresentation) : AccountSearchCriteria
  /**
   * Reconstitute the quoted Submission using the specified Account
   *
   * @param quoteRepresentation representation of restored quote
   * @param account specified account
   * @return the reconstituted quoted Submission PolicyPeriod
   */
  function reconstituteQuote(quoteRepresentation : RestoreQuoteRepresentation, account : Account = null) : PolicyPeriod

  /**
   * Remove the quote associated with the quote lookup key.
   *
   * @param quoteKey
   * @return true if the quote associated with the quote key is removed.
   */
  function removeQuote(quoteKey : QuoteKey) : boolean
}

