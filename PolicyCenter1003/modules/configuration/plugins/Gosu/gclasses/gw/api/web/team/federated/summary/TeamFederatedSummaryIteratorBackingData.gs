package gw.api.web.team.federated.summary

uses gw.api.domain.statistics.federated.FederatedTeamSummaryRow
uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.team.federated.TeamFederatedIteratorBackingData

@Export
class TeamFederatedSummaryIteratorBackingData extends TeamFederatedIteratorBackingData<FederatedTeamSummaryRow> {
  var _teamStatsTypeCode : TeamStatsType
  var _groups : List<Group>
  var _users : List<GroupUser>

  construct(teamStatsTypeCode : TeamStatsType, groups : List<Group>, users : List<GroupUser> = null) {
    _users = users
    _groups = groups
    _teamStatsTypeCode = teamStatsTypeCode
  }

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<FederatedTeamSummaryRow> {
    return Plugin.findTeamSummaries(_groups, _users, _teamStatsTypeCode)
  }

  protected override property get EntryCount() : int {
    return 0
  }

  protected override property get CutoffDate() : Date {
    return null
  }
}