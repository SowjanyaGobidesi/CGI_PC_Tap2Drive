package gw.api.rating.dtobased.data.cp

uses gw.api.rating.dtobased.data.EffDatedDTO

@Export
class CPLocationDTO extends EffDatedDTO {
  var line: CPLineDTO as CPLine
  var buildings: List<CPBuildingDTO> as readonly Buildings = {}

  function addBuilding(building: CPBuildingDTO) {
    building.CPLocation = this
    buildings.add(building)
  }
}