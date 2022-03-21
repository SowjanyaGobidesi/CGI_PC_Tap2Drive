package gw.api.web.desktop.data.common

uses com.fasterxml.jackson.annotation.JsonAutoDetect
uses com.fasterxml.jackson.annotation.PropertyAccessor
uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class SummaryCountsDTO implements DesktopDataDTO, JacksonEnabledSerializable {

  var counts : Counts as readonly Counts
  var overdueCounts : Counts as readonly OverdueCounts

  static final var _mapper = gw.util.concurrent.LocklessLazyVar.make(\-> {
    var objectMapper = new ObjectMapper()
    objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
    return objectMapper
  })

  private construct() {
  }

  static function from(json : String) : SummaryCountsDTO {
    return _mapper.get().readValue(json, SummaryCountsDTO)
  }

  static class Counts implements JacksonEnabledSerializable {
    private construct() {
    }

    var activitiesCount : Integer as readonly ActivitiesCount
    var submissionsCount : Integer as readonly SubmissionsCount
    var changeRequestsCount : Integer as readonly ChangeRequestsCount
    var renewalsCount : Integer as readonly RenewalsCount
    var cancellationsCount : Integer as readonly CancellationsCount
  }
}