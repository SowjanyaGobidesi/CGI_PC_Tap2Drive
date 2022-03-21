package gw.api.databuilder.reinsurance

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class FacProportionalRIAgreementBuilder extends RIAgreementBuilder<FacProportionalRIAgreement, FacProportionalRIAgreementBuilder> {

  construct() {
    super(FacProportionalRIAgreement)
    withCededPremium(null as MonetaryAmount)
    withMarkUp(null)
    withNotificationThreshold(9000bd)
    withCountTowardTotalLimit(true)
    withAmountOfCoverage(30000000bd)
    withComments("Built by FacProportionalRIAgreementBuilder")
  }

  final function withAmountOfCoverage(value : MonetaryAmount) : FacProportionalRIAgreementBuilder {
    removePopulator(RIAgreement.Type.TypeInfo.getProperty("CededShare"))
    set(RIAgreement.Type.TypeInfo.getProperty("AmountOfCoverage"), value)
    return this
  }

  final function withAmountOfCoverage(value : BigDecimal) : FacProportionalRIAgreementBuilder {
    removePopulator(RIAgreement.Type.TypeInfo.getProperty("CededShare"))
    setMonetaryAmountPropertyAmount(RIAgreement.Type.TypeInfo.getProperty("AmountOfCoverage"), value)
    return this
  }

  override function withCededShare(value : BigDecimal) : FacProportionalRIAgreementBuilder{
    removePopulator(RIAgreement.Type.TypeInfo.getProperty("AmountOfCoverage"))
    set(RIAgreement.Type.TypeInfo.getProperty("CededShare"), value)
    return this
  }

  //facultative fields
  final function withCededPremium(value : MonetaryAmount) : FacProportionalRIAgreementBuilder {
    set(FacProportionalRIAgreement.Type.TypeInfo.getProperty("CededPremium"), value)
    return this
  }

  final function withCededPremium(value : BigDecimal) : FacProportionalRIAgreementBuilder {
    setMonetaryAmountPropertyAmount(FacProportionalRIAgreement.Type.TypeInfo.getProperty("CededPremium"), value)
    return this
  }

  final function withMarkUp(value : BigDecimal) : FacProportionalRIAgreementBuilder {
    set(FacProportionalRIAgreement.Type.TypeInfo.getProperty("MarkUp"), value)
    return this
  }

  //perrisk fields
  final function withNotificationThreshold(number : MonetaryAmount) : FacProportionalRIAgreementBuilder {
    set(FacProportionalRIAgreement.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withNotificationThreshold(number : BigDecimal) : FacProportionalRIAgreementBuilder {
    setMonetaryAmountPropertyAmount(FacProportionalRIAgreement.Type.TypeInfo.getProperty("NotificationThreshold"), number)
    return this
  }

  final function withCountTowardTotalLimit(value : Boolean) : FacProportionalRIAgreementBuilder {
    set(FacProportionalRIAgreement.Type.TypeInfo.getProperty("CountTowardTotalLimit"), value)
    return this
  }

}
