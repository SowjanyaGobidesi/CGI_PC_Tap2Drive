package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class FacExcessOfLossRIAgreementBuilder extends NonProportionalRIAgreementBuilder<FacExcessOfLossRIAgreement, FacExcessOfLossRIAgreementBuilder> {

  construct() {
    super()
    withCededPremium(970)
    withMarkUp(20)
    withNotificationThreshold(9000bd)
    withCountTowardTotalLimit(true)
    withComments("Built by FacExcessOfLossRIAgreementBuilder")
  }

  //facultative fields
  final function withCededPremium(value : MonetaryAmount) : FacExcessOfLossRIAgreementBuilder {
    set(FacExcessOfLossRIAgreement.Type.TypeInfo.getProperty("CededPremium"), value)
    return this
  }

  final function withCededPremium(value : BigDecimal) : FacExcessOfLossRIAgreementBuilder {
    setMonetaryAmountPropertyAmount(FacExcessOfLossRIAgreement.Type.TypeInfo.getProperty("CededPremium"), value)
    return this
  }

  final function withMarkUp(value : BigDecimal) : FacExcessOfLossRIAgreementBuilder {
    set(FacExcessOfLossRIAgreement.Type.TypeInfo.getProperty("MarkUp"), value)
    return this
  }

  //perrisk fields
  final function withNotificationThreshold(number : MonetaryAmount) : FacExcessOfLossRIAgreementBuilder {
    set(FacExcessOfLossRIAgreement.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withNotificationThreshold(number : BigDecimal) : FacExcessOfLossRIAgreementBuilder {
    setMonetaryAmountPropertyAmount(FacExcessOfLossRIAgreement.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withCountTowardTotalLimit(value : Boolean) : FacExcessOfLossRIAgreementBuilder {
    set(FacExcessOfLossRIAgreement.Type.TypeInfo.getProperty("CountTowardTotalLimit"), value)
    return this
  }

}
