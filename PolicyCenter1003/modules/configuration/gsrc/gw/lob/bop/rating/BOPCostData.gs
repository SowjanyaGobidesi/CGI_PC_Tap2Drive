package gw.lob.bop.rating
uses gw.rating.CostData
uses gw.financials.PolicyPeriodFXRateCache
uses java.util.Date

@Export
abstract class BOPCostData<T extends BOPCost> extends CostData<T, BOPLine> {
  
  private var _state : Jurisdiction as State
  
  construct(effDate : Date, expDate : Date, stateArg : Jurisdiction) {
    super(effDate, expDate)
    init(stateArg)
  }

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, stateArg : Jurisdiction) {
    super(effDate, expDate, c, rateCache)
    init(stateArg)
  }

  construct(cost : T) {
    super(cost)
    init(cost.State)
  }

  construct(cost : T, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    init(cost.State)
  }

  private function init(stateArg : Jurisdiction) {
    _state = stateArg
  }
  
  override function setSpecificFieldsOnCost(line : BOPLine, cost : T) {
    cost.setFieldValue("BusinessOwnersLine", line.FixedId)
  }
}
