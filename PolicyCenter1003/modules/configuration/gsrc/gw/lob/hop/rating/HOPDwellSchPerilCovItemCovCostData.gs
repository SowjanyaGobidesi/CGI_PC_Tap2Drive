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
class HOPDwellSchPerilCovItemCovCostData extends HOPCostData<HOPDwellSchPerilCovItemCovCost> {
  var _coverageID: Key
  var _ratedPeril : RatedPeril as ratedPeril

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, coverageID : Key,
            hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification, ratedPerilArg : RatedPeril) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(coverageID, ratedPerilArg)
  }

  construct(cost : HOPDwellSchPerilCovItemCovCost) {
    super(cost)
    init(cost.Coverage.FixedId, cost.RatedPeril)
  }

  construct(cost : HOPDwellSchPerilCovItemCovCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    init(cost.Coverage.FixedId, cost.RatedPeril)
  }

  override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var coverageVL = EffDatedUtil.createVersionList(line.Branch, _coverageID) as HOPDwellSchCovItemCovVersionList
    return coverageVL.HOPDwellSchCovItemCovCosts.where(\costVL -> isCostVersionListForThisCostData(costVL))
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPDwellSchPerilCovItemCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPDwellSchCovItemCov", _coverageID)
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

  private function init(coverageID : Key, ratedPerilArg : RatedPeril) {
    assertKeyType(coverageID, HOPDwellSchCovItemCov)
    _coverageID = coverageID
    _ratedPeril = ratedPerilArg
  }

  private function isCostVersionListForThisCostData(costVL : HOPDwellSchCovItemCovCostVersionList) : boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPDwellSchPerilCovItemCovCost
        and firstVersion.RatedPeril == ratedPeril
        and firstVersion.HOPPremiumType == hopPremiumType
        and firstVersion.Modification == modification
  }

  override function toString() : String {
    return "Coverage: ${_coverageID}, Peril: ${_ratedPeril}"
  }

}