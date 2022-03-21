package gw.rating.rtm.builders.scenario.sample

uses gw.rating.rtm.builders.RateTableArgumentSourceBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceSetBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.sampledata.tiny.TinySampleRatingData
uses gw.util.concurrent.LockingLazyVar

@Export
class CPSampleDataTablesBuilder extends AbstractSampleDataTablesBuilder {

  public final static var CP_LINE                      : String = "CPLine"
  // Arg Src Sets
  public final static var CP_ARG_SET_CODE          : String = "cp_arg_src_set"
  public final static var CP_ARG_SET_NAME          : String = "LookupByWrappedCov"
  // Rate Tables
  public final static var CP_COV_BASE_RATE_CODE        : String = "cp_coverage_base_rate"
  public final static var CP_COV_BASE_RATE_FACTOR      :   String = "Base Rate"
  public final static var CP_COV_BASE_RATE_NAME        :   String = "BaseRate"
  public final static var CP_DEDUCT_CODE               : String = "cp_deduct"
  public final static var CP_DEDUCT_FACTOR             :   String = "Factor"
  public final static var CP_DEDUCT_NAME               :   String = "DeductibleFactor"
  public final static var CP_FIRE_PROTECT_CLASS_CODE   : String = "cp_fire_protect_class"
  public final static var CP_FIRE_PROTECT_CLASS_FACTOR :   String = "Factor"
  public final static var CP_FIRE_PROTECT_CLASS_NAME   :   String = "FireProtectClassFactor"
  public final static var CP_UW_COMPANY_CODE           : String = "cp_uw_company"
  public final static var CP_UW_COMPANY_FACTOR         :   String = "Factor"
  public final static var CP_UW_COMPANY_NAME           :   String = "UWCompanyFactor"

  static var _CPCoverageWrapperParamSetLocal = LockingLazyVar<CalcRoutineParameterSet>.make(\ -> {
    new TinySampleRatingData().load()
  return getCalcRoutineParameterSet("CPCoverageWrapperParamSet")
  })
  static var _CPCoverageWrapperParamSet : CalcRoutineParameterSet as CPCoverageWrapperParamSet = _CPCoverageWrapperParamSetLocal.get()

  //----------------- BaseRateTable -----------------//

  static property get BaseRateTable() : RateTableBuilder {
    return new RateTableBuilder(BaseRateTableDef)
  }

  static property get BaseRateTableDef() : RateTableDefinition {
    return BaseRateTableDefBuilder.createAndCommit()
  }

  static property get BaseRateTableDefBuilder() : RateTableDefinitionBuilder {
    var covArgSrcBldr1 = new RateTableArgumentSourceBuilder()
          .withRoot(CalcRoutineParamName.TC_COVERAGE)
          .withArgumentSource("PatternCode")
    
    var deductFactorArgSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot(CalcRoutineParamName.TC_CPDEDUCTFACTORNAME)

    var causeOfLossArgSrcBldr1 = new RateTableArgumentSourceBuilder()
            .withRoot(CalcRoutineParamName.TC_COVERAGE)
            .withArgumentSource("CauseOfLoss")

    var paramBldr1 = getParam(10, "COV_CODE", "str1")
            .withColumnLabel("Coverage")
            .withValueProvider("gw.rating.rtm.valueprovider.CoverageValueProvider")

    var paramBldr2 = getParam(20, "CAUSE_OF_LOSS", "str2")
            .withColumnLabel("Cause of Loss")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.CPCauseOfLoss)")

    var paramBldr3 = getParam(30, "DEDUCT_FACTOR_NAME", "str3")
            .withColumnLabel("Deductible Factor Name")

    var matchOpBldr1 = getMatchOp(paramBldr1, {covArgSrcBldr1})
            .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var matchOpBldr2 = getMatchOp(paramBldr2, {causeOfLossArgSrcBldr1})
            .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var matchOpBldr3 = getMatchOp(paramBldr3, {deductFactorArgSrcBldr1})
            .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var argSrcSetBldr1 = new RateTableArgumentSourceSetBuilder()
            .withCode(CP_ARG_SET_CODE)
            .withName(CP_ARG_SET_NAME)
            .withCalcRoutineParamSet(CPCoverageWrapperParamSet)
            .addArgumentSource(covArgSrcBldr1)
            .addArgumentSource(causeOfLossArgSrcBldr1)
            .addArgumentSource(deductFactorArgSrcBldr1)

    var defBldr = new RateTableDefinitionBuilder()
            .addArgumentSourceSet(argSrcSetBldr1)
            .withCode(CP_COV_BASE_RATE_CODE)
            .named(CP_COV_BASE_RATE_NAME)
            .withPolicyLine(CP_LINE)
            .addMatchOperation(matchOpBldr1)
            .addMatchOperation(matchOpBldr2)
            .addMatchOperation(matchOpBldr3)
            .addFactor(getFactor(CP_COV_BASE_RATE_FACTOR))

    return defBldr
  }

  //----------------- DeductTable -----------------//

  static property get DeductTable() : RateTableBuilder {
    return new RateTableBuilder(DeductTableDef)
  }

  static property get DeductTableDef() : RateTableDefinition {
    return DeductTableDefBuilder.createAndCommit()
  }

  static property get DeductTableDefBuilder() : RateTableDefinitionBuilder {
    var deductFactorArgSrcBldr = new RateTableArgumentSourceBuilder()
            .withRoot(CalcRoutineParamName.TC_CPDEDUCTFACTORNAME)

    var buildingArgSrcBldr = new RateTableArgumentSourceBuilder()
            .withRoot(CalcRoutineParamName.TC_BUILDING)
            .withArgumentSource("Jurisdiction")

    var deductibleArgSrcBldr = new RateTableArgumentSourceBuilder()
            .withRoot(CalcRoutineParamName.TC_COVERAGE)
            .withArgumentSource("Deductible")

    var limitArgSrcBldr = new RateTableArgumentSourceBuilder()
            .withRoot(CalcRoutineParamName.TC_COVERAGE)
            .withArgumentSource("Limit")

    // Param Builders
    var factorParamBldr = getParam(10, "FACTOR_NAME", "str1")
            .withColumnLabel("Factor Name")

    var deductibleValParamBldr = getParam(20, "DEDUCTIBLE_VALUE", "str2")
            .withColumnLabel("Deductible Value")

    var limitMinParamBldr = getParam(30, "LIMIT_MIN", "int1", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Limit Min")

    var limitMaxParamBldr = getParam(40, "LIMIT_MAX", "int2", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Limit Max")

    var jurisdictionParamBldr = getParam(50, "JURISDICTION", "str3")
            .withColumnLabel("Jurisdiction")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")

    // MatchOp Builders
    var factorMatchOpBldr = getMatchOp(factorParamBldr, {deductFactorArgSrcBldr})
            .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var deductibleMatchOpBldr = getMatchOp(deductibleValParamBldr)
            .withRateTableArgumentSource(deductibleArgSrcBldr)
            .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var limitMinMatchOpBldr = getMatchOp({limitMinParamBldr, limitMaxParamBldr})
            .withRateTableArgumentSource(limitArgSrcBldr)
            .withOpName("LIMIT")
            .withMatchOpName("Limit")
            .withMatchOpDefinition(RANGE_MAX_EXCL_MATCH_OP_DEF)

    var jurisdictionMatchOpBldr = getMatchOp(jurisdictionParamBldr, {buildingArgSrcBldr})
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    // Arg Src Set Bldrs
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
            .withCode(CP_ARG_SET_CODE)
            .withName(CP_ARG_SET_NAME)
            .withCalcRoutineParamSet(CPCoverageWrapperParamSet)
            .addArgumentSource(buildingArgSrcBldr)
            .addArgumentSource(deductibleArgSrcBldr)
            .addArgumentSource(limitArgSrcBldr)
            .addArgumentSource(deductFactorArgSrcBldr)

    // Finally, the table builder
    var defBldr = new RateTableDefinitionBuilder()
            .addArgumentSourceSet(argSrcSetBldr)
            .withCode(CP_DEDUCT_CODE)
            .named(CP_DEDUCT_NAME)
            .withPolicyLine(CP_LINE)
            .addMatchOperation(factorMatchOpBldr)
            .addMatchOperation(deductibleMatchOpBldr)
            .addMatchOperation(limitMinMatchOpBldr)
            .addMatchOperation(jurisdictionMatchOpBldr)
            .addFactor(getFactor(CP_DEDUCT_FACTOR))

    return defBldr
  }

  //----------------- FireProtectClassTable -----------------//

  static property get FireProtectClassTable() : RateTableBuilder {
    return new RateTableBuilder(FireProtectClassTableDef)
  }

  static property get FireProtectClassTableDef() : RateTableDefinition {
    return FireProtectClassDefBuilder.createAndCommit()
  }

  static property get FireProtectClassDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot(CalcRoutineParamName.TC_BUILDING)

    var paramBldr1 = getParam(10, "FIRE_PROTECT_CLASS", "str1")
            .withColumnLabel("Fire Protect Class")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.FireProtectClass)")

    var matchOpBldr1 = getMatchOp(paramBldr1, "CPLocation.Location.FireProtectClass", argSrcBldr1)
            .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
            .withCode("DEFAULT")
            .withName("Default")
            .withCalcRoutineParamSet(CPCoverageWrapperParamSet)
            .addArgumentSource(argSrcBldr1)

    var defBldr = new RateTableDefinitionBuilder()
            .addArgumentSourceSet(argSrcSetBldr)
            .withCode(CP_FIRE_PROTECT_CLASS_CODE)
            .named(CP_FIRE_PROTECT_CLASS_NAME)
            .withPolicyLine(CP_LINE)
            .addMatchOperation(matchOpBldr1)
            .addFactor(getFactor(CP_FIRE_PROTECT_CLASS_FACTOR))

    return defBldr
  }

  //----------------- UWCompanyTable -----------------//

  static property get UWCompanyTable() : RateTableBuilder {
    return new RateTableBuilder(UWCompanyTableDef)
  }

  static property get UWCompanyTableDef() : RateTableDefinition {
    return UWCompanyTableDefBuilder.createAndCommit()
  }

  static property get UWCompanyTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot(CalcRoutineParamName.TC_POLICYLINE)
    var argSrcBldr2 = new RateTableArgumentSourceBuilder().withRoot(CalcRoutineParamName.TC_POLICYLINE)

    var paramBldr1 = getParam(10, "UW_COMPANY", "str1")
            .withColumnLabel("UW Company")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.UWCompanyCode)")

    var paramBldr2 = getParam(20, "JURISDICTION", "str2")
            .withColumnLabel("Jurisdiction")
            .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")

    var matchOpBldr1 = getMatchOp(paramBldr1, "UWCompanyCode", argSrcBldr1)
            .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var matchOpBldr2 = getMatchOp(paramBldr2, "BaseState", argSrcBldr2)
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
            .withCode("DEFAULT")
            .withName("Default")
            .withCalcRoutineParamSet(CPCoverageWrapperParamSet)
            .addArgumentSource(argSrcBldr1)
            .addArgumentSource(argSrcBldr2)

    var defBldr = new RateTableDefinitionBuilder()
            .addArgumentSourceSet(argSrcSetBldr)
            .withCode(CP_UW_COMPANY_CODE)
            .named(CP_UW_COMPANY_NAME)
            .withPolicyLine(CP_LINE)
            .addMatchOperation(matchOpBldr1)
            .addMatchOperation(matchOpBldr2)
            .addFactor(getFactor(CP_UW_COMPANY_FACTOR))

    return defBldr
  }

}
