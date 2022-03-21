package gw.lob.hop

uses gw.coverage.CoverageAdapterBase
uses gw.api.reinsurance.ReinsurableCoverable
uses gw.api.util.JurisdictionMappingUtil

@Export
class HOPDwellingCovCoverageAdapter extends CoverageAdapterBase {
  var _owner: HOPDwellingCov

  construct(owner: HOPDwellingCov) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return (JurisdictionMappingUtil.getJurisdiction(_owner.HOPDwelling.Location))
  }

  override property get PolicyLine(): PolicyLine {
    return (_owner.HOPDwelling.HOPCoveragePart.HOPLine)
  }

  override property get OwningCoverable(): Coverable {
    return (_owner.HOPDwelling)
  }

  override function addToCoverageArray(p0: Coverage): void {
    _owner.HOPDwelling.addToCoverages(p0 as HOPDwellingCov)
  }

  override function removeFromParent(): void {
    _owner.HOPDwelling.removeFromCoverages(_owner)
  }

  override property get ReinsurableCoverable(): ReinsurableCoverable {
    return (_owner.HOPDwelling.Location)
  }
}
