package gw.plugin.multicluster.resolver

uses gw.plugin.multicluster.FederatedDataPurgeSource
uses gw.plugin.multicluster.resolver.dto.ResolverAccountData
uses gw.plugin.multicluster.resolver.dto.ResolverPoliciesData
uses gw.plugin.multicluster.resolver.dto.ResolverPolicyPeriodData

@Export
class ResolverMessageCreationUtil {
  private construct() {
  }

  static function createAccountMessage(messageContext : MessageContext) : Message {
    var account = messageContext.Root as Account
    return messageContext.createMessage(
        ResolverAccountData.from(account).writeAsJSONString())
  }

  static function createPolicyMessage(messageContext : MessageContext) : Message {
    var policy = messageContext.Root as Policy
    return messageContext.createMessage(
        new ResolverPoliciesData() {
          :policies = {
              ResolverPoliciesData.ResolverPolicyData.from(policy)
          }}.writeAsJSONString())
  }

  static function createPolicyPeriodMessage(messageContext : MessageContext) : Message {
    var policyPeriod = messageContext.Root as PolicyPeriod
    return messageContext.createMessage(
        ResolverPolicyPeriodData.from(policyPeriod).writeAsJSONString())
  }

  static function createPurgeMessage(messageContext : MessageContext) {
    // Message having Foreign Key to policy prevents policy purge, due to FK Constraint violation
    if (messageContext.Root typeis Account) {
      var newMessage = messageContext.createMessage(messageContext.Root.PublicID)
      newMessage.Account = null
      newMessage.SenderRefID = FederatedDataPurgeSource.ACCOUNT.Name
    } else if (messageContext.Root typeis Policy) {
      var newMessage = messageContext.createMessage(messageContext.Root.PublicID)
      newMessage.Account = null
      newMessage.Policy = null
      newMessage.SenderRefID = FederatedDataPurgeSource.POLICY.Name
    }
    // Ignoring other roots intentionally.
  }

}