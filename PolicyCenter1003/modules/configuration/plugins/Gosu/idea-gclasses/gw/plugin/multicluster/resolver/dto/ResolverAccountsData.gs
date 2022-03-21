package gw.plugin.multicluster.resolver.dto

uses gw.api.system.PLConfigParameters
uses gw.integration.document.production.json.JSONSerializable

@Export
class ResolverAccountsData extends ResolverAuditableData {
  public var accounts : List<ResolverAccountData>
  public var clusterId : String

  construct() {
    accounts = {}
    clusterId = PLConfigParameters.ShardId.Value
  }

  static function from(entities : Collection<Account>) : ResolverAccountsData {
    return new ResolverAccountsData() {
      :accounts = entities.map(\account -> ResolverAccountData.from(account))
    }
  }
}