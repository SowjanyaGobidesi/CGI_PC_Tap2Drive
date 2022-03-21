package gw.lob.cp

uses gw.api.domain.covterm.CovTerm
uses gw.api.domain.covterm.DirectCovTerm
uses gw.api.financials.CurrencyAmount
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.CoveragePattern
uses entity.CPBuildingCov

enhancement CPBlanketEnhancement : entity.CPBlanket {
  
  property get CovPatternNames() : List<String> {
    var covPatterns = this.CPLine.Pattern.CoverageCategories.flatMap(\ category -> 
                                                  category.CoveragePatterns.where(\ cp -> 
                                                      cp.BlanketGroupType != null and cp.BlanketGroupType == this.BlanketGroupType))
    return covPatterns.map(\ cov -> cov.DisplayName).sort()
  }
  
  property get BuildingCovLimitSum() : double {
    var sum : double = 0
    this.BuildingCoverages.each(\ cov -> {sum = sum + this.getBuildingCovLimit(cov)})
    return sum
  }
  
  property get MatchingBuildingCoverages() : CPBuildingCov[] {
    var cov = this.BuildingCoveragesByBlanketType
    return cov != null ? cov.where(\ c -> c.CPBlanket.CPBlanketNum == this.CPBlanketNum) : null       
  }

  property get BuildingCoveragesByBlanketType() : CPBuildingCov[] {
    var coverages : CPBuildingCov[]
    if (this.BlanketType == TC_SINGLELOC and this.CPLocation != null) {
      /*
       * There is a single location which is CPLocation, so first find this, then get its building coverages
       */
      var location = this.CPLine.CPLocations.singleWhere(\c -> c.Location.AccountLocation == this.CPLocation.Location.AccountLocation)
      coverages = location.Buildings*.Coverages
    } else {
      /*
       * There are multiple locations so query for them all.
       */
      //noinspection MultipleAsteriskDotOperators
      coverages = this.CPLine.CPLocations*.Buildings*.Coverages
      if (this.BlanketType == TC_SINGLECOV) {
        /*
         * Filter out the instantiated coverages for just the building
         */
        coverages = coverages.where(\cov -> cov.Pattern.Name == this.CPBuildingCovName)
      }
    }
    return coverages.where(\cov -> (cov.Pattern as CoveragePattern).BlanketGroupType == this.BlanketGroupType)
  }

  function getBuildingCovLimitDisplay(cov : CPBuildingCov) : CurrencyAmount {
    // Earlier code checked for a covterm with a DisplayName of "Limit" which is not i18n.
    // Also, not all CP limits are named "Limit" so listing out the ones that are to preserve the
    // earlier behavior.
    var limitNamedLimit = {DirectCPBldgCovLimitType,
        DirectCPBldgStockCovLimitType,
        DirectCPBPPCovLimitType,
        DirectCPBlanketLimitType,
        DirectCPBldgExtraExpenseCovLimitType
    }

    return cov typeis CPBldgBusIncomeCov ? new CurrencyAmount(cov.CPBuilding.BusIncomeLimitSum, cov.Currency) :
           new CurrencyAmount((cov.CovTerms.firstWhere(\term -> isCovTermOfType(term, limitNamedLimit)) as DirectCovTerm).Value, cov.Currency)
  }

  function getBuildingCovLimit(cov : CPBuildingCov) : double {
    return getBuildingCovLimitDisplay(cov).Amount.doubleValue()
  }

  function getBuildingCovDeductDisplay(cov : CPBuildingCov) : String {
    // Earlier code checked for a covterm with a DisplayName of "Deductible" which is not i18n.
    // Also, not all CP deductibles are named "Deductible" so listing out the ones that are to preserve the
    // earlier behavior.
    var deductiblesNamedDeductible = {OptionCPBldgCovDeductibleType,
        OptionCPBldgStockCovDeductibleType,
        OptionCPBPPCovDeductibleType,
        OptionCPBlanketDeductibleType
    }
    var deductible = cov.CovTerms.firstWhere(\ term -> isCovTermOfType(term, deductiblesNamedDeductible))
    return deductible.DisplayValue
  }
  
  function getBuildingCovCoinsuranceDisplay(cov : CPBuildingCov) : String {
    // Earlier code checked for a covterm with a DisplayName of "Coinsurance" which is not i18n.
    // Also, not all CP coinsurances are named "Coinsurance" so listing out the ones that are to preserve the
    // earlier behavior.
    var coinsuranceNamedCoinsurance = {OptionCPBldgCovCoinsuranceType, OptionCPBlanketCoinsuranceType}
    var coinsurance = cov.CovTerms.firstWhere(\ term -> isCovTermOfType(term, coinsuranceNamedCoinsurance))
    return coinsurance.DisplayValue
  }

  private function isCovTermOfType(covTerm: CovTerm, allowedCovTermTypes: List<Type<CovTerm>>) : boolean {
    for (allowedCovTermType in allowedCovTermTypes) {
      if (gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(allowedCovTermType, typeof covTerm)) {
        return true
      }
    }
    return false
  }

  function getBlanketInclusion(cov : CPBuildingCov) : String {
    return cov.CPBlanket != null ? DisplayKey.get("Web.Policy.CP.Blanket.BlanketIncluded", cov.CPBlanket.CPBlanketNum) : 
                                   DisplayKey.get("Web.Policy.CP.Blanket.None")
  }
  
  function addBuildingCoverages(coverages : CPBuildingCov[]) {
    this.removeNonMatchingCoverages()
    coverages.each(\ cov -> this.addToBuildingCoverages(cov))
    this.CPBlanketCov.CPBlanketLimitTerm.Value = this.BuildingCovLimitSum
  }  
  
  function removeNonMatchingCoverages() {
    var oldCoverages = this.BuildingCoverages
    var newCoverages = this.MatchingBuildingCoverages
    var removeBlanket = false
    for (oldCov in oldCoverages) {
      if (not newCoverages.hasMatch(\ c -> c == oldCov)) {
        oldCov.CPBlanket = null
        removeBlanket = true
      }
    }
    if (removeBlanket) {
      this.CPBlanketCov.CPBlanketLimitTerm.Value = this.BuildingCovLimitSum
    }
  }
  
  function recalculateLimit(){
    this.CPBlanketCov.CPBlanketLimitTerm.Value = this.BuildingCovLimitSum
  }
}