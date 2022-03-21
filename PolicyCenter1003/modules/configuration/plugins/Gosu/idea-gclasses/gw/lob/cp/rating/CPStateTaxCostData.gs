package gw.lob.cp.rating

uses gw.financials.PolicyPeriodFXRateCache
uses java.util.Date
uses java.util.List

@Export
class CPStateTaxCostData extends CPCostData<CPStateTaxCost>
{
  private var _state : Jurisdiction as State
  
  construct(effDate : Date, expDate : Date, stateArg : Jurisdiction) {
    super(effDate, expDate)
    _state = stateArg
    RateAmountType = TC_TAXSURCHARGE
    ChargePattern = TC_TAXES
  }

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, stateArg : Jurisdiction) {
    super(effDate, expDate, c, rateCache)
    _state = stateArg
    RateAmountType = TC_TAXSURCHARGE
    ChargePattern = TC_TAXES
  }

  override function toString() : String {
    return _state.DisplayName + " State Tax"  // no need for i18n
  }

  override property get KeyValues() : List<Object> {
    return {_state}  
  }

  override function getVersionedCosts( line: CommercialPropertyLine ) : List<gw.pl.persistence.core.effdate.EffDatedVersionList> {
    return line.VersionList.CPCosts.where(\c -> {
      var firstVersion = c.AllVersions.first()
      return firstVersion typeis CPStateTaxCost and firstVersion.State == State
    }).toList()
  }

  override function setSpecificFieldsOnCost( line: CommercialPropertyLine, cost: CPStateTaxCost ) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.TaxState = State
  }

}
