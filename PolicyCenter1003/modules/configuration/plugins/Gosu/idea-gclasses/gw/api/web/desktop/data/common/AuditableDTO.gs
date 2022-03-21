package gw.api.web.desktop.data.common

uses com.fasterxml.jackson.annotation.JsonFormat
uses gw.plugin.multicluster.federateddata.FederatedDataConstants

uses gw.api.util.DateUtil#currentDate()

@Export
abstract class AuditableDTO {

  construct() {
    _messageCreationTime = currentDate()
  }

  var _messageCreationTime : Date as MessageCreationTime

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property get MessageCreationTime() : Date {
    return _messageCreationTime
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property set MessageCreationTime(date : Date) {
    _messageCreationTime = date
  }
}