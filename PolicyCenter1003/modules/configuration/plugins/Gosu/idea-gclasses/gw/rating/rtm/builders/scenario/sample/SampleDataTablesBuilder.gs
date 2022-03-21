package gw.rating.rtm.builders.scenario.sample

uses gw.api.database.Query
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.rating.rtm.RatingTestMethods
uses gw.rating.rtm.builders.RateTableArgumentSourceBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.rating.rtm.builders.scenario.PARateTablesBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceSetBuilder
uses gw.util.concurrent.LockingLazyVar
uses gw.rating.rtm.builders.RateTableMatchOpBuilder
uses gw.sampledata.tiny.TinySampleRatingData

@Export
class SampleDataTablesBuilder implements RatingTestMethods {

  public final static var PA_COV_BASE_RATE       : String = "pa_coverage_base_rate"
  public final static var PA_COV_BASE_RATE_FACTOR  : String = "Base Rate"
  public final static var PA_COV_BASE_RATE_NAME    : String = "BaseRate"
  public static final var PA_COVERAGES           : String = "pa_coverages"
  public static final var PA_COVERAGES_FACTOR      : String = "Coverage Factor"
  public static final var PA_COVERAGES_NAME        : String = "CoverageFactor"
  public static final var PA_VEHICLE_AGE         : String = "pa_vehicle_age"
  public static final var PA_VEHICLE_AGE_FACTOR    : String = "Factor"
  public static final var PA_VEHICLE_AGE_NAME      : String = "VehicleAgeFactor"
  public static final var PA_VEHICLE_COST        : String = "pa_vehicle_cost"
  public static final var PA_VEHICLE_COST_FACTOR   : String = "Factor"
  public static final var PA_VEHICLE_COST_NAME     : String = "VehicleCostFactor"
  public static final var PA_VEHICLE_DISCOUNT    : String = "pa_vehicle_discount"
  public static final var PA_VEHICLE_DISCOUNT_FACTOR : String = "Factor"
  public static final var PA_VEHICLE_DISCOUNT_NAME : String = "VehicleSafetyEquipmentDiscount"
  public static final var PA_UW_COMPANY          : String = "pa_uw_company"
  public static final var PA_UW_COMPANY_FACTOR     : String = "Factor"
  public static final var PA_UW_COMPANY_NAME       : String = "UWCompanyFactor"
  public static final var PA_DISCOUNT            : String = "pa_discount"
  public static final var PA_DISCOUNT_FACTOR       : String = "Factor"
  public static final var PA_DISCOUNT_NAME         : String = "Discount"
  public static final var PA_DRIVER_AGE          : String = "pa_driver_age"
  public static final var PA_DRIVER_AGE_FACTOR     : String = "Factor"
  public static final var PA_DRIVER_AGE_NAME       : String = "DriverAgeFactor"
  public static final var PA_YOUTHFUL_DRIVER     : String = "pa_youthful_driver"
  public static final var PA_YOUTHFUL_DRIVER_FACTOR: String = "Age"
  public static final var PA_YOUTHFUL_DRIVER_NAME  : String = "YouthfulDriverAge"
  public static final var PA_MULTIPOLICY         : String = "pa_multiple_policy"
  public static final var PA_MULTIPOLICY_FACTOR    : String = "Factor"
  public static final var PA_MULTIPOLICY_NAME      : String = "MultipolicyDiscount"
  public static final var PA_PIP_NJ              : String = "pa_pip_nj"
  public static final var PA_PIP_NJ_FACTOR         : String = "Factor"
  public static final var PA_PIP_NJ_NAME           : String = "PIPNJ"
  public static final var POSTCODE_RATING        : String = "postcode_rating"
  public static final var POSTCODE_RATING_FACTOR   : String = "Factor"
  public static final var POSTCODE_RATING_NAME     : String = "Postal Code Factor"
  public static final var PA_COV_DISCOUNT        : String = "pa_coverages_discount"
  public static final var PA_COV_DISCOUNT_FACTOR   : String = "Factor"
  public static final var PA_COV_DISCOUNT_NAME     : String = "CoverageDiscount"
  public static final var PA_RENEWAL_CAP         : String = "pa_renewal_cap"
  public static final var PA_RENEWAL_CAP_AMOUNT    : String = "Amount"
  public static final var PA_RENEWAL_CAP_PERCENT   : String = "Percent"
  public static final var PA_RENEWAL_CAP_NAME      : String = "AutomaticRenewalCap"
  public static final var BOOLEAN_RATING         : String = "boolean_rating"
  public static final var BOOLEAN_RATING_FACTOR    : String = "Factor"
  public static final var BOOLEAN_RATING_NAME      : String = "BooleanRating"
  public static final var DECIMAL_PARAM          : String = "decimal_param"
  public static final var DECIMAL_PARAM_FACTOR      : String = "Factor"
  public static final var DECIMAL_PARAM_NAME        : String = "DecimalParam"
  public static final var DATE_PARAM             : String = "date_param"
  public static final var DATE_PARAM_FACTOR        : String = "Factor"
  public static final var DATE_PARAM_NAME          : String = "DateParam"
  public static final var DATE_RANGE_PARAM       : String = "date_range_param"
  public static final var DATE_RANGE_PARAM_FACTOR  : String = "Factor"
  public static final var DATE_RANGE_PARAM_NAME    : String = "DateRangeParam"
  public static final var INTERPOLATED_PARAM     : String = "pa_interpolation_param"
  public static final var INTERPOLATED_FACTOR      : String = "Interpolation Factor"
  public static final var INTERPOLATED_PARAM_NAME  : String = "InterpolationParam"
  public static final var INTERPOLATED_WITH_RELAX_PARAM     : String = "pa_interpolation_wrelax_param"
  public static final var INTERPOLATED_WITH_RELAX_FACTOR      : String = "Interpolation With Relax Factor"
  public static final var INTERPOLATED_WITH_RELAX_PARAM_NAME  : String = "InterpolationWithRelaxParam"
  public static final var REF_VALUE_PROVIDER_TEST : String = "pa_ref_value_provider_test"
  public static final var REF_VALUE_PROVIDER_NAME : String = "ReferenceValueProviderTestData"
  public static final var REF_DECIMAL_COL_FACTOR      : String = "DecimalColumn"
  public static final var REF_INTEGER_COL_NAME  : String = "IntegerColumn"
  public static final var REF_DATE_COL_NAME  : String = "DateColumn"
  public static final var REF_STRING_COL_NAME  : String = "StringColumn"
  public static final var REF_BOOLEAN_COL_NAME  : String = "BooleanColumn"
  
  construct() {}

  // these CalcRoutineParameterSets are generated by TinySampleRatingData
  static var _PACoverageParamSetLocal = new LockingLazyVar<CalcRoutineParameterSet>() {
    override function init(): CalcRoutineParameterSet {
    	new TinySampleRatingData().load()
    	return Query.make(CalcRoutineParameterSet)
      		.compare("Code", Equals, "PACoverageParamSet").select().single()
  	}
  }

  static var _PACancellationShortRatePenaltyParamSetLocal = new LockingLazyVar<CalcRoutineParameterSet>() {
    override function init(): CalcRoutineParameterSet {
    	new TinySampleRatingData().load()
    	return Query.make(CalcRoutineParameterSet)
      		.compare("Code", Equals, "PACancellationShortRatePenaltyParamSet").select().single()
	}
  }

  static var _PAVehCoverageParamSetLocal = new LockingLazyVar<CalcRoutineParameterSet>() {
    override function init(): CalcRoutineParameterSet {
    	new TinySampleRatingData().load()
    	return Query.make(CalcRoutineParameterSet)
      		.compare("Code", Equals, "PAVehicleCoverageParamSet").select().single()
	}
  }

  static var _PADriverAssignParamSetLocal = new LockingLazyVar<CalcRoutineParameterSet>() {
	override function init(): CalcRoutineParameterSet {
        new TinySampleRatingData().load()
    	return Query.make(CalcRoutineParameterSet)
      		.compare("Code", Equals, "PADriverAssignmentParamSet").select().single()
	}
  }

  static var _StateTaxParamSetLocal = new LockingLazyVar<CalcRoutineParameterSet>() {
	override function init(): CalcRoutineParameterSet {
	    new TinySampleRatingData().load()
    	return Query.make(CalcRoutineParameterSet)
      		.compare("Code", Equals, "StateTaxParamSet").select().single()
	}
  }

  static var _PIPNJParamSetLocal = new LockingLazyVar<CalcRoutineParameterSet>() {
	override function init(): CalcRoutineParameterSet {    
		new TinySampleRatingData().load()
    	return Query.make(CalcRoutineParameterSet)
      		.compare("Code", Equals, "PIPNJParamSet").select().single()
	}
  }

  static var _PACoverageParamSet : CalcRoutineParameterSet as PACoverageParamSet = _PACoverageParamSetLocal.get()
  static var _PACancellationShortRatePenaltyParamSet : CalcRoutineParameterSet as PACancellationShortRatePenaltyParamSet =
      _PACancellationShortRatePenaltyParamSetLocal.get()
  static var _PAVehCoverageParamSet : CalcRoutineParameterSet as PAVehicleCoverageParamSet = _PAVehCoverageParamSetLocal.get()
  static var _PADriverAssignParamSet : CalcRoutineParameterSet as PADriverAssignmentParamSet = _PADriverAssignParamSetLocal.get()
  static var _PAStateTaxParamSet : CalcRoutineParameterSet as StateTaxParamSet = _StateTaxParamSetLocal.get()
  static var _PIPNJParamSet : CalcRoutineParameterSet as PIPNJParamSet = _PIPNJParamSetLocal.get()

  public static final var EXACT_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "ExactMatch").select().AtMostOneRow
  public static final var RANGE_MAX_EXCL_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "RangeMatchMaxExcl").select().AtMostOneRow
  public static final var RANGE_MAX_INCL_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "RangeMatchMaxIncl").select().AtMostOneRow
  public static final var LONGEST_SUBSTRING_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "LongestSubstringMatch").select().AtMostOneRow
  public static final var INTERPOLATED_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "Interpolate").select().AtMostOneRow
  public static final var INTERPOLATED_WITH_RELAX_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "InterpolateWithRelax").select().AtMostOneRow

  //===========================================================================
  // PA Base Rate for Coverages
  //===========================================================================

  static function aBaseRateTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aBaseRateTableDef())
  }
  static function uniqueBaseRateTable() : RateTableBuilder {
    var u = aBaseRateTableDefBuilder().withCode(PA_COV_BASE_RATE + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aBaseRateTableDef() : RateTableDefinition {
    return aBaseRateTableDefBuilder().createAndCommit()
  }

  static function aBaseRateTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcBldr3 = new RateTableArgumentSourceBuilder()

    var paramBldr1 = getParam(10, "COV_CODE", "str1")
          .withColumnLabel("Coverage")
          .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider")
    var paramBldr2 = getParam(20, "JURISDICTION", "str2")
          .withColumnLabel("Jurisdiction")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")
    var paramBldr3 = getParam(30, "POSTAL_CODE", "str3")
          .withColumnLabel("Postal Code")

    var matchopBldr1 = getMatchOp(paramBldr1, "Coverage", argSrcBldr1.withRoot(TC_COVERAGE))
        .withOpName("COV_CODE")
        .withMatchOpName("Cov Code")
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF)
    var matchopBldr2 = getMatchOp(paramBldr2, "BaseState", argSrcBldr2)
        .withOpName("JURISDICTION")
        .withMatchOpName("Jurisdiction")
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF)
    var matchopBldr3 = getMatchOp( paramBldr3, "GarageLocation.PostalCode", argSrcBldr3.withRoot(TC_VEHICLE))
        .withOpName("POSTAL_CODE")
        .withMatchOpName("Postal Code")
        .withMatchOpDefinition(LONGEST_SUBSTRING_MATCH_OP_DEF)

    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)
      .addArgumentSource(argSrcBldr3)

    var defBldr = new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_COV_BASE_RATE)
      .named(PA_COV_BASE_RATE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(matchopBldr1)
      .addMatchOperation(matchopBldr2)
      .addMatchOperation(matchopBldr3)
      .addFactor(getFactor(PA_COV_BASE_RATE_FACTOR))

    return defBldr
  }

static function aSimpleTableWithPACoverageParamSet(suffix : String = "") : RateTableDefinitionBuilder {
    var paramBldr = getParam(10, "COV_CODE", "str1")
          .withColumnLabel("Coverage")

    var argSrcBldr = new RateTableArgumentSourceBuilder()
    var matchopBldr1 = getMatchOp(paramBldr, "Coverage", argSrcBldr.withRoot(TC_COVERAGE))
        .withOpName("COV_CODE")
        .withMatchOpName("Cov Code")
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    // in this case getMatchOp gets it wrong?
    argSrcBldr.withArgumentSource("PatternCode")

    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr)

    var defBldr = new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_COV_BASE_RATE + suffix)
      .named(PA_COV_BASE_RATE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(matchopBldr1)
      .addFactor(getFactor(PA_COV_BASE_RATE_FACTOR))

    return defBldr
  }

  //===========================================================================
  // PA Coverages
  //===========================================================================
  static function aCoveragesTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aCoveragesTableDef())
  }
  static function uniqueCoveragesTable() : RateTableBuilder {
    var u = aCoveragesTableDefBuilder().withCode(PA_COVERAGES + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aCoveragesTableDef() : RateTableDefinition {
    return aCoveragesTableDefBuilder().createAndCommit()
  }
  static function aCoveragesTableDefBuilder() : RateTableDefinitionBuilder {
    var covParam = getParam(10, "COV_CODE", "CovCode")
                      .withColumnLabel("Coverage")
                      .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider")
    var covTermParam = getParam(20, "COVTERM_CODE", "CovTermCode")
                      .dependsOn(covParam)
                      .withColumnLabel("Cov Term")
                      .withValueProvider("gw.rating.rtm.valueprovider.CovTermValueProvider")
    var covTermOptParam = getParam(30, "COVTERMOPT_CODE", "CovTermOptCode")
                      .dependsOn(covTermParam)
                      .withColumnLabel("Cov Term Value")
                      .withValueProvider("gw.rating.rtm.valueprovider.CovTermOptionValueProvider")
    var jurParam = getParam(40, "JURISDICTION", "Jurisdiction")
                      .withColumnLabel("Jurisdiction")
                      .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcBldr3 = new RateTableArgumentSourceBuilder()
    var argSrcBldr4 = new RateTableArgumentSourceBuilder()

    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)
      .addArgumentSource(argSrcBldr3)
      .addArgumentSource(argSrcBldr4)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withEntityName("CoverageRateFactor")
      .withCode(PA_COVERAGES)
      .named(PA_COVERAGES_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_COVERAGES_FACTOR, "Factor"))

      .addMatchOperation(getMatchOp(covParam,"Coverage", argSrcBldr1.withRoot(CalcRoutineParamName.TC_COVERAGE)).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(covTermParam,"CovTerm", argSrcBldr2.withRoot(CalcRoutineParamName.TC_COVERAGE)).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(covTermOptParam,"CovTermOption", argSrcBldr3.withRoot(CalcRoutineParamName.TC_COVERAGE)).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(jurParam,"BaseState", argSrcBldr4).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA Vehicle Age
  //===========================================================================
  static function aVehicleAgeTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aVehicleAgeTableDef())
  }
  static function uniqueVehicleAgeTable() : RateTableBuilder {
    var u = aVehicleAgeTableDefBuilder().withCode(PA_VEHICLE_AGE + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aVehicleAgeTableDef() : RateTableDefinition {
    return aVehicleAgeTableDefBuilder().createAndCommit()
  }
  static function aVehicleAgeTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot("Vehicle").withArgumentSource("Year")
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_VEHICLE_AGE)
      .named(PA_VEHICLE_AGE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_VEHICLE_AGE_FACTOR))
      .addMatchOperation(getMatchOp({
          getParam(10, "MIN", "int1", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Min (>=)")
            .withDisplayType(TC_SMALL),
          getParam(20, "MAX", "int2", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Max (<)")
            .withDisplayType(TC_SMALL)
        })
        .withOpName("AGE")
        .withMatchOpName("Age")
        .withRateTableArgumentSource(argSrcBldr1)
        .withMatchOpDefinition(RANGE_MAX_EXCL_MATCH_OP_DEF)
      )
      .addMatchOperation(getMatchOp(
        getParam(30, "JURISDICTION", "str1")
          .withColumnLabel("Jurisdiction")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"),
          "BaseState", argSrcBldr2
        )
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA Vehicle Cost
  //===========================================================================
  static function aVehicleCostTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aVehicleCostTableDef())
  }
  static function uniqueVehicleCostTable() : RateTableBuilder {
    var u = aVehicleCostTableDefBuilder().withCode(PA_VEHICLE_COST + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aVehicleCostTableDef() : RateTableDefinition {
    return aVehicleCostTableDefBuilder().createAndCommit()
  }
  static function aVehicleCostTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_VEHICLE_COST)
      .named(PA_VEHICLE_COST_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_VEHICLE_COST_FACTOR))
      .addMatchOperation(getMatchOp({
          getParam(10, "MIN", "int1", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Min (>=)")
            .withDisplayType(TC_SMALL),
          getParam(20, "MAX", "int2", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Max (<=)")
            .withDisplayType(TC_SMALL)
        },
        "COST", "CostNew_amt", argSrcBldr1.withRoot(CalcRoutineParamName.TC_VEHICLE))
        .withMatchOpDefinition(RANGE_MAX_INCL_MATCH_OP_DEF)
      )
      .addMatchOperation(getMatchOp(
        getParam(30, "JURISDICTION", "str1")
          .withColumnLabel("Jurisdiction")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"),
          "BaseState", argSrcBldr2
        )
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA UW Company
  //===========================================================================
  static function aUWCompanyTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aUWCompanyTableDef())
  }
  static function uniqueUWCompanyTable() : RateTableBuilder {
    var u = aUWCompanyTableDefBuilder().withCode(PA_UW_COMPANY + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aUWCompanyTableDef() : RateTableDefinition {
    return aUWCompanyTableDefBuilder().createAndCommit()
  }
  static function aUWCompanyTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_UW_COMPANY)
      .named(PA_UW_COMPANY_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_UW_COMPANY_FACTOR))
      .addMatchOperation(getMatchOp(
        getParam(10, "UW_COMPANY", "str3")
          .withColumnLabel("UW Company")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.UWCompanyCode)"),
          "UWCompanyCode", argSrcBldr1
        )
        .withOpName("UW_COMPANY")
        .withMatchOpName("UW Company")
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(
        getParam(20, "JURISDICTION", "str2")
          .withColumnLabel("Jurisdiction")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"),
          "BaseState", argSrcBldr2
        )
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA Discount
  //===========================================================================
  static function aDiscountTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aDiscountTableDef())
  }
  static function uniqueDiscountTable() : RateTableBuilder {
    var u = aDiscountTableDefBuilder().withCode(PA_DISCOUNT + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aDiscountTableDef() : RateTableDefinition {
    return aDiscountTableDefBuilder().createAndCommit()
  }
  static function aDiscountTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot("Vehicle").withArgumentSource("BodyType")
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_DISCOUNT)
      .named(PA_DISCOUNT_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_DISCOUNT_FACTOR))
//      .addFactor(getFactor("Factor"))
      .addMatchOperation(getMatchOp(
        getParam(10, "TYPE", "str1")
          .withColumnLabel("Discount Type")
        )
        .withOpName("TYPE")
        .withMatchOpName("Type")
        .withRateTableArgumentSource(argSrcBldr1)
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(
        getParam(20, "JURISDICTION", "str2")
          .withColumnLabel("Jurisdiction")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"),
          "BaseState", argSrcBldr2
        )
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA Driver Age Factor
  //===========================================================================
  static function aDriverAgeTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aDriverAgeTableDef())
  }
  static function uniqueDriverAgeTable() : RateTableBuilder {
    var u = aDriverAgeTableDefBuilder().withCode(PA_DRIVER_AGE + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aDriverAgeTableDef() : RateTableDefinition {
    return aDriverAgeTableDefBuilder().createAndCommit()
  }
  static function aDriverAgeTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PAVehicleCoverageParamSet)
      .addArgumentSource(argSrcBldr)
      
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_DRIVER_AGE)
      .named(PA_DRIVER_AGE_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_DRIVER_AGE_FACTOR))
      .addMatchOperation(getMatchOp(
        {getParam(0, "AGE_MIN", "int1", RateTableDataType.TC_INTEGER),
         getParam(1, "AGE_MAX", "int2", RateTableDataType.TC_INTEGER)})
           .withRateTableArgumentSource(argSrcBldr
             .withRoot(CalcRoutineParamName.TC_ASSIGNEDDRIVER)
             .withArgumentSource("PolicyDriver.Age"))
        .withOpName("AgeRange")
        .withMatchOpName("Age range")
        .withMatchOpDefinition(RANGE_MAX_INCL_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA Driver Age Factor
  //===========================================================================
  static function aYouthfulDriverTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aYouthfulDriverTableDef())
  }
  static function uniqueYouthfulDriverTable() : RateTableBuilder {
    var u = aYouthfulDriverTableDefBuilder().withCode(PA_YOUTHFUL_DRIVER + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aYouthfulDriverTableDef() : RateTableDefinition {
    return aYouthfulDriverTableDefBuilder().createAndCommit()
  }
  static function aYouthfulDriverTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr = new RateTableArgumentSourceBuilder()
          .withRoot(CalcRoutineParamName.TC_POLICYLINE)
          .withArgumentSource("BaseState")
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PADriverAssignmentParamSet)
      .addArgumentSource(argSrcBldr)
      
    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_YOUTHFUL_DRIVER)
      .named(PA_YOUTHFUL_DRIVER_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_YOUTHFUL_DRIVER_FACTOR, "int1", TC_INTEGER))
      .addMatchOperation(getMatchOp(
        getParam(0, "JURISDICTION", "str1")
          .withColumnLabel("Jurisdiction")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"),
          "BaseState", argSrcBldr
        )
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA Multiple Policy Discount
  //===========================================================================
  static function aMultiplePolicyDiscountTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aMultiplePolicyDiscountTableDef())
  }
  static function uniqueMultiplePolicyDiscountTable() : RateTableBuilder {
    var u = aMultiplePolicyDiscountTableDefBuilder().withCode(PA_MULTIPOLICY + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aMultiplePolicyDiscountTableDef() : RateTableDefinition {
    return aMultiplePolicyDiscountTableDefBuilder().createAndCommit()
  }
  static function aMultiplePolicyDiscountTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_MULTIPOLICY)
      .named(PA_MULTIPOLICY_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_MULTIPOLICY_FACTOR))
      .addMatchOperation(getMatchOp(
        getParam(10, "MULTI_POLICY", "str1")
          .withColumnLabel("Multiple Policies")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.PAMultiPolicyDiscount)")
        )
        .withOpName("MULTI_POLICY")
        .withMatchOpName("Multi Policy")
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(
        getParam(20, "JURISDICTION", "str2")
          .withColumnLabel("Jurisdiction")
          .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)"),
          "BaseState", argSrcBldr2
        )
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }



  //===========================================================================
  // PA Vehicle Safety Discounts
  //===========================================================================
  static function aVehSafetyTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aVehSafetyTableDef())
  }
  static function aVehSafetyTableDef() : RateTableDefinition {
    return aVehSafetyTableDefBuilder().createAndCommit()
  }
  static function aVehSafetyTableDefBuilder() : RateTableDefinitionBuilder {
    var antiLockParam = getParam(10, "ANTILOCK", "bit1", RateTableDataType.TC_BOOLEAN)
                      .withColumnLabel("Antilock Brakes")
                      .withValueProvider("gw.rating.rtm.valueprovider.BooleanValueProvider")
    var passiveRestraintParam = getParam(20, "AIRBAGS", "str1")
                      .withColumnLabel("Passive Restraint System")
                      .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.PassiveRestraintType)")

    var argSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot(TC_VEHICLE).withModifierArgumentSource("PAAntiLockBrakes")
    var argSrcBldr2 = new RateTableArgumentSourceBuilder().withRoot(TC_VEHICLE).withModifierArgumentSource("PAPassiveRestraint")
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)

    var antiLockMatcher = new RateTableMatchOpBuilder()
        .withOpName("ANTILOCK")
        .withMatchOpName("Anti-lock")
        .addParam(antiLockParam)
        .withRateTableArgumentSource(argSrcBldr1)
    var passiveRestraintMatcher = new RateTableMatchOpBuilder()
        .withOpName("AIRBAGS")
        .withMatchOpName("Air Bags")
        .addParam(passiveRestraintParam)
        .withRateTableArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_VEHICLE_DISCOUNT)
      .named(PA_VEHICLE_DISCOUNT_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_VEHICLE_DISCOUNT_FACTOR))
      .addMatchOperation(antiLockMatcher)
      .addMatchOperation(passiveRestraintMatcher)
  }

  //===========================================================================
  // PA PIP New Jersey Coverages
  //===========================================================================
  static function aPIPNJTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aPIPNJTableDef())
  }
  static function uniquePIPNJTable() : RateTableBuilder {
    var u = aPIPNJTableDefBuilder().withCode(PA_PIP_NJ + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aPIPNJTableDef() : RateTableDefinition {
    return aPIPNJTableDefBuilder().createAndCommit()
  }
  static function aPIPNJTableDefBuilder() : RateTableDefinitionBuilder {
    var medLimitParam = getParam(10, "MEDICAL", "str1")
                      .withColumnLabel("Medical")
                      .withValueProvider("gw.rating.rtm.valueprovider.CovTermOptionValueProvider(PAPIP_NJ,PAPIPNJ_MEDLIMIT)")
    var medDeductibleParam = getParam(20, "DEDUCTIBLE", "str2")
                      .withColumnLabel("Medical Deductible")
                      .withValueProvider("gw.rating.rtm.valueprovider.CovTermOptionValueProvider(PAPIP_NJ,PAPIPNJ_MEDDEDUCT)")
    var medOnlyParam = getParam(30, "MED_ONLY", "bit1", RateTableDataType.TC_BOOLEAN)
                      .withColumnLabel("Med Only option")
                      .withValueProvider("gw.rating.rtm.valueprovider.CovTermOptionValueProvider(PAPIP_NJ,PAPIPNJ_MEDONLY)")

    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcBldr3 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PIPNJParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)
      .addArgumentSource(argSrcBldr3)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_PIP_NJ)
      .named(PA_PIP_NJ_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(PA_PIP_NJ_FACTOR))
      .addMatchOperation(getMatchOp(medLimitParam, "PAPIPNJ_MEDLIMITTerm.OptionValue.OptionCode", argSrcBldr1.withRoot(CalcRoutineParamName.TC_PAPIPNJ)).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(medDeductibleParam,"PAPIPNJ_MEDDEDUCTTerm.OptionValue.OptionCode", argSrcBldr2.withRoot(CalcRoutineParamName.TC_PAPIPNJ)).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(medOnlyParam, "PAPIPNJ_MEDONLYTerm.Value", argSrcBldr3.withRoot(CalcRoutineParamName.TC_PAPIPNJ)).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // Postal code (longest substring) table
  //===========================================================================
  static function aPOSTCODETable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aPOSTCODETableDef())
  }
  static function uniquePOSTCODETable() : RateTableBuilder {
    var u = aPOSTCODETableDefBuilder().withCode(POSTCODE_RATING + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
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
    var covParam = getParam(10, "COV_CODE", "str3")
                      .withColumnLabel("Coverage")
                      .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider")

    return new RateTableDefinitionBuilder()
      .withCode(POSTCODE_RATING)
      .named(POSTCODE_RATING_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(POSTCODE_RATING_FACTOR))
      .addMatchOperation(getMatchOp(countryParam).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(postCodeParam).withMatchOpDefinition(LONGEST_SUBSTRING_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(covParam).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // PA_Coverages_Discount table (used to test chained lookups)
  //===========================================================================
  static function aCovDiscountTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aCovDiscountTableDef())
  }
  static function uniqueCovDiscountTable() : RateTableBuilder {
    var u = aCovDiscountTableDefBuilder().withCode(PA_COV_DISCOUNT + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aCovDiscountTableDef() : RateTableDefinition {
    return aCovDiscountTableDefBuilder().createAndCommit()
  }
  static function aCovDiscountTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr2)

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_COV_DISCOUNT)
      .named(PA_COV_DISCOUNT_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(getMatchOp(
        getParam(10, "COV_CODE", "str1")
          .withColumnLabel("Coverage")
          .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider"),
          "Coverage", argSrcBldr2.withRoot(CalcRoutineParamName.TC_COVERAGE)
        )
        .withOpName("COV_CODE")
        .withMatchOpName("Cov Code")
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      // RateFactorRowBuilder expects string factors to be stored as str7 and str8
      .addFactor(getFactor(PA_COV_DISCOUNT_FACTOR, "str7", TC_STRING))
  }

  //===========================================================================
  // Renewal cap table
  //===========================================================================
  static function aRenewalCapTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aRenewalCapTableDef())
  }
  static function uniqueRenewalCapTable() : RateTableBuilder {
    var u = aRenewalCapTableDefBuilder().withCode(PA_RENEWAL_CAP + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aRenewalCapTableDef() : RateTableDefinition {
    return aRenewalCapTableDefBuilder().createAndCommit()
  }
  static function aRenewalCapTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder()
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PAVehicleCoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2.withRoot(null as CalcRoutineParamName))

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(PA_RENEWAL_CAP)
      .named(PA_RENEWAL_CAP_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addMatchOperation(getMatchOp(
        getParam(10, "COV_CODE", "str1")
          .withColumnLabel("Coverage")
          .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider"),
          "Coverage", argSrcBldr1.withRoot(CalcRoutineParamName.TC_COVERAGE)
        )
        .withOpName("COV_CODE")
        .withMatchOpName("Cov Code")
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp({
          getParam(20, "MIN", "int1", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Min (>=)")
            .withDisplayType(TC_SMALL),
          getParam(25, "MAX", "int2", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Max (<)")
            .withDisplayType(TC_SMALL)
        }, "Amount", null, argSrcBldr2).withOpName("AMOUNT") // Would like to make a default arg source for TermAmount, but can't
        .withMatchOpName("Amount")
        .withMatchOpDefinition(RANGE_MAX_EXCL_MATCH_OP_DEF))
      // RateFactorRowBuilder expects decimal factors to be stored starting at dec5
      .addFactor(getFactor(PA_RENEWAL_CAP_AMOUNT, "dec5", 0, TC_DECIMAL))
      .addFactor(getFactor(PA_RENEWAL_CAP_PERCENT, "dec6", 1, TC_DECIMAL))
  }

  //===========================================================================
  // Boolean parameter rate table
  //===========================================================================
  static function aBooleanParameterTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aBooleanParameterTableDef())
  }
  static function aBooleanParameterTableDef() : RateTableDefinition {
    return aBooleanParameterTableDefBuilder().createAndCommit()
  }
  static function aBooleanParameterTableDefBuilder() : RateTableDefinitionBuilder {
    var boolParam = getParam(10, "BOOLPARAM", "bit1")
                    .withColumnLabel("Boolean Param")
                    .withType(RateTableDataType.TC_BOOLEAN)

    return new RateTableDefinitionBuilder()
      .withCode(BOOLEAN_RATING)
      .named(BOOLEAN_RATING_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(BOOLEAN_RATING_FACTOR))
      .addMatchOperation(getMatchOp(boolParam).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // Decimal parameter rate table
  //===========================================================================
  static function aDecimalParameterTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aDecimalParameterTableDef())
  }
  static function aDecimalParameterTableDef() : RateTableDefinition {
    return aDecimalParameterTableDefBuilder().createAndCommit()
  }
  static function aDecimalParameterTableDefBuilder() : RateTableDefinitionBuilder {
    var decimalParam = getParam(10, "DECIMALPARAM", "dec1")
                    .withColumnLabel("Decimal Param")
                    .withType(RateTableDataType.TC_DECIMAL)

    return new RateTableDefinitionBuilder()
      .withCode(DECIMAL_PARAM)
      .named(DECIMAL_PARAM_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(DECIMAL_PARAM_FACTOR))
      .addMatchOperation(getMatchOp(decimalParam).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // Date parameter rate table
  //===========================================================================
  static function aDateParameterTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aDateParameterTableDef())
  }
  static function aDateParameterTableDef() : RateTableDefinition {
    return aDateParameterTableDefBuilder().createAndCommit()
  }
  static function aDateParameterTableDefBuilder() : RateTableDefinitionBuilder {
    var dateParam = getParam(10, "DATEPARAM", "date1")
                    .withColumnLabel("Date Param")
                    .withType(RateTableDataType.TC_DATE)

    return new RateTableDefinitionBuilder()
      .withCode(DATE_PARAM)
      .named(DATE_PARAM_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(DATE_PARAM_FACTOR))
      .addMatchOperation(getMatchOp(dateParam).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }

  //===========================================================================
  // Date range parameter rate table
  //===========================================================================
  static function aDateRangeParameterTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aDateRangeParameterTableDef())
  }
  static function aDateRangeParameterTableDef() : RateTableDefinition {
    return aDateRangeParameterTableDefBuilder().createAndCommit()
  }
  static function aDateRangeParameterTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
      .withCode(DATE_RANGE_PARAM)
      .named(DATE_RANGE_PARAM_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(DATE_RANGE_PARAM_FACTOR))
      .addMatchOperation(getMatchOp(
        {getParam(1, "DATERANGEPARAM_MIN", "date1", RateTableDataType.TC_DATE),
         getParam(2, "DATERANGEPARAM_MAX", "date2", RateTableDataType.TC_DATE)})
        .withOpName("DATERANGEPARAM")
        .withMatchOpName("Date Range Param")
        .withMatchOpDefinition(RANGE_MAX_EXCL_MATCH_OP_DEF))
  }
  
    //===========================================================================
  // Interpolated parameter rate table
  //===========================================================================
  static function aInterpolationParameterTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aInterpolationTableDef())
  }
  static function uniqueInterpolationTable() : RateTableBuilder {
    var u = aInterpolationTableDefBuilder().withCode(INTERPOLATED_PARAM + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aInterpolationTableDef() : RateTableDefinition {
    return aInterpolationTableDefBuilder().createAndCommit()
  }
  static function aInterpolationTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder().withRoot("Vehicle").withArgumentSource("VehicleNumber")
    var argSrcBldr3 = new RateTableArgumentSourceBuilder().withRoot("Vehicle").withArgumentSource("AnnualMileage")
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
      .withCode("DEFAULT")
      .withName("Default")
      .withCalcRoutineParamSet(PACoverageParamSet)
      .addArgumentSource(argSrcBldr1)
      .addArgumentSource(argSrcBldr2)
      .addArgumentSource(argSrcBldr3)

    var discountCodeParam = getParam(30, "discountCodeParam", "int1")
                    .withColumnLabel("Discount Code")
                    .withType(RateTableDataType.TC_INTEGER)
    var interpolatedParam = getParam(20, "interpolatedParam", "dec1")
                    .withColumnLabel("Interpolated Param")
                    .withType(RateTableDataType.TC_DECIMAL)
    var jurParam = getParam(10, "JURISDICTION", "str1")
                 .withColumnLabel("Jurisdiction")
                 .withType(RateTableDataType.TC_STRING)
                 .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")

    return new RateTableDefinitionBuilder()
      .addArgumentSourceSet(argSrcSetBldr)
      .withCode(INTERPOLATED_PARAM)
      .named(INTERPOLATED_PARAM_NAME)
      .withPolicyLine(PARateTablesBuilder.PA_LINE)
      .addFactor(getFactor(INTERPOLATED_FACTOR))
      .addMatchOperation(getMatchOp(jurParam,"BaseState",argSrcBldr1).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(interpolatedParam).withMatchOpDefinition(INTERPOLATED_MATCH_OP_DEF).withRateTableArgumentSource(argSrcBldr2))
      .addMatchOperation(getMatchOp(discountCodeParam).withMatchOpDefinition(EXACT_MATCH_OP_DEF).withRateTableArgumentSource(argSrcBldr3))
  }

  static function uniqueInterpolationWithRelaxTable() : RateTableBuilder {
    var u = aInterpolationWithRelaxTableDefBuilder().withCode(INTERPOLATED_WITH_RELAX_PARAM + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }

  static function aInterpolationWithRelaxParameterTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aInterpolationWithRelaxTableDef())
  }

  static function aInterpolationWithRelaxTableDef() : RateTableDefinition {
    return aInterpolationWithRelaxTableDefBuilder().createAndCommit()
  }

  static function aInterpolationWithRelaxTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
    var argSrcBldr2 = new RateTableArgumentSourceBuilder().withRoot("Vehicle").withArgumentSource("AnnualMileage")
    var argSrcBldr3 = new RateTableArgumentSourceBuilder().withRoot("Vehicle").withArgumentSource("VehicleNumber")
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(PACoverageParamSet)
        .addArgumentSource(argSrcBldr1)
        .addArgumentSource(argSrcBldr2)
        .addArgumentSource(argSrcBldr3)

    var discountCodeParam = getParam(30, "discountCodeParam", "int1")
        .withColumnLabel("Discount Code")
        .withType(RateTableDataType.TC_INTEGER)
    var interpolatedParam = getParam(20, "interpolatedParam", "dec1")
        .withColumnLabel("Interpolated Param")
        .withType(RateTableDataType.TC_DECIMAL)
    var jurParam = getParam(10, "JURISDICTION", "str1")
        .withColumnLabel("Jurisdiction")
        .withType(RateTableDataType.TC_STRING)
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")

    return new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(INTERPOLATED_WITH_RELAX_PARAM)
        .named(INTERPOLATED_WITH_RELAX_PARAM_NAME)
        .withPolicyLine(PARateTablesBuilder.PA_LINE)
        .addFactor(getFactor(INTERPOLATED_WITH_RELAX_FACTOR))
        .addMatchOperation(getMatchOp(jurParam,"BaseState",argSrcBldr1).withMatchOpDefinition(EXACT_MATCH_OP_DEF))
        .addMatchOperation(getMatchOp(interpolatedParam).withMatchOpDefinition(INTERPOLATED_WITH_RELAX_MATCH_OP_DEF).withRateTableArgumentSource(argSrcBldr2))
        .addMatchOperation(getMatchOp(discountCodeParam).withMatchOpDefinition(EXACT_MATCH_OP_DEF).withRateTableArgumentSource(argSrcBldr3))
  }

  //===========================================================================
  // PA - Reference Value Provider Test Data Table
  //===========================================================================
  static function aRefValueProviderTestDataTable() : RateTableBuilder {
    return PARateTablesBuilder.createRateTable(aRefValueProviderTestDataTableDef())
  }
  static function uniqueRefValueProviderTestDataTable() : RateTableBuilder {
    var u = aRefValueProviderTestDataTableDefBuilder().withCode(REF_VALUE_PROVIDER_TEST + UniqueKeyGenerator.get().nextID())
    return PARateTablesBuilder.createRateTable(u.createAndCommit())
  }
  static function aRefValueProviderTestDataTableDef() : RateTableDefinition {
    return aRefValueProviderTestDataTableDefBuilder().createAndCommit()
  }
  static function aRefValueProviderTestDataTableDefBuilder() : RateTableDefinitionBuilder {
    return new RateTableDefinitionBuilder()
        .withCode(REF_VALUE_PROVIDER_TEST)
        .named(REF_VALUE_PROVIDER_NAME)
        .withPolicyLine(PARateTablesBuilder.PA_LINE)
        .addFactor(getFactor(REF_DECIMAL_COL_FACTOR))
        .addMatchOperation(getMatchOp(
            getParam(10, REF_INTEGER_COL_NAME, "int1", RateTableDataType.TC_INTEGER)
                .withColumnLabel(REF_INTEGER_COL_NAME)
                .withDisplayType(TC_SMALL))
          .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
        .addMatchOperation(getMatchOp(
            getParam(20, REF_STRING_COL_NAME, "str1", RateTableDataType.TC_STRING)
                .withColumnLabel(REF_STRING_COL_NAME)
                .withDisplayType(TC_SMALL))
          .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
        .addMatchOperation(getMatchOp(
            getParam(30, REF_BOOLEAN_COL_NAME, "bit1", RateTableDataType.TC_BOOLEAN)
                .withColumnLabel(REF_BOOLEAN_COL_NAME)
                .withDisplayType(TC_SMALL))
          .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
        .addMatchOperation(getMatchOp(
            getParam(40, REF_DATE_COL_NAME, "date1", RateTableDataType.TC_DATE)
                .withColumnLabel(REF_DATE_COL_NAME)
                .withDisplayType(TC_SMALL))
          .withMatchOpDefinition(EXACT_MATCH_OP_DEF))
  }
}
