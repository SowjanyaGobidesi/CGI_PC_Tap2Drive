package gw.api.web.dashboard.ui.billing

uses gw.api.locale.DisplayKey
uses gw.api.web.color.GWColor
uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

/**
 * Defines an entry for a summary chart which is a representation of a legend in the chart. It specifies a display key
 * to be used for label, a monetary amount and color for the entry in a chart.
 */
@Export
class BillingSummaryChartEntry {
  final var _labelCode: String
  final var _amount: MonetaryAmount
  final var _colorTheme : GWColor as Color

  construct(label : String, amount : MonetaryAmount, colorTheme : GWColor) {
    _labelCode = label
    _amount = amount
    _colorTheme = colorTheme
  }

  /**
   * Returns the amount that will be used along with {@link #getLabel()}
   * to render the pie chart.
   */
  property get Amount() : BigDecimal {
    return _amount != null ? _amount.Amount : 0bd
  }

  /**
   * Returns a formatted display key to be used to render the pie chart.
   */
  property get Label() : String {
    var displayedValue = _amount != null ? _amount.DisplayValue : "-"
    return DisplayKey.get("Web.Dashboard.Tile.BillingSummary.${_labelCode}", displayedValue)
  }
}