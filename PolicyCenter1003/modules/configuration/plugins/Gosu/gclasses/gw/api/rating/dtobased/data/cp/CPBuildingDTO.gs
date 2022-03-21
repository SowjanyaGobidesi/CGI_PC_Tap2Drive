package gw.api.rating.dtobased.data.cp

uses gw.api.rating.dtobased.data.EffDatedDTO

@Export
class CPBuildingDTO extends EffDatedDTO {
  var jurisdiction: Jurisdiction as Jurisdiction
  var fireProtectClass: FireProtectClass as FireProtectClass
  var coverableReferenceDate: Date as CoverableReferenceDate
  var cpLocation: CPLocationDTO as CPLocation
  var coverages: List<CPBuildingCovDTO> as readonly Coverages = {}

  function addCoverage(coverage: CPBuildingCovDTO) {
    coverage.CPBuilding = this
    coverages.add(coverage)
  }
}