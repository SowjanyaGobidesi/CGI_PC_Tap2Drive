package gw.lob.ba

uses gw.api.domain.CoverableAdapter
uses gw.api.util.StateJurisdictionMappingUtil

uses java.util.Date
uses gw.policy.PolicyLineConfiguration
uses java.util.List

@Export
class BAJurisdictionCoverableAdapter implements CoverableAdapter {
  var _owner : BAJurisdiction

  construct(owner : BAJurisdiction) {
    _owner = owner
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.BALine
  }

  override property get PolicyLocations() : PolicyLocation[] {
    return _owner.Branch.PolicyLocations.where(\ p -> p.State == StateJurisdictionMappingUtil.getStateMappingForJurisdiction(_owner.State ))
  }

  override property get State() : Jurisdiction {
    return _owner.State
  }

  override property get CoveragesFromCoverable() : Coverage[] {
    return _owner.Coverages
  }

  override function addCoverage( p0: Coverage ) : void {
    _owner.addToCoverages( p0 as BAStateCov  )
  }

  override function removeCoverage( p0: Coverage ) : void {
    _owner.removeFromCoverages( p0 as BAStateCov )
  }

  override property get ExclusionsFromCoverable() : Exclusion[] {
    return _owner.Exclusions
  }

  override function addExclusion( p0: Exclusion ) : void {
    _owner.addToExclusions( p0 as BAStateExcl )
  }

  override function removeExclusion( p0: Exclusion ) : void {
    _owner.removeFromExclusions( p0 as BAStateExcl )
  }

  override property get ConditionsFromCoverable() : PolicyCondition[] {
    return _owner.Conditions
  }

  override function addCondition( p0: PolicyCondition ) : void {
    _owner.addToConditions( p0 as BAStateCond )
  }

  override function removeCondition( p0: PolicyCondition ) : void {
    _owner.removeFromConditions( p0 as BAStateCond )
  }

  override property get DefaultCurrency() : Currency {
    return _owner.BALine.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_BA).AllowedCurrencies
  }

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return {}
  }
}
