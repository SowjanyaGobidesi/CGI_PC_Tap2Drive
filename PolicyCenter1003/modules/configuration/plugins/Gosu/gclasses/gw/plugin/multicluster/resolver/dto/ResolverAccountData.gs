package gw.plugin.multicluster.resolver.dto

uses com.fasterxml.jackson.annotation.JsonIgnore
uses gw.api.system.PLConfigParameters

@Export
class ResolverAccountData extends ResolverAuditableData implements ResolverBaseData {

  @JsonIgnore
  delegate resolverBase represents ResolverBaseData = new ResolverBaseDataImpl()

  public var accountPublicId : String
  public var accountNumber : String
  public var clusterId : String

  construct() {
    clusterId = PLConfigParameters.ShardId.Value
  }

  static function from(account: Account): ResolverAccountData {
    return new ResolverAccountData() {
      :clusterId = PLConfigParameters.ShardId.Value,
      :accountPublicId = account.PublicID,
      :accountNumber = account.AccountNumber,
      :CreationDate = account.CreateTime
    }
  }
}