package gw.lob.hop.rating

uses entity.HOPDwellSchCovItemCov
uses entity.windowed.HOPDwellSchCovItemCovCostVersionList
uses entity.windowed.HOPDwellSchCovItemCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList
uses productmodel.HOPLine
uses typekey.Currency

@Export
class HOPDwellSchNonPerilCovItemCovCostData extends HOPCostData<HOPDwellSchNonPerilCovItemCovCost> {
  var _coverageID: Key

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key,
            hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(coverageID, hopPremiumTypeArg, modificationArg)
  }

  private function init(covIDArg : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    _coverageID = covIDArg
    hopPremiumType = hopPremiumTypeArg
    modification = modificationArg
  }

  construct(cost : HOPDwellSchNonPerilCovItemCovCost) {
    super(cost)
    init(cost.Coverage.FixedId)
  }

  construct(cost : HOPDwellSchNonPerilCovItemCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    init(cost.Coverage.FixedId)
  }

  private function init(coverageID : Key) {
    assertKeyType(coverageID, HOPDwellSchCovItemCov)
    _coverageID = coverageID
  }

  override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPDwellSchCovItemCovVersionList
    return coverageVL.HOPDwellSchCovItemCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPDwellSchNonPerilCovItemCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPDwellSchCovItemCov", _coverageID)
  }

  protected override property get KeyValues() : List<Object> {
    var result : List<Object> = {_coverageID}
    result.addAll(super.KeyValues)
    return result
  }

  private function isCostVersionListForThisCostData(costVL : HOPDwellSchCovItemCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPDwellSchNonPerilCovItemCovCost
        and firstVersion.HOPPremiumType == hopPremiumType
        and firstVersion.Modification == modification
  }

  override function toString() : String {
    return "Coverage: ${_coverageID}"
  }

}