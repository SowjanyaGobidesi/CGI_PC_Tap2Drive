package gw.plugin.multicluster.resolver.dto

uses com.fasterxml.jackson.annotation.JsonIgnore
uses gw.api.system.PLConfigParameters
uses gw.integration.document.production.json.JSONSerializable

@Export
class ResolverPoliciesData extends ResolverAuditableData {

  public var policies : List<ResolverPolicyData>
  public var clusterId : String

  construct() {
    policies = {}
    clusterId = PLConfigParameters.ShardId.Value
  }

  static class ResolverPolicyData extends JSONSerializable implements ResolverBaseData {
    @JsonIgnore
    delegate resolverBase represents ResolverBaseData = new ResolverBaseDataImpl()

    public var policyPublicId : String
    public var policyNumbers : List<String>

    construct() {
      policyNumbers = {}
    }

    static function from(policy : Policy) : ResolverPolicyData {
      return new ResolverPolicyData() {
        :policyPublicId = policy.PublicID,
        :CreationDate = policy.CreateTime
      }
    }
  }
}