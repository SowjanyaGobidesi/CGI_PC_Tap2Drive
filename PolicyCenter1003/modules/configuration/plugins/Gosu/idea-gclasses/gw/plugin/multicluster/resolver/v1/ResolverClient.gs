package gw.plugin.multicluster.resolver.v1

uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.locale.DisplayKey
uses gw.api.system.PLConfigParameters
uses gw.plugin.multicluster.AuthClientCredentialsEnabledClient
uses gw.plugin.multicluster.MultiClusterResponse
uses gw.plugin.multicluster.resolver.dto.ResolverAccountData
uses gw.plugin.multicluster.resolver.dto.ResolverPolicyPeriodData
uses org.apache.http.message.BasicNameValuePair

@Export
class ResolverClient extends AuthClientCredentialsEnabledClient {
  private static final var ACCOUNT_ENDPOINT = "account"
  private static final var POLICY_ENDPOINT = "policy"
  private static final var NEXT_CLUSTER_ENDPOINT = "nextCluster"

  public static final var _objectMapper : ObjectMapper = new ObjectMapper()

  construct(baseUrl : String, clientId : String, clientSecret : String, scope : String, tokenUri : String) {
    super(baseUrl, clientId, clientSecret, scope, tokenUri)
  }

  function addAccount(data : String) : MultiClusterResponse {
    return createEntity(ACCOUNT_ENDPOINT, data)
  }

  function updateAccount(data : String) : MultiClusterResponse {
    var resolverAccountData = _objectMapper.readValue(data, ResolverAccountData)
    return updateEntity(ACCOUNT_ENDPOINT, resolverAccountData.accountPublicId, data)
  }

  function purgeAccount(accountPublicId : String) : MultiClusterResponse {
    return deleteEntity(ACCOUNT_ENDPOINT, accountPublicId, {new BasicNameValuePair('clusterId', PLConfigParameters.ShardId.Value)})
  }

  function addPolicy(data : String) : MultiClusterResponse {
    return createEntity(POLICY_ENDPOINT, data)
  }

  function updatePolicy(data : String) : MultiClusterResponse {
    return updateEntity(POLICY_ENDPOINT, null, data)
  }

  function purgePolicy(policyPublicId : String) : MultiClusterResponse {
    return deleteEntity(POLICY_ENDPOINT, policyPublicId, {new BasicNameValuePair('clusterId', PLConfigParameters.ShardId.Value)})
  }

  function addPolicyPeriod(data : String) : MultiClusterResponse {
    var resolverPolicyPeriodData = _objectMapper.readValue(data, ResolverPolicyPeriodData)
    return updateEntity(POLICY_ENDPOINT, resolverPolicyPeriodData.policyPublicId,
        resolverPolicyPeriodData.policyNumberData.writeAsJSONString())
  }

  property get ClusterForNewAccount() : MultiClusterResponse {
    var resolverURI = getEntityUriBuilder(NEXT_CLUSTER_ENDPOINT).build()
    return doGet(resolverURI)
  }

  function getClusterForAccount(accountId : String) : MultiClusterResponse {
    var resolverURI = getEntityUriBuilder(ACCOUNT_ENDPOINT, accountId).build()
    return doGet(resolverURI)
  }

  function getClustersForAccounts(accountIds : List<String>) : MultiClusterResponse {
    var resolverURI = getEntityUriBuilder(ACCOUNT_ENDPOINT, "map/" + String.join(",", accountIds)).build()
    return doGet(resolverURI)
  }

  function getClusterForPolicy(policyId : String) : MultiClusterResponse {
    var resolverURI = getEntityUriBuilder(POLICY_ENDPOINT, policyId).build()
    return doGet(resolverURI)
  }

  override protected property get EmptyResponseMessage() : String {
    return DisplayKey.get("Multicluster.Resolver.EmptyResponse")
  }

  override protected property get NoConnectionMessage() : String {
    return DisplayKey.get("Multicluster.Resolver.NoConnection")
  }

  override function getNotOkMessage(code : String, message : String) : String {
    return DisplayKey.get("Multicluster.Resolver.NotOkMessage", code, message)
  }

}
