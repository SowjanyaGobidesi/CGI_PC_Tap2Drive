package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class ExcessOfLossRITreatyBuilder extends NonProportionalRIAgreementBuilder<ExcessOfLossRITreaty, ExcessOfLossRITreatyBuilder> {

  construct() {
    super()
    withMinDepositPremium(3400bd)
    withDepositPaymentSchedule(DepPmntScheduleType.TC_QUARTERLYINADVANCE)
    withNotificationThreshold(9000bd)
    withCountTowardTotalLimit(true)
    withComments("Built by ExcessOfLossRITreatyBuilder")
    withCoverageGroup(TC_PROPERTY)
  }

  final function withAttachmentBasis(value : AttachmentBasisType) : ExcessOfLossRITreatyBuilder{
    set(ExcessOfLossRITreaty.Type.TypeInfo.getProperty("AttachmentBasis"), value)
    return this
  }

  //treaty fields
  final function withMinDepositPremium(number : BigDecimal) : ExcessOfLossRITreatyBuilder {
    setMonetaryAmountPropertyAmount(ExcessOfLossRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withMinDepositPremium(number : MonetaryAmount) : ExcessOfLossRITreatyBuilder {
    set(ExcessOfLossRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withDepositPaymentSchedule(value : DepPmntScheduleType) : ExcessOfLossRITreatyBuilder {
    set(ExcessOfLossRITreaty.Type.TypeInfo.getProperty("DepositPaymentSchedule"), value)
    return this
  }

  //perrisk fields
  final function withNotificationThreshold(number : MonetaryAmount) : ExcessOfLossRITreatyBuilder {
    set(ExcessOfLossRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withNotificationThreshold(number : BigDecimal) : ExcessOfLossRITreatyBuilder {
    setMonetaryAmountPropertyAmount(ExcessOfLossRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withCountTowardTotalLimit(value : Boolean) : ExcessOfLossRITreatyBuilder {
    set(ExcessOfLossRITreaty.Type.TypeInfo.getProperty("CountTowardTotalLimit"), value)
    return this
  }

}
