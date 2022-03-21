package gw.api.web.desktop.data.submission

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.FederatedDataIteratorBackingData

@Export
class SubmissionFederatedData extends FederatedDataIteratorBackingData<SubmissionDTO> {

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<SubmissionDTO> {
    return Plugin.findJobs(UserId, Filter, startIndex, numEntries, sortings, TC_SUBMISSION) as List<SubmissionDTO>
  }

  override protected property get EntryCount() : int {
    return Plugin.getJobCount(UserId, Filter, TC_SUBMISSION)
  }

}