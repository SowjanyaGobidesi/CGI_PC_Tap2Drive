package gw.rating.rtm.builders

uses java.math.BigDecimal

@Export
class CoverageRateFactorBuilder extends AbstractFactorRowBuilder<CoverageRateFactor, CoverageRateFactorBuilder> {

  var covCode : String = ""
  var covTermCode : String = ""
  var covTermOptCode : String = ""
  
  function withCovCode(val : String) : CoverageRateFactorBuilder {
    set(CoverageRateFactor.Type.TypeInfo.getProperty("CovCode"), val)
    this.covCode = val
    return this
  }

  function withCovTermCode(val : String) : CoverageRateFactorBuilder {
    set(CoverageRateFactor.Type.TypeInfo.getProperty("CovTermCode"), val)
    this.covTermCode = val
    return this
  }

  function withCovTermOptCode(val : String) : CoverageRateFactorBuilder {
    set(CoverageRateFactor.Type.TypeInfo.getProperty("CovTermOptCode"), val)
    this.covTermOptCode = val
    return this
  }

  function withFactor(val : BigDecimal) : CoverageRateFactorBuilder {
    set(CoverageRateFactor.Type.TypeInfo.getProperty("Factor"), val)
    return this
  }

  function mappedTo(table : RateTableBuilder) : CoverageRateFactorBuilder {
    addPopulator(new CoverageRateFactorPopulator(table))
    return this
  }

  override function equals(that : Object) : boolean {
    if (this === that) {
      return true
    }
    if (that == null) return false
    if (that typeis CoverageRateFactorBuilder) {
      return this.covCode == that.covCode and
           this.covTermCode == that.covTermCode and
           this.covTermOptCode == that.covTermOptCode
    } else {
      return false
    }
  }
  
  override function hashCode() : int {
    return 31 * this.covCode.hashCode() +
           31 * this.covTermCode.hashCode() +
           31 * this.covTermOptCode.hashCode()
  }
}
