package gw.lob.ba

uses gw.api.locale.DisplayKey
uses gw.api.domain.CoverableAdapter
uses gw.api.util.JurisdictionMappingUtil
uses gw.policy.PolicyLineConfiguration

uses java.lang.UnsupportedOperationException
uses java.util.ArrayList
uses java.util.Date
uses java.util.List

@Export
class BusinessVehicleCoverableAdapter implements CoverableAdapter {
  var _owner : BusinessVehicle

  construct(owner : BusinessVehicle) {
    _owner = owner
  }

  override property get PolicyLine() : PolicyLine {
    return(_owner.BALine)
  }

  override property get PolicyLocations() : PolicyLocation[] {
    var locs = new ArrayList<PolicyLocation>()
    locs.add(_owner.Location)
    return locs.toTypedArray()
  }

  override property get State() : Jurisdiction {
    var retVal : Jurisdiction
    if(_owner.Location != null){
      retVal = JurisdictionMappingUtil.getJurisdiction(_owner.Location)
    }
    return(retVal)
  }

  override property get CoveragesFromCoverable() : Coverage[] {
    return(_owner.Coverages)
  }

  override function addCoverage( p0: Coverage ) : void {
    _owner.addToCoverages( p0 as BusinessVehicleCov )
  }

  override function removeCoverage( p0: Coverage ) : void {
    _owner.removeFromCoverages( p0 as  BusinessVehicleCov )
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
    return _owner.BALine.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_BA).AllowedCurrencies
  }

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return {}
  }
}
