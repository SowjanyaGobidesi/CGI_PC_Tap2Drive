package gw.api.spotlight.outbound

uses gw.api.database.spatial.SpatialPoint
uses gw.api.util.LocaleUtil
uses gw.riskassessment.JacksonEnabledSerializable

uses java.text.SimpleDateFormat
uses java.util.Map

/**
 * OutboundPolicyData is the Pogo that corresponds to the json data that is sent from Policy Center to Spotlight
 * Risk Assessment/Interactive
 * This Pogo is the root of the json data being sent to Spotlight Risk Assessment/Interactive
 */
@Export
class OutboundPolicyData implements JacksonEnabledSerializable {

  //DO NOT REFACTOR ANY OF THESE VARIABLE NAMES.  IT WILL BREAK THE SPOTLIGHT API
  public var spotlightContext : String                     // Is the generic object to pass data from Spotlight Interactive through PC to Spotlight Risk Assessment Service
  public var riskProfileCode : String                      // Tells Spotlight Risk Assessment service what profile to do the assessment.
  public var includesAllLocations : Boolean                // Whether this JSON includes all of the policy's locations
  public var locations: List<OutboundLocationData>
  public var locale : String                               // IETF BCP 47 language tag string without extensions (Note: probable implementation locale.stripExtensions().toLanguageTag())
  public var policyNumber : String
  public var periodStart : String                          //Date formatted as ISO-8601 with TimeZone
  public var periodEnd : String                            //Date formatted as ISO-8601 with TimeZone
  public var primaryNamedInsured : String
  public var accountNumber : String
  public var linesOfBusiness : List<OutboundLineOfBusinessData>

  construct() {}

  construct(tempStores : List<OutboundLocationRiskAssessmentTempStore>, riskCode : String) {
    this(tempStores, riskCode, null)
  }

  construct(tempStores : List<OutboundLocationRiskAssessmentTempStore>, riskCode : String, context : String) {
    var ISO8601DateFormat = "yyyy-MM-dd'T'HH:mm'Z'"
    var dateFormat = new SimpleDateFormat(ISO8601DateFormat)

    var policyLocation = tempStores.first()
    spotlightContext = context
    riskProfileCode = riskCode
    includesAllLocations = false
    locations = tempStores.map(\elt -> new OutboundLocationData(elt))
    locale = LocaleUtil.CurrentLocale.Code
    var period = policyLocation.OutboundPeriodRiskAssessmentTempStore.PolicyPeriod
    policyNumber = period.PolicyNumber
    periodStart = dateFormat.format(period.PeriodStart)
    periodEnd = dateFormat.format(period.PeriodEnd)
    primaryNamedInsured = period.PrimaryNamedInsured.DisplayName
    accountNumber = period.Policy.Account.AccountNumber
    linesOfBusiness = period.Lines.map(\elt -> new OutboundLineOfBusinessData(elt)).toList()
  }

  public function modifyLatLong( inboundPolicyRequestData : Map<String, SpatialPoint>) {
    if (inboundPolicyRequestData != null) {
      inboundPolicyRequestData.eachKeyAndValue(\policySystemId, longAndLat -> {
        var outboundLocationData = locations.singleWhere(\elt -> elt.policySystemId == policySystemId)
        outboundLocationData.coordinates.latitude = longAndLat.Latitude
        outboundLocationData.coordinates.longitude = longAndLat.Longitude
      })
    }
  }

}