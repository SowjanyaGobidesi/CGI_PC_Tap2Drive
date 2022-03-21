package gw.rating.rtm.builders.scenario.sample

uses gw.rating.rtm.builders.AbstractFactorRowBuilder
uses gw.rating.rtm.builders.RateFactorRowBuilder
uses java.lang.IllegalArgumentException
uses java.lang.Integer
uses java.math.BigDecimal
uses java.math.MathContext
uses java.util.ArrayList
uses java.util.Date
uses java.util.Map
uses java.util.List
uses gw.api.upgrade.Coercions

@Export
class GenericSampleDataFactorRowBuilder {


  public final static var STATE_TAX_TABLE : List<Object[]> = {
      //State, Factor
      { "CA", 0.0725 },
      { "KY", 0.060 },
      { null, 0.055 }
  }

  final private static var NAME_MAP : Map<String, List<Object[]>> = {
      GenericSampleDataTablesBuilder.GX_STATE_TAX_CODE           -> STATE_TAX_TABLE
  }

  static function getData(tableDef : RateTableDefinition) : AbstractFactorRowBuilder[] {
    var data = NAME_MAP.get(tableDef.TableCode)
    return getData(tableDef, data)
  }

  static function getData(tableDef : RateTableDefinition, data : List<Object[]>) : AbstractFactorRowBuilder[] {
    var rows = new ArrayList<AbstractFactorRowBuilder>()
    for (i in 0..|data.Count) {
      var builder = new RateFactorRowBuilder()
      tableDef.AllColumns.eachWithIndex(\ col, j -> {
        builder.with(col.PhysicalColumnName, wrap(col, data[i][j]))
      })
      rows.add(builder)
    }
    return rows.toTypedArray()
  }

  static function wrap(column : RateTableColumn, value : Object) : Object {
    switch (column.ColumnType) {
      case RateTableDataType.TC_BOOLEAN : return Coercions.makeBooleanFrom(value)
      case RateTableDataType.TC_DATE    : return Coercions.makeDateFrom(value)
      case RateTableDataType.TC_DECIMAL : return value != null ? new BigDecimal(Coercions.makePDoubleFrom(value), new MathContext(4)) : null as BigDecimal
      case RateTableDataType.TC_INTEGER : return value != null ? Integer.valueOf(Coercions.makePIntFrom(value)) : null as Integer
      case RateTableDataType.TC_STRING  : return value != null ? String.valueOf(value) : null as String
    }
    throw new IllegalArgumentException("Invalid column type ${column.ColumnType}")
  }
}
