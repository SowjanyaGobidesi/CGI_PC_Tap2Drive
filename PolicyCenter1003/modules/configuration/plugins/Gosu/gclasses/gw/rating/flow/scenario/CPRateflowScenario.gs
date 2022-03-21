package gw.rating.flow.scenario

uses gw.api.database.Query
uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionArgumentBuilder
uses gw.rating.flow.builders.CalcStepDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionOperandBuilder
uses gw.rating.flow.builders.CalcStepDefinitionRateFactorBuilder
uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.CPSampleDataTablesBuilder
uses gw.rating.sample.CPRatingSampleDataScenario
uses java.util.ArrayList

@Export
class CPRateflowScenario {

  public static final var CP_COV_PREMIUM_RR_CODE : String = "cp_cov_premium_rr"
  public static final var CP_COV_PREMIUM_RR_NAME : String = "CP Coverage Premium Algorithm"

  static property get SampleDataScenario() : RatingScenario {
    var scenario = CPRatingSampleDataScenario.SampleDataScenario()

    var routines = new ArrayList<CalcRoutineDefinition>()
    routines.add(createCPCoverageCalcRoutine())

    var currentRateBook  = scenario.BookBuilders.last()
    routines.each(\ r -> currentRateBook.withCalcRoutine(r))

    return scenario
  }

  static function createCPCoverageCalcRoutine(): CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    var baseArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("CPLine", CPSampleDataTablesBuilder.CP_COV_BASE_RATE_CODE, CPSampleDataTablesBuilder.CP_ARG_SET_CODE)
    var deductArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("CPLine", CPSampleDataTablesBuilder.CP_DEDUCT_CODE, CPSampleDataTablesBuilder.CP_ARG_SET_CODE)
    var uwArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("CPLine", CPSampleDataTablesBuilder.CP_UW_COMPANY_CODE, "DEFAULT") 

    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {

      var paramSet = Query.make(CalcRoutineParameterSet).compare(CalcRoutineParameterSet#Code, Equals, "CPCoverageWrapperParamSet").select().single()

      var baseRateLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(CPSampleDataTablesBuilder.CP_COV_BASE_RATE_CODE)
        .withArgumentSourceSetCode(CPSampleDataTablesBuilder.CP_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(CPSampleDataTablesBuilder.CP_COV_BASE_RATE_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withDefaultArgumentSources(baseArgumentSet)

      var cpCovLimitTermValue = new CalcStepDefinitionOperandBuilder()
          .withInScope(CalcRoutineParamName.TC_COVERAGE, "Limit", "java.math.BigDecimal", false)

      var deductibleFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(CPSampleDataTablesBuilder.CP_DEDUCT_CODE)
        .withArgumentSourceSetCode(CPSampleDataTablesBuilder.CP_ARG_SET_CODE)
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(CPSampleDataTablesBuilder.CP_DEDUCT_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withOperatorType(TC_MULTIPLICATION)
        .withDefaultArgumentSources(deductArgumentSet)

      var fireProtectionClassFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(CPSampleDataTablesBuilder.CP_FIRE_PROTECT_CLASS_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(CPSampleDataTablesBuilder.CP_FIRE_PROTECT_CLASS_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("FIRE_PROTECT_CLASS"))

      var uwCompanyFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(CPSampleDataTablesBuilder.CP_UW_COMPANY_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(CPSampleDataTablesBuilder.CP_UW_COMPANY_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withDefaultArgumentSources(uwArgumentSet)

      routine = new CalcRoutineDefinitionBuilder()
            .withCode(CP_COV_PREMIUM_RR_CODE)
            .withName(CP_COV_PREMIUM_RR_NAME)
            .withPolicyLinePatternCode("CPLine")
            .withParamSet(paramSet)
            .storeToCostDataField("BaseRate", baseRateLookup)
            .storeToCostDataField("Basis", cpCovLimitTermValue)
            .storeValue("deductibleFactor", deductibleFactorLookup)
            .copyCostDataField("AdjustedRate", "BaseRate")
            .mathStep(new CalcStepDefinitionOperandBuilder().withLocalVariable("deductibleFactor").withOperatorType(TC_MULTIPLICATION))
            .withStep(new CalcStepDefinitionBuilder().withStepType(TC_CONTINUE)
                  .withOperand(fireProtectionClassFactorLookup.withOperatorType(TC_MULTIPLICATION)))
            .withStep(new CalcStepDefinitionBuilder().withStepType(TC_CONTINUE)
                  .withOperand(uwCompanyFactorLookup.withOperatorType(TC_MULTIPLICATION)))
            .mathStepWithLeftParenAndConstant(TC_MULTIPLICATION, "1", 1)
            .mathStep(new CalcStepDefinitionOperandBuilder()
                  .withOperatorType(TC_ADDITION)
                  .withRightParentheses(1)
                  .withInScope(TC_POLICYLINE, "CPScheduleCredits", "java.math.BigDecimal", true))
            .mathStep(new CalcStepDefinitionOperandBuilder()
                  .withOperatorType(TC_MULTIPLICATION)
                  .withInScope(TC_POLICYLINE, "ProductModifierFactor", "java.math.BigDecimal", false))
            .withStep(new CalcStepDefinitionBuilder().withStepType(TC_ASSIGNMENT)
                      .withStoreLocation("basisFactor")
                      .withNotes("CP rates per $100 of limit")
                      .withOperand(new CalcStepDefinitionOperandBuilder()
                              .withOperatorType(TC_STORE)
                              .withTypedConstant("0.01", java.math.BigDecimal)))
            .storeToCostDataField("TermAmount", new CalcStepDefinitionOperandBuilder().withCostDataField("Basis"))
            .mathStep(new CalcStepDefinitionOperandBuilder().withCostDataField("AdjustedRate").withOperatorType(TC_MULTIPLICATION))
            .mathStep(new CalcStepDefinitionOperandBuilder().withLocalVariable("basisFactor").withOperatorType(TC_MULTIPLICATION))
            .roundingStep(TC_HALFUP, TC_0)
            .create(bundle)
    })

    return routine
  }
}
