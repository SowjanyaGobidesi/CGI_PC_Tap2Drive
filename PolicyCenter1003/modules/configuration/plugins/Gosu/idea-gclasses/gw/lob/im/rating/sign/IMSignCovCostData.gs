package gw.lob.im.rating.sign

uses gw.pl.persistence.core.effdate.EffDatedVersionList
uses entity.windowed.IMSignCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.lob.im.rating.IMCostData
uses java.util.Date
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses java.util.List

@Export
class IMSignCovCostData extends IMCostData<IMSignCovCost> {
  
  private var _covID : Key
  private var _partID : Key

  construct(effDate : Date, expDate : Date, covID : Key, partID : Key) {
    super(effDate, expDate)
    assertKeyType(covID, entity.IMSignCov)
    assertKeyType(partID, IMSignPart)
    init(covID, partID)
  }

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, covID : Key, partID : Key) {
    super(effDate, expDate, c, rateCache)
    assertKeyType(covID, entity.IMSignCov)
    assertKeyType(partID, IMSignPart)
    init(covID, partID)
  }

  private function init(covID : Key, partID : Key) {
    _covID = covID
    _partID = partID
  }

  override function setSpecificFieldsOnCost(line : InlandMarineLine, cost : IMSignCovCost) {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("IMSignCov", _covID)
    cost.setFieldValue("IMSignPart", _partID)
  }

  override function getVersionedCosts(line : InlandMarineLine) : List<EffDatedVersionList> {
    var covVL = EffDatedUtil.createVersionList(line.Branch, _covID) as IMSignCovVersionList
    return covVL.Costs
  }

  override property get KeyValues() : List<Object> {
    return {_covID}  
  }
}
