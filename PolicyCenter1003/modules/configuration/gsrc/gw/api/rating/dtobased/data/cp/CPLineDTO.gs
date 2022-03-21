package gw.api.rating.dtobased.data.cp

uses gw.api.rating.dtobased.data.PolicyLineDTO

uses java.math.BigDecimal

@Export
class CPLineDTO extends PolicyLineDTO {
  var cpScheduleCredits: BigDecimal as CPScheduleCredits
  var cpLocations: List<CPLocationDTO> as readonly CPLocations = {}

  function addLocation(location: CPLocationDTO) {
    location.CPLine = this
    cpLocations.add(location)
  }
}