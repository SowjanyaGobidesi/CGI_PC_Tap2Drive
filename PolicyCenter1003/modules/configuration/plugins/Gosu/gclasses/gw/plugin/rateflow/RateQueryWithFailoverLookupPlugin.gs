package gw.plugin.rateflow

uses gw.api.database.Query
uses gw.api.rating.DefaultFactorSourceLogger
uses gw.api.rating.MultiFactorVariable
uses gw.api.rating.RateQueryResult
uses gw.api.rating.RatingException
uses gw.api.system.PCLoggerCategory
uses gw.rating.flow.RateQuery
uses gw.rating.rtm.query.AbstractStatelessQuery
uses gw.rating.rtm.query.QueryStrategyFactory
uses gw.rating.worksheet.ConstantFactorSourceLogger
uses gw.rating.worksheet.FailoverRateTableFactorSourceLogger

uses java.lang.Integer
uses java.math.BigDecimal
uses java.util.Map
uses java.util.Optional

/**
 * Implements failover logic in the event the primary rate query fails.
 */
@Export
class RateQueryWithFailoverLookupPlugin implements IRateQueryLookupPlugin<RateQuery> {

  static var _logger = PCLoggerCategory.RTM

  override function shouldPreemptQueryWithFailover(rateQuery: RateQuery): QueryPreemptionResult {
    return new QueryPreemptionResultBase(false)
  }

  override function processSingleFactorQueryFailover(rateQuery: RateQuery, factorColumnName: String, QueryPreemptionResult: Optional<QueryPreemptionResult>): RateQueryResult {
    return internalProcessSingleFactorQueryWithFailover(rateQuery, rateQuery.RateTable, factorColumnName)
  }

  override function processMultiFactorQueryFailover(rateQuery: RateQuery, factorCodes: List<String>, QueryPreemptionResult: Optional<QueryPreemptionResult>) : MultiFactorVariable {
    return internalProcessMultiFactorQueryWithFailover(rateQuery, rateQuery.RateTable, factorCodes)
  }

  private reified function internalProcessSingleFactorQueryWithFailover<R>(rateQuery: RateQuery, failedTable: RateTable, factorColumnName: String): RateQueryResult<R> {

    var failoverTable = resolveAlternateRateTable(failedTable)
    if (failoverTable == null) {
      _logger.warn("Rate query failed to return a factor. Returning 1.0 factor")
      return new RateQueryResult<Object>(1.0BD, new ConstantFactorSourceLogger()) as RateQueryResult<R>
    }

    logFailover(rateQuery, failedTable, failoverTable)

    var query = new QueryStrategyFactory().getFactorQuery(failoverTable)
    var result = query.query<R>(failoverTable, rateQuery.OrderedParamsList, factorColumnName)

    if (result.Empty) {
      return internalProcessSingleFactorQueryWithFailover<R>(rateQuery, failoverTable, factorColumnName)
    }

    return new RateQueryResult<R>(result.Factor, new FailoverRateTableFactorSourceLogger(failoverTable))

  }

  private function internalProcessMultiFactorQueryWithFailover(rateQuery: RateQuery, failedTable: RateTable, factorCodes: List<String>): MultiFactorVariable {

    var failoverTable = resolveAlternateRateTable(failedTable)
    if (failoverTable == null) {
      _logger.warn("Rate query failed to return a factor. Returning empty result")
      return new MultiFactorVariable({}, new DefaultFactorSourceLogger())
    }

    logFailover(rateQuery, failedTable, failoverTable)

    var query = new QueryStrategyFactory().getFactorQuery(failoverTable)
    if (!(query typeis AbstractStatelessQuery)) {
      return new MultiFactorVariable({}, new DefaultFactorSourceLogger())
    }

    var result = query.queryMultipleFactors(failoverTable, rateQuery.OrderedParamsList, factorCodes)

    if (result.Empty) {
      return internalProcessMultiFactorQueryWithFailover(rateQuery, failoverTable, factorCodes)
    }

    return new MultiFactorVariable(result, new FailoverRateTableFactorSourceLogger(failoverTable))

  }

  protected function resolveAlternateRateTable(table : RateTable) : RateTable {

    var failoverBook = resolveFailoverBook(table.RateBook)

    if (failoverBook == null) {
      _logger.warn("Failover book cannot be identified for '" + table.RateBook + "'")
      return null
    }

    var altRateTable = failoverBook.RateTables.firstWhere(\elt -> elt.Definition.TableCode == table.Definition.TableCode)
    if (altRateTable == null) {
      throw new RatingException("The table code '" + table.Definition.TableCode + "' does not exist in ratebook '" + altRateTable + "'")
    }

    return altRateTable

  }

  /**
   * Identifies the ratebook to use in the event of rate table query failure
   *
   * @param rateBook
   * @return
   */
  protected function resolveFailoverBook(rateBook : RateBook) : RateBook {

    // Customize this function to implement your failover resolution strategy
    //
    // For example, one suggested strategy is to create a table in a common
    // utility ratebook (that is never activated) that maps ratebooks to their failover books.
    //
    // Another solution is to create extended fields on the ratebook entity that
    // point to a failover book.


    if (rateBook.getBookEdition().Numeric) {
      var failedBookEdition = Integer.parseInt(rateBook.getBookEdition())

      var candidates = Query
                        .make(RateBook)
                        .compare("BookCode", Equals, rateBook.getBookCode())
                        .select()

      var failoverBook : RateBook
      var failoverEdition = Integer.MAX_VALUE
      candidates.each(\ book -> {

        if (book.getBookEdition().Numeric) {
          var editionInt = Integer.parseInt(book.getBookEdition())
          if (editionInt > failedBookEdition && editionInt < failoverEdition) {
            failoverBook = book
            failoverEdition = editionInt
          }
        }

      })

      if (failoverBook != null) {

        // The ratebook must be selected using the traditional code path in order to get
        // a book with the correct hierarchy.  to do this, you can use a ThreadLocal  to
        // capture the current policy period to pass into RateBook.selectRateBook here
        failoverBook.setRateBookHierarchy({failoverBook})
        return failoverBook
      }

    }

    return null

  }

  protected function logFailover(rateQuery : RateQuery, table : RateTable, alternateTable : RateTable) {

    if (false && _logger.WarnEnabled) {
      var queryParamsStr = rateQuery.OrderedParamsList.map(\op -> op.toString()).join(", ")
      var originalTableDesc = "Book: " + table.RateBook.BookName + ", version: " + table.RateBook.BookEdition + ", table: " + table.Definition.TableCode
      var alternateTableDesc = "Book: " + alternateTable.RateBook.BookName + ", version: " + alternateTable.RateBook.BookEdition + ", table: " + alternateTable.Definition.TableCode
      _logger.warn("Query for " + originalTableDesc + " with ordered query params: ${queryParamsStr} returned empty result.  Using failover table " + alternateTableDesc)
    }

  }




}
