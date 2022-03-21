package gw.rating.rtm.builders.scenario.sample

uses gw.api.database.Query
uses gw.rating.rtm.RatingTestMethods
uses gw.rating.rtm.builders.RateTableArgumentSourceBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceSetBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.sampledata.tiny.TinySampleRatingData
uses gw.util.concurrent.LockingLazyVar

@Export
class GenericSampleDataTablesBuilder implements RatingTestMethods {

  public final static var GX_STATE_TAX_CODE            : String  = "gx_state_tax"
  public final static var GENERIC_STATE_TAX_FACTOR          :   String  = "Factor"
  public final static var GENERIC_STATE_TAX_NAME            :   String  = "GenericStateTax"

  static var _GenericStateTaxParamSet : LockingLazyVar<CalcRoutineParameterSet> as GenericStateTaxParamSet = LockingLazyVar<CalcRoutineParameterSet>
      .make(\ -> {
        new TinySampleRatingData().load()
        return getCalcRoutineParameterSet("GenericStateTaxParamSet")
      })

  public static final var EXACT_MATCH_OP_DEF : RateTableMatchOpDefinition =
      Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "ExactMatch").select().AtMostOneRow

  //----------------- GenericStateTaxTable -----------------//

  static property get GenericStateTaxTable() : RateTableBuilder {
    return new RateTableBuilder(GenericStateTaxTableDef)
  }

  static property get GenericStateTaxTableDef() : RateTableDefinition {
    return GenericStateTaxTableDefBuilder.createAndCommit()
  }

  static property get GenericStateTaxTableDefBuilder() : RateTableDefinitionBuilder {
    var argSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(CalcRoutineParamName.TC_STATE)

    var paramBldr1 = getParam(10, "JURISDICTION", "str1")
        .withColumnLabel("Jurisdiction")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.Jurisdiction)")

    var matchOpBldr1 = getMatchOp(paramBldr1)
        .withRateTableArgumentSource(argSrcBldr1)
        .withMatchOpDefinition(EXACT_MATCH_OP_DEF)

    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withName("Default")
        .withCalcRoutineParamSet(GenericStateTaxParamSet.get())
        .addArgumentSource(argSrcBldr1)

    var defBldr = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(GX_STATE_TAX_CODE)
        .named(GENERIC_STATE_TAX_NAME)
        .withPolicyLine(null)
        .addMatchOperation(matchOpBldr1)
        .addFactor(getFactor(GENERIC_STATE_TAX_FACTOR))

    return defBldr
  }


  private static function getCalcRoutineParameterSet(code : String) : CalcRoutineParameterSet {
    return Query<CalcRoutineParameterSet>.make(CalcRoutineParameterSet)
        .compare("Code", Equals, code)
        .select()
        .single()
  }
}
