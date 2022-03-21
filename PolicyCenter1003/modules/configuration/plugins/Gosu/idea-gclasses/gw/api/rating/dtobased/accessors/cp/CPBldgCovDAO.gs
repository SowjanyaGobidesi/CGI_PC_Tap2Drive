package gw.api.rating.dtobased.accessors.cp

uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO
uses gw.api.rating.dtobased.mappers.cp.CPBldgCovFieldMapper

@Export
class CPBldgCovDAO extends CPBuildingCovDAO<CPBldgCov, CPBuildingCovDTO, CPBldgCovFieldMapper> {
  construct(coverage: CPBldgCov) {
    super(coverage)
  }
}