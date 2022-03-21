package gw.lob.hop

uses gw.api.domain.CoverableAdapter

uses java.util.Date

uses gw.policy.PolicyLineConfiguration

@Export
class HOPCoveragePartCoverableAdapter implements CoverableAdapter {
  var _owner: HOPCoveragePart

  construct(owner: HOPCoveragePart) {
    _owner = owner
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPLine
  }

  override property get PolicyLocations(): PolicyLocation[] {
    return (null)
  }

  override property get State(): Jurisdiction {
    return (_owner.HOPLine.Branch.BaseState)
  }

  override property get CoveragesFromCoverable(): Coverage[] {
    return _owner.Coverages
  }

  override function addCoverage(p0: Coverage): void {
    _owner.addToCoverages(p0 as HOPCoveragePartCov)
  }

  override function removeCoverage(p0: Coverage): void {
    _owner.removeFromCoverages(p0 as HOPCoveragePartCov)
  }

  override property get ExclusionsFromCoverable(): Exclusion[] {
    return _owner.Exclusions
  }

  override function addExclusion(p0: Exclusion): void {
    _owner.addToExclusions(p0 as HOPCoveragePartExcl)
  }

  override function removeExclusion(p0: Exclusion): void {
    _owner.removeFromExclusions(p0 as HOPCoveragePartExcl)
  }

  override property get ConditionsFromCoverable(): PolicyCondition[] {
    return _owner.Conditions
  }

  override function addCondition(p0: PolicyCondition): void {
    _owner.addToConditions(p0 as HOPCoveragePartCond)
  }

  override function removeCondition(p0: PolicyCondition): void {
    _owner.removeFromConditions(p0 as HOPCoveragePartCond)
  }

  override property get DefaultCurrency(): Currency {
    return _owner.Branch.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies(): List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_HOP).AllowedCurrencies
  }

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return {_owner.CoveragePartType}
  }
}
