package gw.plugin.multicluster.resolver.v1

uses gw.plugin.multicluster.AuthClientCredentialsEnabledClientBase
uses gw.plugin.multicluster.resolver.ClusterInfoDTO
uses gw.plugin.multicluster.resolver.IResolverServicePlugin

uses AuthClientCredentialsEnabledClientBase#*

@Export
public class ResolverServicePlugin implements IResolverServicePlugin {

  internal var _resolverClient : ResolverClient

  override property set Parameters(params : Map<Object, Object>) {
    _resolverClient = new ResolverClient(
        params.get(PARAM_HOST) as String,
        params.get(PARAM_CLIENT_ID) as String,
        params.get(PARAM_CLIENT_SECRET) as String,
        params.get(PARAM_SCOPE) as String,
        params.get(PARAM_TOKEN_URI) as String)
  }

  override function addPolicy(data : String) {
    _resolverClient.addPolicy(data)
  }

  override function updatePolicy(data : String) {
    _resolverClient.updatePolicy(data)
  }

  override function purgePolicy(policyPublicId : String) {
    _resolverClient.purgePolicy(policyPublicId)
  }

  override function addAccount(data : String) {
    _resolverClient.addAccount(data)
  }

  override function updateAccount(data : String) {
    _resolverClient.updateAccount(data)
  }

  override function purgeAccount(accountPublicId : String) {
    _resolverClient.purgeAccount(accountPublicId)
  }

  override function addPolicyPeriod(data : String) {
    _resolverClient.addPolicyPeriod(data)
  }

  override function getClusterForAccount(accountId : String) : String {
    var resolverResponse = _resolverClient.getClusterForAccount(accountId)
    return resolverResponse.Entity
  }

  override function getClusterForPolicy(policyId : String) : String {
    var resolverResponse = _resolverClient.getClusterForPolicy(policyId)
    return resolverResponse.Entity
  }

  override function getClustersForAccounts(accountIds : List<String>) : Map<String, ClusterInfoDTO> {
    var resolverResponse = _resolverClient.getClustersForAccounts(accountIds)
    return ClusterInfoDTO.from(resolverResponse.Entity)
  }

  override property get ClusterIdForNewAccount() : String {
    var resolverResponse = _resolverClient.ClusterForNewAccount
    return resolverResponse.Entity
  }
}