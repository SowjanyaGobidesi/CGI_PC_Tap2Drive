package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class PerEventRITreatyBuilder extends NonProportionalRIAgreementBuilder<PerEventRITreaty, PerEventRITreatyBuilder> {

  construct() {
    super()
    withMinDepositPremium(700bd)
    withDepositPaymentSchedule(DepPmntScheduleType.TC_QUARTERLYINADVANCE)
    withComments("Built by PerEventRITreatyBuilder")
    withCoverageGroup(TC_PROPERTY)
  }

  final function withAttachmentBasis(value : AttachmentBasisType) : PerEventRITreatyBuilder{
    set(PerEventRITreaty.Type.TypeInfo.getProperty("AttachmentBasis"), value)
    return this
  }

  //treaty fields
  final function withMinDepositPremium(number : MonetaryAmount) : PerEventRITreatyBuilder {
    set(PerEventRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withMinDepositPremium(number : BigDecimal) : PerEventRITreatyBuilder {
    setMonetaryAmountPropertyAmount(PerEventRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withDepositPaymentSchedule(value : DepPmntScheduleType) : PerEventRITreatyBuilder {
    set(PerEventRITreaty.Type.TypeInfo.getProperty("DepositPaymentSchedule"), value)
    return this
  }

}
