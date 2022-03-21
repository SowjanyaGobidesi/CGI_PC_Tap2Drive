package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class NetExcessOfLossRITreatyBuilder extends NonProportionalRIAgreementBuilder<NetExcessOfLossRITreaty, NetExcessOfLossRITreatyBuilder> {

  construct() {
    super()
    withMinDepositPremium(1200bd)
    withDepositPaymentSchedule(DepPmntScheduleType.TC_FULLYINADVANCE)
    withNotificationThreshold(2000bd)
    withCountTowardTotalLimit(true)
    withComments("Built by NetExcessOfLossRITreatyBuilder")
    withCoverageGroup(TC_PROPERTY)
    withApplyToGrossRetentionOnly(false)
  }

  final function withApplyToGrossRetentionOnly(value : Boolean) : NetExcessOfLossRITreatyBuilder {
    set(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("ApplyToGrossRetentionOnly"), value)
    return this
  }

  final function withAttachmentBasis(value : AttachmentBasisType) : NetExcessOfLossRITreatyBuilder {
    set(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("AttachmentBasis"), value)
    return this
  }

  //treaty fields
  final function withMinDepositPremium(number : MonetaryAmount) : NetExcessOfLossRITreatyBuilder {
    set(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withMinDepositPremium(number : BigDecimal) : NetExcessOfLossRITreatyBuilder {
    setMonetaryAmountPropertyAmount(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withDepositPaymentSchedule(value : DepPmntScheduleType) : NetExcessOfLossRITreatyBuilder {
    set(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("DepositPaymentSchedule"), value)
    return this
  }

  //perrisk fields
  final function withNotificationThreshold(number : MonetaryAmount) : NetExcessOfLossRITreatyBuilder {
    set(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withNotificationThreshold(number : BigDecimal) : NetExcessOfLossRITreatyBuilder {
    setMonetaryAmountPropertyAmount(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this  }

  final function withCountTowardTotalLimit(value : Boolean) : NetExcessOfLossRITreatyBuilder {
    set(NetExcessOfLossRITreaty.Type.TypeInfo.getProperty("CountTowardTotalLimit"), value)
    return this
  }

}
