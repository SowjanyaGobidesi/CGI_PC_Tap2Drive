package gw.lob.im.sign

uses gw.api.locale.DisplayKey
uses gw.api.domain.CoverableAdapter
uses gw.api.util.JurisdictionMappingUtil

uses java.lang.UnsupportedOperationException
uses java.util.Date
uses java.util.ArrayList
uses gw.policy.PolicyLineConfiguration
uses java.util.List

@Export
class IMSignCoverableAdapter implements CoverableAdapter {
  var _owner : entity.IMSign

  construct(owner : entity.IMSign) {
    _owner = owner
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.IMSignPart.InlandMarineLine
  }

  override property get PolicyLocations() : PolicyLocation[] {
    var locs = new ArrayList<PolicyLocation>()
    locs.add(_owner.IMLocation.Location)
    return locs.toTypedArray()
  }

  override property get State() : Jurisdiction {
    return JurisdictionMappingUtil.getJurisdiction(_owner.IMLocation.Location)
  }

  override property get CoveragesFromCoverable() : Coverage[] {
    return _owner.Coverages
  }

  override function addCoverage( p0: Coverage ) : void {
    _owner.addToCoverages( p0 as IMSignCov )
  }

  override function removeCoverage( p0: Coverage ) : void {
    _owner.removeFromCoverages( p0 as IMSignCov )
  }

  override property get ExclusionsFromCoverable() : Exclusion[] {
    return new Exclusion[0]
  }

  override function addExclusion( p0: Exclusion ) : void {
    throw new UnsupportedOperationException(DisplayKey.get("CoverableAdapter.Error.ExclusionsNotImplemented"))
  }

  override function removeExclusion( p0: Exclusion ) : void {
    throw new UnsupportedOperationException(DisplayKey.get("CoverableAdapter.Error.ExclusionsNotImplemented"))
  }

  override property get ConditionsFromCoverable() : PolicyCondition[] {
    return new PolicyCondition[0]
  }

  override function addCondition( p0: PolicyCondition ) : void {
    throw new UnsupportedOperationException(DisplayKey.get("CoverableAdapter.Error.ConditionsNotImplemented"))
  }

  override function removeCondition( p0: PolicyCondition ) : void {
    throw new UnsupportedOperationException(DisplayKey.get("CoverableAdapter.Error.ConditionsNotImplemented"))
  }

  override property get DefaultCurrency() : Currency {
    return _owner.Branch.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_IM).AllowedCurrencies
  }

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return {}
  }
}