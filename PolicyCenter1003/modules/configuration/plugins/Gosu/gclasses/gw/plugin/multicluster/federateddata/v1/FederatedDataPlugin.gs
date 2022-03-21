package gw.plugin.multicluster.federateddata.v1

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.JobTypeConversionHelper
uses gw.api.web.desktop.data.account.AccountDTO
uses gw.api.web.desktop.data.common.SummaryCountsDTO
uses gw.api.web.desktop.data.userroleassignment.UserRoleAssignmentDTO
uses gw.plugin.multicluster.federateddata.FederatedDataCustomParams
uses gw.plugin.multicluster.federateddata.FederatedDataPageParams
uses gw.plugin.multicluster.federateddata.IFederatedDataAccountSupport
uses gw.plugin.multicluster.federateddata.IFederatedDataActivitySupport
uses gw.plugin.multicluster.federateddata.IFederatedDataFilter
uses gw.plugin.multicluster.federateddata.IFederatedDataJobSupport
uses gw.plugin.multicluster.federateddata.IFederatedDataPlugin
uses gw.plugin.multicluster.federateddata.IFederatedDataPolicySupport
uses gw.plugin.multicluster.federateddata.IFederatedDataTeamSupport
uses gw.plugin.multicluster.federateddata.IFederatedDataUserRoleAssignmentSupport
uses gw.plugin.multicluster.federateddata.UserRoleAssignmentType

uses FederatedDataClient#*

@Export
public class FederatedDataPlugin implements IFederatedDataPlugin {

  public static final var MAIN_DEST_ID : int = 322
  public static final var CONTACT_DEST_ID : int = 323

  internal var _serviceClient : FederatedDataClient

  delegate _accountSupport represents IFederatedDataAccountSupport
  delegate _activitySupport represents IFederatedDataActivitySupport
  delegate _jobSupport represents IFederatedDataJobSupport
  delegate _policySupport represents IFederatedDataPolicySupport
  delegate _userRoleAssignmentSupport represents IFederatedDataUserRoleAssignmentSupport
  delegate _teamSupport represents IFederatedDataTeamSupport

  override property set Parameters(params : Map<Object, Object>) {
    _serviceClient = _serviceClient ?: new FederatedDataClient(
        params.get(PARAM_HOST) as String,
        params.get(PARAM_CLIENT_ID) as String,
        params.get(PARAM_CLIENT_SECRET) as String,
        params.get(PARAM_SCOPE) as String,
        params.get(PARAM_TOKEN_URI) as String)
    _accountSupport = new FederatedDataAccountSupport(_serviceClient)
    _activitySupport = new FederatedDataActivitySupport(_serviceClient)
    _jobSupport = new FederatedDataJobSupport(_serviceClient)
    _policySupport = new FederatedDataPolicySupport(_serviceClient)
    _userRoleAssignmentSupport = new FederatedDataUserRoleAssignmentSupport(_serviceClient)
    _teamSupport = new FederatedDataTeamSupport(_serviceClient)
  }

  override property get Enabled() : boolean {
    return true
  }

  override function updateContact(contactPublicId : String, data : String) {
    _serviceClient.updateEntity(CONTACT_CONTROLLER, contactPublicId, data)
  }

  override function deleteContact(contactPublicId : String) {
    _serviceClient.deleteEntity(CONTACT_CONTROLLER, contactPublicId)
  }

  override function getUserSummaryCounts(userId : String) : DesktopDataDTO {
    var response = _serviceClient.getStats(userId, Date.Today)
    return SummaryCountsDTO.from(response.Entity)
  }

  override function getUserPreferences(userId : String) : String {
    var response = _serviceClient.getEntities("${PREFERENCES_CONTROLLER}/${userId}")
    return response.Entity
  }

  override function updateUserPreferences(userId : String, userPreferences : String) {
    _serviceClient.createEntity("${PREFERENCES_CONTROLLER}/${userId}", userPreferences)
  }

  override function updateGroupUser(groupUserData : String) {
    _serviceClient.updateEntity("${GROUPUSER_CONTROLLER}", null, groupUserData)
  }

}