package gw.lob.hop.rating

uses entity.windowed.HOPDwellingCovCostVersionList
uses entity.windowed.HOPDwellingCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList

@Export
class HOPDwellingPerilCovCostData extends HOPCostData<HOPDwellingPerilCovCost> {
  var _coverageID: Key
  var _ratedPeril : RatedPeril as ratedPeril

  construct(effDate: Date, expDate : Date,  c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key,
            hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification, ratedPerilArg : RatedPeril) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg);
    init(coverageID, hopPremiumTypeArg, modificationArg, ratedPerilArg)
  }

  construct(cost : HOPDwellingPerilCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    init(cost.HOPDwellingCov.FixedId, cost.RatedPeril)
  }

  protected override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPDwellingCovVersionList
    return coverageVL.HOPDwellingCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPDwellingPerilCovCost) : void {
    super.setSpecificFieldsOnCost( line, cost )
    cost.setFieldValue("HOPDwellingCov", _coverageID)
    cost.setFieldValue("RatedPeril", _ratedPeril)
  }

  protected override property get KeyValues() : List<Object> {
    var result : List<Object> = {_coverageID, _ratedPeril}
    result.addAll(super.KeyValues)
    return result
  }

  private function init(covIDArg : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification, ratedPerilArg : RatedPeril) {
    _coverageID = covIDArg
    hopPremiumType = hopPremiumTypeArg
    modification = modificationArg
    _ratedPeril = ratedPerilArg
  }

  private function init(covIDArg : Key, ratedPerilArg : RatedPeril) {
    _coverageID = covIDArg
    _ratedPeril = ratedPerilArg
  }

  private function isCostVersionListForThisCostData(costVL : HOPDwellingCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPDwellingPerilCovCost
        and firstVersion.RatedPeril == ratedPeril
        and firstVersion.HOPPremiumType == hopPremiumType
        and firstVersion.Modification == modification
  }
}