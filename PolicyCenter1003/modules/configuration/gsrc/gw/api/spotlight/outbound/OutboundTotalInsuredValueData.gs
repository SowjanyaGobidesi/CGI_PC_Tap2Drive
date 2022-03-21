package gw.api.spotlight.outbound

uses gw.pl.currency.MonetaryAmount
uses gw.riskassessment.JacksonEnabledSerializable

uses java.math.BigDecimal

/**
 * OutboundTotalInsuredValueData is the Pogo that corresponds to the Policy Center Total Insured Value data that will be converted into
 * json and sent over to the Spotlight.
 * This Pogo is the child of OutboundReinsuranceRiskData.
 */
@Export
class OutboundTotalInsuredValueData implements JacksonEnabledSerializable {

  public var amount : BigDecimal
  public var currencyCode : String //This needs to be ISO 4217 compliant

  construct() {}

  construct(totalAmount : MonetaryAmount) {
    amount = totalAmount
    currencyCode = totalAmount.Currency.DisplayName
  }

}
