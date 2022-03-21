package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class QuotaShareRITreatyBuilder extends RIAgreementBuilder<QuotaShareRITreaty, QuotaShareRITreatyBuilder> {

  construct() {
    super(QuotaShareRITreaty)
    withMinDepositPremium(1000bd)
    withDepositPaymentSchedule(DepPmntScheduleType.TC_FULLYINADVANCE)
    withNotificationThreshold(8000bd)
    withCountTowardTotalLimit(true)
    withComments("Built by QuotaShareRITreatyBuilder")
    withCoverageGroup(TC_PROPERTY)
  }

//treaty fields
  final function withMinDepositPremium(number : MonetaryAmount) : QuotaShareRITreatyBuilder {
    set(QuotaShareRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withMinDepositPremium(number : BigDecimal) : QuotaShareRITreatyBuilder {
    setMonetaryAmountPropertyAmount(QuotaShareRITreaty.Type.TypeInfo.getProperty("MinDepositPremium"), number)
    return this
  }

  final function withDepositPaymentSchedule(value : DepPmntScheduleType) : QuotaShareRITreatyBuilder {
    set(QuotaShareRITreaty.Type.TypeInfo.getProperty("DepositPaymentSchedule"), value)
    return this
  }

  //perrisk fields
  final function withNotificationThreshold(number : MonetaryAmount) : QuotaShareRITreatyBuilder {
    set(QuotaShareRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withNotificationThreshold(number : BigDecimal) : QuotaShareRITreatyBuilder {
    setMonetaryAmountPropertyAmount(QuotaShareRITreaty.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withCountTowardTotalLimit(value : Boolean) : QuotaShareRITreatyBuilder {
    set(QuotaShareRITreaty.Type.TypeInfo.getProperty("CountTowardTotalLimit"), value)
    return this
  }

}
