package gw.api.rating.dtobased.mappers.cp

uses gw.api.rating.dtobased.accessors.cp.CPBPPCovDAO
uses gw.api.rating.dtobased.accessors.cp.CPBldgCovDAO
uses gw.api.rating.dtobased.data.cp.CPBuildingCovDTO
uses gw.api.rating.dtobased.data.cp.CPBuildingDTO
uses gw.api.rating.dtobased.mappers.EffDatedFieldMapper
uses gw.rating.RateFlowLogger

@Export
class CPBuildingFieldMapper extends EffDatedFieldMapper<CPBuilding, CPBuildingDTO> {
  override function mapToDTO(dto: CPBuildingDTO, entity: CPBuilding): CPBuildingDTO {
    dto = super.mapToDTO(dto, entity)

    dto.Jurisdiction = entity.Jurisdiction
    dto.FireProtectClass = entity.CPLocation.Location.FireProtectClass
    dto.CoverableReferenceDate = entity.CoverableReferenceDate

    for (cov in entity.Coverages) {
      var covDTO: CPBuildingCovDTO
      switch (typeof cov) {
        case CPBldgCov:
          covDTO = new CPBldgCovDAO(cov).DTO
          break
        case CPBPPCov:
          covDTO = new CPBPPCovDAO(cov).DTO
          break
        default:
          if (RateFlowLogger.Logger.DebugEnabled) {
            RateFlowLogger.Logger.debug("Skipping mapping of unexpected building coverage subtype " + typeof cov)
          }
          continue
      }
      dto.addCoverage(covDTO)
    }

    return dto
  }
}