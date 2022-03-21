package gw.account

uses gw.api.database.IQueryBeanResult

/**
 * Used for the NewAccountScreen.pcf to track the state of when the search button is clicked.
 */
@Export
class NewAccountScreenSearchCriteria extends AccountSearchCriteria {

  private var _searchPerformed : boolean as readonly SearchPerformed

  override protected function doSearch() : IQueryBeanResult {
    _searchPerformed = true
    return super.doSearch()
  }

}