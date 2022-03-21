package gw.plugin.multicluster.federateddata.v1

uses gw.api.locale.DisplayKey
uses gw.plugin.multicluster.AuthClientCredentialsEnabledClient
uses gw.plugin.multicluster.MultiClusterResponse
uses gw.plugin.multicluster.federateddata.FederatedDataConstants
uses gw.plugin.multicluster.federateddata.FederatedDataCustomParams
uses gw.plugin.multicluster.federateddata.FederatedDataPageParams

uses FederatedDataConstants#getApiDateTime(Date)

@Export
class FederatedDataClient extends AuthClientCredentialsEnabledClient {
  public static final var ACTIVITY_CONTROLLER : String = "activity"
  public static final var ACCOUNT_CONTROLLER : String = "account"
  public static final var CONTACT_CONTROLLER : String = "contact"
  public static final var GROUPUSER_CONTROLLER : String = "groupuser"
  public static final var POLICY_CONTROLLER : String = "policy"
  public static final var STATS_CONTROLLER : String = "stats"
  public static final var USER_ROLE_ASSIGNMENT_CONTROLLER : String = "user-role-assignment"
  public static final var TEAM_SUMMARY_CONTROLLER : String = "teamSummaries"
  public static final var TEAM_STATS_TYPE_CODE : String = "teamStatsTypeCode"
  public static final var OTHER_POLICY_TRANSACTION_CONTROLLER : String = "otherPolicyTransaction"
  public static final var PREFERENCES_CONTROLLER : String = "preferences"
  public static final var JOB_ROLE_CONTROLLER : String = "jobs/role/%s/users"
  public static final var COUNT_ENDPOINT : String = "count"
  public static final var COUNTS_ENDPOINT : String = "counts"
  public static final var FILTER_PARAM : String = "filter"
  public static final var QUEUE_ID : String = "queueId"
  public static final var USER_ID : String = "userId"
  public static final var USER_IDS : String = "userIds"
  public static final var GROUP_ID : String = "groupId"
  public static final var GROUP_IDS : String = "groupIds"
  public static final var CUT_OFF_DATE : String = "cutOffDate"
  public static final var OWNER_PUBLIC_ID : String = "ownerPublicId"
  public static final var TEAM_CONTROLLER_POSTFIX : String = "/team"
  public static final var TEAM_SCREEN_QUERY_TYPE : String = "teamScreenQueryType"

  construct(baseUrl : String, clientId : String, clientSecret : String, scope : String, tokenUri : String) {
    super(baseUrl, clientId, clientSecret, scope, tokenUri)
  }

  function getEntities(controller : String, params : FederatedDataCustomParams = null, pageParams : FederatedDataPageParams = null) : MultiClusterResponse {
    var uriBuilder = getEntityUriBuilder(controller)
    if (params != null) {
      params.addParamsToUri(uriBuilder)
    }
    if (pageParams != null) {
      pageParams.addParamsToUri(uriBuilder)
    }
    var uri = uriBuilder.build()
    return doGet(uri)
  }

  function getCount(controller : String, params : FederatedDataCustomParams) : MultiClusterResponse {
    var uriBuilder = getEntityUriBuilder(controller, COUNT_ENDPOINT)
    params.addParamsToUri(uriBuilder)
    var uri = uriBuilder.build()
    return doGet(uri)
  }

  function getCounts(controller : String, params : FederatedDataCustomParams) : MultiClusterResponse {
    var uriBuilder = getEntityUriBuilder(controller, COUNTS_ENDPOINT)
    params.addParamsToUri(uriBuilder)
    var uri = uriBuilder.build()
    return doGet(uri)
  }

  function getStats(userId : String, currentDate : Date) : MultiClusterResponse {
    var uri = getEntityUriBuilder(STATS_CONTROLLER, userId)
        .addParameter("currentDate", getApiDateTime(currentDate))
        .build()
    return doGet(uri)
  }

  override protected property get EmptyResponseMessage() : String {
    return DisplayKey.get("Multicluster.FederatedData.EmptyResponse")
  }

  override protected property get NoConnectionMessage() : String {
    return DisplayKey.get("Multicluster.FederatedData.NoConnection")
  }

  override function getNotOkMessage(code : String, message : String) : String {
    return DisplayKey.get("Multicluster.FederatedData.NotOkMessage", code, message)
  }

}