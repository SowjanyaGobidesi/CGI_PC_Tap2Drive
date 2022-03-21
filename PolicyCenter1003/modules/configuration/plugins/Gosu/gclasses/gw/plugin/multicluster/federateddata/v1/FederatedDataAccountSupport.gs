package gw.plugin.multicluster.federateddata.v1

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.JobTypeConversionHelper
uses gw.api.web.desktop.data.account.AccountDTO
uses gw.plugin.multicluster.federateddata.FederatedDataPageParams
uses gw.plugin.multicluster.federateddata.IFederatedDataAccountSupport
uses gw.plugin.multicluster.federateddata.IFederatedDataFilter

uses FederatedDataClient#*

@Export
class FederatedDataAccountSupport extends FederatedDataSupportBase implements IFederatedDataAccountSupport {

  construct(serviceClient : FederatedDataClient) {
    super(serviceClient)
  }

  override function createAccount(data : String) {
    ServiceClient.createEntity(ACCOUNT_CONTROLLER, data)
  }

  override function updateAccount(accountId : String, data : String) {
    ServiceClient.updateEntity(ACCOUNT_CONTROLLER, accountId, data)
  }

  override function deleteAccount(accountId : String) {
    ServiceClient.deleteEntity(ACCOUNT_CONTROLLER, accountId)
  }

  override function findAccounts(userId : String, filter : IFederatedDataFilter, startIndex : int, numEntries : int,
                                 sorting : List<IteratorBackingDataSorting>) : List<DesktopDataDTO> {
    var queryParams = queryParamsFor(:userId = userId, :filter = filter)
    var pageParams = new FederatedDataPageParams(startIndex, numEntries, sorting)

    var response = ServiceClient.getEntities(ACCOUNT_CONTROLLER, queryParams, pageParams)

    return AccountDTO.fromCollection(response.Entity)
  }

  override function getAccountCount(userId : String, filter : IFederatedDataFilter) : int {
    return getCountForUserFromController(ACCOUNT_CONTROLLER, userId, filter);
  }

}