package gw.lob.hop.rating

uses entity.windowed.HOPDwellingCovCostVersionList
uses entity.windowed.HOPDwellingCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList

@Export
class HOPDwellingNonPerilCovCostData extends HOPCostData<HOPDwellingNonPerilCovCost> {
  var _coverageID: Key

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg);
    init(coverageID, hopPremiumTypeArg, modificationArg)
  }

  construct(cost : HOPDwellingNonPerilCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    init(cost.HOPDwellingCov.FixedId)
  }

  protected override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPDwellingCovVersionList
    return coverageVL.HOPDwellingCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPDwellingNonPerilCovCost) : void {
    super.setSpecificFieldsOnCost( line, cost )
    cost.setFieldValue("HOPDwellingCov", _coverageID)
  }

  protected override property get KeyValues() : List<Object> {
    var result : List<Object> = {_coverageID}
    result.addAll(super.KeyValues)
    return result
  }

  private function init(covIDArg : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    _coverageID = covIDArg
    hopPremiumType = hopPremiumTypeArg
    modification = modificationArg
  }

  private function init(covIDArg : Key) {
    _coverageID = covIDArg
  }

  private function isCostVersionListForThisCostData(costVL : HOPDwellingCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPDwellingNonPerilCovCost
        and firstVersion.HOPPremiumType == hopPremiumType
        and firstVersion.Modification == modification
  }
}