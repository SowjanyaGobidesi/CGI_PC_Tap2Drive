package gw.lob.pa

uses gw.api.locale.DisplayKey
uses gw.api.domain.CoverableAdapter
uses gw.api.util.JurisdictionMappingUtil

uses java.lang.UnsupportedOperationException
uses java.util.ArrayList
uses java.util.Date
uses gw.policy.PolicyLineConfiguration
uses java.util.List

@Export
class PersonalVehicleCoverableAdapter implements CoverableAdapter {
  var _owner : PersonalVehicle

  construct(owner : PersonalVehicle) {
    _owner = owner
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.PALine
  }

  override property get PolicyLocations() : PolicyLocation[] {
    var locs = new ArrayList<PolicyLocation>()
    locs.add(_owner.GarageLocation)
    return locs.toTypedArray()
  }

  override property get State() : Jurisdiction{
    var retVal : Jurisdiction
    if(_owner.GarageLocation != null){
      retVal = JurisdictionMappingUtil.getJurisdiction(_owner.GarageLocation)
    }
    return retVal
  }

  override property get CoveragesFromCoverable() : Coverage[] {
    return _owner.Coverages
  }

  override function addCoverage( p0: Coverage ) : void {
    _owner.addToCoverages( p0 as PersonalVehicleCov )
  }

  override function removeCoverage( p0: Coverage ) : void {
    _owner.removeFromCoverages( p0 as PersonalVehicleCov )
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
    return _owner.PALine.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_PA).AllowedCurrencies
  }

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return {}
  }
}
