package gw.api.web.team.federated.job

uses gw.api.domain.statistics.StatsWindowUtil
uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.otherworkorders.OtherWorkOrdersDTO
uses gw.api.web.team.federated.TeamFederatedIteratorBackingData
uses gw.plugin.multicluster.federateddata.TeamScreenQueryType

@Export
class TeamFederatedOtherWorkOrdersIteratorBackingData extends TeamFederatedIteratorBackingData<OtherWorkOrdersDTO> {

  construct(teamScreenQueryType : TeamScreenQueryType, group : Group = null, user : User = null) {
    _user = user
    _group = group
    _teamScreenQueryType = teamScreenQueryType;
  }

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<OtherWorkOrdersDTO> {
    return Plugin.findTeamOtherJobs(_user.PublicID, _group.PublicID, CutoffDate, _teamScreenQueryType, Filter, startIndex, numEntries, sortings) as List<OtherWorkOrdersDTO>
  }

  protected override property get EntryCount() : int {
    return Plugin.getTeamOtherJobCount(_user.PublicID, _group.PublicID, CutoffDate, _teamScreenQueryType, Filter)
  }

  protected property get CutoffDate() : Date {
    return StatsWindowUtil.getCutoffDateForOtherWorkOrders(Date.Now);
  }
}