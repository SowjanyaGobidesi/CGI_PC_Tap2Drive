package gw.plugin.multicluster.federateddata

uses gw.api.domain.statistics.StatsWindowUtil
uses gw.api.iterator.IteratorBackingData
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.team.federated.activity.TeamFederatedActivityIteratorBackingData
uses gw.api.web.team.federated.job.TeamFederatedOtherWorkOrdersIteratorBackingData
uses gw.api.web.team.federated.job.TeamFederatedRenewalIteratorBackingData
uses gw.api.web.team.federated.job.TeamFederatedSubmissionIteratorBackingData
uses gw.api.web.team.federated.summary.TeamFederatedSummaryIteratorBackingData
uses gw.plugin.Plugins
uses typekey.Job

@Export
class TeamScreenFederatedDataImpl implements TeamScreenFederatedData {

  override function getUserActivities(user : User, group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedActivityIteratorBackingData(TeamScreenQueryType.USER, group, user)
  }

  override function getGroupActivities(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedActivityIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.GROUP)
  }

  override function getQueueActivities(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedActivityIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.QUEUE)
  }

  override function getMisassignedActivities(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedActivityIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.MISASSIGNED)
  }

  override property get RootActivities() : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedActivityIteratorBackingData(:teamScreenQueryType = TeamScreenQueryType.ROOT)
  }

  override function getUserSubmissions(user : User, group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedSubmissionIteratorBackingData(TeamScreenQueryType.USER, group, user)
  }

  override function getGroupSubmissions(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedSubmissionIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.GROUP)
  }

  override function getQueueSubmissions(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedSubmissionIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.QUEUE)
  }

  override function getMisassignedSubmissions(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedSubmissionIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.MISASSIGNED)
  }

  override property get RootSubmissions() : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedSubmissionIteratorBackingData(:teamScreenQueryType = TeamScreenQueryType.ROOT)
  }

  override function getUserRenewals(user : User, group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedRenewalIteratorBackingData(TeamScreenQueryType.USER, group, user)
  }

  override function getGroupRenewals(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedRenewalIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.GROUP)
  }

  override function getQueueRenewals(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedRenewalIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.QUEUE)
  }

  override function getMisassignedRenewals(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedRenewalIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.MISASSIGNED)
  }

  override property get RootRenewals() : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedRenewalIteratorBackingData(:teamScreenQueryType = TeamScreenQueryType.ROOT)
  }

  override function getUserOtherWorkOrders(user : User, group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedOtherWorkOrdersIteratorBackingData(TeamScreenQueryType.USER, group, user)
  }

  override function getGroupOtherWorkOrders(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedOtherWorkOrdersIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.GROUP)
  }

  override function getQueueOtherWorkOrders(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedOtherWorkOrdersIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.QUEUE)
  }

  override function getMisassignedOtherWorkOrders(group : Group) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedOtherWorkOrdersIteratorBackingData(:group = group, :teamScreenQueryType = TeamScreenQueryType.MISASSIGNED)
  }

  override property get RootOtherWorkOrders() : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedOtherWorkOrdersIteratorBackingData(:teamScreenQueryType = TeamScreenQueryType.ROOT)
  }

  override function getSummaries(users : List<GroupUser>, groups : List<Group>, teamStatsType : TeamStatsType) : IteratorBackingData<DesktopDataDTO, IFederatedDataFilter> {
    return new TeamFederatedSummaryIteratorBackingData(teamStatsType, groups, users)
  }

  override function getTeamActivitiesCounts(groupId : String) : JobsCountsDTO {
    return Plugins.get(IFederatedDataPlugin).getTeamActivitiesCounts(groupId, StatsWindowUtil.getCutoffDateForSubmissions(Date.Now))
  }

  override function getTeamJobsCounts(groupId : String, jobType : Job) : JobsCountsDTO {
    return Plugins.get(IFederatedDataPlugin).getTeamJobsCounts(groupId, jobType, StatsWindowUtil.getCutoffDateForSubmissions(Date.Now))
  }

  override function getTeamOtherJobsCounts(groupId : String) : JobsCountsDTO {
    return Plugins.get(IFederatedDataPlugin).getTeamOtherJobsCounts(groupId, StatsWindowUtil.getCutoffDateForSubmissions(Date.Now))
  }
}