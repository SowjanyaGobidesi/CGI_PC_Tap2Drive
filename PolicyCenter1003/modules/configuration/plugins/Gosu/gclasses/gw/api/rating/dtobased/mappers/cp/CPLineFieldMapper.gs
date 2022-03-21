package gw.api.rating.dtobased.mappers.cp

uses gw.api.rating.dtobased.accessors.cp.CPLocationDAO
uses gw.api.rating.dtobased.data.cp.CPLineDTO
uses gw.api.rating.dtobased.mappers.PolicyLineFieldMapper

@Export
class CPLineFieldMapper extends PolicyLineFieldMapper<CPLine, CPLineDTO> {
  public function mapToDTO(dto: CPLineDTO, entity: CPLine): CPLineDTO {
    dto = super.mapToDTO(dto, entity)

    dto.CPScheduleCredits = entity.CPModifiers.singleWhere(\ c -> c.PatternCode == "CPScheduleCredits").RateModifier

    for (location in entity.CPLocations) {
      var cpLocationDTO = new CPLocationDAO(location).DTO
      dto.addLocation(cpLocationDTO)
    }

    return dto
  }
}