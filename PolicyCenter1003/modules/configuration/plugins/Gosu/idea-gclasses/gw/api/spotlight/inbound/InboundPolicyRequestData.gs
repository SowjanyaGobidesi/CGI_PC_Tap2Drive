package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundPolicyRequestData is the Pogo that corresponds to the json data that is sent from Spotlight Interactive
 * to Policy Center.
 * This Pogo is the root of all the json data in the Interactive Service.
 */
@Export
class InboundPolicyRequestData implements JacksonEnabledSerializable {
  /**
   * A generic string object to pass information from Spotlight Interactive to the Spotlight Risk Assessment service.
   */
  public var spotlightContext : String
  /**
   * Is the risk profile that the location was risk assessed in the Spotlight Interactive UI
   */
  public var riskProfile : InboundRiskProfileData
  public var locations : List<InboundPolicyLocationData>

}

