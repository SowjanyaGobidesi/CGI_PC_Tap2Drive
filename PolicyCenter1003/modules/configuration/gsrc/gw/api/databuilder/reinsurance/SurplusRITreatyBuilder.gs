package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class SurplusRITreatyBuilder extends RIAgreementBuilder<SurplusRITreaty, SurplusRITreatyBuilder> {

  construct() {
    super(SurplusRITreaty)
    withMaxRetention(900000bd)
    withMinDepositPremium(6000bd)
    withDepositPaymentSchedule(DepPmntScheduleType.TC_QUARTERLYINADVANCE)
    withNotificationThreshold(7000bd)
    withCountTowardTotalLimit(true)
    withComments("Built by SurplusRITreatyBuilder")
    withCoverageGroup(TC_PROPERTY)
  }

  final function withMaxRetention(mr : MonetaryAmount) : SurplusRITreatyBuilder {
    set(SurplusRITreaty.Type.TypeInfo.getProperty("MaxRetention"), mr)
    return this
  }

  final function withMaxRetention(mr : BigDecimal) : SurplusRITreatyBuilder {
    setMonetaryAmountPropertyAmount(SurplusRITreaty.Type.TypeInfo.getProperty("MaxRetention"), mr)
    return this
  }

  //treaty fields
  final function withMinDepositPremium(number : MonetaryAmount) : SurplusRITreatyBuilder {
    set(SurplusRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withMinDepositPremium(number : BigDecimal) : SurplusRITreatyBuilder {
    setMonetaryAmountPropertyAmount(SurplusRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withDepositPaymentSchedule(value : DepPmntScheduleType) : SurplusRITreatyBuilder {
    set(SurplusRITreaty.Type.TypeInfo.getProperty("DepositPaymentSchedule"), value)
    return this
  }

  //perrisk fields
  final function withNotificationThreshold(number : MonetaryAmount) : SurplusRITreatyBuilder {
    set(SurplusRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withNotificationThreshold(number : BigDecimal) : SurplusRITreatyBuilder {
    setMonetaryAmountPropertyAmount(SurplusRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withCountTowardTotalLimit(value : Boolean) : SurplusRITreatyBuilder {
    set(SurplusRITreaty.Type.TypeInfo.getProperty("CountTowardTotalLimit"), value)
    return this
  }
}
