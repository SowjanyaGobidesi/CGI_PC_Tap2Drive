package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class AnnualAggregateRITreatyBuilder extends NonProportionalRIAgreementBuilder<AnnualAggregateRITreaty, AnnualAggregateRITreatyBuilder> {

  construct() {
    super()
    withMinDepositPremium(9000bd)
    withDepositPaymentSchedule(DepPmntScheduleType.TC_QUARTERLYINADVANCE)
    withComments("Built by AnnualAggregateRITreatyBuilder")
    withCoverageGroup(TC_PROPERTY)
  }

  final function withAttachmentBasis(value : AttachmentBasisType) : AnnualAggregateRITreatyBuilder{
    set(AnnualAggregateRITreaty.Type.TypeInfo.getProperty("AttachmentBasis"), value)
    return this
  }

  //treaty fields
  final function withMinDepositPremium(number : BigDecimal) : AnnualAggregateRITreatyBuilder {
    setMonetaryAmountPropertyAmount(AnnualAggregateRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withMinDepositPremium(number : MonetaryAmount) : AnnualAggregateRITreatyBuilder {
    set(AnnualAggregateRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withDepositPaymentSchedule(value : DepPmntScheduleType) : AnnualAggregateRITreatyBuilder {
    set(AnnualAggregateRITreaty.Type.TypeInfo.getProperty("DepositPaymentSchedule"), value)
    return this
  }

}
