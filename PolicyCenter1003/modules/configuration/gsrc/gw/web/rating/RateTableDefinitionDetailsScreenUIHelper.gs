package gw.web.rating

uses gw.api.database.Query
uses gw.api.database.InOperation
uses gw.api.database.IQueryBeanResult
uses gw.api.util.DisplayableException
uses gw.api.locale.DisplayKey

@Export
class RateTableDefinitionDetailsScreenUIHelper {
  final var _rateTableDefinition: RateTableDefinition as readonly RateTableDefinition
  var _rateTables: List<RateTable>

  construct(rateTableDefinition: RateTableDefinition) {
    _rateTableDefinition = rateTableDefinition
  }

  property get RateTables(): List<RateTable> {
    if (_rateTables == null) {
      _rateTables = calcRateTables(RateTableDefinition)
    }
    return _rateTables
  }

  property get TableDefinitionEditable(): boolean {
    return not RateTableDefinition.HasReferencingRateRoutines and RateTables.isEmpty()
  }

  public static function addFactorDefinition(tableDefinition : entity.RateTableDefinition) : RateTableColumn {
    var columnDef = new RateTableColumn()
    columnDef.ColumnType = TC_DECIMAL // Default is String, which is not always legal for Factors
    tableDefinition.addToFactors(columnDef)
    return columnDef
  }

  public static function addMatchOperation(tableDefinition : entity.RateTableDefinition, matchOpDef : RateTableMatchOpDefinition) : entity.RateTableMatchOp {
    if (!tableDefinition.New) {
      var usedByRateRoutineInRateBook = tableDefinition.ReferencingRateRoutines.firstWhere( \ rr -> rr.isIncludedInPromotedRateBook()) != null
      if (usedByRateRoutineInRateBook and tableDefinition.ArgumentSourceSets.IsEmpty) {
       throw new DisplayableException(DisplayKey.get("Validation.Rating.RateTableDefinition.MissingArgumentSourceSetForExistingParameters"))
      }
    }

    var updatableSrcSets = tableDefinition.ArgumentSourceSets.where(\ s -> not s.isUsedInPromotedBookViaRoutine())

    var matchOp = new RateTableMatchOp()
    matchOp.MatchOpDefinition = matchOpDef
    tableDefinition.addToMatchOps(matchOp)
    for (0..|matchOpDef.NumberOfParameters) {
      var column = new RateTableColumn()
      column.DefinitionForParam = matchOp.Definition
      column.ColumnType = matchOpDef.AllowedParameterTypeSet.order().first()
      matchOp.addToParams(column)
    }

    for (argSrcSet in updatableSrcSets) {
      // if there are "gaps" this will fill them in.
      var  missingOps = tableDefinition.MatchOps.toSet().subtract((argSrcSet.RateTableArgumentSources*.Parameter).toSet())
      for (op in missingOps) {
        var argSrc = new RateTableArgumentSource()
        op.addToArgumentSources(argSrc)
        argSrcSet.addToRateTableArgumentSources(argSrc)
      }
    }

    return matchOp
  }

  public static function tableFactorFilter(tableDefinition : entity.RateTableDefinition, value : RateTableDataType) : Boolean{
    if(tableDefinition.MatchOps.hasMatch(\ mo -> mo.MatchOpDefinition.OpCode == "Interpolate")) {
      return RateTableDataType.TF_INTERPOLATEDFACTOR.TypeKeys.contains(value)
    }
    return RateTableDataType.TF_FACTOR.TypeKeys.contains(value)
  }

  public static property get MatchOpDefinitions(): IQueryBeanResult<RateTableMatchOpDefinition> {
    return Query.make(RateTableMatchOpDefinition)
        .or(\ r -> {
          r.compare("Deprecated", Equals, false)   // by default, only non-deprecated matchops
          r.subselect("ID", InOperation.CompareIn, // but also anything that's already in use
                      RateTableMatchOp, "MatchOpDefinition")
        })
        .select()
  }

  public static function getOpCodeLabel(matchOp : RateTableMatchOp) : String {
    return DisplayKey.get("Web.Rating.Matchop." + matchOp.MatchOpDefinition.OpCode)
  }

  public static function calcRateRoutines(rateTableDef : RateTableDefinition) : List<CalcRoutineDefinition> {
    return rateTableDef.New ? Collections.emptyList() : rateTableDef.ReferencingRateRoutines
  }

  public static function calcRateTables(rateTableDef : RateTableDefinition) : List<RateTable> {
    return rateTableDef.New ? Collections.emptyList() : rateTableDef.tablesUsingDefinition()
  }

  public static function isRateTableDefinitionEditable(rateTableDef : RateTableDefinition) : boolean {
    return calcRateRoutines(rateTableDef).Empty and calcRateTables(rateTableDef).Empty
  }

  public static function calcParameterSet(rateTableDef : RateTableDefinition) : CalcRoutineParameterSet {
    return rateTableDef.getParameterSet()
  }

  public static function calcParameterSets(rateTableDef : RateTableDefinition) : List<CalcRoutineParameterSet> {
    return new gw.pcf.rating.rtm.RateTableParameterSetHelper(rateTableDef).getParamSets()
  }

  public static function calcArgumentSourceSetsUsedInPromotedBooks(rateTableDef : RateTableDefinition): Set<RateTableArgumentSourceSet> {
    return rateTableDef.ArgumentSourceSetsUsedInPromotedRateBooks
  }

  public static function calcArgumentSourceSetsUsedInAnyRateBooks(rateTableDef : RateTableDefinition) : Set<RateTableArgumentSourceSet> {
    return rateTableDef.ArgumentSourceSetsUsedInRateBooks
  }
}
