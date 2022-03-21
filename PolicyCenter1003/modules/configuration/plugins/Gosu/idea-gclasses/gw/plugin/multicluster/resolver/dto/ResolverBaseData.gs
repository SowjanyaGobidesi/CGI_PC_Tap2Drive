package gw.plugin.multicluster.resolver.dto

uses com.fasterxml.jackson.annotation.JsonFormat
uses gw.plugin.multicluster.federateddata.FederatedDataConstants

@Export
interface ResolverBaseData {

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property get CreationDate() : Date

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property set CreationDate(date : Date)
}