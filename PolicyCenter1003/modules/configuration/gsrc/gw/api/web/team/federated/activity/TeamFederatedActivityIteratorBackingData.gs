package gw.api.web.team.federated.activity

uses gw.api.domain.statistics.StatsWindowUtil
uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.activity.ActivityDTO
uses gw.api.web.team.federated.TeamFederatedIteratorBackingData
uses gw.plugin.multicluster.federateddata.TeamScreenQueryType

@Export
class TeamFederatedActivityIteratorBackingData extends TeamFederatedIteratorBackingData<ActivityDTO> {

  construct(teamScreenQueryType : TeamScreenQueryType, group : Group = null, user : User = null) {
    _user = user
    _group = group
    _teamScreenQueryType = teamScreenQueryType;
  }

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<ActivityDTO> {
    return Plugin.findTeamActivities(_user.PublicID, _group.PublicID, CutoffDate, _teamScreenQueryType, Filter, startIndex, numEntries, sortings) as List<ActivityDTO>
  }

  protected override property get EntryCount() : int {
    return Plugin.getTeamActivitiesCount(_user.PublicID, _group.PublicID, CutoffDate, _teamScreenQueryType, Filter)
  }

  protected property get CutoffDate() : Date {
    return StatsWindowUtil.getCutoffDateForActivities(Date.Now);
  }
}