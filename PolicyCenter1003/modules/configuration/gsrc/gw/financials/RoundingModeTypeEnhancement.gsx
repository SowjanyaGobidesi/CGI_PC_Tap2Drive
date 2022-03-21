
package gw.financials

@Export
enhancement RoundingModeTypeEnhancement : typekey.RoundingModeType {

  static function getRoundingModeTypeForRoundingMode(mode : java.math.RoundingMode): RoundingModeType {
    switch (mode) {
      case java.math.RoundingMode.CEILING:     return typekey.RoundingModeType.TC_CEILING
      case java.math.RoundingMode.FLOOR:       return typekey.RoundingModeType.TC_FLOOR
      case java.math.RoundingMode.DOWN:        return typekey.RoundingModeType.TC_DOWN
      case java.math.RoundingMode.UP:          return typekey.RoundingModeType.TC_UP
      case java.math.RoundingMode.HALF_UP:     return typekey.RoundingModeType.TC_HALF_UP
      case java.math.RoundingMode.HALF_DOWN:   return typekey.RoundingModeType.TC_HALF_DOWN
      case java.math.RoundingMode.HALF_EVEN:   return typekey.RoundingModeType.TC_HALF_EVEN
      case java.math.RoundingMode.UNNECESSARY: return typekey.RoundingModeType.TC_UNNECESSARY
      default: return null
    }
  }

}
