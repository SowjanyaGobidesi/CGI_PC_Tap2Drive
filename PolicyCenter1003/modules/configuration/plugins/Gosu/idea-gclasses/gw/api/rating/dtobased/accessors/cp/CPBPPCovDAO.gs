package gw.api.rating.dtobased.accessors.cp

uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO
uses gw.api.rating.dtobased.mappers.cp.CPBPPCovFieldMapper

@Export
class CPBPPCovDAO extends CPBuildingCovDAO<CPBPPCov, CPBuildingCovDTO, CPBPPCovFieldMapper> {
  construct(coverage: CPBPPCov) {
    super(coverage)
  }
}