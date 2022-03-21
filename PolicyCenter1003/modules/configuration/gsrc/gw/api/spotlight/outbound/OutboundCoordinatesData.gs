package gw.api.spotlight.outbound

uses gw.api.database.spatial.SpatialPoint
uses gw.riskassessment.JacksonEnabledSerializable

uses java.math.BigDecimal

/**
 * OutboundCoordinatesData is the Pogo that holds the lat long of the Policy Center location data that will be converted into
 * json and sent over to the Spotlight Risk Assessment service to be assessed, or Interactive to display the location.
 * This Pogo is the child of OutboundLocationData.
 */
@Export
class OutboundCoordinatesData implements JacksonEnabledSerializable {
  public var latitude: BigDecimal
  public var longitude : BigDecimal

  construct() {}

  construct(spatialPoint : SpatialPoint) {
    latitude = spatialPoint.Latitude
    longitude = spatialPoint.Longitude
  }

}