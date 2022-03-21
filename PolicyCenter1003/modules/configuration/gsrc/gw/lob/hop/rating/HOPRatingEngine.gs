package gw.lob.hop.rating

uses entity.HOPCost
uses entity.HOPDwellingCov
uses entity.HOPLineCov
uses gw.api.locale.DisplayKey
uses gw.financials.Prorater
uses gw.job.RenewalProcess
uses gw.plugin.Plugins
uses gw.plugin.policyperiod.IPolicyTermPlugin
uses gw.rating.AbstractRatingEngine
uses gw.rating.CostData
uses gw.rating.NoCostWorksheetContainer
uses gw.rating.RateFlowLogger
uses gw.rating.worksheet.domain.Worksheet
uses productmodel.HOPLine

uses java.math.BigDecimal
uses java.math.RoundingMode

@Export
class HOPRatingEngine extends AbstractRatingEngine<HOPLine> {

  /* Map of line coverages and their associated increased limit rate routine codes */
  public static final var LineCoverageIncreasedLimitRoutines: Map<Class<HOPLineCov>, String> = {
      HOPCovE->"hop_cov_e_incr_limit_rr",
      HOPCovF->"hop_cov_f_incr_limit_rr"}

  /* Map of dwelling coverages and their associated increased limit rate routine codes */
  public static final var DwellingCoverageIncreasedLimitRoutines: Map<Class<HOPDwellingCov>, String> = {
      HOPCovC->"hop_cov_c_incr_limit_rr",
      HOPCovD->"hop_cov_d_incr_limit_rr"}

  static var _rfLogger = RateFlowLogger.Logger

  var _rateBook: RateBook as readonly RateBook
  var _ratingLevel: RateBookStatus

  construct(line: HOPLine) {
    this(line, RateBookStatus.TC_ACTIVE)
  }

  construct(line: HOPLine, ratingLevel: RateBookStatus) {
    super(line)
    _ratingLevel = ratingLevel

    // Get the ratebook only once; personal lines are rated with the same
    // ratebook throughout the policy term
    _rateBook = getRateBook(line.Branch.PeriodStart)
  }

  /**
   * NumDaysInCoverageRatedTerm means the number of days the actuary used to determine how much to charge when rating.
   * So it is not really a property of the Policy; it is a property of the rating data.
   * <p>
   * There are a number of other ways an insurer might handle this.
   * (For example, some auto insurers rate for a full year, even though the term of issuance is six months.)
   */
  override protected property get NumDaysInCoverageRatedTerm(): int {
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

  /**
   * This default version of this method will return all of the Costs on a policy for the slice's effective date.  If some of the
   * costs on a policy are created as part of the "rate window" portion of the rating algorithm (that is, they are created at the
   * end for the entire period rather than created as part of rating each slice in time), then these costs should be excluded
   * from what is returned by this method.  Override this method to return only the types of costs that would be created during the
   * rateSlice portion of the algorithm in that case.
   */
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
      var basePremiumInfo = new HOPBasePremiumInfo()
      rateKeyFactor(lineVersion, basePremiumInfo)
      rateBasePremium(lineVersion, basePremiumInfo)
      rateLineCoverages(lineVersion)
      rateDwellingCoverages(lineVersion)
      rateCoveragePartCoverages(lineVersion)
      rateScheduledPersonalProperty(lineVersion)
      rateOrdinanceOrLawFactorPremium(lineVersion, basePremiumInfo)
      rateAllPerilsDeductible(lineVersion, basePremiumInfo)
      rateModifiers(lineVersion)
    }
  }

  //---------------------------------------------------------------------------
  // Coverages rated in Window mode
  //---------------------------------------------------------------------------

  /**
   * This default version of this method will not create any costs for the entire period.  Instead, it assumes that all costs are created
   * as part of calculating the pro rata premium for each slice of effective time.  If a policy does need to create Costs for the entire
   * period (such as a cancellation short rate penalty or a non-linear premium discount), then this method should be overridden to implement
   * that logic.
   */
  override protected function rateWindow(line: HOPLine) {
  }

  //---------------------------------------------------------------------------
  // Coverages rated in Slice mode
  //---------------------------------------------------------------------------

  private function rateKeyFactor(line: HOPLine, basePremiumInfo: HOPBasePremiumInfo) {
    var dwelling = line.HOPDwellings.single()

    var worksheetContainer = new NoCostWorksheetContainer()
    RateBook.executeCalcRoutine("hop_key_factor_rr", null, worksheetContainer, {
        TC_HOPDWELLING->dwelling,
        TC_HOPCOVERAGEPART->dwelling.HOPCoveragePart,
        TC_POLICYLINE->line,
        TC_HOPBASEPREMIUMINFO->basePremiumInfo})

    var ws = new Worksheet(){
        :Description = DisplayKey.get("Web.Rating.RateRoutine.HOPKeyFactorWorksheetNodeName"),
        :WorksheetEntries = worksheetContainer.WorksheetEntries}
    PolicyLine.addRatingWorksheet(dwelling, ws)
  }

  private function rateBasePremium(line: HOPLine, basePremiumInfo: HOPBasePremiumInfo) {
    var start = line.SliceDate
    var end = getNextSliceDateAfter(start)
    var dwelling = line.HOPDwellings.single()
    var covPartType = dwelling.HOPCoveragePart.CoveragePartType
    var cov = (covPartType == CoveragePartType.TC_HOPDWELLING) ? dwelling.HOPCovA : dwelling.HOPCovC

    var costData = new HOPDwellingCovCostData(start, end, cov.Currency, RateCache, cov.FixedId, TC_BASEPREMIUM, TC_BASE)
    setCostDataProperties(costData)
    callBasePremiumRateRoutine(dwelling, costData, basePremiumInfo)
  }

  private function rateLineCoverages(line: HOPLine) {
    line.HOPLineCoverages.each(\cov -> {
      var routineCode = LineCoverageIncreasedLimitRoutines.get(cov.Class)
      if (routineCode.NotBlank) {
        rateLineCoverage(line, cov, routineCode)
      }
    })
  }

  private function rateCoveragePartCoverages(line: HOPLine) {
  }

  private function rateDwellingCoverages(line: HOPLine) {
    line.HOPDwellings.single().Coverages.each(\cov -> {
      var routineCode = DwellingCoverageIncreasedLimitRoutines.get(cov.Class)
      if (routineCode.NotBlank and isCoverageIncreasedLimitRateable(cov)) {
        rateDwellingCoverage(line, cov.HOPDwelling, cov, routineCode)
      }
    })
  }

  private function rateDwellingCoverage(line: HOPLine, dwelling: HOPDwelling, cov: HOPDwellingCov, routineCode: String) {
    var start = line.SliceDate
    var end = getNextSliceDateAfter(start)
    var costData = new HOPDwellingCovCostData(start, end, cov.Currency, RateCache, cov.FixedId, TC_ADJUSTMENTTOBASEPREMIUM, TC_BASE)
    setCostDataProperties(costData)
    callRateRoutine(routineCode, cov.DisplayName, costData, createParamMap(cov, dwelling))
  }

  private function rateLineCoverage(line: HOPLine, cov: HOPLineCov, routineCode: String) {
    var start = cov.SliceDate
    var end = getNextSliceDateAfter(start)
    var costData = new HOPLineCovCostData(start, end, cov.Currency, RateCache, cov.FixedId, TC_ADJUSTMENTTOBASEPREMIUM, TC_BASE)
    setCostDataProperties(costData)
    callRateRoutine(routineCode, cov.DisplayName, costData, createParamMap(cov))
  }

  private function rateScheduledPersonalProperty(line: HOPLine) {
    var start = line.SliceDate
    var end = getNextSliceDateAfter(start)
    for (cov in line.HOPScheduledPersonalProperty.ScheduledItems*.Clauses.cast(HOPScheduledPersonalPropertyItem)) {
      var costData = new HOPLineSchCovItemCovCostData(start, end, cov.Currency, RateCache, cov.FixedId, TC_OTHERPREMIUM, TC_BASE)
      setCostDataProperties(costData)
      callRateRoutine("hop_sch_personal_property_rr", "Scheduled Personal Property", costData, createParamMap(cov))
    }
  }

  private function rateOrdinanceOrLawFactorPremium(line: HOPLine, basePremiumInfo: HOPBasePremiumInfo) {
    var start = line.SliceDate
    var end = getNextSliceDateAfter(start)
    var dwelling = line.HOPDwellings.single()
    if (dwelling.HOPCoveragePart.CoveragePartType == CoveragePartType.TC_HOPDWELLING) {
      var cov = dwelling.HOPOrdinanceOrLaw
      var costData = new HOPDwellingCovCostData(start, end, cov.Currency, RateCache, cov.FixedId, TC_OTHERPREMIUM, TC_BASE)
      setCostDataProperties(costData)
      callRateRoutine("hop_ordinance_or_law_factor_rr", "Ordinance or Law Coverage", costData, createParamMap(cov, dwelling, basePremiumInfo))
    }
  }

  private function rateAllPerilsDeductible(line: HOPLine, basePremiumInfo: HOPBasePremiumInfo) {
    var start = line.SliceDate
    var end = getNextSliceDateAfter(start)
    var dwelling = line.HOPDwellings.single()
    var cov = dwelling.HOPSectionIDeductibles
    var costData = new HOPDwellingCovCostData(start, end, cov.Currency, RateCache, cov.FixedId, TC_ADJUSTMENTTOBASEPREMIUM, TC_BASE)
    setCostDataProperties(costData)
    callRateRoutine("hop_all_perils_deduct_rr", "All Perils Deductible", costData, {
        TC_HOPCOVERAGEPART->dwelling.HOPCoveragePart,
        TC_HOPDWELLING->dwelling,
        TC_POLICYLINE->line,
        TC_HOPBASEPREMIUMINFO->basePremiumInfo
    })
  }

  private function rateModifiers(line: HOPLine): void {
    var start = line.SliceDate
    var end = getNextSliceDateAfter(start)

    var baseCostDatasInSameSlice = CostDatas.cast(HOPCostData)
        .where(\hopCostData -> hopCostData.modification == TC_BASE and hopCostData.EffectiveDate == line.SliceDate)

    var basis = baseCostDatasInSameSlice.ActualTermAmountSum

    var lineModifiers = line.Modifiers
    lineModifiers.each(\modifier -> {
      var costData = new HOPLineModCostData(start, end, line.PreferredCoverageCurrency, RateCache, modifier.FixedId, TC_OTHERPREMIUM, TC_MODIFICATION)
      setCostDataProperties(costData)
      callModifierRateRoutine(modifier, costData, basis)
    })

    var dwelling = line.HOPDwellings.single()
    var dwellingModifiers = dwelling.Modifiers
    dwellingModifiers.each(\modifier -> {
      var costData = new HOPDwellingModCostData(start, end, dwelling.PreferredCoverageCurrency, RateCache, modifier.FixedId, TC_OTHERPREMIUM, TC_MODIFICATION)
      setCostDataProperties(costData)
      callModifierRateRoutine(modifier, costData, basis)
   })
  }

  private function callModifierRateRoutine(modifier: Modifier, costData: HOPCostData, basis: BigDecimal) {
    switch (modifier.DataType) {
      case (TC_BOOLEAN): {
        //Call rate routine only when the boolean modifier is true
        //If we do not do this check, our rate table look up is likely to return null, causing NPE
        if (modifier.BooleanModifier) {
          callRateRoutine("hop_modifier_prem_rr", "Modifiers", costData, {
              TC_POLICYLINE->modifier.OwningModifiable.ModifiableLine as HOPLine,
              TC_HOPMODIFIERBASIS->basis,
              TC_HOPMODIFIER->modifier.Pattern.CodeIdentifier,
              TC_HOPMODIFIERVALUE->"true"
          })
        }
        break
      }
      case (TC_TYPEKEY): {
        var modifierValue = modifier.TypeKeyModifier
        //Call rate routine only when the typekey modifier is applied i.e. the value is non null
        //If we do not do this check, our rate table look up is likely to return null, causing NPE
        if (modifierValue != null) {
          callRateRoutine("hop_modifier_prem_rr", "Modifiers", costData, {
              TC_POLICYLINE->modifier.OwningModifiable.ModifiableLine as HOPLine,
              TC_HOPMODIFIERBASIS->basis,
              TC_HOPMODIFIER->modifier.Pattern.CodeIdentifier,
              TC_HOPMODIFIERVALUE->modifierValue
          })
        }
        break
      }
      default:
        throw new IllegalArgumentException(DisplayKey.get("Web.Rating.HOP.Validation.UnsupportedModifierType", modifier.DataType))
    }
  }

  private function isCoverageIncreasedLimitRateable(cov: HOPDwellingCov): boolean {
    var covPartType = cov.HOPDwelling.HOPCoveragePart.CoveragePartType
    if (cov typeis HOPCovC and covPartType != CoveragePartType.TC_HOPDWELLING) {
      return false
    }
    return true
  }

  //===========================================================================
  // Rate routine execution functions
  //===========================================================================

  private function callBasePremiumRateRoutine(dwelling: HOPDwelling, data: HOPCostData, basePremiumInfo: HOPBasePremiumInfo) {
    callRateRoutine("hop_base_rate_premium_rr", "Base Premium", data, {
        TC_POLICYLINE->dwelling.HOPCoveragePart.HOPLine,
        TC_HOPDWELLING->dwelling,
        TC_HOPCOVERAGEPART->dwelling.HOPCoveragePart,
        TC_HOPBASEPREMIUMINFO->basePremiumInfo})
  }

  private function callRateRoutine(routineCode: String, description: String, data: HOPCostData,
                                   rateRoutineParameterMap: Map<CalcRoutineParamName, Object>) {
    // Call rate routine which fills in BaseRate, AdjustedRate, TermAmount, Basis, etc.
    RateBook.executeCalcRoutine(routineCode, data, data, rateRoutineParameterMap)

    if (_rfLogger.DebugEnabled) {
      _rfLogger.debug("Rate " + description)
      _rfLogger.debug("   Rate Routine:           ${routineCode}")
      _rfLogger.debug("   Standard Base Rate:     ${data.StandardBaseRate}")
      _rfLogger.debug("   Standard Adjusted Rate: ${data.StandardAdjRate}")
      _rfLogger.debug("   Standard Term Amount:   ${data.StandardTermAmount}")
      _rfLogger.debug("   Basis:                  ${data.Basis}")
    }

    addCost(data)
  }

  private function createParamMap(cov: Coverage,
                                  dwelling: HOPDwelling = null,
                                  basePremiumInfo: HOPBasePremiumInfo = null): Map<CalcRoutineParamName, Object> {
    var line = cov.PolicyLine as HOPLine
    dwelling = dwelling ?: line.HOPDwellings.single()
    return {
        TC_COVERAGE->cov,
        TC_POLICYLINE->line,
        TC_HOPDWELLING->dwelling,
        TC_HOPCOVERAGEPART->dwelling.HOPCoveragePart,
        TC_HOPBASEPREMIUMINFO->basePremiumInfo}
  }

  //===========================================================================
  // Utility functions
  //===========================================================================

  protected function setCostDataProperties(costData: HOPCostData) {
    costData.init(PolicyLine)
    costData.RateBook = RateBook
    costData.NumDaysInRatedTerm = this.NumDaysInCoverageRatedTerm
    costData.Basis = 1
  }

  protected property get RoundingLevel(): int {
    return PolicyLine.Branch.Policy.Product.QuoteRoundingLevel
  }

  protected property get RoundingMode(): RoundingMode {
    return PolicyLine.Branch.Policy.Product.QuoteRoundingMode
  }

  private function getRateBook(refDate: Date): RateBook {
    return RateBook.selectRateBook(refDate,
        Branch.RateAsOfDate,
        PolicyLine.PatternCode,
        Branch.BaseState,
        _ratingLevel,
        Branch.JobProcess typeis RenewalProcess,
        Branch.Offering?.PublicID,
        PolicyLine.Branch.UWCompany)
  }
}