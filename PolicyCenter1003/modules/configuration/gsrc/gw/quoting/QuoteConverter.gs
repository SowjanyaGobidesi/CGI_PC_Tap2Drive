package gw.quoting

uses gw.account.AccountSearchCriteria
uses gw.api.quoting.QuoteRepresentation

/**
 * This interface defines methods for converting/restoring a quote to/from a PolicyPeriod. It uses a
 * {@link QuoteRepresentation} to represent a storable format of the quote PolicyPeriod.
 *
 * It also has methods for creating an {@link AccountSearchCriteria} based on contact information defined in the quote.
 */
@Export
interface QuoteConverter {

  /**
   * Convert PolicyPeriod containing quote information to a String that can be exported to an external storage.
   *
   * @param policyPeriod PolicyPeriod with the quote
   * @return a QuoteRepresentation containing the converted quote String
   */
  function convertQuotePeriod(policyPeriod : PolicyPeriod) : QuoteRepresentation

  /**
   * Create an {@link AccountSearchCriteria} that is populated with values defined in the quote. The search criteria
   * values are defined in the specified <i>quoteAdditionalInfo</i> param.
   *
   * The created AccountSearchCriteria can be used to find existing Accounts in the SoR. The caller can then pick one
   * of these existing Accounts to link up with the quote.
   *
   * @param quoteAdditionalInfo Contains search criteria used for account search
   * @return AccountSearchCriteria
   */
  function createAccountSearchCriteria(quoteRepresentation : QuoteRepresentation) : AccountSearchCriteria

  /**
   * Restore a quote and create a quoted Submission PolicyPeriod for it.
   *
   * Create the Submission and assign it to the specified Account.
   *
   * @param quoteRepresentation the quote to restore
   * @param account the account that's linked to the restored PolicyPeriod. If null, a new account is created using the
   *                Account entity defined in the quote.
   * @return the quoted Submission PolicyPeriod for the quote.
   */
  function restoreQuotePeriod(quoteRepresentation : QuoteRepresentation, account : Account = null) : PolicyPeriod
}