package gw.lob.hop.rating

uses entity.windowed.HOPDwellingCovCostVersionList
uses entity.windowed.HOPDwellingCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList

@Export
class HOPDwellingCovCostData extends HOPCostData<HOPDwellingCovCost> {
  var _coverageID: Key

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(coverageID)
  }

  construct(cost : HOPDwellingCovCost) {
    super(cost)
    _coverageID = cost.Coverage.FixedId
  }

  construct(cost : HOPDwellingCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    _coverageID = cost.Coverage.FixedId
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPDwellingCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPDwellingCov", _coverageID)
  }

  override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPDwellingCovVersionList
    return coverageVL.HOPDwellingCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  private function init(coverageID : Key) {
    assertKeyType(coverageID, HOPDwellingCov)
    _coverageID = coverageID
  }

  private function isCostVersionListForThisCostData(costVL : HOPDwellingCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPDwellingCovCost
        and firstVersion.HOPPremiumType == hopPremiumType
        and firstVersion.Modification == modification
  }

  override function toString() : String {
    return "Coverage: ${_coverageID}"
  }

  protected override property get KeyValues() : List<Object> {
    var result : List<Object> = {_coverageID}
    result.addAll(super.KeyValues)
    return result
  }
}