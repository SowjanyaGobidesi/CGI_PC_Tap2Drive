package gw.lob.hop

uses gw.api.domain.CoverableAdapter

uses java.util.Date

uses gw.api.util.JurisdictionMappingUtil
uses gw.policy.PolicyLineConfiguration

@Export
class HOPDwellingCoverableAdapter implements CoverableAdapter {
  var _owner: HOPDwelling

  construct(owner: HOPDwelling) {
    _owner = owner
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPCoveragePart.HOPLine
  }

  override property get PolicyLocations(): PolicyLocation[] {
    return (new PolicyLocation[]{_owner.Location})
  }

  override property get State(): Jurisdiction {
    return (JurisdictionMappingUtil.getJurisdiction(_owner.Location))
  }

  override property get CoveragesFromCoverable(): Coverage[] {
    return _owner.Coverages
  }

  override function addCoverage(p0: Coverage): void {
    _owner.addToCoverages(p0 as HOPDwellingCov)
  }

  override function removeCoverage(p0: Coverage): void {
    _owner.removeFromCoverages(p0 as HOPDwellingCov)
  }

  override property get ExclusionsFromCoverable(): Exclusion[] {
    return _owner.Exclusions
  }

  override function addExclusion(p0: Exclusion): void {
    _owner.addToExclusions(p0 as HOPDwellingExcl)
  }

  override function removeExclusion(p0: Exclusion): void {
    _owner.removeFromExclusions(p0 as HOPDwellingExcl)
  }

  override property get ConditionsFromCoverable(): PolicyCondition[] {
    return _owner.Conditions
  }

  override function addCondition(p0: PolicyCondition): void {
    _owner.addToConditions(p0 as HOPDwellingCond)
  }

  override function removeCondition(p0: PolicyCondition): void {
    _owner.removeFromConditions(p0 as HOPDwellingCond)
  }


  override property get DefaultCurrency(): Currency {
    return _owner.Branch.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies(): List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_HOP).AllowedCurrencies
  }

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return {_owner.HOPCoveragePart.CoveragePartType}
  }
}
