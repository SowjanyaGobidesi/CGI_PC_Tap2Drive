package gw.plugin.contact.ab1000

uses gw.plugin.contact.DuplicateContactResult
uses gw.plugin.contact.DuplicateContactResultContainer
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.types.complex.ABContactAPIFindDuplicatesResultContainer

@Export
class DuplicateContactResultContainerImpl implements DuplicateContactResultContainer {

  private var _results : List<DuplicateContactResult>
  private var _totalResults : int
  
  construct(resultContainer : ABContactAPIFindDuplicatesResultContainer) {
    _totalResults = resultContainer.TotalResults
    
    _results = {}
    for (i in resultContainer.Results.Entry) {
      _results.add(new gw.plugin.contact.ab1000.DuplicateContactResultImpl(i.$TypeInstance))
    }
  }
  
  construct(resultList : List<DuplicateContactResult>, howMany : int) {
    _results = resultList
    _totalResults = howMany
  }

  override property get Results() : List<DuplicateContactResult> {
    return _results
  }

  override property get TotalResults() : int {
    return _totalResults
  }
}
