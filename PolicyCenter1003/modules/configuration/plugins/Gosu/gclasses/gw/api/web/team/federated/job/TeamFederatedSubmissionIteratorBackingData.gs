package gw.api.web.team.federated.job

uses gw.api.domain.statistics.StatsWindowUtil
uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.submission.SubmissionDTO
uses gw.api.web.team.federated.TeamFederatedIteratorBackingData
uses gw.plugin.multicluster.federateddata.TeamScreenQueryType

@Export
class TeamFederatedSubmissionIteratorBackingData extends TeamFederatedIteratorBackingData<SubmissionDTO> {

  construct(teamScreenQueryType : TeamScreenQueryType, group : Group = null, user : User = null) {
    _user = user
    _group = group
    _teamScreenQueryType = teamScreenQueryType;
  }

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<SubmissionDTO> {
    return Plugin.findTeamJobs(_user.PublicID, _group.PublicID, CutoffDate, _teamScreenQueryType, Filter, startIndex, numEntries, sortings, TC_SUBMISSION) as List<SubmissionDTO>
  }

  protected override property get EntryCount() : int {
    return Plugin.getTeamJobCount(_user.PublicID, _group.PublicID, CutoffDate, _teamScreenQueryType, Filter, TC_SUBMISSION)
  }

  protected property get CutoffDate() : Date {
    return StatsWindowUtil.getCutoffDateForSubmissions(Date.Now);
  }
}