package gw.api.builder

uses gw.api.database.Query
uses gw.bizrules.databuilder.LookupExpressionFragmentBuilder
uses gw.bizrules.databuilder.RuleLookupParameterDefBuilder
uses gw.bizrules.databuilder.RuleLookupRequestDefBuilder
uses gw.bizrules.databuilder.RuleLookupValueDefBuilder

enhancement LookupExpressionFragmentBuilderEnhancement: LookupExpressionFragmentBuilder {

  function createRuleLookupRequestDefBuilder(lookupDefCode : String, inputSymbols : Map<String, String>) : LookupExpressionFragmentBuilder {
    var lookupDef = Query.make(LookupTableDefinition).compare(LookupTableDefinition#TableCode, Equals, lookupDefCode).select().first()

    var ruleLookup = new RuleLookupRequestDefBuilder()
        .withTableID(lookupDef.TableCode)
        .withDescription(lookupDef.TableDesc)
        .withValueDefinition(createValueDef(lookupDef.Output))

    lookupDef.Inputs.each(\input -> {
      if (inputSymbols.containsKey(input.ColumnName)) {
        ruleLookup.addRuleLookupParameter(createParamDef(input, inputSymbols.get(input.ColumnName)))
      } else {
        ruleLookup.addRuleLookupParameter(createParamDef(input, null))
      }
    })
    this.withRuleLookupRequestDef(ruleLookup)

    return this
  }

  private static function createValueDef(output : LookupTableOutputColumn) : RuleLookupValueDefBuilder {
    if (output == null) {
      return new RuleLookupValueDefBuilder()
          .withColumnID("Existence Check")
          .withColumnType(Boolean.DisplayName)
    }
    return new RuleLookupValueDefBuilder()
        .withColumnID(output.ColumnName)
        .withColumnType(output.DataType.toString())
  }

  private static function createParamDef(input : LookupTableInputColumn, symbol : String) : RuleLookupParameterDefBuilder {
    var ruleLookup = new RuleLookupParameterDefBuilder()
        .withColumnID(input.ColumnName)
        .withColumnType(input.DataType.toString())

    if (symbol != null) {
      ruleLookup.withSymbol(symbol)
    }

    return ruleLookup
  }

}
