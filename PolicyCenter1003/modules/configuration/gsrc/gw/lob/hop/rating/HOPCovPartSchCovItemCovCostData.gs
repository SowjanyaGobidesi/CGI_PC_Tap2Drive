package gw.lob.hop.rating

uses entity.HOPDwellSchCovItemCov
uses entity.windowed.HOPCovPartSchCovItemCovCostVersionList
uses entity.windowed.HOPCovPartSchCovItemCovVersionList
uses entity.windowed.HOPDwellSchCovItemCovCostVersionList
uses entity.windowed.HOPDwellSchCovItemCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList
uses productmodel.HOPLine
uses typekey.Currency

@Export
class HOPCovPartSchCovItemCovCostData extends HOPCostData<HOPCovPartSchCovItemCovCost> {
  var _coverageID: Key

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(coverageID)
  }

  construct(cost : HOPCovPartSchCovItemCovCost) {
    super(cost)
    _coverageID = cost.Coverage.FixedId
  }

  construct(cost : HOPCovPartSchCovItemCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    _coverageID = cost.Coverage.FixedId
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPCovPartSchCovItemCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPCovPartSchCovItemCov", _coverageID)
  }

  override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPCovPartSchCovItemCovVersionList
    return coverageVL.HOPCovPartSchCovItemCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  private function init(coverageID : Key) {
    assertKeyType(coverageID, HOPCovPartSchCovItemCov)
    _coverageID = coverageID
  }

  private function isCostVersionListForThisCostData(costVL : HOPCovPartSchCovItemCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPCovPartSchCovItemCovCost
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