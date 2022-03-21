package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class FacNetExcessOfLossRIAgreementBuilder extends NonProportionalRIAgreementBuilder<FacNetExcessOfLossRIAgreement, FacNetExcessOfLossRIAgreementBuilder> {

  construct() {
    super()
    withCededPremium(970)
    withMarkUp(20)
    withNotificationThreshold(9000bd)
    withCountTowardTotalLimit(true)
    withComments("Built by FacNetExcessOfLossRIAgreementBuilder")
    withApplyToGrossRetentionOnly(false)
  }

  final function withApplyToGrossRetentionOnly(value : Boolean) : FacNetExcessOfLossRIAgreementBuilder {
    set(FacNetExcessOfLossRIAgreement.Type.TypeInfo.getProperty("ApplyToGrossRetentionOnly"), value)
    return this
  }

  //facultative fields
  final function withCededPremium(value : MonetaryAmount) : FacNetExcessOfLossRIAgreementBuilder {
    set(FacNetExcessOfLossRIAgreement.Type.TypeInfo.getProperty("CededPremium"), value)
    return this
  }

  final function withCededPremium(value : BigDecimal) : FacNetExcessOfLossRIAgreementBuilder {
    setMonetaryAmountPropertyAmount(FacNetExcessOfLossRIAgreement.Type.TypeInfo.getProperty("CededPremium"), value)
    return this
  }

  final function withMarkUp(value : BigDecimal) : FacNetExcessOfLossRIAgreementBuilder {
    set(FacNetExcessOfLossRIAgreement.Type.TypeInfo.getProperty("MarkUp"), value)
    return this
  }

  //perrisk fields
  final function withNotificationThreshold(number : MonetaryAmount) : FacNetExcessOfLossRIAgreementBuilder {
    set(FacNetExcessOfLossRIAgreement.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withNotificationThreshold(number : BigDecimal) : FacNetExcessOfLossRIAgreementBuilder {
    setMonetaryAmountPropertyAmount(FacNetExcessOfLossRIAgreement.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withCountTowardTotalLimit(value : Boolean) : FacNetExcessOfLossRIAgreementBuilder {
    set(FacNetExcessOfLossRIAgreement.Type.TypeInfo.getProperty("CountTowardTotalLimit"), value)
    return this
  }

}
