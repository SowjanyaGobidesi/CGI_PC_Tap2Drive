package gw.api.spotlight.outbound

uses gw.riskassessment.JacksonEnabledSerializable

@Export
class OutboundAddressData implements JacksonEnabledSerializable {

  public var displayable : String                     // Formatted for display, including new lines
  public var geocodeable : String                     // Address used for geocoding
  public var city: String                           // Note to PC: For Japan use firstNonEmpty(cityKanji, city)
  public var state : String                         // Optional for countries without states
  public var postalCode : String
  public var county : String                        // Optional for countries without counties
  public var country : String                       // The ISO 3166 2-letter country code

  construct() {}

  construct(requestData : OutboundLocationRiskAssessmentTempStore) {
    displayable = requestData.DisplayableAddress
    geocodeable = requestData.GeocodeableAddress
    city = requestData.City
    state = requestData.State.Code
    postalCode = requestData.PostalCode
    county = requestData.County
    country = requestData.Country.Code
  }

}