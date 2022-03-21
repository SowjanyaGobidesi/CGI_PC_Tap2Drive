package gw.plugin.multicluster.resolver.dto

uses com.fasterxml.jackson.annotation.JsonIgnore
uses gw.integration.document.production.json.JSONSerializable

@Export
class ResolverPolicyPeriodData extends ResolverAuditableData implements ResolverBaseData {

  @JsonIgnore
  delegate resolverBase represents ResolverBaseData = new ResolverBaseDataImpl()

  public var policyPublicId : String
  public var policyNumberData : ResolverPolicyNumberData

  static function from(policyPeriod : PolicyPeriod) : ResolverPolicyPeriodData {
    return new ResolverPolicyPeriodData() {
      :CreationDate = policyPeriod.CreateTime,
      :policyPublicId = policyPeriod.Policy.PublicID,
      :policyNumberData = new ResolverPolicyNumberData() {:policyNumber = policyPeriod.PolicyNumber}
    }
  }

  static class ResolverPolicyNumberData extends JSONSerializable {
    public var policyNumber : String
  }
}