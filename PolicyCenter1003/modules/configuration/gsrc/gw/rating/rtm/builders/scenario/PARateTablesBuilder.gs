package gw.rating.rtm.builders.scenario

uses gw.api.databuilder.UniqueKeyGenerator
uses gw.rating.rtm.RatingTestMethods
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.rating.rtm.builders.RateTableMatchOpDefinitionBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceSetBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceBuilder
uses gw.rating.rtm.builders.scenario.sample.SampleDataTablesBuilder

@Export
class PARateTablesBuilder implements RatingTestMethods {

  public final static var MULTI_FACTOR_TABLE : String = "MultiFactorTable"
  public final static var TABLE_FACTOR_WITH_DIFFERENT_LABEL : String = "TableWithColumnNameDifferentFromLabel"
  public final static var MULTI_FACTOR_TABLE_FACTOR1 : String = "Factor1"
  public final static var MULTI_FACTOR_TABLE_FACTOR2 : String = "Factor2"
  public final static var MULTI_FACTOR_TABLE_FACTOR3 : String = "Factor3"
  public final static var MULTI_FACTOR_TABLE_FACTOR_LABEL_SUFFIX : String = " Label Suffix"
  public final static var MULTI_NON_NUMERIC_FACTOR_TABLE : String = "MultiNonNumericFactorTable"
  public final static var MULTI_NON_NUMERIC_FACTOR_TABLE_STR_FACTOR : String = "StrFactor"
  public final static var MULTI_NON_NUMERIC_FACTOR_TABLE_BOOL_FACTOR : String = "BoolFactor"
  public final static var MULTI_NON_NUMERIC_FACTOR_TABLE_DATE_FACTOR : String = "DateFactor"
  public final static var VEHICLE_AGE_TABLE : String = "PA_VehicleAge"
  public final static var VEHICLE_COST_NEW_TABLE : String = "PA_VehicleCostNew"
  public final static var VEHICLE_MOD_TABLE : String = "PA_VehicleMod"
  public final static var DEDUCTIBLE_TABLE : String = "PA_CollDeductible"
  public final static var DRIVER_AGE_TABLE : String = "PA_DriverAge"
  public final static var BA_DRIVER_AGE_TABLE : String = "BA_DriverAge"
  public final static var WC_DRIVER_AGE_TABLE : String = "WC_DriverAge"
  public final static var GL_DRIVER_AGE_TABLE : String = "GL_DriverAge"
  public final static var COV_TERM_TABLE : String = "PA_CoverageTerm"
  public final static var COVERAGES_TABLE : String = "PA_Coverages"
  public final static var COVERAGES_MULTI_SELECT_TABLE: String = "PA_CoverageTermMultiSelect"
  public final static var MAKE_MODEL_YEAR_TABLE : String = "PA_MakeModelYear"
  public final static var MAKE_MODEL_YEAR_CUSTOM_TABLE : String = "PA_MakeModelYear_Custom"
  public final static var PREV_INSURANCE_TABLE : String = "PA_PrevInsurance"
  public static final var POSTCODE_TABLE : String = "PA_PostalCode"
  public static final var POSTCODE_TABLE_NAME : String = "Post Code Table"

  // Single Factor Tables for each type
  public final static var STRING_FACTOR_TABLE          : String = "StringFactorTable"
  public final static var STRING_FACTOR_TABLE_FACTOR   : String = "StringFactor"
  public final static var INTEGER_FACTOR_TABLE         : String = "IntegerFactorTable"
  public final static var INTEGER_FACTOR_TABLE_FACTOR  : String = "IntegerFactor"
  public final static var BOOLEAN_FACTOR_TABLE         : String = "BooleanFactorTable"
  public final static var BOOLEAN_FACTOR_TABLE_FACTOR  : String = "BooleanFactor"
  public final static var DECIMAL_FACTOR_TABLE         : String = "DecimalFactorTable"
  public final static var DECIMAL_FACTOR_TABLE_FACTOR  : String = "DecimalFactor"
  public final static var DATE_FACTOR_TABLE            : String = "DateFactorTable"
  public final static var DATE_FACTOR_TABLE_FACTOR     : String = "DateFactor"

  public static var PA_LINE : String = "PersonalAutoLine"

  static function allTestTables() : RateTableBuilder[] {
    return {
      aVehicleAgeTable(), aCoverageTermTable(),
      aVehicleCostNewTable(), aCollDeductibleTable(),
      aVehicleModTable(), aMakeModelYearTable(),
      aPOSTCODETable()
    }
  }

  static function createRateTable(def : RateTableDefinitionBuilder) : RateTableBuilder {
    return new RateTableBuilder(def)
  }
  static function createRateTable(def : RateTableDefinition) : RateTableBuilder {
    return new RateTableBuilder(def)
  }

  static function aMakeModelYearTable() : RateTableBuilder {
    return createRateTable(aMakeModelYearTableDef())
  }
  static function uniqueMakeModelYearTable() : RateTableBuilder {
    var u = aMakeModelYearTableDefBuilder().withCode(MAKE_MODEL_YEAR_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aMakeModelYearTableDef() : RateTableDefinition {
    return aMakeModelYearTableDefBuilder().createAndCommit()
  }
  static function aMakeModelYearTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcBldr3 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)
      .addArgumentSource(argSrcBldr3)
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(MAKE_MODEL_YEAR_TABLE)
      .named(MAKE_MODEL_YEAR_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(
        getMatchOp(
          getParam(1, "Make", "str1"),
          "Make",
          argSrcBldr1.withRoot(CalcRoutineParamName.TC_VEHICLE))
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(
        getMatchOp(
          getParam(2, "Model", "str2"),
          "Model",
          argSrcBldr2.withRoot(CalcRoutineParamName.TC_VEHICLE))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(
        getMatchOp(
          {getParam(3, "Min Year", "int1", RateTableDataType.TC_INTEGER),
           getParam(4, "Max Year", "int2", RateTableDataType.TC_INTEGER)},
          "YEAR",
          "Year",
          argSrcBldr3.withRoot(CalcRoutineParamName.TC_VEHICLE))
        .withOpName("YEAR")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp))
  }

  static function aVehicleAgeTable() : RateTableBuilder {
    return createRateTable(aVehicleAgeTableDef())
  }
  static function uniqueVehicleAgeTable() : RateTableBuilder {
    var u = aVehicleAgeTableDefBuilder().withCode(VEHICLE_AGE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aVehicleAgeTableDef() : RateTableDefinition {
    return aVehicleAgeTableDefBuilder().createAndCommit()
  }
  static function aVehicleAgeTableDefBuilder() : RateTableDefinitionBuilder {

    var rateTableArgumentSourceSetBuilder = new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet)

    var rateTableMatchOpBuilder = getMatchOp(
        {getParam(1, "Min Age", "int1", RateTableDataType.TC_INTEGER),
            getParam(2, "Max Age", "int2", RateTableDataType.TC_INTEGER)})
        .withOpName("AGE")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(rateTableArgumentSourceSetBuilder)
      .withCode(VEHICLE_AGE_TABLE)
      .named(VEHICLE_AGE_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(rateTableMatchOpBuilder)
  }

  //===========================================================================
  // Multi-Factor Tables
  //===========================================================================

  static function aMultiFactorTable() : RateTableBuilder {
    return createRateTable(aMultiFactorTableDef())
  }
  static function uniqueMultiFactorTable() : RateTableBuilder {
    var uniqueCodeName = MULTI_FACTOR_TABLE + UniqueKeyGenerator.get().nextID()
    var u = aMultiFactorTableDefBuilder()
              .withCode(uniqueCodeName)
              .named(uniqueCodeName)
    return createRateTable(u.createAndCommit())
  }
  static function aMultiFactorTableDef() : RateTableDefinition {
    return aMultiFactorTableDefBuilder().createAndCommit()
  }
  static function aMultiFactorTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(MULTI_FACTOR_TABLE)
      .named(MULTI_FACTOR_TABLE)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0, MULTI_FACTOR_TABLE_FACTOR1, "dec5", RateTableDataType.TC_DECIMAL,
                           MULTI_FACTOR_TABLE_FACTOR1 + MULTI_FACTOR_TABLE_FACTOR_LABEL_SUFFIX))
      .addFactor(getFactor(1, MULTI_FACTOR_TABLE_FACTOR2, "dec6", RateTableDataType.TC_DECIMAL,
                           MULTI_FACTOR_TABLE_FACTOR2 + MULTI_FACTOR_TABLE_FACTOR_LABEL_SUFFIX))
      .addFactor(getFactor(2, MULTI_FACTOR_TABLE_FACTOR3, "bit1", RateTableDataType.TC_BOOLEAN,
                           MULTI_FACTOR_TABLE_FACTOR3 + MULTI_FACTOR_TABLE_FACTOR_LABEL_SUFFIX))
  }

  // --- Multi Non-numeric Factor Table --- //
  static function aMultiNonNumericFactorTable() : RateTableBuilder {
    return createRateTable(aMultiNonNumericFactorTableDef())
  }
  static function uniqueMultiMultiNonNumericFactorTable() : RateTableBuilder {
    var uniqueCodeName = MULTI_NON_NUMERIC_FACTOR_TABLE + UniqueKeyGenerator.get().nextID()
    var u = aMultiNonNumericFactorTableDefBuilder()
              .withCode(uniqueCodeName)
              .named(uniqueCodeName)
    return createRateTable(u.createAndCommit())
  }
  static function aMultiNonNumericFactorTableDef() : RateTableDefinition {
    return aMultiNonNumericFactorTableDefBuilder().createAndCommit()
  }
  static function aMultiNonNumericFactorTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("Default")
        .withName("DEFAULT")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(MULTI_NON_NUMERIC_FACTOR_TABLE)
      .named(MULTI_NON_NUMERIC_FACTOR_TABLE)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0, MULTI_NON_NUMERIC_FACTOR_TABLE_STR_FACTOR, "str8",
                           RateTableDataType.TC_STRING, MULTI_NON_NUMERIC_FACTOR_TABLE_STR_FACTOR))
      .addFactor(getFactor(1, MULTI_NON_NUMERIC_FACTOR_TABLE_BOOL_FACTOR, "bit2",
                           RateTableDataType.TC_BOOLEAN, MULTI_NON_NUMERIC_FACTOR_TABLE_BOOL_FACTOR))
      .addFactor(getFactor(2, MULTI_NON_NUMERIC_FACTOR_TABLE_DATE_FACTOR, "date2",
                           RateTableDataType.TC_DATE, MULTI_NON_NUMERIC_FACTOR_TABLE_DATE_FACTOR))
  }

  // --- End of Multi-Factor Tables --- //

  static function aDriverAgeTable() : RateTableBuilder {
    return createRateTable(aDriverAgeTableDef())
  }
  static function uniqueDriverAgeTable() : RateTableBuilder {
    var u = aDriverAgeTableDefBuilder().withCode(DRIVER_AGE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aDriverAgeTableDef() : RateTableDefinition {
    return aDriverAgeTableDefBuilder().createAndCommit()
  }
  static function aDriverAgeTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(DRIVER_AGE_TABLE)
      .named(DRIVER_AGE_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp({
          getParam(1, "Gender", "str1", RateTableDataType.TC_STRING)
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.GenderType)")
        })
        .withOpName("GENDER")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp({
          getParam(2, "Min Age", "int1", RateTableDataType.TC_INTEGER),
          getParam(3, "Max Age", "int2", RateTableDataType.TC_INTEGER)
        })
        .withOpName("AGE")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp))
  }

  static function aBADriverAgeTable() : RateTableBuilder {
    return createRateTable(aBADriverAgeTableDef(BA_DRIVER_AGE_TABLE))
  }
  static function uniqueBADriverAgeTable() : RateTableBuilder {
    var u = aBADriverAgeTableDefBuilder(BA_DRIVER_AGE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aBADriverAgeTable(code : String) : RateTableBuilder {
    return createRateTable(aBADriverAgeTableDef(code + " BA" ))
  }
  static function aBADriverAgeTableDef(code: String) : RateTableDefinition {
    return aBADriverAgeTableDefBuilder(code).createAndCommit()
  }
  static function aBADriverAgeTableDefBuilder(code: String) : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(code)
      .named(code)
      .withPolicyLine(typekey.PolicyLine.TC_BUSINESSAUTOLINE.Code)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp({
          getParam(1, "Gender", "str1", RateTableDataType.TC_STRING)
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.GenderType)")
        })
        .withOpName("GENDER")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp({
          getParam(2, "Min Age", "int1", RateTableDataType.TC_INTEGER),
          getParam(3, "Max Age", "int2", RateTableDataType.TC_INTEGER)
        })
        .withOpName("AGE")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp))
  }

  static function aWCDriverAgeTable() : RateTableBuilder {
    return createRateTable(aWCDriverAgeTableDef())
  }
  static function uniqueWCDriverAgeTable() : RateTableBuilder {
    var u = aWCDriverAgeTableDefBuilder().withCode(WC_DRIVER_AGE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aWCDriverAgeTableDef() : RateTableDefinition {
    return aWCDriverAgeTableDefBuilder().createAndCommit()
  }
  static function aWCDriverAgeTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(WC_DRIVER_AGE_TABLE)
      .named(WC_DRIVER_AGE_TABLE)
      .withPolicyLine(typekey.PolicyLine.TC_WORKERSCOMPLINE.Code)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp({
          getParam(1, "Gender", "str1", RateTableDataType.TC_STRING)
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.GenderType)")
        })
        .withOpName("GENDER")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp({
          getParam(2, "Min Age", "int1", RateTableDataType.TC_INTEGER),
          getParam(3, "Max Age", "int2", RateTableDataType.TC_INTEGER)
        })
        .withOpName("AGE")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp))
  }

  static function aGLDriverAgeTable() : RateTableBuilder {
    return createRateTable(aGLDriverAgeTableDef())
  }
  static function uniqueGLDriverAgeTable() : RateTableBuilder {
    var u = aGLDriverAgeTableDefBuilder().withCode(GL_DRIVER_AGE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aGLDriverAgeTableDef() : RateTableDefinition {
    return aGLDriverAgeTableDefBuilder().createAndCommit()
  }
  static function aGLDriverAgeTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(GL_DRIVER_AGE_TABLE)
      .named(GL_DRIVER_AGE_TABLE)
      .withPolicyLine("GLLine")
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp({
          getParam(1, "Gender", "str1", RateTableDataType.TC_STRING)
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.GenderType)")
        })
        .withOpName("GENDER")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp({
          getParam(2, "Min Age", "int1", RateTableDataType.TC_INTEGER),
          getParam(3, "Max Age", "int2", RateTableDataType.TC_INTEGER)
        })
        .withOpName("AGE")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp))
  }

  static function aPrevInsuranceTable() : RateTableBuilder {
    return createRateTable(aPrevInsuranceTableDef())
  }
  static function uniquePrevInsuranceTable() : RateTableBuilder {
    var u = aPrevInsuranceTableDefBuilder().withCode(PREV_INSURANCE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aPrevInsuranceTableDef() : RateTableDefinition {
    return aPrevInsuranceTableDefBuilder().createAndCommit()
  }
  static function aPrevInsuranceTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(PREV_INSURANCE_TABLE)
      .named(PREV_INSURANCE_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp({
          getParam(1, "PrevInsurance", "bit1", RateTableDataType.TC_BOOLEAN)
        })
        .withOpName("PREV_INS")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static function aCoverageTermTable() : RateTableBuilder {
    return createRateTable(aCoverageTermTableDef())
  }
  static function uniqueCoverageTermTable() : RateTableBuilder {
    var u = aCoverageTermTableDefBuilder().withCode(COV_TERM_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aCoverageTermTableDef() : RateTableDefinition {
    return aCoverageTermTableDefBuilder().createAndCommit()
  }
  static function aCoverageTermTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(COV_TERM_TABLE)
      .named(COV_TERM_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(getParam(10, "CovCode", "str1")).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(getParam(20, "CovTermCode", "str2")).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(getParam(30, "CovTermValueCode", "str3")).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static function aCoveragesTable() : RateTableBuilder {
    return createRateTable(aCoveragesTableDef())
  }
  static function uniqueCoveragesTable() : RateTableBuilder {
    var u = aCoveragesTableDefBuilder().withCode(COVERAGES_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aCoveragesTableDef() : RateTableDefinition {
    return aCoveragesTableDefBuilder().createAndCommit()
  }

  static function aMultiSelectBasicTable() : RateTableBuilder {
    return createRateTable(aMultiSelectTableDefBuilder())
  }

  static function aMultiSelectTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
        .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
            .withCode("DEFAULT")
            .withName("Default")
            .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
        .withCode("PA_ALL_TYPES")
        .named("PA_ALL_TYPES")
        .withPolicyLine(PA_LINE)
        .addFactor(getFactor("Factor"))
        .addMatchOperation(getMatchOp(getParam(1, "Integer", "int1", RateTableDataType.TC_INTEGER))
            .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
        .addMatchOperation(
          getMatchOp(
            getParam(2, "String", "str1", RateTableDataType.TC_STRING)
            .withMultiSelect(true)
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"))
             .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static function aCoveragesTableDefBuilder(hasMultiSelectOptCodeColumn = false ) : RateTableDefinitionBuilder {
    var covParam = getParam("CovCode", "CovCode")
                      .withSortOrder(10)
                      .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider")
    var covTermParam = getParam("CovTermCode", "CovTermCode")
                      .dependsOn(covParam)
                      .withSortOrder(20)
                      .withValueProvider("gw.rating.rtm.valueprovider.CovTermValueProvider")
    var covTermOptParam = getParam("CovTermOptCode", "CovTermOptCode")
                      .withMultiSelect(hasMultiSelectOptCodeColumn)
                      .dependsOn(covTermParam)
                      .withSortOrder(30)
                      .withValueProvider("gw.rating.rtm.valueprovider.CovTermOptionValueProvider")
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcBldr3 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)
      .addArgumentSource(argSrcBldr3)

    var code = hasMultiSelectOptCodeColumn ? COVERAGES_MULTI_SELECT_TABLE : COVERAGES_TABLE

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(code)
      .withEntityName("CoverageRateFactor")
      .named(code)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor", "Factor"))
      .addMatchOperation(getMatchOp(covParam,"Coverage", argSrcBldr1.withRoot(CalcRoutineParamName.TC_COVERAGE)).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(covTermParam,"CovTerm", argSrcBldr2.withRoot(CalcRoutineParamName.TC_COVERAGE)).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(covTermOptParam,"CovTermOption", argSrcBldr3.withRoot(CalcRoutineParamName.TC_COVERAGE)).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static function aMultiSelectCoveragesTable() : RateTableBuilder {
    return createRateTable(aMultiSelectCoveragesTableDef())
  }
  static function uniqueMultiSelectCoveragesTable() : RateTableBuilder {
    var u = aCoveragesTableDefBuilder(true).withCode(COVERAGES_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aMultiSelectCoveragesTableDef() : RateTableDefinition {
    return aCoveragesTableDefBuilder(true).createAndCommit()
  }

  static function aVehicleModTable() : RateTableBuilder {
    return createRateTable(aVehicleModTableDef())
  }
  static function uniqueVehicleModTable() : RateTableBuilder {
    var u = aVehicleModTableDefBuilder().withCode(VEHICLE_MOD_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aVehicleModTableDef() : RateTableDefinition {
    return aVehicleModTableDefBuilder().createAndCommit()
  }
  static function aVehicleModTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(VEHICLE_MOD_TABLE)
      .named(VEHICLE_MOD_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(getParam(1, "Type", "str1"))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(getParam(2, "Value", "bit1", RateTableDataType.TC_BOOLEAN))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static function aVehicleCostNewTable() : RateTableBuilder {
    return createRateTable(aVehicleCostNewTableDef())
  }
  static function uniqueVehicleCostNewTable() : RateTableBuilder {
    var u = aVehicleCostNewTableDefBuilder().withCode(VEHICLE_COST_NEW_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aVehicleCostNewTableDef() : RateTableDefinition {
    return aVehicleCostNewTableDefBuilder().createAndCommit()
  }
  static function aVehicleCostNewTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(VEHICLE_COST_NEW_TABLE)
      .named(VEHICLE_COST_NEW_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(
          {getParam(1, "Min Cost", "int1", RateTableDataType.TC_INTEGER),
           getParam(2, "Max Cost", "int2", RateTableDataType.TC_INTEGER)})
          .withOpName("COST")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp))
  }

  static function aCollDeductibleTable() : RateTableBuilder {
    return createRateTable(aCollDeductibleTableDef())
  }
  static function uniqueCollDeductibleTable() : RateTableBuilder {
    var u = aCollDeductibleTableDefBuilder().withCode(DEDUCTIBLE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aCollDeductibleTableDef() : RateTableDefinition {
    return aCollDeductibleTableDefBuilder().createAndCommit()
  }
  static function aCollDeductibleTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(DEDUCTIBLE_TABLE)
      .named(DEDUCTIBLE_TABLE)
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(getParam("Deductible Option", "str1"))
        .withOpName("DEDUCTIBLE")
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static function anAllTypeTable() : RateTableBuilder {
    return createRateTable(anAllTypeTableDef())
  }
  static function uniqueAllTypeTable() : RateTableBuilder {
    var u = anAllTypeTableBuilder().withCode("PA_ALL_TYPES" + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function anAllTypeTableDef() : RateTableDefinition {
    return anAllTypeTableBuilder().createAndCommit()
  }
  static function anAllTypeTableBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode("PA_ALL_TYPES")
      .named("PA_ALL_TYPES")
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(getParam(1, "String", "str1", RateTableDataType.TC_STRING))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(getParam(2, "Integer", "int1", RateTableDataType.TC_INTEGER))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(getParam(3, "Decimal", "dec1", RateTableDataType.TC_DECIMAL))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(getParam(4, "Date", "date1", RateTableDataType.TC_DATE))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(getParam(5, "Boolean", "bit1", RateTableDataType.TC_BOOLEAN))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static property get VehicleMakeGeoClassTable() : RateTableBuilder {
    return createRateTable(VehicleMakeGeoClassTableDef)
  }
  static property get UniqueVehicleMakeGeoClassTable() : RateTableBuilder {
    var u = VehicleMakeGeoClassTableBuilder.withCode("PA_MAKE_GEO_CLASS" + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static property get VehicleMakeGeoClassTableDef() : RateTableDefinition {
    return VehicleMakeGeoClassTableBuilder.createAndCommit()
  }
  static property get VehicleMakeGeoClassTableBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode("PA_MAKE_GEO_CLASS")
      .named("PA Make Geo Class")
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("GEO_CLASS", "str7", RateTableDataType.TC_STRING))
      .addMatchOperation(getMatchOp(getParam("MAKE", "str1"))
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  static property get VehicleGeoRateTable() : RateTableBuilder {
    return createRateTable(VehicleGeoRateTableDef)
  }
  static property get UniqueVehicleGeoRateTable() : RateTableBuilder {
    var u = VehicleGeoRateTableBuilder.withCode("PA_GEO_RATE" + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static property get VehicleGeoRateTableDef() : RateTableDefinition {
    return VehicleGeoRateTableBuilder.createAndCommit()
  }
  static property get VehicleGeoRateTableBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder().addArgumentSourceSet(new RateTableArgumentSourceSetBuilder().withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode("PA_GEO_RATE")
      .named("PA Geo Rate")
      .withPolicyLine(PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(
          getParam("GEO_CLASS", "str1")
            .withValueProvider("gw.rating.rtm.valueprovider.ReferenceFactorValueProvider(PA_MAKE_GEO_CLASS,GEO_CLASS)")
        )
        .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  //===========================================================================
  // Postal code (longest substring) table
  //===========================================================================
  static function aPOSTCODETable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aPOSTCODETableDef())
  }
  static function uniquePOSTCODETable() : RateTableBuilder {
    var u = aPOSTCODETableDefBuilder().withCode(POSTCODE_TABLE + UniqueKeyGenerator.get().nextID())
    return createRateTable(u.createAndCommit())
  }
  static function aPOSTCODETableDef() : RateTableDefinition {
    return aPOSTCODETableDefBuilder().createAndCommit()
  }
  static function aPOSTCODETableDefBuilder() : RateTableDefinitionBuilder {
    var countryParam = getParam(10, "COUNTRY", "str1")
                    .withColumnLabel("Country")
                    .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Country)")
    var postCodeParam = getParam(20, "POST_CODE", "str2")
                    .withColumnLabel("Postal Code")
    var covParam = getParam(30, "COV_CODE", "str3")
                      .withColumnLabel("Coverage")
                      .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider")

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(POSTCODE_TABLE)
      .named(POSTCODE_TABLE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(countryParam).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addMatchOperation(getMatchOp(postCodeParam).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.LongestSubstringMatchOp))
      .addMatchOperation(getMatchOp(covParam).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }

  // === End Postal code Table === //

  static function aTableWithColumnNameDifferentFromLabel(): RateTableBuilder {

    var def = new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(TABLE_FACTOR_WITH_DIFFERENT_LABEL)
      .named(TABLE_FACTOR_WITH_DIFFERENT_LABEL)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0, "Factor", "dec5", RateTableDataType.TC_DECIMAL, "DifferentLabel")).createAndCommit()
    return  new RateTableBuilder(def)
  }

  //===========================================================================
  // Single Type Factor Tables
  //===========================================================================

  // -- String Factor Table -- //
  static function aStringFactorTable() : RateTableBuilder {
    return createRateTable(aStringFactorTableDef())
  }
  static function uniqueStringFactorTable() : RateTableBuilder {
    var uniqueCodeName = STRING_FACTOR_TABLE + UniqueKeyGenerator.get().nextID()
    var u = aStringFactorTableDefBuilder()
              .withCode(uniqueCodeName)
              .named(uniqueCodeName)
    return createRateTable(u.createAndCommit())
  }
  static function aStringFactorTableDef() : RateTableDefinition {
    return aStringFactorTableDefBuilder().createAndCommit()
  }
  static function aStringFactorTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(STRING_FACTOR_TABLE)
      .named(STRING_FACTOR_TABLE)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0,
                           STRING_FACTOR_TABLE_FACTOR,
                           "str3",
                           RateTableDataType.TC_STRING,
                           STRING_FACTOR_TABLE_FACTOR))
  }

  // -- Integer Factor Table -- //
  static function anIntegerFactorTable() : RateTableBuilder {
    return createRateTable(anIntegerFactorTableDef())
  }
  static function uniqueIntegerFactorTable() : RateTableBuilder {
    var uniqueCodeName = INTEGER_FACTOR_TABLE + UniqueKeyGenerator.get().nextID()
    var u = anIntegerFactorTableDefBuilder()
              .withCode(uniqueCodeName)
              .named(uniqueCodeName)
    return createRateTable(u.createAndCommit())
  }
  static function anIntegerFactorTableDef() : RateTableDefinition {
    return anIntegerFactorTableDefBuilder().createAndCommit()
  }
  static function anIntegerFactorTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(INTEGER_FACTOR_TABLE)
      .named(INTEGER_FACTOR_TABLE)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0,
                           INTEGER_FACTOR_TABLE_FACTOR,
                           "int8",
                           RateTableDataType.TC_INTEGER,
                           INTEGER_FACTOR_TABLE_FACTOR))
  }

  // -- Boolean Factor Table -- //
  static function aBooleanFactorTable() : RateTableBuilder {
    return createRateTable(aBooleanFactorTableDef())
  }
  static function uniqueBooleanFactorTable() : RateTableBuilder {
    var uniqueCodeName = BOOLEAN_FACTOR_TABLE + UniqueKeyGenerator.get().nextID()
    var u = aDecimalFactorTableDefBuilder()
              .withCode(uniqueCodeName)
              .named(uniqueCodeName)
    return createRateTable(u.createAndCommit())
  }
  static function aBooleanFactorTableDef() : RateTableDefinition {
    return aBooleanFactorTableDefBuilder().createAndCommit()
  }
  static function aBooleanFactorTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(BOOLEAN_FACTOR_TABLE)
      .named(BOOLEAN_FACTOR_TABLE)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0,
                           BOOLEAN_FACTOR_TABLE_FACTOR,
                           "bit2",
                           RateTableDataType.TC_BOOLEAN,
                           BOOLEAN_FACTOR_TABLE_FACTOR))
  }

  // -- Decimal Factor Table -- //
  static function aDecimalFactorTable() : RateTableBuilder {
    return createRateTable(aDecimalFactorTableDef())
  }
  static function uniqueDecimalFactorTable() : RateTableBuilder {
    var uniqueCodeName = DECIMAL_FACTOR_TABLE + UniqueKeyGenerator.get().nextID()
    var u = aDecimalFactorTableDefBuilder()
              .withCode(uniqueCodeName)
              .named(uniqueCodeName)
    return createRateTable(u.createAndCommit())
  }
  static function aDecimalFactorTableDef() : RateTableDefinition {
    return aDecimalFactorTableDefBuilder().createAndCommit()
  }
  static function aDecimalFactorTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(DECIMAL_FACTOR_TABLE)
      .named(DECIMAL_FACTOR_TABLE)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0,
                           DECIMAL_FACTOR_TABLE_FACTOR,
                           "dec6",
                           RateTableDataType.TC_DECIMAL,
                           DECIMAL_FACTOR_TABLE_FACTOR))
  }

  // -- Date Factor Table -- //
  static function aDateFactorTable() : RateTableBuilder {
    return createRateTable(aDecimalFactorTableDef())
  }
  static function uniqueDateFactorTable() : RateTableBuilder {
    var uniqueCodeName = DATE_FACTOR_TABLE + UniqueKeyGenerator.get().nextID()
    var u = aDateFactorTableDefBuilder()
              .withCode(uniqueCodeName)
              .named(uniqueCodeName)
    return createRateTable(u.createAndCommit())
  }
  static function aDateFactorTableDef() : RateTableDefinition {
    return aDateFactorTableDefBuilder().createAndCommit()
  }
  static function aDateFactorTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
      .withCode(DATE_FACTOR_TABLE)
      .named(DATE_FACTOR_TABLE)
      .withPolicyLine(PA_LINE)
      .addMatchOperation(
        getMatchOp({getParam(1, "MatchString", "str1", RateTableDataType.TC_STRING)})
          .withOpName("MATCHSTRING")
          .withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
      .addFactor(getFactor(0,
                           DATE_FACTOR_TABLE_FACTOR,
                           "date2",
                           RateTableDataType.TC_DATE,
                           DATE_FACTOR_TABLE_FACTOR))
  }

  // === End of Single Factor Type Tables === //
  // This table is created for PC-17896, rate table parameter has a non-string column type but a value provider only generates
  //String value
  static function aNumericCovTermOptCoveragesTable() : RateTableBuilder {
    return createRateTable(aNumericCovTermOptTableDef())
  }

  static function aNumericCovTermOptTableDef() : RateTableDefinition {
    return aNumericCovTermOptTableDefBuilder().createAndCommit()
  }
  static function aNumericCovTermOptTableDefBuilder() : RateTableDefinitionBuilder {
    var covParam = getParam(10,"CovCode", "str1")
        .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider")
    var covTermParam = getParam(20, "CovTermCode", "str2")
        .dependsOn(covParam)
        .withValueProvider("gw.rating.rtm.valueprovider.CovTermValueProvider")
    var covTermOptParam = getParam(30, "CovTermOptCode", "int1", RateTableDataType.TC_INTEGER)
        .dependsOn(covTermParam)
        .withValueProvider("gw.rating.rtm.valueprovider.CovTermOptionValueProvider")

    return new RateTableDefinitionBuilder()
        .addArgumentSourceSet(new RateTableArgumentSourceSetBuilder()
            .withCode("DEFAULT")
            .withName("Default")
            .withCalcRoutineParamSet(SampleDataTablesBuilder.PACoverageParamSet))
        .withCode("NumericCovTermOptTable")
        .named("NumericCovTermOptTable")
        .withPolicyLine(PA_LINE)
        .addFactor(getFactor("Factor"))
        .addMatchOperation(getMatchOp(covParam).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
        .addMatchOperation(getMatchOp(covTermParam).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
        .addMatchOperation(getMatchOp(covTermOptParam).withMatchOpDefinition(RateTableMatchOpDefinitionBuilder.ExactMatchOp))
  }
}