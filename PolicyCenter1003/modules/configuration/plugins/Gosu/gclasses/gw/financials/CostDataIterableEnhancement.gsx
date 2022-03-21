package gw.financials

uses gw.rating.CostData

uses java.math.BigDecimal

/**
 * Additional aggregation utility methods for collections of CostData
 */
enhancement CostDataIterableEnhancement<T extends CostData> : Iterable<T> {

  property get ActualTermAmountSum() : BigDecimal {
    return this.sum(\costData -> costData.ActualTermAmount)
  }
}
