package gw.rating.rtm.builders.scenario.sample

uses gw.api.database.Query
uses gw.rating.rtm.RatingTestMethods

@Export
abstract class AbstractSampleDataTablesBuilder implements RatingTestMethods {

  protected static function getCalcRoutineParameterSet(code : String) : CalcRoutineParameterSet {
    return Query.make(CalcRoutineParameterSet)
        .compare(CalcRoutineParameterSet#Code, Equals, code)
        .select()
        .single()
  }

  public static final var EXACT_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "ExactMatch").select().AtMostOneRow
  public static final var RANGE_MAX_EXCL_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "RangeMatchMaxExcl").select().AtMostOneRow
  public static final var RANGE_MAX_INCL_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "RangeMatchMaxIncl").select().AtMostOneRow
  public static final var LONGEST_SUBSTRING_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare(RateTableMatchOpDefinition#OpCode, Equals, "LongestSubstringMatch").select().AtMostOneRow
}
