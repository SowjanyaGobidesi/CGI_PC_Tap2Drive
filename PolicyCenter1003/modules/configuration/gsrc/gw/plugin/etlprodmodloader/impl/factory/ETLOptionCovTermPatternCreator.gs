package gw.plugin.etlprodmodloader.impl.factory

uses gw.api.productmodel.OptionCovTermPattern


/**
 * This class creates and sets the column on a ETLOptionCovTermPatternExt entity
 */
@Export
class ETLOptionCovTermPatternCreator extends ETLCovTermPatternCreatorImpl<OptionCovTermPattern, ETLOptionCovTermPattern> {

  construct(covTermPattern : OptionCovTermPattern) {
    super(covTermPattern)
  }

  /**
   * @return the {@link gw.api.productmodel.OptionCovTermPattern} that is used to create the ETLOptionCovTermPattern
   */
  property get OptionCovTermPattern() : OptionCovTermPattern {
    return this.CovTermPattern
  }

  override function createETLCovTermPattern(etlClausePattern : ETLClausePattern) : ETLOptionCovTermPattern {
    var etlOptionCovTermPattern = new ETLOptionCovTermPattern(etlClausePattern.Bundle)
    etlOptionCovTermPattern = super.setCommonCovTermFields(etlOptionCovTermPattern, etlClausePattern)
    etlOptionCovTermPattern.ValueType = OptionCovTermPattern.ValueType.Code
    
    for(option in OptionCovTermPattern.Options){
      var etlCovTermOpt = new ETLCovTermOpt(etlClausePattern.Bundle)
      etlCovTermOpt.CoverageTermPattern = etlOptionCovTermPattern
      etlOptionCovTermPattern.addToOptions(etlCovTermOpt)
      etlCovTermOpt.OptionCode = option.OptionCode
      etlCovTermOpt.Value = option.Value
      etlCovTermOpt.PatternID = option.PublicID
      etlCovTermOpt.CodeIdentifier = option.CodeIdentifier
      etlCovTermOpt.Currency = option.Currency as String
    }
    return etlOptionCovTermPattern
  }
}
