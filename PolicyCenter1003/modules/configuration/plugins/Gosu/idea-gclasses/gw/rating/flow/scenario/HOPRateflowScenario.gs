package gw.rating.flow.scenario

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionArgumentBuilder
uses gw.rating.flow.builders.CalcStepDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionOperandBuilder
uses gw.rating.flow.builders.CalcStepDefinitionRateFactorBuilder
uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.HOPSampleDataTablesBuilder
uses gw.rating.sample.HOPRatingSampleDataScenario
uses gw.sampledata.tiny.TinySampleRatingData

uses java.math.BigDecimal

@Export
class HOPRateflowScenario {
  public static final var HOP_KEY_FACTOR_RR_CODE: String = "hop_key_factor_rr"
  public static final var HOP_BASE_RATE_PREMIUM_RR_CODE: String = "hop_base_rate_premium_rr"
  public static final var HOP_COV_C_INCREASED_LIMIT_RR_CODE: String = "hop_cov_c_incr_limit_rr"
  public static final var HOP_COV_D_INCREASED_LIMIT_RR_CODE: String = "hop_cov_d_incr_limit_rr"
  public static final var HOP_COV_E_INCREASED_LIMIT_RR_CODE: String = "hop_cov_e_incr_limit_rr"
  public static final var HOP_COV_F_INCREASED_LIMIT_RR_CODE: String = "hop_cov_f_incr_limit_rr"
  public static final var HOP_SCH_PERSONAL_PROPERTY_RR_CODE: String = "hop_sch_personal_property_rr"
  public static final var HOP_ORDINANCE_OR_LAW_FACTOR_RR_CODE: String = "hop_ordinance_or_law_factor_rr"
  public static final var HOP_ALL_PERILS_DEDUCT_PREMIUM_RR_CODE: String = "hop_all_perils_deduct_rr"
  public static final var HOP_MODIFIER_PREMIUM_RR_CODE : String = "hop_modifier_prem_rr"

  static property get SampleDataScenario(): RatingScenario {
    var scenario = HOPRatingSampleDataScenario.SampleDataScenario()

    var routines = new ArrayList<CalcRoutineDefinition>()
    routines.add(createKeyFactorRateCalcRoutine())
    routines.add(createBaseRatePremiumCalcRoutine())
    routines.add(createCoverageCIncreasedLimitCalcRoutine())
    routines.add(createCoverageDIncreasedLimitCalcRoutine())
    routines.add(createCoverageEIncreasedLimitCalcRoutine())
    routines.add(createCoverageFIncreasedLimitCalcRoutine())
    routines.add(createScheduledPersonalPropertyCalcRoutine())
    routines.add(createOrdinanceOrLawFactorCalcRoutine())
    routines.add(createAllPerilsDeductibleCalcRoutine())
    routines.add(createModifierPremiumCalcRoutine())

    var currentRateBook = scenario.BookBuilders.last()
    routines.each(\r -> currentRateBook.withCalcRoutine(r))

    return scenario
  }

  static function createKeyFactorRateCalcRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_BASE_PREMIUM_PARAM_SET_CODE)

    var limitBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getPrimaryCoverageLimit(entity.HOPLine)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("line")
            .withParamType("entity.HOPLine")
            .withInScope(TC_POLICYLINE, null, "entity.HOPLine", false))

    var keyFactorRateBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_KEY_FACTOR_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_KEY_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("COVERAGE_PART")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("LIMIT")
            .withParamType("String")
            .withLocalVariable("limit"))

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_KEY_FACTOR_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPKeyFactorRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)
        .withStep(createAssignmentStepWithNotes(
            "limit",
            limitBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetPrimaryCoverage")))
        .storeToWriteableParam(TC_HOPBASEPREMIUMINFO, "KeyFactor", BigDecimal, keyFactorRateBuilder)
        .createAndCommit()

    return routine
  }

  /**
   * Creates the HOP Base Premium rate routine
   *
   * @return the <code>CalcRoutineDefinition</code> for this rate routine
   */
  static function createBaseRatePremiumCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var companyLossCostArgSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet(
        HOPSampleDataTablesBuilder.HOP_LINE,
        HOPSampleDataTablesBuilder.HOP_COMPANY_LOSS_COST_MULTIPLIER_CODE,
        HOPSampleDataTablesBuilder.HOP_BASE_PREMIUM_ARG_SET_CODE)

    var formFactorArgSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet(
        HOPSampleDataTablesBuilder.HOP_LINE,
        HOPSampleDataTablesBuilder.HOP_FORM_FACTOR_CODE,
        HOPSampleDataTablesBuilder.HOP_BASE_PREMIUM_ARG_SET_CODE)

    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_BASE_PREMIUM_PARAM_SET_CODE)

    var territoryCodeBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getTerritoryCode(entity.HOPDwelling)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("dwelling")
            .withParamType("entity.HOPDwelling")
            .withInScope(TC_HOPDWELLING, null, "entity.HOPDwelling", false))

    var territoryBaseLostCostBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_TERRITORY_LOSS_COST_CODE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("COVERAGE_PART")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("TERRITORY_CODE")
            .withParamType("String")
            .withLocalVariable("territoryCode"))
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withOperandType(TC_RATETABLE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_TERRITORY_LOSS_COST_FACTOR))

    var lostCostMultiplierBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_COMPANY_LOSS_COST_MULTIPLIER_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_COMPANY_LOSS_COST_MULTIPLIER_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withDefaultArgumentSources(companyLossCostArgSet)

    var formFactorBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_FORM_FACTOR_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_FORM_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withDefaultArgumentSources(formFactorArgSet)

    var protectionConstructionBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_PROTECTION_CONSTRUCTION_CODE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("COVERAGE_PART")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("PROTECTION_CLASS")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParamType("String")
            .withParam("CONSTRUCTION_TYPE"))
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withOperandType(TC_RATETABLE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_PROTECTION_CONSTRUCTION_FACTOR))

    var keyFactor = new CalcStepDefinitionOperandBuilder()
        .withOperandType(TC_LOCALVAR)
        .withInScope(TC_HOPBASEPREMIUMINFO, "KeyFactor", "java.math.BigDecimal", false)

    var limitBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getPrimaryCoverageLimit(entity.HOPLine)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("line")
            .withParamType("entity.HOPLine")
            .withInScope(TC_POLICYLINE, null, "entity.HOPLine", false))

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_BASE_RATE_PREMIUM_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPBasePremiumRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)
        .withStep(createAssignmentStepWithNotes(
            "territoryCode",
            territoryCodeBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetTerritoryCode")))
        .withStep(createAssignmentStepWithNotes(
            "territoryBaseLostCost",
            territoryBaseLostCostBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.LookupTerritoryBaseLostCost")))
        .blankStep()

        .storeToCostDataField("BaseRate", lostCostMultiplierBuilder)
        .mathWithLocalVar(TC_MULTIPLICATION, "territoryBaseLostCost")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeValue("adjustedBaseClassPremium", formFactorBuilder)
        .mathWithCostDataField(TC_MULTIPLICATION, "BaseRate")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeToCostDataField("AdjustedRate", protectionConstructionBuilder)
        .mathWithLocalVar(TC_MULTIPLICATION, "adjustedBaseClassPremium")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .withStep(createAssignmentStepWithNotes(
            "limitPer1000",
            limitBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetPrimaryCoverage")))
        .mathStepConstant(TC_DIVISION, "java.math.BigDecimal", "1000")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeValue("extendedKeyFactor", keyFactor)
        .mathWithLocalVar(TC_MULTIPLICATION, "limitPer1000")
        .blankStep()

        .storeToCostDataFieldFromVar("TermAmount", "extendedKeyFactor")
        .mathWithCostDataField(TC_MULTIPLICATION, "AdjustedRate")
        .roundingStep(TC_HALFEVEN, TC_0)
        .storeToWriteableParam(TC_HOPBASEPREMIUMINFO, "BasePremium", BigDecimal,
            new CalcStepDefinitionOperandBuilder()
                .withCostDataField("TermAmount")
                .withOperatorType(null))
      .createAndCommit()

    return routine
  }

  /**
   * Creates the HOP Coverage C Increased Limit rate routine
   *
   * @return the <code>CalcRoutineDefinition</code> for this rate routine
   */
  static function createCoverageCIncreasedLimitCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var increasedLimitFactorArgSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet(
        HOPSampleDataTablesBuilder.HOP_LINE,
        HOPSampleDataTablesBuilder.HOP_COV_C_INCREASED_LIMIT_FACTOR_CODE,
        HOPSampleDataTablesBuilder.HOP_INCREASED_LIMIT_ARG_SET_CODE)

    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)

    var defaultCovLimitPercentangeBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getCovCDefaultLimitPercentage(entity.HOPLine)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("line")
            .withParamType("entity.HOPLine")
            .withInScope(TC_POLICYLINE, null, "entity.HOPLine", false))

    var covLimitPercentangeBuilder = new CalcStepDefinitionOperandBuilder()
        .withOperandType(TC_INSCOPE)
        .withInScope(TC_COVERAGE,
            "LimitPercentage", "java.math.BigDecimal", false)

    var covlimitBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getPrimaryCoverageLimit(entity.HOPLine)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("line")
            .withParamType("entity.HOPLine")
            .withInScope(TC_POLICYLINE, null, "entity.HOPLine", false))

    var increasedLimitBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_COV_C_INCREASED_LIMIT_FACTOR_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_INCREASED_LIMIT_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_COV_C_INCREASED_LIMIT_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withDefaultArgumentSources(increasedLimitFactorArgSet)

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_COV_C_INCREASED_LIMIT_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPCovCIncreasedLimitRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)
        .withStep(createAssignmentStepWithNotes(
            "covLimit",
            covlimitBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetPrimaryCovForCovCIncLimitRR")))
        .storeToCostDataField("BaseRate", increasedLimitBuilder)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .blankStep()

        .storeValue("defaultCashLimit", defaultCovLimitPercentangeBuilder)
        .mathWithLocalVar(TC_MULTIPLICATION, "covLimit")
        .roundingStep(TC_HALFEVEN, TC_0)
        .storeValue("cashLimit", covLimitPercentangeBuilder)
        .mathWithLocalVar(TC_MULTIPLICATION, "covLimit")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeFromLocalVarWithLeftParen("changeInLimit", "cashLimit")
        .mathStepWithRightParen(new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_SUBTRACTION)
            .withLocalVariable("defaultCashLimit"))
        .mathStepConstant(TC_DIVISION, "java.math.BigDecimal", "1000")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeToCostDataFieldFromVar("TermAmount", "changeInLimit")
        .mathWithCostDataField(TC_MULTIPLICATION, "BaseRate")
        .roundingStep(TC_HALFEVEN, TC_0)
        .createAndCommit()

    return routine
  }

  /**
   * Creates the HOP Coverage D Increased Limit rate routine
   *
   * @return the <code>CalcRoutineDefinition</code> for this rate routine
   */
  static function createCoverageDIncreasedLimitCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)

    var defaultCovLimitPercentangeBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getCovDDefaultLimitPercentage(entity.HOPLine)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("line")
            .withParamType("entity.HOPLine")
            .withInScope(TC_POLICYLINE, null, "entity.HOPLine", false))

    var covLimitPercentangeBuilder = new CalcStepDefinitionOperandBuilder()
        .withOperandType(TC_INSCOPE)
        .withInScope(TC_COVERAGE,
            "LimitPercentage", "java.math.BigDecimal", false)

    var covlimitBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getPrimaryCoverageLimit(entity.HOPLine)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("line")
            .withParamType("entity.HOPLine")
            .withInScope(TC_POLICYLINE, null, "entity.HOPLine", false))

    var formFactorBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_COV_D_INCREASED_LIMIT_FACTOR_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_INCREASED_LIMIT_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_COV_D_INCREASED_LIMIT_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("COVERAGE_FORM"))

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_COV_D_INCREASED_LIMIT_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPCovDIncreasedLimitRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)
        .withStep(createAssignmentStepWithNotes(
            "covLimit",
            covlimitBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetPrimaryCoverage")))
        .storeToCostDataField("BaseRate", formFactorBuilder)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .blankStep()

        .storeValue("defaultCashLimit", defaultCovLimitPercentangeBuilder)
        .mathWithLocalVar(TC_MULTIPLICATION, "covLimit")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeValue("cashLimit", covLimitPercentangeBuilder)
        .mathWithLocalVar(TC_MULTIPLICATION, "covLimit")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeFromLocalVarWithLeftParen("changeInLimit", "cashLimit")
        .mathStepWithRightParen(new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_SUBTRACTION)
            .withLocalVariable("defaultCashLimit"))
        .mathStepConstant(TC_DIVISION, "java.math.BigDecimal", "1000")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .storeToCostDataFieldFromVar("TermAmount", "changeInLimit")
        .mathWithCostDataField(TC_MULTIPLICATION, "BaseRate")
        .roundingStep(TC_HALFEVEN, TC_0)
        .createAndCommit()

    return routine
  }

  static function createAllPerilsDeductibleCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_ALL_PERILS_PARAM_SET_CODE)

    var territoryCodeBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getTerritoryCode(entity.HOPDwelling)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("dwelling")
            .withParamType("entity.HOPDwelling")
            .withInScope(TC_HOPDWELLING, null, "entity.HOPDwelling", false))

    var allPerilsDeductBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getAllPerilsDeductValue(entity.HOPDwelling)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("dwelling")
            .withParamType("entity.HOPDwelling")
            .withInScope(TC_HOPDWELLING, null, "entity.HOPDwelling", false))

    var limitBuilder = new CalcStepDefinitionOperandBuilder()
        .withFunctionName("getPrimaryCoverageLimit(entity.HOPLine)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("line")
            .withParamType("entity.HOPLine")
            .withInScope(TC_POLICYLINE, null, "entity.HOPLine", false))

    var allPerilsDeductibleFactorBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_ALL_PERILS_DEDUCTIBLE_FACTOR_CODE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("COVERAGE_PART")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("TERRITORY_CODE")
            .withParamType("String")
            .withLocalVariable("territoryCode"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("LIMIT")
            .withParamType("Integer")
            .withLocalVariable("limit"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("DEDUCTIBLE")
            .withParamType("Integer")
            .withLocalVariable("deductible"))
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_ALL_PERILS_DEDUCT_ARG_SET_CODE)
        .withOperandType(TC_RATETABLE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_ALL_PERILS_DEDUCTIBLE_FACTOR))

    var basePremiumBuilder = new CalcStepDefinitionOperandBuilder()
        .withInScope(TC_HOPBASEPREMIUMINFO, "BasePremium", "java.math.BigDecimal", false)
        .withOperatorType(null)

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_ALL_PERILS_DEDUCT_PREMIUM_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPAllPerilsDeductRRName")
        .withPolicyLinePatternCode("HOPLine")
        .withParamSet(paramSet)

        .sectionCommentStep(DisplayKey.get("Web.Rating.RateRoutine.SectionComments.AllPerilsCalSection"))
        .withStep(createAssignmentStepWithNotes(
            "territoryCode",
            territoryCodeBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetTerritoryCode")))
        .withStep(createAssignmentStepWithNotes(
            "deductible",
            allPerilsDeductBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetSectionIDedPerilsTermValue")))
        .withStep(createAssignmentStepWithNotes(
            "limit",
            limitBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.GetPrimaryCoverage")))
        .withStep(createAssignmentStepWithNotes(
            "allPerilsDeductFactor",
            allPerilsDeductibleFactorBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.LookupAllPerilsDedFactor")))
        .blankStep()

        .sectionCommentStep(DisplayKey.get("Web.Rating.RateRoutine.SectionComments.CostDataFieldsCalSection"))
        .storeToCostDataFieldFromVar("BaseRate", "allPerilsDeductFactor")
        .storeToCostDataFieldFromVar("AdjustedRate", "allPerilsDeductFactor")
        .storeToCostDataField("Basis", basePremiumBuilder)
        .copyCostDataField("TermAmount", "Basis")
        .mathWithCostDataField(TC_MULTIPLICATION, "AdjustedRate")
        .roundingStep(TC_HALFEVEN, TC_0)
        .createAndCommit()

    return routine
  }

  /**
   * Creates the HOP Coverage E Increased Limit rate routine
   *
   * @return the <code>CalcRoutineDefinition</code> for this rate routine
   */
  private static function createCoverageEIncreasedLimitCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)

    var coverageEIncreasedLimitFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_COV_E_INCREASED_LIMIT_FACTOR_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_COV_E_INCREASED_LIMIT_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("LIMIT"))

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_COV_E_INCREASED_LIMIT_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPCovEIncreasedLimitRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)
        .storeConstantToCostDataFieldWithLeftParen("Basis", "1", 0)
        .withStep(createAssignmentStepWithNotes(
            "coverageEFactorLookup",
            coverageEIncreasedLimitFactorLookup,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.LookupCovEIncLimitFactor")))
        .blankStep()

        .storeToCostDataFieldFromVar("BaseRate", "coverageEFactorLookup")
        .storeToCostDataFieldFromVar("AdjustedRate", "coverageEFactorLookup")
        .storeToCostDataFieldFromVar("TermAmount", "coverageEFactorLookup")
        .createAndCommit()

    return routine
  }

  /**
   * Creates the HOP Coverage F Increased Limit rate routine
   *
   * @return the <code>CalcRoutineDefinition</code> for this rate routine
   */
  private static function createCoverageFIncreasedLimitCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)

    var coverageFIncreasedLimitFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_COV_F_INCREASED_LIMIT_FACTOR_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_COV_F_INCREASED_LIMIT_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("LIMIT"))

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_COV_F_INCREASED_LIMIT_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPCovFIncreasedLimitRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)
        .storeConstantToCostDataFieldWithLeftParen("Basis", "1", 0)
        .withStep(createAssignmentStepWithNotes(
            "coverageFFactorLookup",
            coverageFIncreasedLimitFactorLookup,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.LookupCovFIncLimitFactor")))
        .blankStep()

        .storeToCostDataFieldFromVar("BaseRate", "coverageFFactorLookup")
        .storeToCostDataFieldFromVar("AdjustedRate", "coverageFFactorLookup")
        .storeToCostDataFieldFromVar("TermAmount", "coverageFFactorLookup")
        .createAndCommit()

    return routine
  }

  /**
   * Creates the HOP Scheduled Personal Property rate routine
   *
   * @return the <code>CalcRoutineDefinition</code> for this rate routine
   */
  private static function createScheduledPersonalPropertyCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)

    var scheduledPropertyRateBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_SCHEDULED_PERSONAL_PROPERTY_FACTOR_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_SCHEDULED_ITEM_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_SCHEDULED_PERSONAL_PROPERTY_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("CODE"))

    var itemLimit = new CalcStepDefinitionOperandBuilder()
        .withOperandType(TC_INSCOPE)
        .withInScope(TC_COVERAGE,
            "Limit", "java.math.BigDecimal", false)

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_SCH_PERSONAL_PROPERTY_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPScheduledItemRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)
        .storeToCostDataField("BaseRate", scheduledPropertyRateBuilder)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .blankStep()

        .storeToCostDataField("Basis", itemLimit)
        .mathStepConstant(TC_DIVISION, "java.math.BigDecimal", "500")
        .roundingStep(TC_HALFEVEN, TC_0)
        .blankStep()

        .copyCostDataField("TermAmount", "Basis")
        .mathWithCostDataField(TC_MULTIPLICATION, "AdjustedRate")
        .roundingStep(TC_HALFEVEN, TC_0)
        .createAndCommit()

    return routine
  }

  /**
   * Creates the HOP Ordinance or Law Factor rate routine
   *
   * @return the <code>CalcRoutineDefinition</code> for this rate routine
   */
  static function createOrdinanceOrLawFactorCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition
    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)

    var ordinanceLawFactorBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_ORDINANCE_LAW_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_ORDINANCE_OR_LAW_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_ORDINANCE_LAW_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("LIMIT_PERCENTAGE"))

    var basePremiumBuilder = new CalcStepDefinitionOperandBuilder()
        .withInScope(TC_HOPBASEPREMIUMINFO, "BasePremium", "java.math.BigDecimal", false)
        .withOperatorType(null)

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_ORDINANCE_OR_LAW_FACTOR_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPOrdinanceOrLawRRName")
        .withPolicyLinePatternCode(HOPSampleDataTablesBuilder.HOP_LINE)
        .withParamSet(paramSet)

        .storeToCostDataField("BaseRate", ordinanceLawFactorBuilder)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .storeToCostDataField("Basis", basePremiumBuilder)
        .blankStep()

        .storeToCostDataField("TermAmount", basePremiumBuilder)
        .mathStep(new CalcStepDefinitionOperandBuilder()
            .withCostDataField("BaseRate")
            .withOperatorType(TC_MULTIPLICATION))
        .roundingStep(TC_HALFEVEN, TC_0)
        .createAndCommit()

    return routine
  }

  private static function createModifierPremiumCalcRoutine(): CalcRoutineDefinition {
    var routine: CalcRoutineDefinition

    var paramSet = retrieveParameterSet(TinySampleRatingData.HOP_MOD_PREM_PARAM_SET_CODE)

    var basePremiumBuilder = new CalcStepDefinitionOperandBuilder()
        .withInScope(TC_HOPMODIFIERBASIS, "", "java.math.BigDecimal", false)
        .withOperatorType(null)

    var modifierRateBuilder = new CalcStepDefinitionOperandBuilder()
        .withTableCode(HOPSampleDataTablesBuilder.HOP_MODIFIER_FACTOR_CODE)
        .withArgumentSourceSetCode(HOPSampleDataTablesBuilder.HOP_MOD_PREM_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(HOPSampleDataTablesBuilder.HOP_MODIFIER_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("MODIFIER")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("MODIFIER_VALUE")
            .withParamType("String"))

    routine = new CalcRoutineDefinitionBuilder()
        .withCode(HOP_MODIFIER_PREMIUM_RR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateRoutine.HOPModifierPremiumRRName")
        .withPolicyLinePatternCode("HOPLine")
        .withParamSet(paramSet)
        .withStep(createAssignmentStepWithNotes(
            "basePremium",
            basePremiumBuilder,
            DisplayKey.get("Web.Rating.RateRoutine.HOPLineComments.ModifierBasis")))
        .storeToCostDataFieldFromVar("Basis", "basePremium")
        .storeToCostDataField("BaseRate", modifierRateBuilder)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .copyCostDataField("TermAmount", "Basis")
        .mathWithCostDataField(TC_MULTIPLICATION, "AdjustedRate")
        .roundingStep(TC_HALFEVEN, TC_0)
        .createAndCommit()
    return routine
  }

  //===========================================================================
  // Utility Functions
  //===========================================================================

  /**
   * Retrieves a calculation parameter set
   *
   * @param code the code of the parameter set to retrieve
   * @return the <code>CalcRoutineParameterSet</code> associated with the specified code
   * @throws IllegalStateException if a parameter set cannot be located
   */
  static function retrieveParameterSet(code: String): CalcRoutineParameterSet {
    return Query.make(CalcRoutineParameterSet)
        .compare(CalcRoutineParameterSet#Code, Equals, code)
        .select()
        .single()
  }

  private static function createAssignmentStepWithNotes(storeLoc: String, operand: CalcStepDefinitionOperandBuilder, notes: String): CalcStepDefinitionBuilder {
    return new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withStoreLocation(storeLoc)
        .withOperand(operand.withOperatorType(TC_STORE))
        .withNotes(notes)
  }
}