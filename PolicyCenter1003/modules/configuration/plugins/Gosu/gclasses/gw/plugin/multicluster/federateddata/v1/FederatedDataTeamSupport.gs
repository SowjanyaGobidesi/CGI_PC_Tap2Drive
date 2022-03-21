package gw.plugin.multicluster.federateddata.v1

uses com.fasterxml.jackson.core.type.TypeReference
uses com.google.common.collect.ImmutableList
uses gw.api.domain.statistics.federated.FederatedTeamSummaryMissingRowsProvider
uses gw.api.domain.statistics.federated.FederatedTeamSummaryRow
uses gw.api.domain.statistics.federated.FederatedTeamSummarySerializationUtil
uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.system.PLConfigParameters
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.JobTypeConversionHelper
uses gw.api.web.desktop.data.activity.ActivityDTO
uses gw.plugin.multicluster.MultiClusterResponse
uses gw.plugin.multicluster.federateddata.FederatedDataConstants
uses gw.plugin.multicluster.federateddata.FederatedDataCustomParams
uses gw.plugin.multicluster.federateddata.FederatedDataPageParams
uses gw.plugin.multicluster.federateddata.IFederatedDataFilter
uses gw.plugin.multicluster.federateddata.IFederatedDataTeamSupport
uses gw.plugin.multicluster.federateddata.JobsCountsDTO
uses gw.plugin.multicluster.federateddata.TeamScreenQueryType
uses typekey.Job

uses java.util.stream.Collectors

uses FederatedDataClient#*

@Export
class FederatedDataTeamSupport extends FederatedDataSupportBase implements IFederatedDataTeamSupport {

  construct(serviceClient : FederatedDataClient) {
    super(serviceClient)
  }

  override function findTeamActivities(userId : String, groupId : String, cutOffDate : Date,
                                       teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter,
                                       startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>) : List<DesktopDataDTO> {
    return ActivityDTO.fromCollection(getMultiClusterResponse(ACTIVITY_CONTROLLER, userId, groupId, cutOffDate, teamScreenQueryType, filter, startIndex, numEntries, sorting).Entity)
  }

  override function getTeamActivitiesCount(userId : String, groupId : String, cutOffDate : Date,
                                           teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter) : int {
    return Integer.valueOf(getMultiClusterCountResponse(ACTIVITY_CONTROLLER, userId, groupId, cutOffDate, teamScreenQueryType, filter).Entity)
  }

  public static function createTeamControllerUrlPostfix(controllerUrlPart : String) : String {
    return controllerUrlPart + TEAM_CONTROLLER_POSTFIX
  }

  override function findTeamJobs(userId : String, groupId : String, cutOffDate : Date,
                                 teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter,
                                 startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>, jobType : Job) : List<DesktopDataDTO> {
    return JobTypeConversionHelper.fromCollection(getMultiClusterResponse(jobType.Code, userId, groupId, cutOffDate,
        teamScreenQueryType, filter, startIndex, numEntries, sorting).Entity, jobType)
  }

  override function findTeamOtherJobs(userId : String, groupId : String, cutOffDate : Date, teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter, startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>) : List<DesktopDataDTO> {
    return JobTypeConversionHelper.fromOtherJob(getMultiClusterResponse(OTHER_POLICY_TRANSACTION_CONTROLLER, userId, groupId, cutOffDate,
        teamScreenQueryType, filter, startIndex, numEntries, sorting).Entity)
  }

  override function getTeamJobCount(userId : String, groupId : String, cutOffDate : Date, teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter, jobType : Job) : int {
    return Integer.valueOf(getMultiClusterCountResponse(jobType.Code, userId, groupId, cutOffDate, teamScreenQueryType, filter).Entity)
  }

  override function getTeamOtherJobCount(userId : String, groupId : String, cutOffDate : Date, teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter) : int {
    return Integer.valueOf(getMultiClusterCountResponse(OTHER_POLICY_TRANSACTION_CONTROLLER, userId, groupId, cutOffDate, teamScreenQueryType, filter).Entity)
  }

  override function getTeamActivitiesCounts(groupId : String, cutOffDate : Date) : JobsCountsDTO {
    return getCounts(groupId, cutOffDate, ACTIVITY_CONTROLLER)
  }

  override function getTeamJobsCounts(groupId : String, jobType : Job, cutOffDate : Date) : JobsCountsDTO {
    return getCounts(groupId, cutOffDate, jobType.Code)
  }

  override function getTeamOtherJobsCounts(groupId : String, cutOffDate : Date) : JobsCountsDTO {
    return getCounts(groupId, cutOffDate, OTHER_POLICY_TRANSACTION_CONTROLLER)
  }

  private function getCounts(groupId : String, cutOffDate : Date, controller : String) : JobsCountsDTO {
    var queryParams = FederatedDataCustomParams.builder()
        .withParam(GROUP_ID, groupId)
        .withParam(CUT_OFF_DATE, FederatedDataConstants.getApiDateTime(cutOffDate))
        .build();

    var result = ServiceClient.getCounts(createTeamControllerUrlPostfix(controller), queryParams);
    return DesktopDTOSerializationHelper.Mapper.readValue(result.Entity, new TypeReference<JobsCountsDTO>() {
    });
  }

  private static function teamQueryParamsFor(groupId : String,
                                             teamScreenQueryType : TeamScreenQueryType,
                                             userId : String = null,
                                             queueId : String = null,
                                             filter : IFederatedDataFilter = null,
                                             cutOffDate : Date = null) : FederatedDataCustomParams {

    return FederatedDataCustomParams.builder()
        .withParam(GROUP_ID, groupId)
        .withParam(TEAM_SCREEN_QUERY_TYPE, teamScreenQueryType)
        .withParam(USER_ID, userId)
        .withParam(QUEUE_ID, queueId)
        .withParam(FILTER_PARAM, filter.getCode())
        .withParam(CUT_OFF_DATE, FederatedDataConstants.getApiDateTime(cutOffDate))
        .build();
  }


  private function getMultiClusterResponse(controller : String, userId : String, groupId : String, cutOffDate : Date,
                                           teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter,
                                           startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>) : MultiClusterResponse {
    var queryParams = teamQueryParamsFor(:userId = userId, :groupId = groupId, :teamScreenQueryType = teamScreenQueryType,
        :cutOffDate = cutOffDate, :filter = filter)

    var pageParams = new FederatedDataPageParams(startIndex, numEntries, sorting)

    return ServiceClient.getEntities(createTeamControllerUrlPostfix(controller), queryParams, pageParams);
  }

  private function getMultiClusterCountResponse(controller : String, userId : String, groupId : String, cutOffDate : Date,
                                                teamScreenQueryType : TeamScreenQueryType, filter : IFederatedDataFilter) : MultiClusterResponse {
    var queryParams = teamQueryParamsFor(:userId = userId, :groupId = groupId, :teamScreenQueryType = teamScreenQueryType,
        :cutOffDate = cutOffDate, :filter = filter)

    return ServiceClient.getCount(createTeamControllerUrlPostfix(controller), queryParams);
  }

  override function sendTeamSummaries(data : String) {
    ServiceClient.updateEntity(TEAM_SUMMARY_CONTROLLER, PLConfigParameters.ShardId.Value, data)
  }

  override function findTeamSummaries(groups : List<Group>, users : List<GroupUser>, teamStatsType : TeamStatsType) : List<FederatedTeamSummaryRow> {
    var groupIds = getPublicIDsForGroups(groups);
    var userIds = extractUserIDs(users)

    var queryParams = summaryQueryParamsFor(groupIds, userIds, teamStatsType)
    var response = ServiceClient.getEntities(TEAM_SUMMARY_CONTROLLER, queryParams)

    var list = FederatedTeamSummarySerializationUtil.deserializeFromString(response.Entity)

    return FederatedTeamSummaryMissingRowsProvider.addMissingRows(list, groups, users)
  }

  private static function summaryQueryParamsFor(groupIds : List<String>, userIds : List<String>, teamStatsType : TeamStatsType) : FederatedDataCustomParams {
    return FederatedDataCustomParams.builder()
        .withParams(GROUP_IDS, groupIds)
        .withParams(USER_IDS, userIds)
        .withParam(TEAM_STATS_TYPE_CODE, teamStatsType.getCode())
        .build();
  }

  private function getPublicIDsForGroups(groups : List<Group>) : List<String> {
    return groups.stream().map(\elt -> elt.PublicID).collect(Collectors.toList<String>())
  }

  private function extractUserIDs(users : List<GroupUser>) : List<String> {
    return users != null ? users.stream().map(\elt -> elt.User.PublicID).collect(Collectors.toList<String>()) : ImmutableList.of<String>()
  }

}