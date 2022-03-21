package gw.webservice.pc.pc1000.policy

uses gw.pl.currency.MonetaryAmount
uses gw.xml.ws.annotation.WsiExportable

uses java.math.BigDecimal

uses typekey.Currency

@Export
@WsiExportable( "http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/policy/PolicyEarnedPremiumInfo" )
final class PolicyEarnedPremiumInfo {
  
  var _line : String as LOB
  var _earnedPremium : BigDecimal as EarnedPremium
  var _premiumCurrency : Currency as PremiumCurrency

  construct() {
  }
  
  private construct(line : String, earned : MonetaryAmount ) {
    _line = line
    _earnedPremium = earned.Amount
    _premiumCurrency = earned.Currency
  }
}
