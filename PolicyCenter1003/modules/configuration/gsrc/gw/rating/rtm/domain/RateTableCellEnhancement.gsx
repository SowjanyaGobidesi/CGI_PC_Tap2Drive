package gw.rating.rtm.domain

uses gw.rating.rtm.valueprovider.RateTableCellValueProvider
uses java.math.BigDecimal
uses gw.api.util.PCNumberFormatUtil
uses java.lang.Comparable
uses gw.api.util.DisplayableException
uses java.lang.Exception
uses gw.api.locale.DisplayKey
uses java.util.List

/**
 * GUI enhancements for display/edit of RateTableCell
 */
enhancement RateTableCellEnhancement<T extends Comparable> : gw.rating.rtm.domain.table.RateTableCell<T> {
  property get EditMode() : String {
    return this.ColumnDefinition.EditMode
  }

  function getEditModeByLocationEditMode(locationInEditMode : boolean) : String {
    return this.ColumnDefinition.getEditModeByLocationEditMode(locationInEditMode)
  }

  function getOptionalLabel(vp : RateTableCellValueProvider, v : Object) : String {
    if (vp == null) {
      return ""
    }
    if (this.ColumnDefinition.ColumnType == RateTableDataType.TC_DECIMAL) {
      return PCNumberFormatUtil.render(getBigDecimalEquivalent(v))
    }
    return vp.valueByCode(this.Adapter, v as String)
  }

  reified function getValueRange(vp : RateTableCellValueProvider) : List<T> {
    if (vp == null) {
      return {this.Value}
    }
    var values = vp.getValues(this.Adapter).toList()
    try {
      switch (this.ColumnDefinition.ColumnType) {
        case RateTableDataType.TC_DECIMAL :
          return values.map(\v -> {
            return v.toBigDecimal()
          }).cast(T)
        case RateTableDataType.TC_INTEGER :
          return values.map(\v -> {
            return v.toInt()
          }).cast(T)
        case RateTableDataType.TC_DATE :
          return values.map(\v -> {
            return v.toDate()
          }).cast(T)
        case RateTableDataType.TC_BOOLEAN :
          return values.map(\v -> {
            return v.toBoolean()
          }).cast(T)
        default:
          return values.cast(T)
      }
    } catch (e : Exception) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.InvalidValueProviderForColumnType", this.ColumnDefinition.ColumnLabel, this.ColumnDefinition.ColumnType.DisplayName))
    }
  }

  function checkAvailable(vp : RateTableCellValueProvider) : Boolean {
    return vp == null or
          vp.getValues(this.Adapter).length > 0
  }

  private function getBigDecimalEquivalent(v : Object) : BigDecimal {
    var num : BigDecimal
    if (v typeis BigDecimal) {
      num = v
    } else {
      num = PCNumberFormatUtil.parse(v as String)
    }
    return num
  }
}
