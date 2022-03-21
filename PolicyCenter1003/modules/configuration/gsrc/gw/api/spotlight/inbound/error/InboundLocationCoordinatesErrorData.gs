package gw.api.spotlight.inbound.error

uses gw.riskassessment.JacksonEnabledSerializable

uses java.math.BigDecimal

/**
 * InboundLocationCoordinatesErrorData is the Pogo that holds all the lat long of the location details.
 * This Pogo is a child of InboundLocationErrorData, and it stores the lat long.
 */
@Export
class InboundLocationCoordinatesErrorData implements JacksonEnabledSerializable {
  public var latitude : BigDecimal
  public var longitude : BigDecimal
}