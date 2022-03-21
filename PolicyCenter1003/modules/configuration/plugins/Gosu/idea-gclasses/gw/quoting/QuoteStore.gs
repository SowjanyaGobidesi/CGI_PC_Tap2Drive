package gw.quoting;

uses entity.PolicyPeriod
uses gw.api.quoting.QuoteKey
uses gw.api.quoting.QuoteRepresentation
uses gw.api.quoting.RestoreQuoteRepresentation

uses java.util.List

/**
 * Interface of a Quote Store.
 */
@Export
public interface QuoteStore {

  /**
   * Store a quote in a Quote Store. Returns a QuoteKey object representing the ID of the stored quote.
   *
   * @param data a QuoteRepresentation object containing the serialized quote and other information.
   * @param policyPeriod
   * @return a QuoteKey which represents the ID of the stored quote.
   */
  function storeQuote(data : QuoteRepresentation, policyPeriod : PolicyPeriod) : QuoteKey

  /**
   * Retrieve a quote from a Quote Store and returns a QuoteRepresentation
   *
   * @param quoteKey of the quote to retrieve
   * @return a RestoreQuoteRepresentation of the retrieved quote
   */
  function retrieveQuote(quoteKey : QuoteKey) : RestoreQuoteRepresentation

  /**
   * Remove quote from a Quote Store.
   *
   * Returns true if the specified {@link QuoteKey} is removed. If no quote is associated with the specified
   * {@link QuoteKey}, <i>false</i> is returned. This method needs to be able to handle multiple remove calls for the
   * same {@link QuoteKey}.
   *
   * @param quoteKey of the quote to be removed from the Quote store.
   * @return true if the quote is removed otherwise false
   */
  function removeQuote(quoteKey : QuoteKey) : boolean

  /**
   * Returns a list of QuoteSearchResults from a Quote Store for the given search criteria.
   *
   * @param searchCriteria used in this search
   * @return A list of QuoteSearchResult
   */
  function search(searchCriteria : QuoteSearchCriteria) : List<QuoteSummarySearchResult>

  /**
   * Provides a callback hook.
   * This method is invoked after every attempt to reconstitute a quote. It provides a hook into the reconstitution
   * process for the QuoteStore and parameters that contain information that could be useful for managing its state.
   *
   * Useful information such as the SubmissionNumber, AccountID of the Account associated with the reconstituted quote,
   * or the QuoteKey of the Quote being reconstituted can be derived from the QuoteRepresentation or from the
   * PolicyPeriod itself.
   *
   *
   * @param quoteRepresentationOfReconstitutedQuote the QuoteRepresentation of the quote.
   * @param reconstitutedQuote the reconstituted PolicyPeriod if the reconstitution is successful, null otherwise.
   * @param isSuccessfullyReconstituted true if the reconstitution is a Success, false otherwise.
   * @param cause any exception that might have been thrown during reconstitution. This includes
   *              UWAuthorityBlocksProgressExceptions if the quote is successfully reconstituted but still has UWIssues.
   */
  function onReconstitute(quoteRepresentationOfReconstitutedQuote : RestoreQuoteRepresentation,
      reconstitutedQuote : PolicyPeriod, isSuccessfullyReconstituted : boolean, cause : Throwable = null)
}
