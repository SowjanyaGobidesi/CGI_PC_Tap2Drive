package gw.plugin.multicluster.federateddata.v1

uses gw.plugin.multicluster.federateddata.IFederatedDataPolicySupport

uses FederatedDataClient#*

@Export
class FederatedDataPolicySupport extends FederatedDataSupportBase implements IFederatedDataPolicySupport {

  construct(serviceClient : FederatedDataClient) {
    super(serviceClient)
  }

  override function purgePolicy(policyPublicId : String) {
    ServiceClient.deleteEntity(POLICY_CONTROLLER, policyPublicId)
  }
}