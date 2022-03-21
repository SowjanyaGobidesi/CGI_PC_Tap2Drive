package gw.lob.im.rating
uses gw.rating.CostData
uses gw.financials.PolicyPeriodFXRateCache
uses java.util.Date

@Export
abstract class IMCostData<T extends IMCost> extends CostData<T, InlandMarineLine> {
  
  construct(effDate : Date, expDate : Date) {
    super(effDate, expDate)
  }
  
  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache) {
    super(effDate, expDate, c, rateCache)
  }
  
  override function setSpecificFieldsOnCost(line : InlandMarineLine, cost : T) {
    cost.setFieldValue("InlandMarineLine", line.FixedId)
  }
}
