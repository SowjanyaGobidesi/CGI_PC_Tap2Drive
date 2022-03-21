package gw.api.databuilder.reinsurance
uses gw.api.databuilder.DataBuilder

/**
 * This builder is used to create the mapping entity ProgramTreaty. It is used in RIProgramBuilder
 * and should not be used alone or export to customer.
 */
@Export
class ProgramTreatyBuilder extends DataBuilder<ProgramTreaty, ProgramTreatyBuilder>{

  construct() {
    super(ProgramTreaty)
  }

  final function withAgreement(agreementBuilder : RIAgreementBuilder) : ProgramTreatyBuilder{
    set(ProgramTreaty.Type.TypeInfo.getProperty("Treaty"), agreementBuilder)
    return this
  }
  
  final function withAgreement(treaty : RIAgreement) : ProgramTreatyBuilder{
    set(ProgramTreaty.Type.TypeInfo.getProperty("Treaty"), treaty)
    return this
  }
}
