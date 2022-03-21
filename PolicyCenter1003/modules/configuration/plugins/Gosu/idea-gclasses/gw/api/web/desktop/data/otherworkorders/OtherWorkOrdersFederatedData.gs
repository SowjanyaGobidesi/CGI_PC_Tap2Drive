package gw.api.web.desktop.data.otherworkorders

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.FederatedDataIteratorBackingData

@Export
class OtherWorkOrdersFederatedData extends FederatedDataIteratorBackingData<OtherWorkOrdersDTO> {

  private var _jobType : typekey.Job = null

  construct() {
  }

  construct(jobType : typekey.Job) {
    this._jobType = _jobType
  }

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<OtherWorkOrdersDTO> {
    return _jobType == null ?
        Plugin.findOtherJobs(UserId, Filter, startIndex, numEntries, sortings) as List<OtherWorkOrdersDTO> :
        Plugin.findJobs(UserId, Filter, startIndex, numEntries, sortings, _jobType) as List<OtherWorkOrdersDTO>
  }

  override protected property get EntryCount() : int {
    return _jobType == null ?
        Plugin.getOtherJobCount(UserId, Filter) :
        Plugin.getJobCount(UserId, Filter, _jobType)
  }

}