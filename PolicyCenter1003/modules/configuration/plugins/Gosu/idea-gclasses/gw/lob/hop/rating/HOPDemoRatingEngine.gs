package gw.lob.hop.rating

uses gw.api.domain.covterm.OptionCovTerm
uses gw.financials.Prorater
uses gw.plugin.Plugins
uses gw.plugin.policyperiod.IPolicyTermPlugin
uses gw.rating.AbstractRatingEngine
uses gw.rating.CostData

uses java.math.BigDecimal
uses java.math.RoundingMode

/**
 * WARNING: This class is used for demo rating only and should never be used in a production environment.
 *
 * Throughout this engine there are points that check for null values and default to 0. Since HOP line has complex
 * relationships between coverage limits, non-submission job builders often end up with null values if the
 * BasedOn period is not explicitly created. The RatingEngine will ignore these issues for ease of testing.
 */
@Export
class HOPDemoRatingEngine extends AbstractRatingEngine<HOPLine> {

  var _ratingHelper = new HOPRatingFunctions()

  construct(hopLineArg : HOPLine) {
    super(hopLineArg)
  }

  // NumDaysInCoverageRatedTerm means the number of days the actuary used to determine how much to charge when rating.
  // So it is not really a property of the Policy; it is a property of the rating data.
  //
  // There are a number of other ways an insurer might handle this.
  // (For example, some auto insurers rate for a full year, even though the term of issuance is six months.)
  override protected property get NumDaysInCoverageRatedTerm() : int {
    var firstPeriod = Branch.FirstPeriodInTerm
    var startDate = firstPeriod.StartOfRatedTerm // on a rewrite-remainder, uses the start date of the original term

    // Find the number of days in the full year period, based on the original period of the term.
    // Use date reconciliation logic in case the date is subject to reconciliation.
    var endDate = Plugins.get(IPolicyTermPlugin).calculatePeriodEndFromBasedOn(startDate, TermType.TC_ANNUAL, firstPeriod, true)
    var p = Prorater.forFinancialDays(TC_PRORATABYDAYS)
    return p.financialDaysBetween(startDate, endDate)
  }

  // Used by the extractCostDatasFromExistingCosts method.  Must be implemented if that method is going to be called
  override protected function createCostDataForCost(c: Cost): CostData {
    switch (typeof c) {
      case HOPLineCovCost:
        return new HOPLineCovCostData(c, RateCache)
      case HOPDwellingPerilCovCost:
        return new HOPDwellingPerilCovCostData(c, RateCache)
      case HOPDwellingNonPerilCovCost:
        return new HOPDwellingNonPerilCovCostData(c, RateCache)
      case HOPDwellingCovCost:
        return new HOPDwellingCovCostData(c, RateCache)
      case HOPLineSchCovItemCovCost:
        return new HOPLineSchCovItemCovCostData(c, RateCache)
      case HOPDwellSchCovItemCovCost:
        return new HOPDwellSchCovItemCovCostData(c, RateCache)
      case HOPDwellSchPerilCovItemCovCost:
        return new HOPDwellSchPerilCovItemCovCostData(c, RateCache)
      case HOPDwellSchNonPerilCovItemCovCost:
        return new HOPDwellSchNonPerilCovItemCovCostData(c, RateCache)
      case HOPCovPartSchCovItemCovCost:
        return new HOPCovPartSchCovItemCovCostData(c, RateCache)
      case HOPLineModifierCost:
        return new HOPLineModCostData(c, RateCache)
      case HOPDwellingModifierCost:
        return new HOPDwellingModCostData(c, RateCache)
      default:
        throw "Unexpected cost type ${c.DisplayName}"
    }
  }

  /******
   * This default version of this method will return all of the Costs on a policy for the slice's effective date.  If some of the
   * costs on a policy are created as part of the "rate window" portion of the rating algorithm (that is, they are created at the
   * end for the entire period rather than created as part of rating each slice in time), then these costs should be excluded
   * from what is returned by this method.  Override this method to return only the types of costs that would be created during the
   * rateSlice portion of the algorithm in that case.
   ******/
  override protected function existingSliceModeCosts(): Iterable<Cost> {
    return PolicyLine.Costs.whereTypeIs(HOPCost)
  }

  //===========================================================================
  // Rate Flow
  //===========================================================================

  override protected function rateSlice(lineVersion: HOPLine) {
    assertSliceMode(lineVersion)

    if (lineVersion.Branch.isCanceledSlice()) {
      // Do nothing if this is a canceled slice
    } else {
      lineVersion.AllCoverages.each(\cov -> rateCoverage(cov))
      lineVersion.AllModifiables*.Modifiers.each(\mod -> rateModifier(mod))
    }
  }

  //---------------------------------------------------------------------------
  // Coverages rated in Window mode.
  //---------------------------------------------------------------------------

  /******
   * This default version of this method will not create any costs for the entire period.  Instead, it assumes that all costs are created
   * as part of calculating the pro rata premium for each slice of effective time.  If a policy does need to create Costs for the entire
   * period (such as a cancellation short rate penalty or a non-linear premium discount), then this method should be overridden to implement
   * that logic.
   ******/
  override protected function rateWindow(line: HOPLine) {
  }

  //---------------------------------------------------------------------------
  // Coverages rated in Slice mode.
  //---------------------------------------------------------------------------

  private function rateModifier(mod : Modifier) {
    switch (mod.DataType) {
      case TC_BOOLEAN :
        if (mod.BooleanModifier) {
          addModDiscount(mod)
        }
        break
      case ModifierDataType.TC_TYPEKEY :
        if (mod.TypeKeyModifier != null) {
          addModDiscount(mod)
        }
        break;
      default:
    }
  }

  private function addModDiscount(mod : Modifier) {
    var startDate = mod.SliceDate
    var endDate = getNextSliceDateAfter(startDate)

    var costData : CostData
    switch (mod.IntrinsicType) {
      case entity.HOPDwellingMod:
        costData = new HOPDwellingModCostData(startDate, endDate, PolicyLine.PreferredCoverageCurrency, RateCache, mod.FixedId, TC_OTHERPREMIUM, TC_MODIFICATION)
        break
      case entity.HOPLineMod:
        costData = new HOPLineModCostData(startDate, endDate, PolicyLine.PreferredCoverageCurrency, RateCache, mod.FixedId, TC_OTHERPREMIUM, TC_MODIFICATION)
        break
    }

    costData.NumDaysInRatedTerm = this.NumDaysInCoverageRatedTerm
    costData.Basis = 100
    costData.ActualBaseRate = -1
    costData.ActualAdjRate = costData.ActualBaseRate
    costData.ActualTermAmount = (costData.Basis * costData.ActualAdjRate).setScale(this.RoundingLevel, this.RoundingMode)
    addCost(costData)
  }

  private function rateCoverage(cov : Coverage) {
    switch(typeof cov) {
      case HOPCovA:
        rateHOPCovA(cov)
        break
      case HOPCovB:
        var limitValue = cov.HOPCovBDirectLimitTerm.Value ?: 0
        var limitDefaultMonetaryValue = getDefaultMonetaryValue(cov.HOPCovBLimitTerm)
        rateIncreasedLimitsCov(cov, limitValue, limitDefaultMonetaryValue)
        break
      case HOPCovC:
        rateHOPCovC(cov)
        break
      case HOPCovD:
        var limitValue = cov.HOPCovDDirectLimitTerm.Value ?: 0
        var limitDefaultMonetaryValue = getDefaultMonetaryValue(cov.HOPCovDLimitTerm)
        rateIncreasedLimitsCov(cov, limitValue, limitDefaultMonetaryValue)
        break
      case HOPCovE:
        var limitValue = cov.HOPCovELimitTerm.Value ?: 0
        var limitDefaultValue = getDefaultValue(cov.HOPCovELimitTerm)
        rateIncreasedLimitsCov(cov, limitValue, limitDefaultValue)
        break
      case HOPCovF:
        var limitValue = cov.HOPCovFLimitTerm.Value ?: 0
        var limitDefaultValue = getDefaultValue(cov.HOPCovFLimitTerm)
        rateIncreasedLimitsCov(cov, limitValue, limitDefaultValue)
        break
      case HOPOrdinanceOrLaw:
        rateHOPOrdinanceOrLaw(cov)
        break
      case HOPSectionIDeductibles:
        rateHOPSectionIDeductibles(cov)
        break
      case HOPScheduledPersonalPropertyItem:
        rateOptionalCov(cov, cov.HOPScheduledPersonalPropertyItemLimitTerm.Value)
        break
      default:
    }
  }

  private function getDefaultValue(covTerm: OptionCovTerm) : BigDecimal {
    var pattern = covTerm.Pattern
    var offering = covTerm.Clause.PolicyLine.Branch.Offering
    var defaultCode = pattern.getDefaultValue(offering)
    var defaultValue = pattern.getValueForCode(defaultCode).Value
    return defaultValue
  }

  private function getDefaultMonetaryValue(covTerm: OptionCovTerm) : BigDecimal {
    var defaultValue = getDefaultValue(covTerm)
    var primaryCovLimit = _ratingHelper.getPrimaryCoverageLimit(covTerm.Clause.PolicyLine as HOPLine) ?: 0
    var defaultMonetaryValue = defaultValue / 100 * primaryCovLimit
    return defaultMonetaryValue
  }

  private function rateIncreasedLimitsCov(cov : Coverage, limitValue : BigDecimal, limitDefaultValue : BigDecimal) {
    rateCov(cov, limitValue - limitDefaultValue, TC_ADJUSTMENTTOBASEPREMIUM, TC_BASE)
  }

  private function rateOptionalCov(cov : Coverage, basis : BigDecimal) {
    rateCov(cov, basis, TC_OTHERPREMIUM, TC_BASE)
  }

  private function rateCov(cov : Coverage, basis : BigDecimal, hopPremiumType : HOPPremiumType, modification : Modification) {
    var startDate = cov.SliceDate
    var endDate = getNextSliceDateAfter(startDate)

    var costData : CostData
    switch (cov.OwningCoverable.IntrinsicType) {
      case entity.HOPDwelling:
        costData = new HOPDwellingCovCostData(startDate, endDate, cov.Currency, RateCache, cov.FixedId, hopPremiumType, modification)
        break
      case entity.HOPLine:
        costData = new HOPLineCovCostData(startDate, endDate, cov.Currency, RateCache, cov.FixedId, hopPremiumType, modification)
        break
      case entity.HOPLineScheduleCovItem:
        costData = new HOPLineSchCovItemCovCostData(startDate, endDate, cov.Currency, RateCache, cov.FixedId, hopPremiumType, modification)
        break
      case entity.HOPDwellScheduleCovItem:
        costData = new HOPLineSchCovItemCovCostData(startDate, endDate, cov.Currency, RateCache, cov.FixedId, hopPremiumType, modification)
        break
    }

    costData.NumDaysInRatedTerm = this.NumDaysInCoverageRatedTerm
    //some tests do not populate limits and jump straight to quote, this will keep the demo rating engine from erroring out
    costData.Basis = basis ?: 0
    costData.ActualBaseRate = 0.01
    costData.ActualAdjRate = costData.ActualBaseRate
    costData.ActualTermAmount = (costData.Basis * costData.ActualAdjRate).setScale(this.RoundingLevel, this.RoundingMode)
    addCost(costData)
  }


  private function rateHOPCovA(cov : HOPCovA) {
    if (cov.HOPDwelling.HOPCoveragePart.CoveragePartType == CoveragePartType.TC_HOPDWELLING) {
      rateCov(cov, cov.HOPCovALimitTerm.Value, TC_BASEPREMIUM, Modification.TC_BASE)
    }
  }

  private function rateHOPCovC(cov : HOPCovC) {
    if (cov.HOPDwelling.HOPCoveragePart.CoveragePartType == CoveragePartType.TC_HOPDWELLING) {
      var limitValue = cov.HOPCovCDirectLimitTerm.Value ?: 0
      var limitDefaultMonetaryValue = getDefaultMonetaryValue(cov.HOPCovCLimitTerm)
      rateIncreasedLimitsCov(cov, limitValue, limitDefaultMonetaryValue)
    } else {
      rateCov(cov, cov.HOPCovCDirectLimitTerm.Value, TC_BASEPREMIUM, Modification.TC_BASE)
    }
  }

  private function rateHOPOrdinanceOrLaw(cov : HOPOrdinanceOrLaw) {
    var limitValue = cov.HOPOrdinanceOrLawLimitTerm.Value ?: 0
    var limitDefaultValue = getDefaultValue(cov.HOPOrdinanceOrLawLimitTerm)
    rateOptionalCov(cov, (limitValue - limitDefaultValue) * 100)
  }

  private function rateHOPSectionIDeductibles(cov : HOPSectionIDeductibles) {
    if (cov.HasHOPSectionIDeductiblesPerilsTerm) {
      var deductibleValue = cov.HOPSectionIDeductiblesPerilsTerm.Value
      var deductibleDefaultValue = getDefaultValue(cov.HOPSectionIDeductiblesPerilsTerm)
      var basis = (deductibleValue >= deductibleDefaultValue) ? -10000 : 10000
      rateCov(cov, basis, HOPPremiumType.TC_ADJUSTMENTTOBASEPREMIUM, TC_BASE)
    }
  }

  //===========================================================================
  // Utility functions
  //===========================================================================

  protected property get RoundingLevel(): int {
    return PolicyLine.Branch.Policy.Product.QuoteRoundingLevel
  }

  protected property get RoundingMode(): RoundingMode {
    return PolicyLine.Branch.Policy.Product.QuoteRoundingMode
  }
}