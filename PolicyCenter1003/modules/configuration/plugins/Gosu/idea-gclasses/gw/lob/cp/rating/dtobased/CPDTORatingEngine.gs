package gw.lob.cp.rating.dtobased

uses entity.PolicyLine
uses entity.windowed.CPBuildingCovCostVersionList
uses entity.windowed.CPBuildingCovVersionList
uses entity.windowed.CPBuildingVersionList
uses gw.api.productmodel.Offering
uses gw.api.profiler.PCProfilerTag
uses gw.api.rating.dtobased.accessors.cp.CPLineDAO
uses gw.api.rating.dtobased.data.CoverageDTO
uses gw.api.rating.dtobased.data.EffDatedDTO
uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO
uses gw.api.rating.dtobased.data.cp.CPLineDTO
uses gw.api.rating.dtobased.data.cp.CPLocationDTO
uses gw.job.RenewalProcess
uses gw.lob.cp.rating.*
uses gw.rating.CostData
uses gw.rating.RateFlowLogger
uses gw.rating.dtobased.AbstractDTOParallelRatingEngine

/**
 * In the base configuration, CPDTORatingEngine extends AbstractDTOParallelRatingEngine and rates the CPLocationDTOs in parallel.
 * Implementing parallelization in a child of AbstractParallelRatingEngine requires the following:
 * <ol>
 * <li>
 * Steps of setup and cleanup.
 * In method {@link #rateSlice(CPLine)} you must call method {@link #preRateStep} before the rating code and
 * {@link #postRateStep} after the rating code.
 * </li>
 * <li>
 * Replace the loop of CPLocationDTOs with a call to method {@link #rateInParallel}.
 * In method rateSlice, the loop of CPLocationDTOs is replaced by a call to rateInParallel. The contents of the loop
 * becomes a code block which is passed to method rateInParallel as the second argument. The collection of CPLocationDTOs
 * is passed to method rateInParallel as the first argument.
 * </li>
 * <li>
 * Call {@link #handleFutures(List)} on all the Futures returned from rateInParallel.
 * Do this immediately following the rateInParallel method.
 * </li>
 * </ol>
 */
@Export
class CPDTORatingEngine extends AbstractDTOParallelRatingEngine<CPLine, CPLineDTO, EffDatedDTO> {

  static var _rfLogger = RateFlowLogger.Logger

  var _baseRatingDate     : Date
  var _jurisdiction       : Jurisdiction
  var _minimumRatingLevel : RateBookStatus
  var _renewal            : boolean
  var _uwCompany          : UWCompany
  var _offering           : Offering
  var _linePatternCode    : String

  construct(line : CPLine) {
    this(line, RateBookStatus.TC_ACTIVE)
  }

  construct(line : CPLine, minimumRatingLevel : RateBookStatus) {
    super(line)

    _minimumRatingLevel = minimumRatingLevel

    // Populate most of the instance vars from line
    _jurisdiction = line.BaseState
    _baseRatingDate = line.Branch.RateAsOfDate
    _renewal = line.Branch.JobProcess typeis RenewalProcess
    _uwCompany = line.Branch.UWCompany
    _offering = line.Branch.Offering
    _linePatternCode = line.PolicyLine.PatternCode
  }

  // CP is rated on a 365-day term
  override protected property get NumDaysInCoverageRatedTerm() : int {
    return 365
  }

  override protected function existingSliceModeCosts() : Iterable<Cost> {
    return PolicyLine.Costs.whereTypeIs(CPBuildingCovCost)
  }

  // Used by the extractCostDatasFromExistingCosts method.  Must be implemented if that method is going to be called
  override protected function createCostDataForCost(c : Cost) : CPCostData {
    switch(typeof c) {
      case CPBuildingCovBroadCost: return new CPBuildingCovBroadCostData(c, RateCache)
      case CPBuildingCovGrp1Cost:  return new CPBuildingCovGroup1CostData(c, RateCache)
      case CPBuildingCovGrp2Cost:  return new CPBuildingCovGroup2CostData(c, RateCache)
      case CPBuildingCovSpecCost:  return new CPBuildingCovSpecialCostData(c, RateCache)
      default: throw "Unexpected cost type ${c.DisplayName}"
    }
  }

  override function preLoadCostArrays() {
    PolicyLine.VersionList.CPLocations.arrays<CPBuildingVersionList>("Buildings")
                                 .arrays<CPBuildingCovVersionList>("Coverages")
                                 .arrays<CPBuildingCovCostVersionList>("Costs")
  }

  //===========================================================================
  // Rate Flow
  //===========================================================================

  protected override function rateWindow(lineVersion : CPLine) {
    var cpBuildingCovCostDatas = CostDatas as List<CPBuildingCovCostData>
    var basesMap  = cpBuildingCovCostDatas.partition(\ c -> c.State).mapValues(\ l -> l.sum(\ c -> c.ActualAmountBilling.Amount))
    for (st in basesMap.Keys) {
      var subtotal = basesMap.get(st)
      if (subtotal == 0) {
        continue
      }
      var costData = new CPStateTaxCostData(lineVersion.Branch.PeriodStart, lineVersion.Branch.PeriodEnd,TaxRatingCurrency, RateCache, st)
      costData.Overridable = false
      costData.NumDaysInRatedTerm = lineVersion.Branch.NumDaysInPeriod

      var rateRoutineParameterMap : Map<CalcRoutineParamName, Object> =
            {TC_POLICYLINE   ->PolicyLine,
             TC_TAXABLEBASIS ->subtotal,
             TC_STATE        ->st}
      var refDate = Branch.PeriodStart
      //This will return a CP ratebook that has generic rateBook in its hierarchy
      var genericRateBook = getRateBook(refDate, lineVersion.Branch.Offering.PublicID, _linePatternCode)
      costData.RateBook = genericRateBook
      genericRateBook.executeCalcRoutine("gx_state_tax_rr", costData, costData, rateRoutineParameterMap)
      costData.StandardAmount = costData.StandardTermAmount
      costData.copyStandardColumnsToActualColumns()  // no overrides
      addCost(costData)
      if (_rfLogger.DebugEnabled) {
        logDebugRatedCost(costData)
      }
    }
  }

  protected override function rateSlice(lineVersion : CPLine) {
    PolicyLine = lineVersion // This also sets the PolicyLineDTO
    if (PolicyLineDTO.CanceledSlice) {
      if (_rfLogger.DebugEnabled) {
        _rfLogger.debug("Not rating " + PolicyLineDTO + " " + PolicyLineDTO.SliceDate + " version because it is in the cancelled period of time.")
      }
    } else {
      _rfLogger.info("Rating " + PolicyLineDTO + " " + PolicyLineDTO.SliceDate + " version...")
      preRateStep(lineVersion)
      var buildingLocations = PolicyLineDTO.CPLocations.where(\location -> location.Buildings.HasElements)
      try {
        var futures = rateInParallel(buildingLocations.toList(),  \location -> {
          //Signature for rateInParallel() takes doRating(item : E) where E is EffDated...
          var cpLocationDTO = location as CPLocationDTO
          //... so we call rateLocation() after type casting location from EffDated to CPLocationDTO
          using(PCProfilerTag.RATE_CP_LOCATION) {
            rateLocation(cpLocationDTO)
          }
        })
        handleFutures(futures)
        _rfLogger.info("Rating " + PolicyLineDTO + " " + PolicyLineDTO.SliceDate + " version...Done")
      } finally {
        // Apply staged cost data. Shutdown the thread pool when all threads are done rating or when the first
        // exception occurs. End the worksheet container processing which will update the worksheet container if
        // running in parallel
        postRateStep()
      }
    }
  }

  /**
   * Rate the location.  This function is passed into the rateInParallel method in the rateSlice
   * method.  It will be executed in parallel if the engine is configured to run in parallel, otherwise it will run
   * single threaded.
   * @param location the location that will be rated.
   */
  private function rateLocation(location : CPLocationDTO) {
    /*
     * Within rateInParallel, each bean (in this case location) is looked up in the child thread's bundle.  So
     * we use the CPLine from this location in the child thread
     */
    var lineVersion = location.CPLine
    if (_rfLogger.DebugEnabled) {
      _rfLogger.debug("Rating " + location + "...")
    }
    for (building in location.Buildings) {
      if (Thread.currentThread().isInterrupted()) {
        // Stop rating the rest of the buildings if the thread has already been interrupted (most likely due to timeout).
        _rfLogger.info("Rating " + location + "...Interrupted")
        return
      }
      if (_rfLogger.DebugEnabled) {
        _rfLogger.debug("Rating " + building + "...")
      }
      // All coverages on CP are referenced to the Coverable reference date.   If this were not so, we would
      // want to loop over the coverages, and call ReferenceDatePlugin.getCoverageReferenceDate() for each one.
      using (PCProfilerTag.RATE_CP_BUILDING) {
        var rateBook : RateBook
        using (PCProfilerTag.GET_CP_BUILDING_RATE_BOOK) {
          rateBook = getCPRateBook(building.CoverableReferenceDate, lineVersion.Branch.OfferingCode)
        }
        for (cov in building.Coverages) {
          // not including cost datas that have a zero term amount
          var costs = rateCPBuildingCov(cov, rateBook)
          addStagedCosts(costs.where(\c -> c.StandardTermAmount != 0))
        }
      }
      if (_rfLogger.DebugEnabled) {
        _rfLogger.debug("Rating " + building + "...")
      }
    }
    if (_rfLogger.DebugEnabled) {
      _rfLogger.debug("Rating " + location + "...Done")
    }
  }

  private function rateCPBuildingCov(cov : CPBuildingCovDTO, rateBook : RateBook) : List<CPBuildingCovCostData> {
    var costs = new LinkedList<CPBuildingCovCostData>()
    return rateCPBuildingCov(cov, costs, rateBook, cov.CauseOfLoss)
  }

  private function rateCPBuildingCov(cov : CPBuildingCovDTO, costs: List<CPBuildingCovCostData>, rateBook : RateBook, causeOfLoss : CPCauseOfLoss) : List<CPBuildingCovCostData> {
    var routineName = getRateRoutineName(cov)
    var params = createParamMap(cov, "cpDeductGrp1")
    costs.add(executeCPRateRoutine(cov, createCostData(cov, "cpDeductGrp1"), rateBook, params, routineName))
    updateDeductFactor(params, "cpDeductGrp2")
    costs.add(executeCPRateRoutine(cov, createCostData(cov, "cpDeductGrp2"), rateBook, params, routineName))
    if (causeOfLoss == TC_BROAD or causeOfLoss == TC_SPECIAL) {
      updateDeductFactor(params, "cpDeductBroad")
      costs.add(executeCPRateRoutine(cov, createCostData(cov, "cpDeductBroad"), rateBook, params, routineName))
    }
    if (causeOfLoss == TC_SPECIAL) {
      updateDeductFactor(params, "cpDeductSpecial")
      costs.add(executeCPRateRoutine(cov, createCostData(cov, "cpDeductSpecial"), rateBook, params, routineName))
    }
    return costs
  }

  private function executeCPRateRoutine (cov: CPBuildingCovDTO,
                                         data: CPBuildingCovCostData<CPBuildingCovCost>,
                                         rateBook : RateBook,
                                         rateRoutineParameterMap: Map<CalcRoutineParamName, Object>,
                                         rateRoutineName: String) : CPBuildingCovCostData<CPBuildingCovCost> {
    data.NumDaysInRatedTerm = this.NumDaysInCoverageRatedTerm
    data.Basis = 1

    data.RateBook = rateBook
    rateBook.executeCalcRoutine(rateRoutineName, data, data, rateRoutineParameterMap)

    if (_rfLogger.DebugEnabled) {
      _rfLogger.debug("Rate " + cov.PatternCode)
      _rfLogger.debug("   Standard Base Rate:     ${data.StandardBaseRate}")
      _rfLogger.debug("   Standard Adjusted Rate: ${data.StandardAdjRate}")
      _rfLogger.debug("   Standard Term Amount:   ${data.StandardTermAmount}")
    }
    return data
  }

  protected override function initializeCostWrappers(lineVersion : PolicyLine) {
    var costs = lineVersion.CostVLs.allVersions<CPCost>(true)
    costs.Keys.where(\VL -> costs[VL].first() typeis CPBuildingCovCost).forEach(\costVL -> {
      var cost = costVL.getVersionAsOf(lineVersion.SliceDate) as CPBuildingCovCost
      if (cost != null) {
        addCostWrapper(cost, cost.Coverage.FixedId)
      }
    })
  }

  //===========================================================================
  // Utility Functions
  //===========================================================================

  private function createCostData(cov: CPBuildingCovDTO, deductFactorName: String): CPBuildingCovCostData {
    var start = cov.SliceDate
    var end = getNextSliceDateAfter(start)
    var state = cov.CPBuilding.Jurisdiction // This code is simplified vs. the entity rating engine
    var cpCostData : CPBuildingCovCostData

    switch (deductFactorName) {
      case ("cpDeductGrp1") :  cpCostData = new CPBuildingCovGroup1CostData(start, end, cov.Currency, RateCache, cov.FixedId, state)
                               break
      case ("cpDeductGrp2") :  cpCostData = new CPBuildingCovGroup2CostData(start, end, cov.Currency, RateCache, cov.FixedId, state)
                               break
      case ("cpDeductBroad") : cpCostData = new CPBuildingCovBroadCostData(start, end, cov.Currency, RateCache, cov.FixedId, state)
                               break
      case ("cpDeductSpecial") :  cpCostData =  new CPBuildingCovSpecialCostData(start, end, cov.Currency, RateCache, cov.FixedId, state)
                               break
      default: throw "Unknown Deductible Factor Name"
    }
    cpCostData.init(getCostWrapper(cov.FixedId, cpCostData),
        PolicyLineDTO.QuoteRoundingLevel, PolicyLineDTO.QuoteRoundingMode)

    return cpCostData
  }

  private function getCPRateBook( refDate : Date, offeringCode : String ) : RateBook {
    return getRateBook(refDate, offeringCode, _linePatternCode)
  }

  private function getGenericRateBook( refDate : Date, offeringCode : String ) : RateBook {
    return getRateBook(refDate, offeringCode, null)
  }

  private function getRateBook(refDate : Date, offeringCode : String, linePatternCode : String ) : RateBook {
    return RateBook.selectRateBook(refDate,
        _baseRatingDate,
        linePatternCode,
        _jurisdiction,
        _minimumRatingLevel,
        _renewal,
        offeringCode,
        _uwCompany)
  }

  private function getRateRoutineName(cov: CoverageDTO) : String {
    switch (cov.PatternCode) {
      case "CPBldgCov":
      case "CPBPPCov":
          return "cp_cov_premium_rr_dto"
      default:
        throw "No rate routine defined for " + cov.PatternCode + " coverage"
    }
  }

  private function updateDeductFactor(params : Map<CalcRoutineParamName, Object>, factorName : String) {
    params.put(TC_CPDEDUCTFACTORNAME, factorName)
  }

  private function createParamMap(cov: CPBuildingCovDTO, deductFactorName: String) : Map<CalcRoutineParamName, Object> {
    switch (cov.PatternCode) {
      case "CPBldgCov":
      case "CPBPPCov": return {TC_POLICYLINE->PolicyLineDTO,
                             TC_BUILDING ->cov.CPBuilding,
                             TC_COVERAGE -> cov,
                             TC_CPDEDUCTFACTORNAME ->  deductFactorName}

      default: throw "No rate routine param set defined for " + typeof cov + " coverage"
    }
  }

  private function logDebugRatedCost(costData : CostData) {
    logDebugRatedCost("Rated", costData)
  }

  private function logDebugRatedCost(preMsg : String, costData : CostData) {
    if (_rfLogger.DebugEnabled) {
      _rfLogger.debug(preMsg + " " + costData.debugString() + " for " + costData)
    }
  }

  protected override function createPolicyLineDTO(line: CPLine): CPLineDTO {
    return new CPLineDAO(line).DTO
  }
}
