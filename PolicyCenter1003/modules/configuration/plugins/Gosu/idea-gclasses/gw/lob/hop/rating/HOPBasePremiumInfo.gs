package gw.lob.hop.rating

uses java.math.BigDecimal

@Export
class HOPBasePremiumInfo {
  var keyFactor : BigDecimal as KeyFactor
  var basePremium : BigDecimal as BasePremium
}