package gw.api.databuilder.contact

uses gw.api.databuilder.DataBuilder

/**
 * @author gclarke
 */
@Export
abstract class AdditionalInterestDetailBuilder<T extends AddlInterestDetail, B extends AdditionalInterestDetailBuilder<T, B>> extends DataBuilder<T, B> {
  
  construct(type : Type) {
    super(type)
  }

  function withAdditionalInterestType(type : AdditionalInterestType) : B {
    set(AddlInterestDetail.Type.TypeInfo.getProperty("AdditionalInterestType"), type)
    return this as B
  }

  function withContractNumber(contractNumber : String) : B {
    set(AddlInterestDetail.Type.TypeInfo.getProperty("ContractNumber"), contractNumber)
    return this as B
  }
  
  function asCertificateRequired(certRequired : boolean) : B {
    set(AddlInterestDetail.Type.TypeInfo.getProperty("CertRequired"), certRequired)
    return this as B
  }
}
