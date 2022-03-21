package gw.financials

enhancement RoundingModeEnhancement : java.math.RoundingMode {
  property get TypeKey() : RoundingModeType {
    return typekey.RoundingModeType.get(this.toString())
  }
}
