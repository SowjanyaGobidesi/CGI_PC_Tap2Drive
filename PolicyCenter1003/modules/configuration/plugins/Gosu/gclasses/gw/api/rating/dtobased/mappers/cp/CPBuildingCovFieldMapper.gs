package gw.api.rating.dtobased.mappers.cp

uses entity.CPBuildingCov
uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO
uses gw.api.rating.dtobased.mappers.CoverageFieldMapper

@Export
class CPBuildingCovFieldMapper<S extends CPBuildingCov, T extends CPBuildingCovDTO> extends CoverageFieldMapper<S, T> {
}