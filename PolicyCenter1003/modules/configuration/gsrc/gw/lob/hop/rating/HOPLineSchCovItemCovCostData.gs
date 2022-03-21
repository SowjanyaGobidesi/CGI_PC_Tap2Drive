package gw.lob.hop.rating

uses entity.windowed.HOPLineSchCovItemCovCostVersionList
uses entity.windowed.HOPLineSchCovItemCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList
uses productmodel.HOPLine
uses typekey.Currency

@Export
class HOPLineSchCovItemCovCostData extends HOPCostData<HOPLineSchCovItemCovCost> {
  var _coverageID: Key

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(coverageID)
  }

  construct(cost : HOPLineSchCovItemCovCost) {
    super(cost)
    _coverageID = cost.Coverage.FixedId
  }

  construct(cost : HOPLineSchCovItemCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    _coverageID = cost.Coverage.FixedId
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPLineSchCovItemCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPLineSchCovItemCov", _coverageID)
  }

  override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPLineSchCovItemCovVersionList
    return coverageVL.HOPLineSchCovItemCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  private function init(coverageID : Key) {
    assertKeyType(coverageID, HOPLineSchCovItemCov)
    _coverageID = coverageID
  }

  private function isCostVersionListForThisCostData(costVL : HOPLineSchCovItemCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPLineSchCovItemCovCost
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