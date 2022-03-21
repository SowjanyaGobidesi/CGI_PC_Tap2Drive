package gw.lob.hop

uses gw.api.domain.CoverableAdapter

uses java.util.Date
uses java.util.HashSet

uses gw.policy.PolicyLineConfiguration
uses entity.HOPLine

@Export
class HOPLineCoverableAdapter implements CoverableAdapter {

  var _owner: HOPLine

  construct(owner: HOPLine) {
    _owner = owner
  }

  override property get PolicyLine(): PolicyLine {
    return _owner
  }

  override property get State(): Jurisdiction {
    return _owner.Branch.BaseState
  }

  override property get PolicyLocations(): PolicyLocation[] {
    var locs = new HashSet<PolicyLocation>()
    locs.addAll((_owner.HOPDwellings*.Location).toSet())
    return locs.toTypedArray()
  }

  override property get CoveragesFromCoverable(): Coverage[] {
    return _owner.HOPLineCoverages
  }

  override function addCoverage(p0: Coverage): void {
    _owner.addToHOPLineCoverages(p0 as HOPLineCov)
  }

  override function removeCoverage(p0: Coverage): void {
    _owner.removeFromHOPLineCoverages(p0 as HOPLineCov)
  }

  override property get ExclusionsFromCoverable(): Exclusion[] {
    return _owner.HOPLineExclusions
  }

  override function addExclusion(p0: Exclusion): void {
    _owner.addToHOPLineExclusions(p0 as HOPLineExcl)
  }

  override function removeExclusion(p0: Exclusion): void {
    _owner.removeFromHOPLineExclusions(p0 as HOPLineExcl)
  }

  override property get ConditionsFromCoverable(): PolicyCondition[] {
    return _owner.HOPLineConditions
  }

  override function addCondition(p0: PolicyCondition): void {
    _owner.addToHOPLineConditions(p0 as HOPLineCond)
  }

  override function removeCondition(p0: PolicyCondition): void {
    _owner.removeFromHOPLineConditions(p0 as HOPLineCond)
  }

  override property get DefaultCurrency(): Currency {
    return _owner.Branch.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies(): List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_HOP).AllowedCurrencies
  }

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return _owner.HOPCoverageParts*.CoveragePartType
  }
}
