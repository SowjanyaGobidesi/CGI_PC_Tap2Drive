package gw.plugin.multicluster.federateddata.v1

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.JobTypeConversionHelper
uses gw.plugin.multicluster.federateddata.FederatedDataPageParams
uses gw.plugin.multicluster.federateddata.IFederatedDataFilter
uses gw.plugin.multicluster.federateddata.IFederatedDataJobSupport

uses FederatedDataClient#*

@Export
class FederatedDataJobSupport extends FederatedDataSupportBase implements IFederatedDataJobSupport {

  construct(serviceClient : FederatedDataClient) {
    super(serviceClient)
  }

  override function createJob(data : String, jobType : typekey.Job) {
    ServiceClient.createEntity(jobType.Code, data)
  }

  override function updateJob(submissionId : String, data : String, jobType : typekey.Job) {
    ServiceClient.updateEntity(jobType.Code, submissionId, data)
  }

  override function deleteJob(jobId : String, jobType : typekey.Job) {
    ServiceClient.deleteEntity(jobType.Code, jobId)
  }

  override function findJobs(userId : String, filter : IFederatedDataFilter, startIndex : int, numEntries : int,
                             sorting : List<IteratorBackingDataSorting>, jobType : typekey.Job) : List<DesktopDataDTO> {
    var queryParams = queryParamsFor(:userId = userId, :filter = filter)
    var pageParams = new FederatedDataPageParams(startIndex, numEntries, sorting)

    var response = ServiceClient.getEntities(jobType.Code, queryParams, pageParams)

    return JobTypeConversionHelper.fromCollection(response.Entity, jobType)
  }

  override function findOtherJobs(userId : String, filter : IFederatedDataFilter, startIndex : int, numEntries : int,
                                  sorting : List<IteratorBackingDataSorting>) : List<DesktopDataDTO> {
    var queryParams = queryParamsFor(:userId = userId, :filter = filter)
    var pageParams = new FederatedDataPageParams(startIndex, numEntries, sorting)

    var response = ServiceClient.getEntities(OTHER_POLICY_TRANSACTION_CONTROLLER, queryParams, pageParams)

    return JobTypeConversionHelper.fromOtherJob(response.Entity)
  }

  override function getJobCount(userId : String, filter : IFederatedDataFilter, jobType : typekey.Job) : int {
    return getCountForUserFromController(jobType.Code, userId, filter);
  }

  override function getOtherJobCount(userId : String, filter : IFederatedDataFilter) : int {
    return getCountForUserFromController(OTHER_POLICY_TRANSACTION_CONTROLLER, userId, filter);
  }

}