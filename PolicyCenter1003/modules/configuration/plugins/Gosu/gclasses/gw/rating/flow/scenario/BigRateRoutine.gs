package gw.rating.flow.scenario

uses gw.rating.rtm.builders.scenario.sample.SampleDataTablesBuilder
uses java.math.BigDecimal
uses gw.api.database.Query
uses gw.util.Pair
uses java.lang.Integer
uses gw.rating.flow.util.QueryUtils
uses java.util.Map
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.pl.persistence.core.Bundle
uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionOperandBuilder
uses gw.rating.flow.builders.CalcStepDefinitionRateFactorBuilder
uses gw.rating.flow.builders.CalcStepDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionArgumentBuilder

@Export
class BigRateRoutine {

  public static final var BIG_RATE_ROUTINE_CODE : String = "PA_ENORMOUS_ROUTINE"
  public static final var BIG_RATE_ROUTINE_NAME : String = "PA Big Routine "

  public static final var SIMPLE_RATE_ROUTINE_CODE : String = "PA_SIMPLE_ROUTINE"
  public static final var SIMPLE_RATE_ROUTINE_NAME : String = "PA Simple Routine "

  private construct() {} // don't allow "new" on this class

  static function normalizeSize(size : int) : Pair<Integer, Integer> {
    size -= 20 // there are about 20 boilerplate rows

    var sevens = (size + 6) / 12  // 5 + 7 == 12
    var fives = (size - 7*sevens) / 5
    var remainder = size - 5*fives - 7*sevens

    while (remainder > 7) {
      sevens++
      remainder -= 7
    }

    // we should end up at size += 2
    while (remainder > 2) {
      fives++
      remainder -= 5
    }

    return Pair.make(fives, sevens)
  }

  static function findOrCreateSimpleRoutine(size : int, bundle : Bundle = null) : CalcRoutineDefinition {
    // based on algorithm used to create simple routine, size must end in {0,1,4,7}
    while (not {0,1,4,7}.contains(size % 10)) size--

    var simpleRR = Query.make(CalcRoutineDefinition)
        .compare("Code", Equals, SIMPLE_RATE_ROUTINE_CODE + "_" + size)
        .select()
        .AtMostOneRow

    if (simpleRR == null) {
      simpleRR = createSimpleRoutine(size, bundle)
    }

    return simpleRR

  }

  static function createSimpleRoutine(size : int, bundle : Bundle) : CalcRoutineDefinition {
    var code = SIMPLE_RATE_ROUTINE_CODE + "_" + size
    var builder = new CalcRoutineDefinitionBuilder()
        .withCode(code)
        .withName(SIMPLE_RATE_ROUTINE_NAME + code.substring(BIG_RATE_ROUTINE_CODE.length + 1))
        .withParamSet(SampleDataTablesBuilder.PAVehicleCoverageParamSet)
        .sectionCommentStep("Base Rate and Adjusted Rate calculation")

    var i = 1
    while (i < size) {
      if (i == 30) {
        builder.sectionCommentStep(null) // make sure there's a null in this routine, for testing purposes
        i += 1
      }else if (i == 44) {
        builder.ifConstant("false")
            .sectionCommentStep("Section Comment Inside If 1")
            .storeConstant("var1", "1")
            .elseifConstant("true")
            .sectionCommentStep("Section Comment Inside If 2")
            .storeConstant("var1", "2")
            .endifStep()
        i += 7
      }else if (i % 10 == 0) {
        builder.sectionCommentStep("Step number ${i}")
        i += 1
      } else {
        builder.storeConstant("var" + i, "" + i)
        builder.mathStepConstant(CalcStepOperatorType.TC_MULTIPLICATION, "" + i)
        builder.mathStepConstant(CalcStepOperatorType.TC_MULTIPLICATION, "" + i)
        i += 3
      }
    }

    return bundle == null ? builder.create() // for testing purposes, this does not need to be committed.
                          : builder.create(bundle)
  }

  static function getOrCreateBigRateRoutine(size : int) : CalcRoutineDefinition {
    var p = normalizeSize(size)

    var requiredTables : Map<String, block() : RateTableDefinitionBuilder> = {
      SampleDataTablesBuilder.PA_COV_BASE_RATE   -> \-> SampleDataTablesBuilder.aBaseRateTableDefBuilder(),
      SampleDataTablesBuilder.PA_COVERAGES       -> \-> SampleDataTablesBuilder.aCoveragesTableDefBuilder(),
      SampleDataTablesBuilder.PA_UW_COMPANY      -> \-> SampleDataTablesBuilder.aUWCompanyTableDefBuilder(),
      PARateflowScenario.PA_MINIMUMPREMIUM_CODE  -> \-> PARateflowScenario.aMinimumPremiumTableDefBuilder(),
      PARateflowScenario.PA_VEHICLE_TYPE_CODE    -> \-> PARateflowScenario.aVehicleTypeTableDefBuilder(),
      SampleDataTablesBuilder.PA_VEHICLE_COST    -> \-> SampleDataTablesBuilder.aVehicleCostTableDefBuilder(),
      SampleDataTablesBuilder.PA_DRIVER_AGE      -> \-> SampleDataTablesBuilder.aDriverAgeTableDefBuilder()
    }

    gw.transaction.Transaction.runWithNewBundle(\b -> {
      for (k in requiredTables.Keys) {
        if (QueryUtils.getRateTableDefinitionForCodeAndLine(k, "PersonalAutoLine") == null) {
          print("Must create table " +k)
          java.lang.System.out.flush()
          requiredTables.get(k)().create(b)
        }
      }
    })

    var bigRR = Query.make(CalcRoutineDefinition)
      .compare("Code", Equals, BIG_RATE_ROUTINE_CODE + "_" + size)
      .select()
      .AtMostOneRow

    if (bigRR == null) {
      gw.transaction.Transaction.runWithNewBundle(\ b ->{
        bigRR = baseRateVehicleCoverageCalcRoutineBldr( BIG_RATE_ROUTINE_CODE + "_" + size, p.First, p.Second).create(b)
      }, "su")
    }

    return bigRR
  }

  static function findOrCreateBigRateRoutine() : CalcRoutineDefinition {
    return getOrCreateBigRateRoutine(1500)
  }

  static function baseRateVehicleCoverageCalcRoutineBldr(code : String, fives : int, sevens : int) : CalcRoutineDefinitionBuilder {
    var baseArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COV_BASE_RATE, "DEFAULT")
    var covsArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COVERAGES, "DEFAULT")
    var uwArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_UW_COMPANY, "DEFAULT")
    var minArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PARateflowScenario.PA_MINIMUMPREMIUM_CODE, "DEFAULT")
    var typeArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PARateflowScenario.PA_VEHICLE_TYPE_CODE, "DEFAULT")
    var costArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_VEHICLE_COST, "DEFAULT")
    var ageArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_DRIVER_AGE, "DEFAULT")

    var baseRateLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
        .withDefaultArgumentSources(baseArgumentSet)

    var vehicleTypeFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(PARateflowScenario.PA_VEHICLE_TYPE_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PARateflowScenario.PA_VEHICLE_TYPE_FACTOR))
        .withDefaultArgumentSources(typeArgumentSet)

    var vehicleCostFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_VEHICLE_COST)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_VEHICLE_COST_FACTOR))
        .withDefaultArgumentSources(costArgumentSet)

    // Steps with Builder separated out so that comments can be added.`

    var baseRateRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_HALFUP)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_3))

    var adjRateAssignmentStep = new CalcStepDefinitionBuilder()
      .withStepType( TC_ASSIGNMENT )
      .withInScopeLocation(TC_COSTDATA, "AdjustedRate")
      .withStoreType(BigDecimal)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withInScope(TC_COSTDATA, "BaseRate", "java.math.BigDecimal", false))

   var dollarCapRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_DOWN)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_0))

   var percentCapRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_DOWN)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_0))

    var priorTermAmountOperand = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withInScope(TC_PREVIOUSTERMAMOUNT, null, "java.math.BigDecimal", false)
        .withOperandOrder(1)

    var capAmountOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withLocalVariable("cap")
          .withLocalVariableFieldName(SampleDataTablesBuilder.PA_RENEWAL_CAP_AMOUNT)
          .withOperandOrder(1)

    var capPercentOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withLocalVariable("cap")
          .withLocalVariableFieldName(SampleDataTablesBuilder.PA_RENEWAL_CAP_PERCENT)
          .withOperandOrder(1)

    var builder = new CalcRoutineDefinitionBuilder()
        .withCode(code)
        .withName(BIG_RATE_ROUTINE_NAME + code.substring(BIG_RATE_ROUTINE_CODE.length + 1))
        .withParamSet(SampleDataTablesBuilder.PAVehicleCoverageParamSet)
        .sectionCommentStep("Base Rate and Adjusted Rate calculation")

        builder.storeToCostDataField("BaseRate", baseRateLookup)
        .withStep(baseRateRoundingStep.withNotes("Round Base Rate to thousandths (Round Half Up)"))
        .storeValue("vehicleTypeFactor", vehicleTypeFactorLookup)
        .storeValue("vehicleCostFactor", vehicleCostFactorLookup)
        .withStep(adjRateAssignmentStep.withNotes("Determine Adjusted Rate"))

    // (6 steps so far)

    // do math steps, in multiples of five
    var stop = 50
    var incr = 50
    var newStmt = false
    for (i in 1..|fives) {
      if (i*5 == stop) {
        builder.sectionCommentStep("BaseRate/AdjustedRate step " + (i*5))
        incr = incr + 25
        stop = stop + incr
        newStmt = true
      }

      var uwCompanyLookup = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_MULTIPLICATION)
          .withTableCode(SampleDataTablesBuilder.PA_UW_COMPANY)
          .withArgumentSourceSetCode("DEFAULT")
          .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(SampleDataTablesBuilder.PA_UW_COMPANY_FACTOR))
          .withDefaultArgumentSources(uwArgumentSet)

      var coverageLookup = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_MULTIPLICATION)
          .withTableCode(SampleDataTablesBuilder.PA_COVERAGES)
          .withArgumentSourceSetCode("DEFAULT")
          .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(SampleDataTablesBuilder.PA_COVERAGES_FACTOR))
          .withDefaultArgumentSources(covsArgumentSet)

      var multiCarDiscountModifier = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_MULTIPLICATION)
          .withOperandType(TC_INSCOPE)
          .withInScopeReference(TC_POLICYLINE, "PAMultiCarDiscount", "java.math.BigDecimal", true)

      var driverAgeFactorLookup = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_MULTIPLICATION)
          .withTableCode(SampleDataTablesBuilder.PA_DRIVER_AGE)
          .withArgumentSourceSetCode("DEFAULT")
          .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(SampleDataTablesBuilder.PA_DRIVER_AGE_FACTOR))
          .withDefaultArgumentSources(ageArgumentSet)

      var minFunction = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_MULTIPLICATION)
          .withFunctionName("min(java.math.BigDecimal, java.math.BigDecimal)")
          .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParamType("java.math.BigDecimal")
            .withParam("num1")
            .withLocalVariable("vehicleCostFactor"))
          .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParamType("java.math.BigDecimal")
            .withParam("num2")
            .withLocalVariable("vehicleTypeFactor"))

      if (newStmt) {
        builder.storeValue("var" + i, coverageLookup)
        newStmt = false
      } else {
        builder.mathStep(coverageLookup)
      }

      builder.mathStep(uwCompanyLookup)
      .mathStep(multiCarDiscountModifier)
      .mathStep(minFunction)
      .mathStep(driverAgeFactorLookup)
    }

    // (2 more boilerplate steps)
    builder.blankStep()
    .sectionCommentStep("Term Amount Determination")

    // do conditionals, in multiples of 7
    stop = 140
    incr = 140
    for (i in 1..|sevens) {
      if (i*7 == stop) {
        builder.sectionCommentStep("Term Amount step " +(i*7))
        incr = incr + 70
        stop = stop + incr
      }
      var subOperand1 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withCostDataField("AdjustedRate")
          .withOperandOrder(1)

      var subOperand2 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_LESSTHAN)
          .withOperandType(TC_RATETABLE)
          .withOperandOrder(2)
          .withTableCode(PARateflowScenario.PA_MINIMUMPREMIUM_CODE)
          .withArgumentSourceSetCode("DEFAULT")
          .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(PARateflowScenario.PA_MINIMUMPREMIUM_FACTOR))
          .withDefaultArgumentSources(minArgumentSet)

      var subOperand3 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_AND)
          .withOperandType(TC_INSCOPE)
          .withInScopeReference(TC_VEHICLE, "VehicleType", "typekey.VehicleType", false)
          .withOperandOrder(3)

      var subOperand4 = new CalcStepDefinitionOperandBuilder()
          .withTypeListConstant(VehicleType.TC_OTHER)
          .withOperatorType(TC_EQUAL)
          .withOperandOrder(4)

      var termAmountRoundingStep = new CalcStepDefinitionBuilder()
        .withStepType(TC_CONTINUE)
        .withOperand(new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_UP)
          .withOperandType(TC_ROUNDING)
          .withRoundingScale(TC_MINUS1))

     var dollarRoundingStep = new CalcStepDefinitionBuilder()
        .withStepType(TC_CONTINUE)
        .withOperand(new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_UP)
          .withOperandType(TC_ROUNDING)
          .withRoundingScale(TC_0))

      var termAmountAssignmentStep = new CalcStepDefinitionBuilder()
        .withStepType( TC_ASSIGNMENT )
        .withInScopeLocation(TC_COSTDATA, "TermAmount")
        .withStoreType(BigDecimal)
        .withOperand(new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withInScope(TC_COSTDATA, "AdjustedRate", "java.math.BigDecimal", false))

      var minimumPremiumLookup = new CalcStepDefinitionOperandBuilder()
          .withTableCode(PARateflowScenario.PA_MINIMUMPREMIUM_CODE)
          .withArgumentSourceSetCode("DEFAULT")
          .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(PARateflowScenario.PA_MINIMUMPREMIUM_FACTOR))
          .withDefaultArgumentSources(minArgumentSet)

      builder.ifConditional({subOperand1, subOperand2, subOperand3, subOperand4})
      .storeToCostDataField("TermAmount", minimumPremiumLookup)
      .withStep(termAmountRoundingStep.withNotes("Round Up minimum premium to 10s dollars"))
      .elseStep()
      .withStep(termAmountAssignmentStep.withNotes("Otherwise round to dollars"))
      .withStep(dollarRoundingStep)
      .endifStep()
    }

    // (2 more boilerplate steps)
    builder.blankStep()
    .sectionCommentStep("Apply coverage level renewal capping")

    // rate capping section, 10 steps
    builder.ifConditional({priorTermAmountOperand, compareNotNull()}, "Can only compute cap if we have prior term amount")
      .storeRateTableLookup("cap", SampleDataTablesBuilder.PA_RENEWAL_CAP, {
        new CalcStepDefinitionArgumentBuilder().withParam("COV_CODE"),
        new CalcStepDefinitionArgumentBuilder().withParam("AMOUNT").withCostDataField("TermAmount")
        }, {SampleDataTablesBuilder.PA_RENEWAL_CAP_AMOUNT, SampleDataTablesBuilder.PA_RENEWAL_CAP_PERCENT}, "DEFAULT")
      .ifConditional({capAmountOperand, compareNotNull()}, "Cap based on absolute amount")
        .storeToCostDataField("CappedTermAmount",
            new CalcStepDefinitionOperandBuilder()
              .withFunctionName("capPremiumByAmount(java.math.BigDecimal, java.math.BigDecimal, java.math.BigDecimal)", java.math.BigDecimal)
              .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("value").withCostDataField("TermAmount").withParamType("java.math.BigDecimal"))
              .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("priorValue").withInScope(TC_PREVIOUSTERMAMOUNT, null, "java.math.BigDecimal", false).withParamType("java.math.BigDecimal"))
              .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("allowedChangeAmount").withLocalVariable("cap", SampleDataTablesBuilder.PA_RENEWAL_CAP_AMOUNT).withParamType("java.math.BigDecimal"))
         )
         .withStep(dollarCapRoundingStep.withNotes("because we cannot exceed cap, must round down"))
      .elseifConditional({capPercentOperand, compareNotNull()}, "Cap based on percentage")
        .storeToCostDataField("CappedTermAmount",
            new CalcStepDefinitionOperandBuilder()
              .withFunctionName("capPremiumByPercent(java.math.BigDecimal, java.math.BigDecimal, java.math.BigDecimal)", java.math.BigDecimal)
              .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("value").withCostDataField("TermAmount").withParamType("java.math.BigDecimal"))
              .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("priorValue").withInScope(TC_PREVIOUSTERMAMOUNT, null, "java.math.BigDecimal", false).withParamType("java.math.BigDecimal"))
              .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("allowedChangePercent").withLocalVariable("cap", SampleDataTablesBuilder.PA_RENEWAL_CAP_PERCENT).withParamType("java.math.BigDecimal"))
         )
        .withStep(percentCapRoundingStep.withNotes("because we cannot exceed cap, must round down"))
     .endifStep()
    .endifStep() // rate capping

    return builder
  }

  private static function compareNotNull() : CalcStepDefinitionOperandBuilder {
   return new CalcStepDefinitionOperandBuilder()
      .withOperatorType(TC_NOTEQUAL)
      .withConstant("null")
      .withOperandOrder(2)
  }

}
