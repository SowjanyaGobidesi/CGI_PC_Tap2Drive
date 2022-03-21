package gw.api.rating.dtobased.accessors.cp

uses gw.api.rating.dtobased.accessors.EffDatedDAO
uses gw.api.rating.dtobased.data.cp.CPBuildingDTO
uses gw.api.rating.dtobased.mappers.cp.CPBuildingFieldMapper

@Export
class CPBuildingDAO extends EffDatedDAO<CPBuilding, CPBuildingDTO, CPBuildingFieldMapper> {
  construct (building: CPBuilding) {
    super(building)
  }
}