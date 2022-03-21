package gw.api.databuilder.contact
uses gw.api.builder.PolicyContactRoleBuilder

@Export
class PolicyAddlInterestBuilder extends PolicyContactRoleBuilder<PolicyAddlInterest, PolicyAddlInterestBuilder> {

  construct() {
    super(PolicyAddlInterest)
  }
  
  function withAdditionalInterestDetail(addInterestDetailBuilder : AdditionalInterestDetailBuilder) : PolicyAddlInterestBuilder {
    addArrayElement(PolicyAddlInterest.Type.TypeInfo.getProperty("AdditionalInterestDetails"), addInterestDetailBuilder)
    return this
  }
  
}
