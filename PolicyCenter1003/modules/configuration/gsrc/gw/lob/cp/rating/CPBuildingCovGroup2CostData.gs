package gw.lob.cp.rating

uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses java.util.Date

@Export
class CPBuildingCovGroup2CostData extends CPBuildingCovCostData<CPBuildingCovGrp2Cost>
{
  construct(effDate : Date, expDate : Date, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, covID, stateArg)
  }
  
  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, c, rateCache, covID, stateArg)
  }
  
  construct(cost : CPBuildingCovGrp2Cost) {
    super(cost)
  }

  construct(cost : CPBuildingCovGrp2Cost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
  }

  override function setSpecificFieldsOnCost(line : CommercialPropertyLine, cost : CPBuildingCovGrp2Cost) {
    super.setSpecificFieldsOnCost(line, cost)
  }

  override function toString() : String {
    return super.toString() + " Coverage : Group II"  // no need for i18n
  }

}
