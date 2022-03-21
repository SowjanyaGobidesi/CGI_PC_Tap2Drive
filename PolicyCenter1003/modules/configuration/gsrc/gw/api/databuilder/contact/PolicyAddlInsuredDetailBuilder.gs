package gw.api.databuilder.contact
uses gw.api.databuilder.DataBuilder

@Export
class PolicyAddlInsuredDetailBuilder extends DataBuilder<PolicyAddlInsuredDetail, PolicyAddlInsuredDetailBuilder> {

  construct()
  {
    super(PolicyAddlInsuredDetail)
  }
  
  function withAdditionalInsuredType(addnlInsuredType : AdditionalInsuredType) : PolicyAddlInsuredDetailBuilder {
    set(PolicyAddlInsuredDetail.Type.TypeInfo.getProperty("AdditionalInsuredType"), addnlInsuredType)
    return this
  }

  function withAdditionalInformation(addnlInformation : String) : PolicyAddlInsuredDetailBuilder {
    set(PolicyAddlInsuredDetail.Type.TypeInfo.getProperty("AdditionalInformation"), addnlInformation)
    return this
  }
}