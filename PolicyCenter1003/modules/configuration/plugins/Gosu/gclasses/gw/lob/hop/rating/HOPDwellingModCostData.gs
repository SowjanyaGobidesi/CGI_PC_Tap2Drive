package gw.lob.hop.rating

uses entity.windowed.HOPCostVersionList
uses entity.windowed.HOPDwellingCovCostVersionList
uses entity.windowed.HOPDwellingCovVersionList
uses entity.windowed.HOPDwellingModVersionList
uses entity.windowed.HOPDwellingModifierCostVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.financials.PolicyPeriodFXRateCache
uses gw.pl.persistence.core.Key
uses gw.pl.persistence.core.effdate.EffDatedVersionList
uses typekey.Currency
uses entity.HOPDwellingCov
uses productmodel.HOPLine

@Export
class HOPDwellingModCostData extends HOPCostData<HOPDwellingModifierCost> {
  var _modifierID: Key

  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache, modifierID : Key, hopPremiumTypeArg : HOPPremiumType, modificationArg : Modification) {
    super(effDate, expDate, c, rateCache, hopPremiumTypeArg, modificationArg)
    init(modifierID)
  }

  construct(cost : HOPDwellingModifierCost) {
    super(cost)
    _modifierID = cost.HOPDwellingMod.FixedId
  }

  construct(cost : HOPDwellingModifierCost, rateCache : PolicyPeriodFXRateCache) {
    super(cost, rateCache)
    _modifierID = cost.HOPDwellingMod.FixedId
  }

  override function setSpecificFieldsOnCost(line : HOPLine, cost : HOPDwellingModifierCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("HOPDwellingMod", _modifierID)
  }

  override function getVersionedCosts(line : HOPLine) : List<EffDatedVersionList> {
    var modifierVL = EffDatedUtil.createVersionList(line.Branch, _modifierID) as HOPDwellingModVersionList
    return modifierVL.HOPDwellingModifierCosts.where(\modVL -> isCostVersionListForThisCostData(modVL))
  }

  private function isCostVersionListForThisCostData(costVL: HOPDwellingModifierCostVersionList): boolean {
    var firstVersion = costVL.AllVersions.first()
    return firstVersion typeis HOPDwellingModifierCost
        and firstVersion.HOPDwellingMod.FixedId == _modifierID
        and firstVersion.HOPPremiumType == hopPremiumType
        and firstVersion.Modification == modification
  }

  private function init(modifierID : Key) {
    assertKeyType(modifierID, HOPDwellingMod)
    _modifierID = modifierID
  }

  override function toString() : String {
    return "Modifier: ${_modifierID}"
  }

  protected override property get KeyValues() : List<Object> {
    var result : List<Object> = {_modifierID}
    result.addAll(super.KeyValues)
    return result
  }
}