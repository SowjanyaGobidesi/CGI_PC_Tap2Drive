package gw.riskassessment

uses gw.api.address.AddressOwnerFieldId
uses gw.api.system.PCConfigParameters
uses gw.api.web.color.GWColor
uses gw.util.Pair

uses java.math.BigDecimal
uses java.util.Set

@Export
class SpotlightConfigParameters {

  public static final var SPOTLIGHT_TO_PC_KEY : String = "selectedRiskAssessmentParameters" // The json key that is in the request parameter in the SPOTLIGHT_RETURN url
  public static final var SPOTLIGHT_TO_PC_STATUS_KEY : String = "wasSuccessful" // The json error key that is in the request parameter in the SPOTLIGHT_RETURN url
  public static final var SPOTLIGHT_RETURN : String = "SpotlightReturn.do" // PC request handler URL indentifier to get risk assessment for Spotlight Interactive
  public static final var LOCATION_DETAIL : String = "LocationDetail.do" // PC request handler URL identifier for Spotlight Interactive and PC
  public static final var LOCATION_ID_PARAM : String = "LocationID" // Name of the URL parameter signifying the location public id.
  public static final var DEFAULT_RISK_PROFILE_CODE : String = "US_LARGE_COMMERCIAL" // Default Risk Profile Code to risk assess all of your policy locations

  // In the evaluation returned from Spotlight, the code of the high flood zone assessment.
  public static final var HIGH_FLOOD_ZONE_ASSESSMENT_CODE : String = "DISTANCE_TO_HIGH-FLOOD_ZONE__"

  // In the evaluation returned from Spotlight, the code of the field indicating meters from an assessed location to a high risk area.
  // For example, this might correspond to the distance from a location to a high-flood zone.
  public static final var METERS_TO_GEOMETRY_LABEL : String = "METERS_TO_GEOMETRY"

  /*
   * Parameters for generating the Spotlight thumbnail map in PolicyCenter
   */
  public static final var GEOCODE_URL_PARAM : String = "geocode" // In the thumbnail map URL, signifies the latitude and longitude of the location.
  public static final var ADDRESS_URL_PARAM : String = "address" // In the thumbnail map URL, signifies the address details of the location.

  /*
   *  PC to Spotlight URL ENCODER
   */
  public static final var CHAR_SET : String = "UTF-8" // The character set used when encoding Spotlight URLs.
  public static final var LOCATION_ID : String = "?LocationID=" // In the Spotlight param URL, delimiter between location detail and location public id.
  public static final var SPOTLIGHT_SERVLET_URL : String = "/service/Spotlight/" // Spotlight's entry URL to the policy system.
  public static final var DISPLAYABLE_ADDRESS_DELIMITER: String = "\n" // The delimiter when formatting the displayable address of an OutboundLocationRiskAssessmentTempStore.
  public static final var GEOCODEABLE_ADDRESS_DELIMITER: String = "," // The delimiter when formatting the geocodeable address of an OutboundLocationRiskAssessmentTempStore.

  /*
   * Spotlight login config
   */
  public static final var SPOTLIGHT_AUTH_COOKIE_NAME : String = "gwAuth" // The name of the authorization cookie used with Spotlight.
  public static final var SPOTLIGHT_USER_PARAM_NAME : String = "u" // Username parameter signifier used to login to Spotlight.
  public static final var SPOTLIGHT_PASSWORD_PARAM_NAME : String = "p" // Password parameter signifier used to login to Spotlight.
  public static final var SPOTLIGHT_LOGIN_PATH : String = "/login" // Appended to SpotlightLoginUrl to obtain the full Spotlight login URL.
  public static final var SPOTLIGHT_MAX_LOGIN_SESSION_MILLISEC: long = 60*60*1000L // Default Spotlight maximum login session time of 1 hour (in millis).

  /*
   * Risk Assessment Severities to Icon map
   */
  public static final var severityCodeToIconMap: HashMap<String, Pair<String, GWColor>> = {
      "High"    -> new Pair("circle_exclamation_point", GWColor.THEME_ALERT_ERROR),
      "Medium"  -> new Pair("circle", GWColor.THEME_ALERT_WARNING),
      "Low"     -> new Pair("circle_checkmark", GWColor.THEME_ALERT_SUCCESS),
      "Unknown" -> new Pair("circle_minus", GWColor.THEME_ALERT_NEUTRAL)
  }

  public static function createSpotlightMapURL(location : PolicyLocation, latitude : BigDecimal, longitude : BigDecimal) : String {
    var addressForURL = {location.AddressLine1, location.City, location.State.DisplayName, location.Country.DisplayName}
        .where(\ str -> str != null) // filter out null arguments
        .join(", ") // comma-separate
        .replaceAll("\\s+", "+") // replace whitespace with '+' character
    var mapURL = PCConfigParameters.SpotlightThumbnailMapURL.Value + "#" + ADDRESS_URL_PARAM + "/" + addressForURL

    if (latitude != null and longitude != null) {
      mapURL += "/" + GEOCODE_URL_PARAM + "/" + latitude.toString() + "," + longitude.toString()
    }

    return mapURL
  }

  public static function shouldShowThumbnailMap() : boolean {
    return PCConfigParameters.RiskAssessmentThumbnailMapEnabled.Value and PCConfigParameters.RiskAssessmentIntegrationEnabled.Value
  }

  /**
   *
   * @return The set of fields that are formatted for localization to be sent over to Spotlight
   */
  public static function GeoCodeableAddressFields() : Set<AddressOwnerFieldId> {
    return {AddressOwnerFieldId.ADDRESSLINE1, AddressOwnerFieldId.ADDRESSLINE2, AddressOwnerFieldId.ADDRESSLINE3,
            AddressOwnerFieldId.CITY, AddressOwnerFieldId.COUNTY,
            AddressOwnerFieldId.POSTALCODE, AddressOwnerFieldId.STATE, AddressOwnerFieldId.COUNTRY }
  }
}
