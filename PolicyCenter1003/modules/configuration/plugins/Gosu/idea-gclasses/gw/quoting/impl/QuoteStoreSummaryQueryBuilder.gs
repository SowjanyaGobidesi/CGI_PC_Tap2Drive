package gw.quoting.impl

uses gw.api.database.ISelectQueryBuilder
uses gw.api.database.Relop
uses gw.policy.PolicyPeriodQueryBuilderBase

/**
 * QuoteStoreSummaryQueryBuilder is a concrete class that builds queries for QuoteStoreSummary
 * (i.e. a lightweight view entity typically used in in search result lists).
 *
 * @see PolicyPeriodQueryBuilderBase
 */
@Export
class QuoteStoreSummaryQueryBuilder extends PolicyPeriodQueryBuilderBase<QuoteStoreSummary, QuoteStoreSummaryQueryBuilder> {

  var _quoteID : String

  construct() {
    withOnlyJobSelectedVersion(true)
    withPolicyPeriodStatuses({TC_RATED, TC_QUOTED})
  }

  override protected property get SelectQueryBuilderType() : Type {
    return PolicyPeriod
  }

  function withQuoteID(value : String) : QuoteStoreSummaryQueryBuilder {
    _quoteID = value
    return this
  }

  protected override function doRestrictQuery(selectQueryBuilder : ISelectQueryBuilder) {
    super.doRestrictQuery(selectQueryBuilder)
    if (_quoteID?.NotBlank) {
      selectQueryBuilder.compare(PolicyPeriod#QuoteIdentifier, Relop.Equals, _quoteID)
    }
  }

}