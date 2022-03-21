package gw.rating.flow.scenario

uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionArgumentBuilder
uses gw.rating.flow.builders.CalcStepDefinitionOperandBuilder
uses gw.rating.flow.builders.CalcStepDefinitionRateFactorBuilder
uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.GenericSampleDataTablesBuilder
uses gw.rating.sample.GenericRatingSampleDataScenario

uses java.util.ArrayList

@Export
class GenericRateflowScenario {

  public static final var GX_STATE_TAX_RR_CODE : String = "gx_state_tax_rr"
  public static final var GENERIC_STATE_TAX_RR_NAME : String = "Generic State Tax Calculation"

  static property get SampleDataScenario() : RatingScenario {
    var scenario = GenericRatingSampleDataScenario.SampleDataScenario()

    var routines = new ArrayList<CalcRoutineDefinition>()
    routines.add(createGenericTaxCalcRoutine())

    var currentRateBook  = scenario.BookBuilders.last()
    routines.each(\ r -> currentRateBook.withCalcRoutine(r))

    return scenario
  }

  static function createGenericTaxCalcRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routine = createGenericTaxCalcRoutineBuilder().create(bundle)
    })

    return routine
  }

  static function createGenericTaxCalcRoutineBuilder() : CalcRoutineDefinitionBuilder {
    var baseState = new CalcStepDefinitionArgumentBuilder().withParam("JURISDICTION").withInScope(CalcRoutineParamName.TC_STATE, null, "typekey.Jurisdiction", false)
    var baseRate = new CalcStepDefinitionOperandBuilder()
        .withTableCode(GenericSampleDataTablesBuilder.GX_STATE_TAX_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(GenericSampleDataTablesBuilder.GENERIC_STATE_TAX_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(baseState)


    var taxParamSet = GenericSampleDataTablesBuilder.GenericStateTaxParamSet.get()
    var multiplyWithBasis = new CalcStepDefinitionOperandBuilder().withInScope(TC_TAXABLEBASIS,
        null, "java.math.BigDecimal", false).withOperatorType(TC_MULTIPLICATION)

    var subOperand1 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withInScope(CalcRoutineParamName.TC_POLICYLINE, "PatternCode", "java.lang.String", false)
        .withOperandOrder(1)

    var subOperand2 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_EQUAL)
        .withOperandType(TC_CONSTANT)
        .withOperandOrder(2)
        .withConstant("\"PersonalAutoLine\"")

    var subOperand3 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_AND)
        .withInScope(CalcRoutineParamName.TC_STATE, null, "typekey.Jurisdiction", false)
        .withOperandOrder(3)

    var subOperand4 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_IN)
        .withOperandOrder(4)
        .asTypeKeyCollection({Jurisdiction.TC_NY, Jurisdiction.TC_FL})

    var shouldRoundToPennies = {subOperand1, subOperand2, subOperand3, subOperand4}

    var taxableBasis = new CalcStepDefinitionOperandBuilder()
        .withInScope(TC_TAXABLEBASIS, "", "java.math.BigDecimal", false)

    var routine = new CalcRoutineDefinitionBuilder()
        .withCode(GX_STATE_TAX_RR_CODE)
        .withName(GENERIC_STATE_TAX_RR_NAME)
        .withParamSet(taxParamSet)
        .storeToCostDataField("BaseRate", baseRate)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .storeToCostDataField("Basis", taxableBasis)
        .storeValue("unscaledTermAmount", new CalcStepDefinitionOperandBuilder().withCostDataField("AdjustedRate"))
        .mathStep(multiplyWithBasis)
        .ifConditional(shouldRoundToPennies)
        .storeToCostDataFieldFromVar("TermAmount", "unscaledTermAmount")
        .roundingStep(TC_HALFUP, TC_2)
        .elseStep()
        .storeToCostDataFieldFromVar("TermAmount", "unscaledTermAmount")
        .roundingStep(TC_HALFUP, TC_0)
        .endifStep()

    return routine
  }
}
