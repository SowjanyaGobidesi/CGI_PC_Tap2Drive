package gw.lob.cp.rating
uses gw.rating.CostDataWithOverrideSupport
uses gw.financials.PolicyPeriodFXRateCache
uses java.util.Date

@Export
abstract class CPCostData<T extends CPCost> extends CostDataWithOverrideSupport<T, CommercialPropertyLine> {
  construct(effDate : Date, expDate : Date) {
    super(effDate, expDate)
  }

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache) {
    super(effDate, expDate, c, rateCache)
  }

  construct(cost : T) {
    super(cost)
  }

  construct(cost : T, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
  }

  override function setSpecificFieldsOnCost(line : CommercialPropertyLine, cost : T) {
    cost.setFieldValue("CommercialPropertyLine", line.FixedId)
  }
}
