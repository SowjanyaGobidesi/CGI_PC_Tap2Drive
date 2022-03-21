package gw.plugin.etlprodmodloader.impl.factory

uses gw.api.productmodel.ModifierPattern
uses gw.pl.persistence.core.Bundle

/**
 * Provides static methods to create ETLModifierPattern entities from associated Product Model Modifier patterns.
 */
@Export
abstract class ETLModifierPatternCreator {
  static function createETLModifierPattern(modifierPattern: ModifierPattern, bundle : Bundle): ETLModifierPattern {
    final var etlModifierPattern = new ETLModifierPattern(bundle)

    // Map fields from Modifier Pattern
    etlModifierPattern.PatternID = modifierPattern.PublicID
    etlModifierPattern.CodeIdentifier = modifierPattern.CodeIdentifier
    etlModifierPattern.Name = modifierPattern.Name
    etlModifierPattern.ModifierDataType = modifierPattern.ModifierDataType.Code
    final var scheduleRate = modifierPattern.ScheduleRate
    if(scheduleRate != null) {
      etlModifierPattern.ScheduleRate = scheduleRate.toString()
    }
    if(modifierPattern.ModifierDataType == TC_TYPEKEY) {
      etlModifierPattern.Typelist = modifierPattern.TypeList
    }

    // Map all RateFactorPatterns
    final var rateFactorPatterns = modifierPattern.RateFactorPatterns
    for(rateFactorPattern in rateFactorPatterns) {
      final var etlRateFactorPattern = new ETLRateFactorPattern(bundle)
      etlModifierPattern.addToRateFactorPatterns(etlRateFactorPattern)
      etlRateFactorPattern.PatternID = rateFactorPattern.PublicID
      etlRateFactorPattern.CodeIdentifier = rateFactorPattern.CodeIdentifier
      etlRateFactorPattern.RateFactorType = rateFactorPattern.RateFactorType.Code
      etlRateFactorPattern.RefCode = rateFactorPattern.RefCode
    }
    return etlModifierPattern
  }
}
