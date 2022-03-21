package gw.plugin.multicluster.federateddata.v1

uses gw.plugin.multicluster.federateddata.FederatedDataCustomParams
uses gw.plugin.multicluster.federateddata.IFederatedDataFilter
uses FederatedDataClient#*

@Export
abstract class FederatedDataSupportBase {

  final var _serviceClient : FederatedDataClient as readonly ServiceClient

  construct(serviceClient : FederatedDataClient) {
    _serviceClient = serviceClient
  }

  protected function queryParamsFor(userId : String = null,
                                  queueId : List<String> = null,
                                  filter : IFederatedDataFilter = null) : FederatedDataCustomParams {

    return FederatedDataCustomParams.builder()
        .withParam(USER_ID, userId)
        .withParams(QUEUE_ID, queueId)
        .withParam(FILTER_PARAM, filter.getCode())
        .build();
  }

  protected function getCountForUserFromController(controllerName : String, userId : String, filter : IFederatedDataFilter) : int {
    var queryParams = queryParamsFor(:userId = userId, :filter = filter)
    return sendCountRequest(controllerName, queryParams);
  }

  protected function sendCountRequest(controllerName : String, queryParams : FederatedDataCustomParams) : int {
    var response = _serviceClient.getCount(controllerName, queryParams)
    return Integer.valueOf(response.Entity)
  }

}