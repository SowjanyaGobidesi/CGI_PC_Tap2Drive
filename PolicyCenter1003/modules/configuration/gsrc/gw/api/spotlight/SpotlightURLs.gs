package gw.api.spotlight

uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.riskassessment.SpotlightConfigParameters


uses java.net.URLEncoder

@Export
class SpotlightURLs {

  static function getEncodedReturnUrl() : String {
    return encodeURL(SpotlightConfigParameters.SPOTLIGHT_RETURN)
  }

  static function getEncodedParamUrl(policyLocation : OutboundLocationRiskAssessmentTempStore) : String {
    return encodeURL(SpotlightConfigParameters.LOCATION_DETAIL + SpotlightConfigParameters.LOCATION_ID + policyLocation.PublicID)
  }

  static function getPolicySystemServerURLPrefix() : String {
    return encodeURL(PLDependencies.WebController.BaseURL +  SpotlightConfigParameters.SPOTLIGHT_SERVLET_URL)
  }

  private static function encodeURL(myURL : String) : String {
    return URLEncoder.encode(URLEncoder.encode(myURL, SpotlightConfigParameters.CHAR_SET), SpotlightConfigParameters.CHAR_SET)
  }

}