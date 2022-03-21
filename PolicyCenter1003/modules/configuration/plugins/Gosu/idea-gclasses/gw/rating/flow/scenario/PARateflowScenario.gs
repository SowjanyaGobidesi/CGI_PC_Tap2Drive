package gw.rating.flow.scenario

uses gw.api.databuilder.UniqueKeyGenerator
uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionArgumentBuilder
uses gw.rating.flow.builders.CalcStepDefinitionOperandBuilder
uses gw.rating.flow.builders.CalcStepDefinitionBuilder
uses gw.rating.rtm.builders.RateBookBuilder
uses gw.rating.rtm.builders.RateFactorRowBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceSetBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.rating.rtm.builders.scenario.PARateTablesBuilder
uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.SampleDataTablesBuilder
uses gw.rating.rtm.RatingTestMethods
uses gw.rating.sample.PARatingSampleDataScenario
uses gw.pl.persistence.core.Bundle
uses java.util.ArrayList
uses gw.api.database.Query
uses gw.rating.flow.builders.CalcStepDefinitionRateFactorBuilder
uses java.math.BigDecimal
uses java.lang.Integer
uses java.util.List

@Export
class PARateflowScenario implements RatingTestMethods {

  public static final var PA_RATEFLOW_CODE : String = "pa_rateflow"
  public static final var PA_RATEFLOW_FACTOR : String = "Factor"
  public static final var PA_RATEFLOW_TABLE_NAME : String = "Rateflow"

  public static final var PA_VEHICLE_TYPE_CODE : String = "pa_vehicle_type"
  public static final var PA_VEHICLE_TYPE_FACTOR : String = "Factor"
  public static final var PA_VEHICLE_TYPE_TABLE_NAME : String = "VehicleTypeFactor"

  public static final var PA_STATETAX_CODE : String = "pa_state_tax"
  public static final var PA_STATETAX_FACTOR : String = "Factor"
  public static final var PA_STATETAX_TABLE_NAME : String = "PAStateTax"

  public static final var PA_MINIMUMPREMIUM_CODE : String = "pa_minimum_premium"
  public static final var PA_MINIMUMPREMIUM_FACTOR : String = "Factor"
  public static final var PA_MINIMUMPREMIUM_TABLE_NAME : String = "MinPremium"

  public static final var PA_COV_PREMIUM_RR_CODE : String = "pa_cov_premium_rr"
  public static final var PA_COV_PREMIUM_RR_FACTOR : String = "Factor"
  public static final var PA_COV_PREMIUM_RR_NAME : String = "PA Coverage Premium Algorithm"
  
  public static final var PA_VEH_COV_PREMIUM_RR_CODE : String = "pa_veh_cov_premium_rr"
  public static final var PA_VEH_COV_PREMIUM_RR_FACTOR : String = "Factor"
  public static final var PA_VEH_COV_PREMIUM_RR_NAME : String = "PA Vehicle Coverage Premium Algorithm"
  
  public static final var PA_COV_FLATRATE_RR_CODE : String = "pa_cov_flatrate_rr"
  public static final var PA_COV_FLATRATE_RR_NAME : String = "PA Coverage Flat Rate Algorithm"

  public static final var PA_ASSIGN_DRIVER_STYLE1_RR_CODE : String = "pa_assign_driver_style1_rr"
  public static final var PA_ASSIGN_DRIVER_STYLE1_RR_NAME : String = "PA Assign Driver Style 1"
  
  public static final var PA_ASSIGN_DRIVER_STYLE2_RR_CODE : String = "pa_assign_driver_style2_rr"
  public static final var PA_ASSIGN_DRIVER_STYLE2_RR_NAME : String = "PA Assign Driver Style 2"
  
  public static final var PA_STATE_TAX_RR_CODE : String = "pa_state_tax_rr"
  public static final var PA_STATE_TAX_RR_NAME : String = "PA State Tax Calculation"

  public static final var PA_PIP_NJ_BASIC_RR_CODE : String = "pa_pip_nj_basic_rr"
  public static final var PA_PIP_NJ_BASIC_RR_NAME : String = "PIP NJ Basic Algorithm"
  
  public static final var PA_CANCELLATION_SHORT_RATE_PENALTY_CODE : String = "pa_cancellation_short_rate_penalty"
  public static final var PA_CANCELLATION_SHORT_RATE_PENALTY_NAME : String = "PA Cancellation Short Rate Penalty"

  static function aBaseTestScenario() : RatingScenario {
    var scenario = PARatingSampleDataScenario.aRatingSampleDataScenario()
    var lastAddedBookBuilder = scenario.BookBuilders.last()
    addTableTo(lastAddedBookBuilder)

    var routines = new ArrayList<CalcRoutineDefinition>()
    routines.add( createBaseRateCoverageCalcRoutine())
    routines.add( createBaseRateVehicleCoverageCalcRoutine())
    routines.add( createAssignDriverCalcRoutineStyle1())
    routines.add( createAssignDriverCalcRoutineStyle2())
    routines.add( createTaxCalcRoutine())
    routines.add( createPIPNJCalcRoutine())
    routines.add( createFlatRateCalcRoutine())
    routines.add( createCancellationShortRateRoutine())

    var currentRateBook  = scenario.BookBuilders.last()
    routines.each(\ r -> currentRateBook.withCalcRoutine(r) )

    return scenario
  }

  static function createUniqueCalcRoutines() : CalcRoutineDefinition[] {
    var routines : entity.CalcRoutineDefinition[]
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routines = createCalcRoutineBuilders(bundle).map(\ c -> c.withCode(UniqueKeyGenerator.get().nextID()).create(bundle))
    })
    return routines
  }

  static function createCalcRoutines() : CalcRoutineDefinition[] {
    var routines : CalcRoutineDefinition[]
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routines = createCalcRoutineBuilders(bundle).map(\ c -> c.create(bundle))
    })
    return routines
  }

  static function createCalcRoutineBuilders(b : Bundle) : CalcRoutineDefinitionBuilder[] {
    return {createBasicPACoverageRoutineBuilder(b),
            createBasicPAVehicleCoverageRoutineBuilder(),
            createBasicDriverAssignmentRoutineBuilder(),
            createBasicPATaxRoutineBuilder(),
            createBasicPAPipRoutineBuilder(),
            createBasicFlatRateRoutineBuilder()}
  }

  static function createBasicPACoverageRoutineBuilder(bundle : Bundle) : CalcRoutineDefinitionBuilder {
    var paCovRoutine : CalcRoutineDefinitionBuilder
    var vehLicenseStateBldr = new CalcStepDefinitionArgumentBuilder().withParam("PARAM")
    var vehLicState = vehLicenseStateBldr.create(bundle)
    var step = makeStoreRateTableLookupStepBuilder(1, "var1", PA_RATEFLOW_CODE, PA_RATEFLOW_FACTOR, null, {vehLicState})

    paCovRoutine = new CalcRoutineDefinitionBuilder()
      .withCode(PA_COV_PREMIUM_RR_CODE)
      .withName(PA_COV_PREMIUM_RR_NAME)
      .withParamSet(SampleDataTablesBuilder.PACoverageParamSet)
      .withStep(step)
      .storeConstantToCostData("BaseRate", "1")
      .storeConstantToCostData("AdjustedRate", "1")
      .storeLocalVarToCostData("TermAmount", "var1")
    return paCovRoutine
  }

  static function createBasicFlatRateRoutineBuilder() : CalcRoutineDefinitionBuilder {
    return new CalcRoutineDefinitionBuilder()
      .withCode(PA_COV_FLATRATE_RR_CODE)
      .withName(PA_COV_FLATRATE_RR_NAME)
      .withParamSet(SampleDataTablesBuilder.PACoverageParamSet)
      .storeToCostDataField("ProrationMethod", ProrationMethod,
                            new CalcStepDefinitionOperandBuilder().withTypeListConstant(ProrationMethod.TC_FLAT))
      .storeConstantToCostData("BaseRate", "1")
      .storeConstantToCostData("AdjustedRate", "1")
      .storeConstantToCostData("TermAmount", "1")
  }

  static function createBasicPAVehicleCoverageRoutineBuilder() : CalcRoutineDefinitionBuilder {
    return createPAVehCovRoutineWithConstValueRoutineBuilder(1.0bd)
  }

  static function createPAVehCovRoutineWithConstValueRoutineBuilder(constValue : BigDecimal) : CalcRoutineDefinitionBuilder {
    return new CalcRoutineDefinitionBuilder()
      .withCode(PA_VEH_COV_PREMIUM_RR_CODE)
      .withName(PA_VEH_COV_PREMIUM_RR_NAME)
      .withParamSet(SampleDataTablesBuilder.PAVehicleCoverageParamSet)
      .storeConstantToCostData("BaseRate", constValue.toString())
      .storeConstantToCostData("AdjustedRate", constValue.toString())
      .storeConstantToCostData("TermAmount", constValue.toString())
  }


  static function createBasicDriverAssignmentRoutineBuilder() : CalcRoutineDefinitionBuilder {
    var highestPercentUsageFunctionOperandBuilder = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withFunctionName("getHighestPercentDriver(entity.PersonalVehicle)", VehicleDriver)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
          .withParamType("entity.PersonalVehicle")
          .withParam("vehicle")
          .withInScope(TC_VEHICLE, null, "entity.PersonalVehicle", false))
    
    return new CalcRoutineDefinitionBuilder()
      .withCode(PA_ASSIGN_DRIVER_STYLE1_RR_CODE)
      .withName(PA_ASSIGN_DRIVER_STYLE1_RR_NAME)
      .withParamSet(SampleDataTablesBuilder.PADriverAssignmentParamSet)      
      .storeToWriteableParam(TC_DRIVERASSIGNMENTINFO, "AssignedDriver", VehicleDriver,
                             highestPercentUsageFunctionOperandBuilder)
  }

  static function createBasicPATaxRoutineBuilder() : CalcRoutineDefinitionBuilder {
    return new CalcRoutineDefinitionBuilder()
      .withCode(PA_STATE_TAX_RR_CODE)
      .withName(PA_STATE_TAX_RR_NAME)
      .withParamSet(SampleDataTablesBuilder.StateTaxParamSet)
      .storeConstantToCostData("AdjustedRate", "0.0")
      .storeConstantToCostData("BaseRate", "0.0")
      .storeConstantToCostData("TermAmount", "0.0")
  }

  static function createBasicPAPipRoutineBuilder() : CalcRoutineDefinitionBuilder {
    return new CalcRoutineDefinitionBuilder()
      .withCode(PA_PIP_NJ_BASIC_RR_CODE)
      .withName(PA_PIP_NJ_BASIC_RR_NAME)
      .withParamSet(SampleDataTablesBuilder.PIPNJParamSet)
      .storeConstantToCostData("BaseRate", "1")
      .storeConstantToCostData("AdjustedRate", "1")
      .storeConstantToCostData("TermAmount", "1")
  }

  static function createBaseRateCoverageCalcRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routine = baseRateCoverageCalcRoutineBldr().create(bundle)
    })
    return routine
  }

  static function createBaseRateVehicleCoverageCalcRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routine = baseRateVehicleCoverageCalcRoutineBldr().create(bundle)
    })
    return routine
  }

  static function createAssignDriverCalcRoutineStyle1() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routine = assignDriverStyle1CalcRoutineBldr().create(bundle)
    })
    return routine
  }

  static function createAssignDriverCalcRoutineStyle2() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routine = assignDriverStyle2CalcRoutineBldr().create(bundle)
    })
    return routine
  }

  static function baseRateCoverageCalcRoutineBldr() : CalcRoutineDefinitionBuilder {
    var baseArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COV_BASE_RATE, "DEFAULT") 
    var covsArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COVERAGES, "DEFAULT") 
    var uwArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_UW_COMPANY, "DEFAULT") 
    var minArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PA_MINIMUMPREMIUM_CODE, "DEFAULT") 
    var typeArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PA_VEHICLE_TYPE_CODE, "DEFAULT") 
    var costArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_VEHICLE_COST, "DEFAULT") 

    var baseRateLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
        .withDefaultArgumentSources(baseArgumentSet)
        
    var coverageLookup = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(SampleDataTablesBuilder.PA_COVERAGES)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_COVERAGES_FACTOR))
        .withDefaultArgumentSources(covsArgumentSet)

    var uwCompanyLookup = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(SampleDataTablesBuilder.PA_UW_COMPANY)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_UW_COMPANY_FACTOR))
        .withDefaultArgumentSources(uwArgumentSet)

    var minimumPremiumLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(PA_MINIMUMPREMIUM_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PA_MINIMUMPREMIUM_FACTOR))
        .withDefaultArgumentSources(minArgumentSet)

    var subOperand1 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withCostDataField("AdjustedRate")
        .withOperandOrder(1)

    var subOperand2 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_LESSTHAN)
        .withOperandType(TC_RATETABLE)
        .withOperandOrder(2)
        .withTableCode(PA_MINIMUMPREMIUM_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PA_MINIMUMPREMIUM_FACTOR))
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

    var multiCarDiscountModifier = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withOperandType(TC_INSCOPE)
        .withInScopeReference(TC_POLICYLINE, "PAMultiCarDiscount", "java.math.BigDecimal", true)
        
    var vehicleTypeFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(PA_VEHICLE_TYPE_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PA_VEHICLE_TYPE_FACTOR))
        .withDefaultArgumentSources(typeArgumentSet)

    var vehicleCostFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_VEHICLE_COST)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_VEHICLE_COST_FACTOR))
        .withDefaultArgumentSources(costArgumentSet)

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
                
    var termAmountRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_UP)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_MINUS1))
        
    var termAmountAssignmentStep = new CalcStepDefinitionBuilder()
      .withStepType( TC_ASSIGNMENT )
      .withInScopeLocation(TC_COSTDATA, "TermAmount")
      .withStoreType(BigDecimal)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withInScope(TC_COSTDATA, "AdjustedRate", "java.math.BigDecimal", false))
                
    return new CalcRoutineDefinitionBuilder()
        .withCode(PA_COV_PREMIUM_RR_CODE)
        .withName(PA_COV_PREMIUM_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PACoverageParamSet)
        .sectionCommentStep("Base Rate and Adjusted Rate calculation")
        .storeToCostDataField("BaseRate", baseRateLookup)
        .withStep(baseRateRoundingStep
          .withNotes("Round Base Rate to thousandths (Round Half Up)"))
        .storeValue("vehicleTypeFactor", vehicleTypeFactorLookup)
        .storeValue("vehicleCostFactor", vehicleCostFactorLookup)
        .withStep(adjRateAssignmentStep
          .withNotes("Determine Adjusted Rate"))
        .mathStep(coverageLookup)
        .mathStep(uwCompanyLookup)
        .mathStep(multiCarDiscountModifier)
        .mathStep(minFunction)
        .blankStep()
        .sectionCommentStep("Term Amount Determination")
        .ifConditional({subOperand1, subOperand2, subOperand3, subOperand4})
        .storeToCostDataField("TermAmount", minimumPremiumLookup)
        .withStep(termAmountRoundingStep
          .withNotes("Round Up minimum premium to 10s dollars"))
        .elseStep()
        .withStep(termAmountAssignmentStep
          .withNotes("Use system default rounding"))
        .endifStep()
  }

  static function baseRateVehicleCoverageCalcRoutineBldr() : CalcRoutineDefinitionBuilder {
    var baseArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COV_BASE_RATE, "DEFAULT") 
    var covsArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COVERAGES, "DEFAULT") 
    var uwArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_UW_COMPANY, "DEFAULT") 
    var minArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PA_MINIMUMPREMIUM_CODE, "DEFAULT") 
    var typeArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PA_VEHICLE_TYPE_CODE, "DEFAULT") 
    var costArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_VEHICLE_COST, "DEFAULT") 
    var ageArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_DRIVER_AGE, "DEFAULT") 

    var baseRateLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
        .withDefaultArgumentSources(baseArgumentSet)
        
    var coverageLookup = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(SampleDataTablesBuilder.PA_COVERAGES)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_COVERAGES_FACTOR))
        .withDefaultArgumentSources(covsArgumentSet)

    var uwCompanyLookup = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(SampleDataTablesBuilder.PA_UW_COMPANY)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_UW_COMPANY_FACTOR))
        .withDefaultArgumentSources(uwArgumentSet)

    var minimumPremiumLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(PA_MINIMUMPREMIUM_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PA_MINIMUMPREMIUM_FACTOR))
        .withDefaultArgumentSources(minArgumentSet)

    var subOperand1 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withCostDataField("AdjustedRate")
        .withOperandOrder(1)

    var subOperand2 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_LESSTHAN)
        .withOperandType(TC_RATETABLE)
        .withOperandOrder(2)
        .withTableCode(PA_MINIMUMPREMIUM_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PA_MINIMUMPREMIUM_FACTOR))
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

    var multiCarDiscountModifier = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withOperandType(TC_INSCOPE)
        .withInScopeReference(TC_POLICYLINE, "PAMultiCarDiscount", "java.math.BigDecimal", true)
        
    var vehicleTypeFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(PA_VEHICLE_TYPE_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PA_VEHICLE_TYPE_FACTOR))
        .withDefaultArgumentSources(typeArgumentSet)

    var vehicleCostFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_VEHICLE_COST)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_VEHICLE_COST_FACTOR))
        .withDefaultArgumentSources(costArgumentSet)

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
        
    var termAmountAssignmentStep = new CalcStepDefinitionBuilder()
      .withStepType( TC_ASSIGNMENT )
      .withInScopeLocation(TC_COSTDATA, "TermAmount")
      .withStoreType(BigDecimal)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withInScope(TC_COSTDATA, "AdjustedRate", "java.math.BigDecimal", false))

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
                  
    return new CalcRoutineDefinitionBuilder()
        .withCode(PA_VEH_COV_PREMIUM_RR_CODE)
        .withName(PA_VEH_COV_PREMIUM_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PAVehicleCoverageParamSet)
        .sectionCommentStep("Base Rate and Adjusted Rate calculation")
        .storeToCostDataField("BaseRate", baseRateLookup)
        .withStep(baseRateRoundingStep
          .withNotes("Round Base Rate to thousandths (Round Half Up)"))
        .storeValue("vehicleTypeFactor", vehicleTypeFactorLookup)
        .storeValue("vehicleCostFactor", vehicleCostFactorLookup)
        .withStep(adjRateAssignmentStep
          .withNotes("Determine Adjusted Rate"))
        .mathStep(coverageLookup)
        .mathStep(uwCompanyLookup)
        .mathStep(multiCarDiscountModifier)
        .mathStep(minFunction)
        .mathStep(driverAgeFactorLookup)
        .blankStep()
        .sectionCommentStep("Term Amount Determination")
        .ifConditional({subOperand1, subOperand2, subOperand3, subOperand4})
        .storeToCostDataField("TermAmount", minimumPremiumLookup)
        .withStep(termAmountRoundingStep
          .withNotes("Round Up minimum premium to 10s dollars"))
        .elseStep()
        .withStep(termAmountAssignmentStep
          .withNotes("Otherwise round to dollars"))
        .withStep(dollarRoundingStep)
        .endifStep()
        .blankStep()
        .sectionCommentStep("Apply coverage level renewal capping")
        .ifConditional({priorTermAmountOperand, compareNotNull()}, "Can only compute cap if we have prior term amount")
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
  }

  static function assignDriverStyle1CalcRoutineBldr() : CalcRoutineDefinitionBuilder {    
    var youthfulDriverLookupOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withTableCode(SampleDataTablesBuilder.PA_YOUTHFUL_DRIVER)
          .withArgumentSourceSetCode("DEFAULT")
            .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
              .withColumnName(SampleDataTablesBuilder.PA_YOUTHFUL_DRIVER_FACTOR))
            .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
                .withParam("JURISDICTION")
                .withParamType("String"))

    var storeYouthfulLimitStepBuilder = new CalcStepDefinitionBuilder()
          .withStepType(TC_ASSIGNMENT)
          .withStoreLocation("youthfulDriverLimit")
          .withOperand(youthfulDriverLookupOperand)

    var youthfulDriverFunctionOperandBuilder = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withFunctionName("getYoungestDriver(entity.PersonalVehicle, int)", VehicleDriver)
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
          .withParamType("entity.PersonalVehicle")
          .withParam("vehicle")
          .withInScope(TC_VEHICLE, null, "entity.PersonalVehicle", false))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
          .withParamType("int")
          .withParam("youthfulDriverLimit")
          .withLocalVariable("youthfulDriverLimit"))

    // Main routine
    return new CalcRoutineDefinitionBuilder()
        .withCode(PA_ASSIGN_DRIVER_STYLE1_RR_CODE)
        .withName(PA_ASSIGN_DRIVER_STYLE1_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PADriverAssignmentParamSet)
        .sectionCommentStep("This routine can be changed to use the getHighestPercentDriver rate function")
        .withStep(storeYouthfulLimitStepBuilder)
        .storeToWriteableParam(CalcRoutineParamName.TC_DRIVERASSIGNMENTINFO, "AssignedDriver", VehicleDriver,
                               youthfulDriverFunctionOperandBuilder)
  }

  static function assignDriverStyle2CalcRoutineBldr() : CalcRoutineDefinitionBuilder {
    // First IF Sub Operands
    var currentDriverAgeSubOperand1 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withInScope(TC_CURRENTDRIVER, "PolicyDriver.Age", "java.lang.Integer", false)
          .withOperandOrder(1)

    var youthfulDriverLookupSubOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_LESSTHAN)
          .withTableCode(SampleDataTablesBuilder.PA_YOUTHFUL_DRIVER)
          .withArgumentSourceSetCode("DEFAULT")
            .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
              .withColumnName(SampleDataTablesBuilder.PA_YOUTHFUL_DRIVER_FACTOR))
            .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
                .withParam("JURISDICTION")
                .withParamType("String"))
          .withOperandOrder(2)
    
    // Second IF Sub Operands
    var youngestDriverAgeSubOperand1 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withInScope(TC_DRIVERASSIGNMENTINFO, "YoungestDriverAge", "java.lang.Integer", false)
          .withOperandOrder(1)
          
    var zeroConstantSubOperand1 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_EQUAL)
          .withConstantValue("0")
          .withOperandOrder(2)
              
    var currentDriverAgeSubOperand2 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_OR)
          .withInScope(TC_CURRENTDRIVER, "PolicyDriver.Age", "java.lang.Integer", false)
          .withOperandOrder(3)
          
    var youngestDriverAgeSubOperand2 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_LESSTHAN)
          .withInScope(TC_DRIVERASSIGNMENTINFO, "YoungestDriverAge", "java.lang.Integer", false)
          .withOperandOrder(4)
    
    // ELSEIF Sub Operands
    var youngestDriverAgeSubOperand3 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withInScope(TC_DRIVERASSIGNMENTINFO, "YoungestDriverAge", "java.lang.Integer", false)
          .withOperandOrder(1)
          
    var zeroConstantSubOperand2 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_EQUAL)
          .withConstantValue("0")
          .withOperandOrder(2)

    var currentDriverPercentageDrivenSubOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_AND)
          .withInScope(TC_CURRENTDRIVER, "PercentageDriven", "java.lang.Integer", false)
          .withOperandOrder(3)
          
    var lastDriverPercentUseSubOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_GREATERTHAN)
          .withInScope(TC_DRIVERASSIGNMENTINFO, "LastDriverPercentUse", "java.lang.Integer", false)
          .withOperandOrder(4)
    
    // Writeable Source Operands
    var currentDriverOperand1 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withInScope(TC_CURRENTDRIVER, null, "entity.VehicleDriver", false)
    
    var currentDriverOperand2 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withInScope(TC_CURRENTDRIVER, null, "entity.VehicleDriver", false)

    var currentDriverAgeOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withInScope(TC_CURRENTDRIVER, "PolicyDriver.Age", "java.lang.Integer", false)

    var currentDriverPercentageDrivenOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_STORE)
          .withInScope(TC_CURRENTDRIVER, "PercentageDriven", "java.lang.Integer", false)
    
    // Main routine
    return new CalcRoutineDefinitionBuilder()
        .withCode(PA_ASSIGN_DRIVER_STYLE2_RR_CODE)
        .withName(PA_ASSIGN_DRIVER_STYLE2_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PADriverAssignmentParamSet)
        .ifConditional({currentDriverAgeSubOperand1, youthfulDriverLookupSubOperand},
                       "If the current driver is younger than the youthful driver for the policy's base state")
        .ifConditional({youngestDriverAgeSubOperand1, zeroConstantSubOperand1,
                        currentDriverAgeSubOperand2, youngestDriverAgeSubOperand2},
                       "If no youngest driver has been found or the current driver is younger than the youngest driver")
        .storeToWriteableParam(CalcRoutineParamName.TC_DRIVERASSIGNMENTINFO, "AssignedDriver", VehicleDriver,
                               currentDriverOperand1, "Make this the assigned driver")
        .storeToWriteableParam(CalcRoutineParamName.TC_DRIVERASSIGNMENTINFO, "YoungestDriverAge", Integer,
                               currentDriverAgeOperand, "Keep track of youngest driver's age found so far")
        .endifStep()
        .elseifConditional({youngestDriverAgeSubOperand3, zeroConstantSubOperand2,
                            currentDriverPercentageDrivenSubOperand, lastDriverPercentUseSubOperand},
                           "Else if no young driver found, assign driver with highest use")
        .storeToWriteableParam(CalcRoutineParamName.TC_DRIVERASSIGNMENTINFO, "AssignedDriver", VehicleDriver,
                               currentDriverOperand2)
        .storeToWriteableParam(CalcRoutineParamName.TC_DRIVERASSIGNMENTINFO, "LastDriverPercentUse", Integer,
                               currentDriverPercentageDrivenOperand)
        .endifStep()
  }

  private static function compareNotNull() : CalcStepDefinitionOperandBuilder {
     return new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_NOTEQUAL)
        .withConstant("null")
        .withOperandOrder(2)
    }
    
  static function createBasicCalcRoutines() : CalcRoutineDefinition[] {

    var paCovRoutine : CalcRoutineDefinition
    var paVehCovRoutine : CalcRoutineDefinition
    var paDriverAssignRoutine : CalcRoutineDefinition
    var stateTaxRoutine : CalcRoutineDefinition
    var flatRateRoutine : CalcRoutineDefinition

    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {

      paCovRoutine = new CalcRoutineDefinitionBuilder()
        .withCode(PA_COV_PREMIUM_RR_CODE)
        .withName(PA_COV_PREMIUM_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PACoverageParamSet)
        .storeConstantToCostData("BaseRate", "1")
        .storeConstantToCostData("AdjustedRate", "1")
        .storeConstantToCostData("TermAmount", "1")
      .create(bundle)

      paVehCovRoutine = createBasicPAVehicleCoverageRoutineBuilder().create(bundle)
      paDriverAssignRoutine = createBasicDriverAssignmentRoutineBuilder().create(bundle)
      
      flatRateRoutine = new CalcRoutineDefinitionBuilder()
        .withCode(PA_COV_FLATRATE_RR_CODE)
        .withName(PA_COV_FLATRATE_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PACoverageParamSet)
        .storeToCostDataField("ProrationMethod", ProrationMethod,
                              new CalcStepDefinitionOperandBuilder().withTypeListConstant(ProrationMethod.TC_FLAT))
        .storeConstantToCostData("BaseRate", "1")
        .storeConstantToCostData("AdjustedRate", "1")
        .storeConstantToCostData("TermAmount", "1")
      .create(bundle)

      stateTaxRoutine = new CalcRoutineDefinitionBuilder()
        .withCode(PA_STATE_TAX_RR_CODE)
        .withName(PA_STATE_TAX_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.StateTaxParamSet)
        .storeConstantToCostData("AdjustedRate", "0.0")
        .storeConstantToCostData("BaseRate", "0.0")
        .storeConstantToCostData("TermAmount", "0.0")
      .create(bundle)
    })
    return {paCovRoutine, paVehCovRoutine, paDriverAssignRoutine, stateTaxRoutine, flatRateRoutine}

  }

  static function createTaxCalcRoutineBuilder(useTypelistFunction : boolean = false) : CalcRoutineDefinitionBuilder {
      var baseState = new CalcStepDefinitionArgumentBuilder().withParam("PARAM")
      var adjRate = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(PA_STATETAX_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PA_STATETAX_FACTOR))
        .withOperandType(TC_RATETABLE)
        .withArgumentSource(baseState)


      var taxParamSet = Query.make(CalcRoutineParameterSet).compare(CalcRoutineParameterSet#Code, Equals, "StateTaxParamSet").select().single()
      var multiplyWithBasis = new CalcStepDefinitionOperandBuilder().withInScope(TC_TAXABLEBASIS,
          null, "java.math.BigDecimal", false).withOperatorType(TC_MULTIPLICATION)

      var subOperand1 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withInScope(TC_POLICYLINE, "BaseState", "typekey.Jurisdiction", false)
          .withOperandOrder(1)

      var subOperand2 = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_IN)
          .withOperandOrder(2)

      if (useTypelistFunction) {
        subOperand2.withFunctionName("getSpecialTaxJurisdictions()", List<Jurisdiction>)
      } else {
        subOperand2.asTypeKeyCollection({Jurisdiction.TC_NY, Jurisdiction.TC_FL})
      }

      var shouldRoundToPennies = {subOperand1, subOperand2}

      var taxableBasis = new CalcStepDefinitionOperandBuilder()
        .withInScope(TC_TAXABLEBASIS, "", "java.math.BigDecimal", false)

      return new CalcRoutineDefinitionBuilder()
          .withCode(PA_STATE_TAX_RR_CODE)
          .withName(PA_STATE_TAX_RR_NAME)
          .withParamSet(taxParamSet)
          .storeConstantToCostData("BaseRate", "1")
          .storeToCostDataField("AdjustedRate", adjRate)
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
  }

  static function createTaxCalcRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
            routine = createTaxCalcRoutineBuilder().create(bundle)
    })

    return routine
  }
  
  static function createFlatRateCalcRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      var prorationMethodBldr = new CalcStepDefinitionOperandBuilder()
            .withTypeListConstant(ProrationMethod.TC_FLAT)
            
      var baseRateLookup = new CalcStepDefinitionOperandBuilder()
            .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
            .withArgumentSourceSetCode("DEFAULT")
            .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
              .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COV_CODE")
                .withParamType("String")
                .withConstant("\"PALimitedMexicoCov\""))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("JURISDICTION")
                .withParamType("String"))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("POSTAL_CODE")
                .withParamType("String")) 

      routine =  new CalcRoutineDefinitionBuilder()
        .withCode(PA_COV_FLATRATE_RR_CODE)
        .withName(PA_COV_FLATRATE_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PACoverageParamSet)
        .storeToCostDataField("ProrationMethod", ProrationMethod, prorationMethodBldr)
        .storeToCostDataField("BaseRate", baseRateLookup)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .storeToCostDataField("TermAmount", new CalcStepDefinitionOperandBuilder().withCostDataField("AdjustedRate"))
        .roundingStep(TC_HALFUP, TC_0)
        .create(bundle)
    })
    
    return routine
  }

  static function createPIPNJCalcRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      var baseRateLookup = new CalcStepDefinitionOperandBuilder()
            .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
            .withArgumentSourceSetCode("DEFAULT")
            .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
              .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COV_CODE")
                .withParamType("String")
                .withConstant("\"PALiabilityCov\""))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("JURISDICTION")
                .withParamType("String"))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("POSTAL_CODE")
                .withParamType("String"))

      var coverageFactor= new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_MULTIPLICATION)
            .withTableCode(SampleDataTablesBuilder.PA_COVERAGES)
            .withArgumentSourceSetCode("DEFAULT")
            .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
              .withColumnName(SampleDataTablesBuilder.PA_COVERAGES_FACTOR))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COV_CODE")
                .withParamType("String")
                .withConstant("\"PALiabilityCov\""))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COVTERM_CODE")
                .withParamType("String")
                .withConstant("\"PALiability\""))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COVTERMOPT_CODE")
                .withParamType("String")
                .withConstant("\"100K\""))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("JURISDICTION")
                .withParamType("typekey.Juridiction")
                .withTypeListConstant("NJ",typekey.Jurisdiction))

      var pipFactor = new CalcStepDefinitionOperandBuilder()
            .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
            .withArgumentSourceSetCode("DEFAULT")
            .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
              .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COV_CODE")
                .withParamType( "String" )
                .withInScope(CalcRoutineParamName.TC_PAPIPNJ,null, "entity.Coverage", false, null))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("JURISDICTION")
                .withParamType("typekey.Juridiction")
                .withTypeListConstant("NJ",typekey.Jurisdiction))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("POSTAL_CODE")
                .withParamType("String"))

      var pipSecondaryFactor = new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_STORE)
            .withTableCode(SampleDataTablesBuilder.PA_COVERAGES)
            .withArgumentSourceSetCode("DEFAULT")
            .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
              .withColumnName(SampleDataTablesBuilder.PA_COVERAGES_FACTOR))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COV_CODE")
                .withParamType("String")
                .withInScope(CalcRoutineParamName.TC_PAPIPNJ,null, "entity.Coverage", false, null))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COVTERM_CODE")
                .withParamType("String")
                .withInScope(CalcRoutineParamName.TC_PAPIPNJ, "PAPIPNJ_MEDsecondaryTerm", "gw.api.domain.covterm.BooleanCovTerm", false, "PAPIPNJ_MEDsecondary"))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("COVTERMOPT_CODE")
                .withParamType("String")
                // Value can be thought of as the path relative to the parameter, CovTermCode is the CovTermCode
                .withInScope(CalcRoutineParamName.TC_PAPIPNJ, "PAPIPNJ_MEDsecondaryTerm.Value", "java.lang.Boolean", false, "PAPIPNJ_MEDsecondary"))
            .withArgumentSource( new CalcStepDefinitionArgumentBuilder()
                .withParam("JURISDICTION")
                .withParamType("typekey.Juridiction")
                .withTypeListConstant("NJ",typekey.Jurisdiction))

      routine = new CalcRoutineDefinitionBuilder()
        .withCode(PA_PIP_NJ_BASIC_RR_CODE)
        .withName(PA_PIP_NJ_BASIC_RR_NAME)
        .withParamSet(SampleDataTablesBuilder.PIPNJParamSet)
        .storeToCostDataField("BaseRate", baseRateLookup)
        .mathStep(coverageFactor)
        .storeValue("pipFactor", pipFactor)
        .storeValue("pipSecondaryFactor", pipSecondaryFactor)
        .copyCostDataField("AdjustedRate", "BaseRate")
        .mathWithLocalVar(TC_MULTIPLICATION, "pipFactor")
        .mathWithLocalVar(TC_MULTIPLICATION, "pipSecondaryFactor")
        .storeToCostDataField("TermAmount", new CalcStepDefinitionOperandBuilder().withCostDataField("AdjustedRate"))
        .roundingStep(TC_HALFUP, TC_2)
        .create(bundle)
    })

    return routine

  }

  static function createCancellationShortRateRoutine() : CalcRoutineDefinition {
    var routine : CalcRoutineDefinition
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      routine = new CalcRoutineDefinitionBuilder()
        .withCode(PA_CANCELLATION_SHORT_RATE_PENALTY_CODE)
        .withName(PA_CANCELLATION_SHORT_RATE_PENALTY_NAME)
        .withParamSet(SampleDataTablesBuilder.PACancellationShortRatePenaltyParamSet)
        .sectionCommentStep("BaseRate and AdjustedRate are set to 1.0 in the rating engine and do not affect the short rate penalty amount.")
        .withStep(new CalcStepDefinitionBuilder()
          .withStepType(CalcStepType.TC_ASSIGNMENT)
          .withStoreType(BigDecimal)
          .withInScopeLocation(CalcRoutineParamName.TC_COSTDATA, "Basis")
          .withOperand(new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_STORE)
            .withInScope(CalcRoutineParamName.TC_PRORATEDPREMIUMTOTAL,
                         null, "java.math.BigDecimal", false))
          .withNotes("Total value of all prorated costs."))
        .withStep(new CalcStepDefinitionBuilder()
          .withStepType(TC_ASSIGNMENT)
          .withStoreLocation("shortRatePenaltyRate")
          .withOperand(new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_STORE)
            .withTypedConstant("0.1", java.math.BigDecimal))
          .withNotes("Hard coded value.  Could also be pulled from a rate table."))
        .withStep(new CalcStepDefinitionBuilder()
          .withStepType(CalcStepType.TC_ASSIGNMENT)
          .withStoreType(BigDecimal)
          .withInScopeLocation(CalcRoutineParamName.TC_COSTDATA, "TermAmount")
          .withOperand(new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_STORE)
            .withCostDataField("Basis"))
          .withNotes("Term Amount for the short rate penalty.  Basis is the total amount of prorated costs.  This is stored on the cost for future reporting purposes."))
        .mathStep(new CalcStepDefinitionOperandBuilder()
          .withOperatorType(TC_MULTIPLICATION)
          .withLocalVariable("shortRatePenaltyRate"))
        .roundingStep(TC_DOWN, TC_0)
        .create(bundle)
    })
    
    return routine
  }

  static function addTableTo(builder : RateBookBuilder) {
    addTableToScenario(builder, false)
  }

  static function addUniqueTableTo(builder : RateBookBuilder) {
    addTableToScenario(builder, true)
  }

  private static function addTableToScenario(builder : RateBookBuilder, isUnique : boolean) {

    var tables = isUnique
            ?
              { "rateflow" -> uniqueRateflowTable(),
                "vehicle" -> uniqueVehicleTypeTable(),
                "tax" -> uniqueTaxRateTable(),
                "minimumPremium" -> uniqueMinimumPremiumTable() }
            :
              { "rateflow" -> aRateflowTable(),
                "vehicle" -> aVehicleTypeTable(),
                "tax" -> aTaxRateTable(),
                "minimumPremium" -> aMinimumPremiumTable() }

    builder.includeTableWithData(tables.get("rateflow"), {rateflowData()}) // get rid of this soon?
    builder.includeTableWithData(tables.get("vehicle"), vehicleTypeData())
    builder.includeTableWithData(tables.get("tax"), taxRateData())
    builder.includeTableWithData(tables.get("minimumPremium"), minimumPremiumData())
  }

  static function rateflowData() : RateFactorRowBuilder {
    return new RateFactorRowBuilder()
      .withStr(1, null)
      .withDecFactor(1, 10.0)
  }

  static function aTaxRateTable() : RateTableBuilder {
    return new RateTableBuilder(aTaxRateTableDef())
  }
  static function uniqueTaxRateTable() : RateTableBuilder {
    var u = aTaxRateTableDefBuilder().withCode(PA_STATETAX_CODE + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }

  private static function aTaxRateTableDef() : RateTableDefinition {
    return aTaxRateTableDefBuilder().createAndCommit()
  }

  private static function aTaxRateTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot(CalcRoutineParamName.TC_POLICYLINE)
    var paramBldr1 = getParam(10, "PARAM", "str1")
            .withColumnLabel("Parameter")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")
    var matchOpBldr1 = getMatchOp(paramBldr1, "BaseState", argSrcBldr1)
            .withMatchOpDefinition(SampleDataTablesBuilder.EXACT_MATCH_OP_DEF)
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
            .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet)
            .withName("TaxRate")
            .addArgumentSource(argSrcBldr1)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_STATETAX_CODE)
      .named(PA_STATETAX_TABLE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(matchOpBldr1)
      .addFactor(getFactor(PA_STATETAX_FACTOR))
  }

  static function taxRateData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
      .withStr(1, "CA")
      .withDecFactor(1, 0.0725),

      new RateFactorRowBuilder()
      .withStr(1, "KY")
      .withDecFactor(1, 0.06),

      new RateFactorRowBuilder()
      .withStr(1, null)
      .withDecFactor(1, 0.055)
    }
  }

  static function aRateflowTable() : RateTableBuilder {
    return new RateTableBuilder(aRateflowTableDef())
  }
  static function uniqueRateflowTable() : RateTableBuilder {
    var u = aRateflowTableDefBuilder().withCode(PA_RATEFLOW_CODE + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function addRoutinesToBooks(books : RateBook[], routines : CalcRoutineDefinition[]) {
    addRoutinesToBooks(books, routines, \ b , r -> {
        var requiredTables = r.Steps*.Operands*.TableCode.toSet().where(\ t -> t != null)
        var availableTables = b.RateTables*.Definition*.TableCode.toSet()
        var t = requiredTables.subtract(availableTables)
        if (t.Empty) {
          return true
        } else {
          print("Cannot include rate routine ${r.Code} in book ${b.BookCode} v ${b.BookEdition} because the book does not contain tables ${t}")
          return false
        }
     })
  }

  static function addRoutinesToBooks(books : RateBook[], routines : CalcRoutineDefinition[],
                                     isValid : block(b : RateBook, r : CalcRoutineDefinition) : boolean) {
    books.each(\ b -> {
      b.addCalcRoutines(routines.where(\ r -> isValid(b, r)))
      b.Bundle.commit()
    })
  }

  static function aRateflowTableDef() : RateTableDefinition {
    return aRateflowTableDefBuilder().createAndCommit()
  }

  static function aRateflowTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet)
      .withName("RateflowTableDef")
      .addArgumentSource(argSrcBldr1)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_RATEFLOW_CODE)
      .named(PA_RATEFLOW_TABLE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(
        getMatchOp(
          getParam(10, "PARAM", "str1")
            .withColumnLabel("Parameter"),
          "LicenseState",
          argSrcBldr1.withRoot(CalcRoutineParamName.TC_VEHICLE)
        )
        .withMatchOpDefinition(SampleDataTablesBuilder.EXACT_MATCH_OP_DEF))
      .addFactor(getFactor(PA_RATEFLOW_FACTOR))
  }

  static function aMinimumPremiumTable() : RateTableBuilder {
    return new RateTableBuilder(aMinimumPremiumTableDef())
  }
  static function uniqueMinimumPremiumTable() : RateTableBuilder {
    var u = aMinimumPremiumTableDefBuilder().withCode(PA_MINIMUMPREMIUM_CODE + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }

  static function aMinimumPremiumTableDef() : RateTableDefinition {
    return aMinimumPremiumTableDefBuilder().createAndCommit()
  }

  static function aMinimumPremiumTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet)
      .withName("MinimumPremium")
      .addArgumentSource(argSrcBldr1)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_MINIMUMPREMIUM_CODE)
      .named(PA_MINIMUMPREMIUM_TABLE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(getMatchOp(
        getParam(10, "COV_CODE", "str1")
          .withColumnLabel("Coverage")
          .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider"),
          "Coverage", argSrcBldr1.withRoot(CalcRoutineParamName.TC_COVERAGE)
        )
        .withOpName("COV_CODE")
        .withMatchOpDefinition(SampleDataTablesBuilder.EXACT_MATCH_OP_DEF))
      .addFactor(getFactor(PA_MINIMUMPREMIUM_FACTOR))
  }

  static function minimumPremiumData() : RateFactorRowBuilder[] {
     return {
      new RateFactorRowBuilder()
      .withStr(1, "PACollisionCov")
      .withDecFactor(1, 10.0),

      new RateFactorRowBuilder()
      .withStr(1, "PAComprehensiveCov")
      .withDecFactor(1, 20.0),

      new RateFactorRowBuilder()
      .withStr(1, "PALiabilityCov")
      .withDecFactor(1, 30.0),

      new RateFactorRowBuilder()
      .withStr(1, null)
      .withDecFactor(1, 40.0)
    }
  }

  static function vehicleTypeData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
      .withStr(1, "CA")
      .withStr(2, typekey.VehicleType.TC_AUTO.Code)
      .withDecFactor(1, 10.0),

      new RateFactorRowBuilder()
      .withStr(1, "CA")
      .withStr(2, null)
      .withDecFactor(1, 20.0),

      new RateFactorRowBuilder()
      .withStr(1, null)
      .withStr(2, null)
      .withDecFactor(1, 15.0)
    }
  }

  static function aVehicleTypeTable() : RateTableBuilder {
    return new RateTableBuilder(aVehicleTypeTableDef())
  }
  static function uniqueVehicleTypeTable() : RateTableBuilder {
    var u = aVehicleTypeTableDefBuilder().withCode(PA_VEHICLE_TYPE_CODE + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }

  static function aVehicleTypeTableDef() : RateTableDefinition {
    return aVehicleTypeTableDefBuilder().createAndCommit()
  }

  static function aVehicleTypeTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet)
      .withName("VehicleType")
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_VEHICLE_TYPE_CODE)
      .named(PA_VEHICLE_TYPE_TABLE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(
        getMatchOp(
          getParam(10, "JURISDICTION", "str1")
            .withColumnLabel("Jurisdiction")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"),
          "BaseState",
          argSrcBldr1
        )
        .withMatchOpDefinition(SampleDataTablesBuilder.EXACT_MATCH_OP_DEF))
      .addMatchOperation(
        getMatchOp(
          getParam(20, "VEHICLE_TYPE", "str2")
            .withColumnLabel("Vehicle Type")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.VehicleType)"),
          "VehicleType",
          argSrcBldr2.withRoot(CalcRoutineParamName.TC_VEHICLE)
        )
        .withMatchOpDefinition(SampleDataTablesBuilder.EXACT_MATCH_OP_DEF))
      .addFactor(getFactor(PA_VEHICLE_TYPE_FACTOR))
  }
}
