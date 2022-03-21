package gw.api.rating.dtobased.accessors.cp

uses entity.CPBuildingCov
uses gw.api.rating.dtobased.accessors.CoverageDAO
uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO
uses gw.api.rating.dtobased.mappers.CoverageFieldMapper

@Export
class CPBuildingCovDAO<S extends CPBuildingCov, T extends CPBuildingCovDTO, M extends CoverageFieldMapper<S, T>> extends CoverageDAO<S, T, M> {
  construct(coverage: S) {
    super(coverage)
  }
}