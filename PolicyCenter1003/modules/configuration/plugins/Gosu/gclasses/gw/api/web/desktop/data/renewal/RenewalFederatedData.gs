package gw.api.web.desktop.data.renewal

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.FederatedDataIteratorBackingData

@Export
class RenewalFederatedData extends FederatedDataIteratorBackingData<RenewalDTO> {

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<RenewalDTO> {
    return Plugin.findJobs(UserId, Filter, startIndex, numEntries, sortings, TC_RENEWAL) as List<RenewalDTO>
  }

  override protected property get EntryCount() : int {
    return Plugin.getJobCount(UserId, Filter, TC_RENEWAL)
  }

}