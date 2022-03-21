package gw.plugin.multicluster.federateddata

uses gw.api.iterator.IteratorBackingDataSorting
uses org.apache.http.client.utils.URIBuilder

@Export
class FederatedDataPageParams {

  private static final var SORTING_PARAM = "sorting"
  private static final var START_INDEX_PARAM = "startIndex"
  private static final var NUM_ENTRIES_PARAM = "numEntries"

  var _startIndex : int
  var _numEntries : int
  var _sorting : List<IteratorBackingDataSorting>

  construct(startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>) {
    this._startIndex = startIndex
    this._numEntries = numEntries
    this._sorting = sorting
  }

  public function addParamsToUri(uriBuilder : URIBuilder) : URIBuilder {
    uriBuilder.addParameter(START_INDEX_PARAM, Integer.toString(_startIndex))
    uriBuilder.addParameter(NUM_ENTRIES_PARAM, Integer.toString(_numEntries))
    if (_sorting != null && !_sorting.Empty) {
      uriBuilder.addParameter(SORTING_PARAM, _sorting.map(\sortings ->
          sortings.SortFields.map(\sortField -> sortings.SortDirection != IteratorBackingDataSorting.Direction.DESC ?
              sortField + ":" + sortings.SortDirection.toString() : sortField).join(",")).join(","))
    }
    return uriBuilder
  }
}