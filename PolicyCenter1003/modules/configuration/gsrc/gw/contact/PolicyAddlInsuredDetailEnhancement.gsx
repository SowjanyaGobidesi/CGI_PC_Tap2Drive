package gw.contact

enhancement PolicyAddlInsuredDetailEnhancement: PolicyAddlInsuredDetail {

  property get AdditionalInformationType(): AdditionalInformationType {
    return additionalInformationType(this.AdditionalInsuredType)
  }

  function additionalInformationType(type: AdditionalInsuredType): AdditionalInformationType {
    return (type == null ? null : AdditionalInformationType.getTypeKeys(/*includeRetired=*/false).firstWhere(\i -> i.hasCategory(type)))
  }
}