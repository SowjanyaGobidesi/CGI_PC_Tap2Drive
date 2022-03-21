package gw.rating.rtm.query

uses gw.api.rating.RateQueryResult
uses gw.api.system.PCLoggerCategory
uses gw.rating.rtm.NoSuitableRateBookFoundException

uses java.lang.Comparable
uses java.lang.IllegalArgumentException
uses java.util.ArrayList
uses java.util.Map
uses java.util.LinkedHashSet
uses java.util.List

/**
 * <code>RatingQueryFacade</code> provide the main entry point to query data from rating tables. 
 * The <code>RatingQueryFacade</code> performs two actions:
 * <ul>
 * <li>Query for a rate book based on values in a <code>RateBookQueryFilter</code></li>
 * </ul>
 */
@Export
class RatingQueryFacade {

  var _queryFactory : QueryStrategyFactory
  
  /**
   * Construct a new <code>RatingQueryFacade</code> that will use a defualt <code>QueryStrategyFactory</code>
   */ 
  construct() {
    this(new QueryStrategyFactory())
  }
  
  /**
   * Construct a new <code>RatingQueryFacade</code> that will use the provided <code>QueryStrategyFactory</code>
   * 
   * @param queryFactory: A <code>QueryStrategyFactory</code> instance that will be used to create an instance of 
   *                      <code>AbstractFactorQuery</code>, that in turn is used to query the table for a factor
   */
  construct(queryFactory : QueryStrategyFactory) {
    this._queryFactory = queryFactory
  }

  /**
   * Query for a factor in a <code>RateBook</code> and <code>RateTable</code> based on <code>RateBookQueryFilter</code>
   * and input parameters
   *
   * @param filter contains parameters for finding a <code>RateBook</code>
   * @param tableCode the table code for the target <code>RateTable</code> that contains the requested factors
   * @param inputParams array of ordered inputs used to match a factor in the <code>RateTable</code>, based on the <code>MatchOperation</code>
   * defined on the table
   *
   * @return a <code>RateQueryResult</code> that holds the result factor
   */
  reified function getFactor<Q extends Comparable, R>(filter : RateBookQueryFilter, tableCode : String, inputParams : Comparable[]) :  RateQueryResult<R>  {
    if (PCLoggerCategory.RTM.DebugEnabled) {
      PCLoggerCategory.RTM.debug("Query for: ${filter.toString()} table: ${tableCode} query params: ${inputParams}")
    }
    var rateBook = getRateBookFor(filter)
    if (PCLoggerCategory.RTM.DebugEnabled) {
      PCLoggerCategory.RTM.debug("Rate book found: ${rateBook.BookCode} @ ${rateBook.BookEdition}")
    }
    var table = getRateTable(rateBook, tableCode)
    var result = _queryFactory.getFactorQuery(table).convertParamsAndQuery<R>(table, inputParams, null)
    if (PCLoggerCategory.RTM.DebugEnabled) {
      PCLoggerCategory.RTM.debug("Factor found: ${result.Factor}")
    }
    return result
  }

  /**
   * Query for factors in a <code>RateBook</code> and <code>RateTable</code> based on <code>RateBookQueryFilter</code>
   * and input parameters
   *
   * @param filter contains parameters for finding a <code>RateBook</code>
   * @param tableCode the table code for the target <code>RateTable</code> that contains the requested factors
   * @param inputParams list of ordered inputs used to match a factor in the <code>RateTable</code>, based on the <code>MatchOperation</code>
   * defined on the table
   *
   * @return a map of factors as name, value pairs.
   */
  function getAllFactors(filter : RateBookQueryFilter, tableCode : String, inputParams : Comparable[]) : Map<String, Object> {
    if (PCLoggerCategory.RTM.DebugEnabled) {
      PCLoggerCategory.RTM.debug("Query for: ${filter.toString()} table: ${tableCode} query params: ${inputParams}")
    }
    var rateBook = getRateBookFor(filter)
    if (PCLoggerCategory.RTM.DebugEnabled) {
      PCLoggerCategory.RTM.debug("Rate book found: ${rateBook.BookCode} @ ${rateBook.BookEdition}")
    }
    var table = getRateTable(rateBook, tableCode)
    var result = _queryFactory.getFactorQuery(table).convertAndQueryMultipleFactors(table, inputParams)
    if (PCLoggerCategory.RTM.DebugEnabled) {
      PCLoggerCategory.RTM.debug("Factors found: ${result.Values}")
    }

    return result
  }

  /**
   * Find a <code>RateBook> based on parameters in the filter
   * 
   * @param filter contains the filter values - dates, policy line, status, and optionaly UW company, jurisdiction and offerings
   * that define the query for the <code>RateBook</code>
   * 
   * @return the <code>RateBook</code> with the latest activation date that is the best matche for the  filter
   * @throws NoSuitableRateBookFoundException if there were no matches.
   */
  protected function getRateBookFor(filter : RateBookQueryFilter) : RateBook {
    return matchLatestActiveRateBook(filter, matchers(filter))
  }
  
  /**
   * Worker function used to implement getRateBookFor(filter).   Uses a filter and a list of
   * matchers. Normally, the list of matchers is obtained from RatingQueryFacade.matchers(filter).
   * @param filter A RateBookQueryFilter containing the desired search properties
   * @param matchers A list of matchers which are used to filter the books. 
   * @return All books which satisfy the filter and matchers
   * @throws NoSuitableRateBookFoundException if there were no matches.
   */
  static function matchRateBook(filter : RateBookQueryFilter, matchers : List<RateBookMatcher>) : List<RateBook> {
    var candidates = RateBookMatcher.getBooksFor(filter)
    for (m in matchers) {
      var matches = m.filter(candidates)
      if (!matches.Empty) {
        return matches
      }
    }
    throw new NoSuitableRateBookFoundException("No rate book found for filter ${filter}")
  }

  static function matchLatestActiveRateBook(filter : RateBookQueryFilter, matchers : List<RateBookMatcher>) : RateBook {
    var matchedRateBook = latestActiveBook(matchRateBook(filter, matchers))

    //The matchedRateBook needs to be the first rateBook in the RateBookHierarchy.  We want this because we want to
    // find the rateTables and rateRoutines in this rateBook first.  Then if we don't find the them then go through
    // the rest of the rateBooks in rateBookHierarchy
    var rateBookHierarchyList = new ArrayList<RateBook>()
    rateBookHierarchyList.add(matchedRateBook)
    var matchingFilterForHierarchy = filter
    if (matchedRateBook.BookGroup != null) {
      matchingFilterForHierarchy = filter.createMatchingFilter(matchedRateBook)
    } else {
      matchingFilterForHierarchy.BookGroup = null //reset book group on the filter
    }
    matchingFilterForHierarchy.MatchGroup = true //for hierarchy always match by group
    rateBookHierarchyList.addAll(setRateBookHierarchy(matchingFilterForHierarchy))

    matchedRateBook.RateBookHierarchy = rateBookHierarchyList
    return matchedRateBook
  }

  private static function setRateBookHierarchy(hierarchyFilter : RateBookQueryFilter) : List<RateBook> {
    var matchers = matchersForHierarchy(hierarchyFilter)
    var rateBooks = RateBookMatcher.getBooksFor(hierarchyFilter)

    var rateBookHierarchy = new ArrayList<RateBook>()
    for (matcher in matchers) {
      var matchingRateBooks = matcher.filter(rateBooks)
      if (!matchingRateBooks.Empty) {
          rateBookHierarchy.add(latestActiveBook(matchingRateBooks))
      }
    }
    rateBookHierarchy.each( \ rateBook -> {rateBook.RateBookHierarchy = rateBookHierarchy})

    return rateBookHierarchy
  }

  /**
   * This method is used for finding which rate book to use and is unrelated to the ratebook hierarchy
   * create a list of <code>RateBookMatcher</code>s based on values from the 
   * <codeRateBookQueryFilter</code> for:
   * <ul>
   * <li>Offering</li>
   * <li>UW Company</li>
   * <li>Jurisdiction</li>
   * <li>PolicyLine</li>
   * </ul>
   * 
   * This function defines the priority order in which <code>RateBook</codes will be matched if
   * no exact match is found. Currently the priority order is as defined by the list above
   * 
   * @param filter a <code>RateBookQueryFilter</code> that holds the query parameters
   * 
   * @return list of <code>RateBookMatcher</code>s that will be used to match a <code>RateBook</code>
   */
  static function matchers(filter : RateBookQueryFilter) : List<RateBookMatcher> {
    var matchers = new LinkedHashSet<RateBookMatcher>()

    matchers.add(new RateBookMatcher(filter.PolicyLine, filter.Jurisdiction, filter.UWCompany, filter.Offering))
    matchers.add(new RateBookMatcher(filter.PolicyLine, filter.Jurisdiction, filter.UWCompany, null))
    matchers.add(new RateBookMatcher(filter.PolicyLine, filter.Jurisdiction, null, filter.Offering))
    matchers.add(new RateBookMatcher(filter.PolicyLine, filter.Jurisdiction, null, null))

    matchers.add(new RateBookMatcher(filter.PolicyLine, null, filter.UWCompany, filter.Offering))
    matchers.add(new RateBookMatcher(filter.PolicyLine, null, filter.UWCompany, null))
    matchers.add(new RateBookMatcher(filter.PolicyLine, null, null, filter.Offering))
    matchers.add(new RateBookMatcher(filter.PolicyLine, null, null, null))

    matchers.add(new RateBookMatcher(null, filter.Jurisdiction, filter.UWCompany, filter.Offering))
    matchers.add(new RateBookMatcher(null, filter.Jurisdiction, filter.UWCompany, null))
    matchers.add(new RateBookMatcher(null, filter.Jurisdiction, null, filter.Offering))
    matchers.add(new RateBookMatcher(null, filter.Jurisdiction, null, null))

    matchers.add(new RateBookMatcher(null, null, filter.UWCompany, filter.Offering))
    matchers.add(new RateBookMatcher(null, null, filter.UWCompany, null))
    matchers.add(new RateBookMatcher(null, null, null, filter.Offering))
    matchers.add(new RateBookMatcher(null, null, null, null))

    return matchers.toList()
  }

  /*
 The order of matching for rateBook Hierarchy for getting rateTables and rateRoutines is as follows (we didn't include all combinations OOTB, but customers can add or delete matchers):

     LOB Jurisdiction UWCompany Offering
     LOB Jurisdiction UWCompany <>
     LOB Jurisdiction <> <>
     LOB <> UWCompany <>
     LOB <> <> <>
     <> <> <> <>
 */
  static function matchersForHierarchy(filter : RateBookQueryFilter) : List<RateBookMatcher> {
    var matchers = new LinkedHashSet<RateBookMatcher>()

    matchers.add(new RateBookMatcher(filter.PolicyLine, filter.Jurisdiction, filter.UWCompany, filter.Offering))
    matchers.add(new RateBookMatcher(filter.PolicyLine, filter.Jurisdiction, filter.UWCompany, null))
    matchers.add(new RateBookMatcher(filter.PolicyLine, filter.Jurisdiction, null, null))
    matchers.add(new RateBookMatcher(filter.PolicyLine, null, filter.UWCompany, null))
    matchers.add(new RateBookMatcher(filter.PolicyLine, null, null, null))
    matchers.add(new RateBookMatcher(null, null, null, null))

    return matchers.toList()
  }

  /**
   * @return member of the given list of books which has the most recent LastStatusChangeDate.
   * @throws IllegalArgumentException if list of books is empty.
   */
  static function latestActiveBook(books : List<RateBook>) : RateBook {
    if (books.Empty) throw new IllegalArgumentException("No rate books found")
    // should be able to do
    // return books.maxBy(\ book -> book.LastStatusChangeDate)
    // but it breaks tests.
    books.sortBy(\ book -> book.LastStatusChangeDate)
    return books.last()
  }

  private function getRateTable(rateBook : RateBook, tableCode : String) : RateTable {
    var table = rateBook.getTable(tableCode)
    if (table == null) {
      throw new IllegalArgumentException("Rate book " + rateBook.DisplayName + " does not contain table " + tableCode)
    }
    return table
  }
}
