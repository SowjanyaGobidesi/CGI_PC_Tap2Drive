package gw.lob.hop.rating

uses entity.windowed.HOPDwellSchCovItemCovCostVersionList
uses entity.windowed.HOPDwellSchCovItemCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList
uses productmodel.HOPLine
uses typekey.Currency
uses entity.HOPDwellSchCovItemCov

@Export
class HOPDwellSchCovItemCovCostData extends HOPCostData<HOPDwellSchCovItemCovCost> {
  var _coverageID: Key

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(coverageID)
  }

  construct(cost : HOPDwellSchCovItemCovCost) {
    super(cost)
    _coverageID = cost.Coverage.FixedId
  }

  construct(cost : HOPDwellSchCovItemCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    _coverageID = cost.Coverage.FixedId
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPDwellSchCovItemCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPDwellSchCovItemCov", _coverageID)
  }

  override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPDwellSchCovItemCovVersionList
    return coverageVL.HOPDwellSchCovItemCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  private function init(coverageID : Key) {
    assertKeyType(coverageID, HOPDwellSchCovItemCov)
    _coverageID = coverageID
  }

  private function isCostVersionListForThisCostData(costVL : HOPDwellSchCovItemCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPDwellSchCovItemCovCost
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