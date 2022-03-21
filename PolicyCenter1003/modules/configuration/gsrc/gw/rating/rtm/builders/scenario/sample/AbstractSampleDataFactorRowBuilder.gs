package gw.rating.rtm.builders.scenario.sample

uses gw.api.upgrade.Coercions
uses gw.rating.rtm.builders.AbstractFactorRowBuilder
uses gw.rating.rtm.builders.RateFactorRowBuilder

uses java.math.BigDecimal
uses java.math.MathContext

@Export
abstract class AbstractSampleDataFactorRowBuilder {

  static function getData(tableDef: RateTableDefinition, data: List<Object[]>): AbstractFactorRowBuilder[] {
    var rows = new ArrayList<AbstractFactorRowBuilder>()
    for (i in 0..|data.Count) {
      var builder = new RateFactorRowBuilder()
      tableDef.AllColumns.eachWithIndex(\col, j -> builder.with(col.PhysicalColumnName, wrap(col, data[i][j])))
      rows.add(builder)
    }
    return rows.toTypedArray()
  }

  static function wrap(column: RateTableColumn, value: Object): Object {
    switch (column.ColumnType) {
      case RateTableDataType.TC_BOOLEAN:
        return Coercions.makeBooleanFrom(value)
      case RateTableDataType.TC_DATE:
        return Coercions.makeDateFrom(value)
      case RateTableDataType.TC_DECIMAL:
        return value != null ? Coercions.makeBigDecimalFrom(value) : null as BigDecimal
      case RateTableDataType.TC_INTEGER:
        return value != null ? Coercions.makeIntFrom(value) : null as Integer
      case RateTableDataType.TC_STRING:
        return value != null ? String.valueOf(value) : null as String
    }
    throw new IllegalArgumentException("Invalid column type ${column.ColumnType}")
  }
}
