package gw.lob.hop.rating

uses gw.financials.PolicyPeriodFXRateCache
uses gw.api.effdate.EffDatedUtil
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList
uses entity.windowed.HOPLineCovVersionList
uses entity.windowed.HOPLineCovCostVersionList

@Export
class HOPLineCovCostData extends HOPCostData<HOPLineCovCost> {
  var _coverageID: Key

  construct(effDate: Date, expDate: Date, c: Currency, rateCache: PolicyPeriodFXRateCache, coverageID: Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(coverageID)
  }

  private function init(coverageID: Key) {
    assertKeyType(coverageID, HOPLineCov)
    _coverageID = coverageID
  }

  construct(cost: HOPLineCovCost) {
    super(cost)
    _coverageID = cost.Coverage.FixedId
  }

  construct(cost: HOPLineCovCost, rateCache: PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    _coverageID = cost.Coverage.FixedId
  }

  override function setSpecificFieldsOnCost(line: HOPLine, cost: HOPLineCovCost): void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPLineCov", _coverageID)
  }

  override function getVersionedCosts(line: HOPLine): List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPLineCovVersionList
    return coverageVL.HOPLineCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  private function isCostVersionListForThisCostData(costVL : HOPLineCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPLineCovCost
        and firstVersion.HOPPremiumType == hopPremiumType
        and firstVersion.Modification == modification
  }

  override function toString(): String {
    return "Coverage: ${_coverageID}"
  }

  protected override property get KeyValues(): List<Object> {
    var result: List<Object> = {_coverageID}
    result.addAll(super.KeyValues)
    return result
  }
}
