package gw.lob.hop.rating

uses gw.rating.flow.RatingFunctionSource

uses java.math.BigDecimal

@Export
class HOPRatingFunctions extends RatingFunctionSource {

  // This should stay protected, not public.
  override protected function availableForLine(policyLineCode: String): boolean {
    return policyLineCode == "HOPLine"
  }

  function getPrimaryCoverageLimit(line: entity.HOPLine): BigDecimal {
    var covPart = line.HOPCoverageParts.single()
    var dwelling = line.HOPDwellings.single()
    if (covPart.CoveragePartType == CoveragePartType.TC_HOPDWELLING) {
      if (dwelling.HOPCovAExists) {
        return dwelling.HOPCovA.HOPCovALimitTerm.Value
      } else {
        throw new IllegalArgumentException("Expected Coverage A on branch")
      }
    } else {
      if (dwelling.HOPCovCExists) {
        return dwelling.HOPCovC.HOPCovCDirectLimitTerm.Value
      } else {
        throw new IllegalArgumentException("Expected Coverage C on branch")
      }
    }
  }

  function getTerritoryCode(dwelling: entity.HOPDwelling): String {
    return dwelling.Location.getTerritoryCodesForLine(dwelling.PolicyLine.Pattern).first()?.Code
  }

  function getCovCDefaultLimitPercentage(line: entity.HOPLine): BigDecimal {
    var dwelling = line.HOPDwellings.single()
    if (dwelling.HOPCovCExists) {
      var offering = dwelling.HOPCovC.OwningCoverable.PolicyLine.Branch.Offering
      var defaultValue = dwelling.HOPCovC.HOPCovCLimitTerm.Pattern.getDefaultValue(offering)
      if (defaultValue != null) {
        return dwelling.HOPCovC.HOPCovCLimitTerm.Pattern.getCovTermOpt(defaultValue).Value.divide(100)
      } else {
        throw new IllegalArgumentException("No default option found in product model for coverage C")
      }
    }
    throw new IllegalArgumentException("Expected Coverage C on branch")
  }

  function getCovDDefaultLimitPercentage(line: entity.HOPLine): BigDecimal {
    var dwelling = line.HOPDwellings.single()
    if (dwelling.HOPCovDExists) {
      var offering = dwelling.HOPCovD.OwningCoverable.PolicyLine.Branch.Offering
      var defaultValue = dwelling.HOPCovD.HOPCovDLimitTerm.Pattern.getDefaultValue(offering)
      if (defaultValue != null) {
        return dwelling.HOPCovD.HOPCovDLimitTerm.Pattern.getCovTermOpt(defaultValue).Value.divide(100)
      } else {
        throw new IllegalArgumentException("No default option found in product model for coverage D")
      }
    }
    throw new IllegalArgumentException("Expected Coverage D on branch")
  }

  function getAllPerilsDeductValue(dwelling: entity.HOPDwelling): BigDecimal {
    if (dwelling.HOPSectionIDeductiblesExists) {
      if (dwelling.HOPSectionIDeductibles.HasHOPSectionIDeductiblesPerilsTerm) {
        return dwelling.HOPSectionIDeductibles.HOPSectionIDeductiblesPerilsTerm.Value
      } else if (dwelling.HOPSectionIDeductibles.HasHOPSectionIDeductiblesOtherPerilsTerm) {
        return dwelling.HOPSectionIDeductibles.HOPSectionIDeductiblesOtherPerilsTerm.Value
      } else {
        throw new IllegalArgumentException("Expected All Perils or All Other Perils to be available on Section I Deductibles coverage on branch")
      }
    } else {
      throw new IllegalArgumentException("Expected Section I Deductibles coverage on branch")
    }
  }
}