package gw.api.rating.dtobased.mappers.cp

uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO

@Export
class CPBldgCovFieldMapper extends CPBuildingCovFieldMapper<CPBldgCov, CPBuildingCovDTO> {
  public function mapToDTO(dto: CPBuildingCovDTO, entity: CPBldgCov): CPBuildingCovDTO {
    dto = super.mapToDTO(dto, entity)

    dto.Limit = entity.CPBldgCovLimitTerm.Value
    dto.Deductible = entity.CPBldgCovDeductibleTerm.ValueAsString
    dto.CauseOfLoss = entity.CPBldgCovCauseOfLossTerm.Value

    return dto
  }
}