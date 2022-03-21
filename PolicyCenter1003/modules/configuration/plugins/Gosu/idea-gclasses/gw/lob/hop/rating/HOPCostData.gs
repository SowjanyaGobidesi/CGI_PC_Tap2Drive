package gw.lob.hop.rating

uses gw.rating.CostDataWithOverrideSupport
uses gw.financials.PolicyPeriodFXRateCache

uses java.util.Date

@Export
abstract class HOPCostData<R extends HOPCost> extends CostDataWithOverrideSupport<R, HOPLine> {
  var _hopPremiumType : HOPPremiumType as hopPremiumType
  var _modification : Modification as modification

  construct(effDate : Date, expDate : Date) {
    super(effDate, expDate)
  }

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache)
    init(hopPremiumTypeArg, modificationArg)
  }

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache) {
    super(effDate, expDate, c, rateCache)
  }

  construct(c: R) {
    super(c)
    init(c.HOPPremiumType, c.Modification)
  }

  construct(cost : R, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    init(cost.HOPPremiumType, cost.Modification)
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : R) {
    cost.setFieldValue("HOPLine", line.FixedId)
    cost.setFieldValue("HOPPremiumType", hopPremiumType)
    cost.setFieldValue("Modification", modification)
  }

  protected override property get KeyValues() : List<Object> {
    return {_hopPremiumType, _modification}
  }

  private function init(hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    hopPremiumType = hopPremiumTypeArg
    modification = modificationArg
  }
}
