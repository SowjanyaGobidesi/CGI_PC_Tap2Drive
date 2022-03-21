package gw.api.rating.dtobased.data.cp

uses gw.api.rating.dtobased.data.CoverageDTO

@Export
class CPBuildingCovDTO extends CoverageDTO {
  var causeOfLoss: CPCauseOfLoss as CauseOfLoss
  var cpBuilding: CPBuildingDTO as CPBuilding
}