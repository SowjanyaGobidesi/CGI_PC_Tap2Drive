package gw.api.rating.dtobased.mappers.cp

uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO

@Export
class CPBPPCovFieldMapper extends CPBuildingCovFieldMapper<CPBPPCov, CPBuildingCovDTO> {
  public function mapToDTO(dto: CPBuildingCovDTO, entity: CPBPPCov): CPBuildingCovDTO {
    dto = super.mapToDTO(dto, entity)

    dto.Limit = entity.CPBPPCovLimitTerm.Value
    dto.Deductible = entity.CPBPPCovDeductibleTerm.ValueAsString
    dto.CauseOfLoss = entity.CPBPPCovCauseOfLossTerm.Value

    return dto
  }
}