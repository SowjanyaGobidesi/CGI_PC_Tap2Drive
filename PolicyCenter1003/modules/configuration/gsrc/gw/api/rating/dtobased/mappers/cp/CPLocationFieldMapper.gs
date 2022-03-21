package gw.api.rating.dtobased.mappers.cp

uses gw.api.rating.dtobased.accessors.cp.CPBuildingDAO
uses gw.api.rating.dtobased.data.cp.CPLocationDTO
uses gw.api.rating.dtobased.mappers.EffDatedFieldMapper

@Export
class CPLocationFieldMapper extends EffDatedFieldMapper<CPLocation, CPLocationDTO> {
  public function mapToDTO(dto: CPLocationDTO, entity: CPLocation): CPLocationDTO {
    dto = super.mapToDTO(dto, entity)

    for (building in entity.Buildings) {
      var buildingDTO = new CPBuildingDAO(building).DTO
      dto.addBuilding(buildingDTO)
    }

    return dto
  }
}