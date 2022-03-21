package gw.plugin.rateflow

uses gw.api.database.DBFunction
uses gw.api.database.Query
uses gw.api.system.PCConfigParameters
uses gw.api.system.PLConfigParameters
uses gw.rating.RateBookClusterMessaging
uses gw.rating.flow.domain.util.RateRoutinesJarUpdateHandler

@Export
class RateBookPreloadPluginImpl implements RateBookPreloadPlugin {
  /**
   * Get the list of rate books to preload. Only preload <code<>Active</code> rate books.
   * <p>The returned list consists of un-expired rate books that meet one of the following criteria:
   * <ol>
   *   <li>
   *     For all <code>Active</code> rate books with the same code, the most "recent" one with an effective date of
   *     today or in the past. We use the date when the rate book status was last changed as the measure of
   *     "recent"-ness.
   *   </li>
   *   <li>
   *     All <code>Active</code> rate books with effective date in the future. The assumption is that the effective date
   *     is imminent and the book will be in use shortly.
   *   </li>
   * </ol>
   * No <code>Draft</code> or <code>Stage</code>-d or <code>Approved</code> rate books are ever included in the list.<br>
   *
   * @return list of rate books to preload
   */
  override property get RateBooksToPreload() : Iterable<RateBook> {
    var outerRateBookQuery = Query.make(RateBook).compare(RateBook#Status, Equals, TC_ACTIVE)
        .or(\ restriction -> {
          restriction.compare(RateBook#ExpirationDate.PropertyInfo.Name, Equals, null)
          restriction.compare(RateBook#ExpirationDate.PropertyInfo.Name, GreaterThan, Date.Today)
        })
        .compare(RateBook#EffectiveDate, LessThanOrEquals, Date.Today)
    var innerRateBookQuery = Query.make(RateBook).compare(RateBook#Status, Equals, TC_ACTIVE)
        .or(\restriction -> {
          restriction.compare(RateBook#ExpirationDate.PropertyInfo.Name, Equals, null)
          restriction.compare(RateBook#ExpirationDate.PropertyInfo.Name, GreaterThan, Date.Today)
        })
        .compare(RateBook#EffectiveDate, LessThanOrEquals, Date.Today)
        .compare(RateBook#BookCode, Equals, outerRateBookQuery.getColumnRef(RateBook#BookCode.PropertyInfo.Name))
    // selects the "latest" - based on the last status change date - "version" - of the book...
    var currentActiveRateBooks = outerRateBookQuery
        .subselect(RateBook#LastStatusChangeDate, CompareIn, innerRateBookQuery,
            DBFunction.Max(innerRateBookQuery.getColumnRef(RateBook#LastStatusChangeDate.PropertyInfo.Name)))

    // All un-expired Active rate books with future EffectiveDate-s
    var futureActiveRateBooks = Query.make(RateBook).compare(RateBook#Status, Equals, TC_ACTIVE)
        .or(\restriction -> {
          restriction.compare(RateBook#ExpirationDate.PropertyInfo.Name, Equals, null)
          restriction.compare(RateBook#ExpirationDate.PropertyInfo.Name, GreaterThan, Date.Today)
        })
        .compare(RateBook#EffectiveDate, GreaterThan, Date.Today)

    return currentActiveRateBooks.union(futureActiveRateBooks).select()
  }

  /**
   * Get the list of rate books that should be exported to the rate routines JAR. Only export <cod>Active<code> rate
   * books.
   *
   * @return list of rate books to export to the rate routines JAR
   */
  @SuppressWarnings("unused")
  override property get RateBooksToExportToJAR() : Iterable<RateBook> {
    return RateBooksToPreload
  }

  override function update(event: RateBookEvent) {
    if (not PCConfigParameters.EnableRateRoutinesJar.Value or not PCConfigParameters.RateRoutinesJarFile.Value.HasContent) {
      // Not using the rate routines JAR feature.
      return
    }

    /**
     * We expect the list of rate books to export to the rate routines JAR to change on CREATE, IMPORT, and ACTIVATE.
     * If in your case other rate book events may also cause the list of rate books to export to JAR to change,
     * then you should call RateRoutinesJarUpdateHandler.update() for those events as well.
     * Always update *synchronously* locally to handle routines being used immediately after event, e.g., sample data.
     */
    if (event == CREATE or event == IMPORT or event == ACTIVATE) {
      RateRoutinesJarUpdateHandler.update()  // Synchronous locally
    }

    if (PLConfigParameters.ClusteringEnabled.Value) {
      RateBookClusterMessaging.sendMessage(event)
    }
  }
}