package gw.api.databuilder.contact
uses gw.api.builder.PolicyContactRoleBuilder

@Export
class PolicyAddlInsuredBuilder extends PolicyContactRoleBuilder<PolicyAddlInsured, PolicyAddlInsuredBuilder> {

  construct() {
    super(PolicyAddlInsured)
  }

  function withPolicyAdditionalInsuredDetail(policyAdditionalInsuredDetailBuilder : PolicyAddlInsuredDetailBuilder) : PolicyAddlInsuredBuilder {
    addAdditiveArrayElement(PolicyAddlInsured.Type.TypeInfo.getProperty("PolicyAdditionalInsuredDetails"), policyAdditionalInsuredDetailBuilder)
    return this
  }

  /**
   * Convenient function
   * .withAdditionalInsuredType(type)
   *    is equivalent to
   * .withPolicyAdditionalInsuredDetail(new PolicyAdditionalInsuredDetailBuilder().withAdditionalInsuredType(type)
   */
  function withAdditionalInsuredType(additionalInsuredType : AdditionalInsuredType) : PolicyAddlInsuredBuilder {
    withPolicyAdditionalInsuredDetail(new PolicyAddlInsuredDetailBuilder().withAdditionalInsuredType(additionalInsuredType))
    return this
  }
}
