package gw.plugin.contact.ab900
uses gw.plugin.contact.DuplicateContactResult
uses gw.plugin.contact.DuplicateContactResultContainer
uses wsi.remote.gw.webservice.ab.ab900.abcontactapi.types.complex.ABContactAPIFindDuplicatesResultContainer
uses java.util.List

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class DuplicateContactResultContainerImpl implements DuplicateContactResultContainer {

  private var _results : List<DuplicateContactResult>
  private var _totalResults : int
  
  construct(resultContainer : ABContactAPIFindDuplicatesResultContainer) {
    _totalResults = resultContainer.TotalResults
    
    _results = {}
    for (i in resultContainer.Results.Entry) {
      _results.add(new DuplicateContactResultImpl(i.$TypeInstance))
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
