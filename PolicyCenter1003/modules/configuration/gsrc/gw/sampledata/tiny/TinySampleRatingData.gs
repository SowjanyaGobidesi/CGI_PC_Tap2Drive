package gw.sampledata.tiny

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.CoveragePattern
uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO
uses gw.api.rating.dtobased.data.cp.CPBuildingDTO
uses gw.api.rating.dtobased.data.cp.CPLineDTO
uses gw.api.system.PCConfigParameters
uses gw.api.upgrade.PCCoercions
uses gw.lob.cp.rating.CPCoverageWrapper
uses gw.lob.hop.rating.HOPBasePremiumInfo
uses gw.lob.hop.rating.HOPCoverageWrapper
uses gw.lob.pa.rating.DriverAssignmentInfo
uses gw.rating.flow.builders.CalcRoutineParameterBuilder
uses gw.rating.flow.builders.CalcRoutineParameterSetBuilder
uses gw.sampledata.AbstractSampleDataCollection

@Export
class TinySampleRatingData extends AbstractSampleDataCollection {
  construct() {
  }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName(): String {
    return "Tiny Rating"
  }

  final var paCoverageParamSetCode = "PACoverageParamSet"
  final var cpCoverageWrapperParamSetCode = "CPCoverageWrapperParamSet"
  final var cpDTOCoverageWrapperParamSetCode = "CPDTOCoverageWrapperParamSet"
  final var genericStateTaxParamSetCode = "GenericStateTaxParamSet"

  /* Personal Auto parameter set codes */
  public final static var PA_DRIVER_ASSIGNMENT_PARAM_SET_CODE: String = "PADriverAssignmentParamSet"
  public final static var PA_STATE_TAX_PARAM_SET_CODE: String = "StateTaxParamSet"
  public final static var PA_PIP_NJ_PARAM_SET_CODE: String = "PIPNJParamSet"
  public final static var PA_VEHICLE_COVERAGE_PARAM_SET_CODE: String = "PAVehicleCoverageParamSet"
  public final static var PA_CANCELLATION_SHORT_RATE_PENALTY_PARAM_SET_CODE: String = "PACancellationShortRatePenaltyParamSet"

  /* Commerical Property parameter set codes */
  public final static var CP_STATE_TAX_PARAM_SET_CODE: String = "CPStateTaxParamSet"

  /* Homeowners parameter set codes */
  public final static var HOP_COVERAGE_WRAPPER_PARAM_SET_CODE: String = "HOPCoverageWrapperParamSet"
  public final static var HOP_ALL_PERILS_PARAM_SET_CODE: String = "HOPAllPerilsDeductParamSet"
  public final static var HOP_BASE_PREMIUM_PARAM_SET_CODE: String = "HOPBasePremiumParamSet"
  public final static var HOP_MOD_PREM_PARAM_SET_CODE: String = "HOPModifierPremiumParamSet"

  public final static var HOP_SET_PUBLIC_ID_PREFIX: String = "pc:TSRD:HOPSet"
  public final static var HOP_PARAMETER_PUBLIC_ID_PREFIX: String = "pc:TSRD:HOPParam"

  override property get AlreadyLoaded(): boolean {
    return parameterSetLoaded(paCoverageParamSetCode) and
        ((PCConfigParameters.EnableCPDTOParallelRating.Value and
            parameterSetLoaded(cpDTOCoverageWrapperParamSetCode)) or
            parameterSetLoaded(cpCoverageWrapperParamSetCode)) and
        parameterSetLoaded(genericStateTaxParamSetCode) and
        parameterSetLoaded(HOP_BASE_PREMIUM_PARAM_SET_CODE)
  }

  override function load() {
    if (PCConfigParameters.EnableCPDTOParallelRating.Value) {
      if (not parameterSetLoaded(cpDTOCoverageWrapperParamSetCode)) {
        loadCPDTOParameterSets()
      }
    } else {
      if (not parameterSetLoaded(cpCoverageWrapperParamSetCode)) {
        loadCPParameterSets()
      }
    }
    if (not parameterSetLoaded(paCoverageParamSetCode)) {
      loadPAParameterSets()
    }
    if (not parameterSetLoaded(genericStateTaxParamSetCode)) {
      loadStateTaxParamSet()
    }
    if (not parameterSetLoaded(HOP_BASE_PREMIUM_PARAM_SET_CODE)) {
      loadHOPParamSets()
    }
  }

  private function loadHOPParamSets(): void {
    loadHOPCoverageWrapperParamSet()
    loadHOPBasePremiumParamSet()
    loadHOPAllPerilsDeductParamSet()
    loadHOPModifierPremiumParamSet()
  }

  //===========================================================================
  // Personal Auto Parameter Sets
  //===========================================================================

  private function loadPAParameterSets() {
    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:ParamSet01")
        .withCode("PACoverageParamSet")
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.PACoverage")
        .withPolicyLinePatternCode("PersonalAutoLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PersonalAutoLine)
                .withPublicId("pc:TSRD:Param001")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_COVERAGE)
                .withParamType(entity.Coverage)
                .withPublicId("pc:TSRD:Param002")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_VEHICLE)
                .withParamType(entity.PersonalVehicle)
                .withPublicId("pc:TSRD:Param003")
        )
        .createAndCommit()
    verifyLoaded(paCoverageParamSetCode)

    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:ParamSet02")
        .withCode("StateTaxParamSet")
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.PAStateTax")
        .withPolicyLinePatternCode("PersonalAutoLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PolicyLine)
                .withPublicId("pc:TSRD:Param004")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_TAXABLEBASIS)
                .withParamType(java.math.BigDecimal)
                .withPublicId("pc:TSRD:Param005")
        )
        .createAndCommit()
    verifyLoaded("StateTaxParamSet")

    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:ParamSet03")
        .withCode("PIPNJParamSet")
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.PIPNJ")
        .withPolicyLinePatternCode("PersonalAutoLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_PAPIPNJ)
                .withParamType(entity.Coverage)
                .withCoverageCode(PCCoercions.makeProductModel<CoveragePattern>("PAPIP_NJ"))
                .withPublicId("pc:TSRD:Param006")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PersonalAutoLine)
                .withPublicId("pc:TSRD:Param007")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_VEHICLE)
                .withParamType(entity.PersonalVehicle)
                .withPublicId("pc:TSRD:Param008")
        )
        .createAndCommit()
    verifyLoaded("PIPNJParamSet")

    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:ParamSet05")
        .withCode("PAVehicleCoverageParamSet")
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.PAVehicleCoverage")
        .withPolicyLinePatternCode("PersonalAutoLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PersonalAutoLine)
                .withPublicId("pc:TSRD:Param012")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_COVERAGE)
                .withParamType(entity.Coverage)
                .withPublicId("pc:TSRD:Param013")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_VEHICLE)
                .withParamType(entity.PersonalVehicle)
                .withPublicId("pc:TSRD:Param014")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_ASSIGNEDDRIVER)
                .withParamType(entity.VehicleDriver)
                .withPublicId("pc:TSRD:Param015")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_PREVIOUSTERMAMOUNT)
                .withParamType(java.math.BigDecimal)
                .withPublicId("pc:TSRD:Param016")
        )
        .createAndCommit()
    verifyLoaded("PAVehicleCoverageParamSet")

    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:ParamSet06")
        .withCode("PADriverAssignmentParamSet")
        .isNonCost()
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.PADriverAssignment")
        .withPolicyLinePatternCode("PersonalAutoLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PersonalAutoLine)
                .withPublicId("pc:TSRD:Param017")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_DRIVERASSIGNMENTINFO)
                .withParamType(DriverAssignmentInfo)
                .isWritable()
                .withPublicId("pc:TSRD:Param018")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_CURRENTDRIVER)
                .withParamType(entity.VehicleDriver)
                .withPublicId("pc:TSRD:Param019")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_VEHICLE)
                .withParamType(entity.PersonalVehicle)
                .withPublicId("pc:TSRD:Param020")
        )
        .createAndCommit()
    verifyLoaded("PADriverAssignmentParamSet")

    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:ParamSet07")
        .withCode("PACancellationShortRatePenaltyParamSet")
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.PACancellationShortPenaltyParamSet")
        .withPolicyLinePatternCode("PersonalAutoLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PersonalAutoLine)
                .withPublicId("pc:TSRD:Param021")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_PRORATEDPREMIUMTOTAL)
                .withParamType(java.math.BigDecimal)
                .withPublicId("pc:TSRD:Param022")
        )
        .createAndCommit()
    verifyLoaded("PACancellationShortRatePenaltyParamSet")
  }

  //===========================================================================
  // Commerical Property Parameter Sets
  //===========================================================================

  private function loadCPParameterSets() {
    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:CPSet01")
        .withCode("CPStateTaxParamSet")
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.CPStateTax")
        .withPolicyLinePatternCode("CPLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PolicyLine)
                .withPublicId("pc:TSRD:CPParam001")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_TAXABLEBASIS)
                .withParamType(java.math.BigDecimal)
                .withPublicId("pc:TSRD:CPParam002")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_STATE)
                .withParamType(typekey.Jurisdiction)
                .withPublicId("pc:TSRD:CPParam003")
        )
        .createAndCommit()
    verifyLoaded(CP_STATE_TAX_PARAM_SET_CODE)

    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:CPSet02")
        .withCode(cpCoverageWrapperParamSetCode)
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.CPCoverageWrapper")
        .withPolicyLinePatternCode("CPLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_COVERAGE)
                .withParamType(entity.Coverage)
                .withCoverageWrapper(CPCoverageWrapper)
                .withPublicId("pc:TSRD:CPParam004")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_BUILDING)
                .withParamType(entity.CPBuilding)
                .withPublicId("pc:TSRD:CPParam005")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.CommercialPropertyLine)
                .withPublicId("pc:TSRD:CPParam006")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_CPDEDUCTFACTORNAME)
                .withParamType(java.lang.String)
                .withPublicId("pc:TSRD:CPParam007")
        )
        .createAndCommit()
    verifyLoaded(cpCoverageWrapperParamSetCode)
  }

  private function loadCPDTOParameterSets() {

    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:CPSet03")
        .withCode(cpDTOCoverageWrapperParamSetCode)
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.CPCoverageWrapperDTO")
        .withPolicyLinePatternCode("CPLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_COVERAGE)
                .withParamType(CPBuildingCovDTO)
                .withPublicId("pc:TSRD:CPParam008")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_BUILDING)
                .withParamType(CPBuildingDTO)
                .withPublicId("pc:TSRD:CPParam009")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(CPLineDTO)
                .withPublicId("pc:TSRD:CPParam010")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_CPDEDUCTFACTORNAME)
                .withParamType(java.lang.String)
                .withPublicId("pc:TSRD:CPParam011")
        )
        .createAndCommit()
    verifyLoaded(cpDTOCoverageWrapperParamSetCode)

  }

  //===========================================================================
  // Homeowners Parameter Sets
  //===========================================================================

  private function loadHOPBasePremiumParamSet() {
    new CalcRoutineParameterSetBuilder()
        .withPublicId(NextHOPParamaterSetPublicId)
        .withCode(HOP_BASE_PREMIUM_PARAM_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.HOPBasePremiumParamSet")
        .withPolicyLinePatternCode("HOPLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPDWELLING)
                .withParamType(entity.HOPDwelling)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPCOVERAGEPART)
                .withParamType(entity.HOPCoveragePart)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.HOPLine)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPBASEPREMIUMINFO)
                .withParamType(HOPBasePremiumInfo)
                .isWritable()
                .withPublicId(NextHOPParameterPublicId)
        )
        .createAndCommit()
    verifyLoaded(HOP_BASE_PREMIUM_PARAM_SET_CODE)
  }

  private function loadHOPCoverageWrapperParamSet() {
    new CalcRoutineParameterSetBuilder()
        .withPublicId(NextHOPParamaterSetPublicId)
        .withCode(HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.HOPCoverageWrapper")
        .withPolicyLinePatternCode("HOPLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPBASEPREMIUMINFO)
                .withParamType(HOPBasePremiumInfo)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPCOVERAGEPART)
                .withParamType(entity.HOPCoveragePart)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPDWELLING)
                .withParamType(entity.HOPDwelling)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_COVERAGE)
                .withParamType(entity.Coverage)
                .withCoverageWrapper(HOPCoverageWrapper)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.HOPLine)
                .withPublicId(NextHOPParameterPublicId)
        )
        .createAndCommit()
    verifyLoaded(HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)
  }

  private function loadHOPAllPerilsDeductParamSet() {
    new CalcRoutineParameterSetBuilder()
        .withPublicId(NextHOPParamaterSetPublicId)
        .withCode(HOP_ALL_PERILS_PARAM_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.HOPAllPerilsDeductParamSet")
        .withPolicyLinePatternCode("HOPLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPDWELLING)
                .withParamType(entity.HOPDwelling)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPCOVERAGEPART)
                .withParamType(entity.HOPCoveragePart)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.HOPLine)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
         new CalcRoutineParameterBuilder()
             .withCode(TC_HOPBASEPREMIUMINFO)
             .withParamType(HOPBasePremiumInfo)
             .withPublicId(NextHOPParameterPublicId)
     )
        .createAndCommit()
    verifyLoaded(HOP_ALL_PERILS_PARAM_SET_CODE)
  }

  private function loadHOPModifierPremiumParamSet(): void {
    new CalcRoutineParameterSetBuilder()
        .withPublicId(NextHOPParamaterSetPublicId)
        .withCode(HOP_MOD_PREM_PARAM_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.ParameterSets.HOPModifierPremiumParamSet")
        .withPolicyLinePatternCode("HOPLine")
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.HOPLine)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPMODIFIERBASIS)
                .withParamType(java.math.BigDecimal)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPMODIFIER)
                .withParamType(java.lang.String)
                .withPublicId(NextHOPParameterPublicId)
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_HOPMODIFIERVALUE)
                .withParamType(java.lang.String)
                .withPublicId(NextHOPParameterPublicId)
        )
        .createAndCommit()
    verifyLoaded(HOP_MOD_PREM_PARAM_SET_CODE)
  }

  private property get NextHOPParamaterSetPublicId(): String {
    return getNextId(HOP_SET_PUBLIC_ID_PREFIX, "00")
  }

  private property get NextHOPParameterPublicId(): String {
    return getNextId(HOP_PARAMETER_PUBLIC_ID_PREFIX, "000")
  }

  //===========================================================================
  // Generic State Tax Parameter Sets
  //===========================================================================

  private function loadStateTaxParamSet() {
    new CalcRoutineParameterSetBuilder()
        .withPublicId("pc:TSRD:TaxParamSet01")
        .withCode(genericStateTaxParamSetCode)
        .withLocalizedNameFromDisplayKey(DisplayKey.get("Web.Rating.ParameterSets.StateTax"))
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_POLICYLINE)
                .withParamType(entity.PolicyLine)
                .withPublicId("pc:TSRD:TaxParam001")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_TAXABLEBASIS)
                .withParamType(java.math.BigDecimal)
                .withPublicId("pc:TSRD:TaxParam002")
        )
        .withParameter(
            new CalcRoutineParameterBuilder()
                .withCode(TC_STATE)
                .withParamType(typekey.Jurisdiction)
                .withPublicId("pc:TSRD:TaxParam003")
        )
        .createAndCommit()
    verifyLoaded(genericStateTaxParamSetCode)
  }

  //===========================================================================
  // Internal Methods
  //===========================================================================

  private function verifyLoaded(paramSetCode : String) {
    var paramSet = queryParameterSet(paramSetCode).single()
    if (paramSet == null) {
      throw new IllegalStateException("Should have loaded '${paramSet}'.")
    }
  }

  private function parameterSetLoaded(paramSetCode : String) : boolean {
    return not (queryParameterSet(paramSetCode).Empty)
  }

  private function queryParameterSet(paramSetCode : String) : gw.api.database.IQueryBeanResult<entity.CalcRoutineParameterSet> {
    return Query<CalcRoutineParameterSet>.make(CalcRoutineParameterSet).compare(CalcRoutineParameterSet#Code, Equals, paramSetCode).select()
  }

}