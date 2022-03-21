package gw.web.riskassessment

uses gw.api.locale.DisplayKey

enhancement RiskAssessmentErrorUIEnhancement: RiskAssessmentError {

  property get ErrorDescription() : String {
    switch (this) {
      case RiskAssessmentError.TC_HTTPBADREQUEST:
        return DisplayKey.get("Web.RiskAssessment.Integration.HttpBadRequest")
      case RiskAssessmentError.TC_LACKSMULTIPLELOCATIONRISKASSESSMENTPERMISSION:
        return DisplayKey.get("Web.RiskAssessment.Integration.LacksMultipleLocationRiskAssessmentPermission")
      case RiskAssessmentError.TC_LACKSSINGLELOCATIONRISKASSESSMENTPERMISSION:
        return DisplayKey.get("Web.RiskAssessment.Integration.LacksSingleLocationRiskAssessmentPermission")
      case RiskAssessmentError.TC_NORESPONSEENTITYFROMRISKASSESSMENTSERVICE:
        return DisplayKey.get("Web.RiskAssessment.Integration.NoResponseEntityFromRiskAssessmentService")
      case RiskAssessmentError.TC_RISKASSESSMENTAUTHENTICATIONFAILED:
        return DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentAuthenticationFailed")
      case RiskAssessmentError.TC_RISKASSESSMENTSERVICECONNECTIONREFUSED:
        return DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentServiceConnectionRefused")
      case RiskAssessmentError.TC_INVALIDLOCATIONGEOCODEABLEADDRESS_COULDNOTGEOCODE:
        return DisplayKey.get("Web.RiskAssessment.Integration.InvalidLocationGeocodeableAddress.CouldNotGeoCode")
      case RiskAssessmentError.TC_INVALIDLOCATION_COORDINATESINVALID:
        return DisplayKey.get("Web.RiskAssessment.Integration.InvalidLocation.CoordinatesInvalid")
      case RiskAssessmentError.TC_RISKPROFILECODEINVALID:
        return DisplayKey.get("Web.RiskAssessment.Integration.InvalidRiskProfileCode")
      case RiskAssessmentError.TC_INVALIDJSON:
        return DisplayKey.get("Web.RiskAssessment.Integration.InvalidJson")
      case RiskAssessmentError.TC_INVALIDLOCATION_COORDINATESORADDRESSREQUIRED:
        return DisplayKey.get("Web.RiskAssessment.Integration.InvalidLocation.CoordinatesOrAddressRequired")
      case RiskAssessmentError.TC_NOSELECTEDRISKPROFILE:
        return DisplayKey.get("Web.RiskAssessment.Integration.MissingRiskProfileCode")
      case RiskAssessmentError.TC_ERRORFORUNEXPECTEDLOCATION:
        return DisplayKey.get("Web.RiskAssessment.Integration.ErrorForUnexpectedLocation")
      case RiskAssessmentError.TC_UNABLETOPARSEJSONERRORS:
        return DisplayKey.get("Web.RiskAssessment.Integration.UnableToParseJSONErrors")
      case RiskAssessmentError.TC_UNKNOWNERRORCODE:
        return DisplayKey.get("Web.RiskAssessment.Integration.UnknownErrorCode")
      case RiskAssessmentError.TC_INVALIDLOCATION_POLICYSYSTEMIDREQUIRED:
        return DisplayKey.get("Web.RiskAssessment.Integration.PolicySystemIdRequired")
      case RiskAssessmentError.TC_NOSELECTEDLOCATION:
        return DisplayKey.get("Web.RiskAssessment.Integration.NoSelectedLocation")
      case RiskAssessmentError.TC_TIMEOUTCONTACTINGPARAMETERSERVICE:
        return DisplayKey.get("Web.RiskAssessment.Integration.TimeoutContactingParameterService")
      case RiskAssessmentError.TC_ERRORCONTACTINGPARAMETERSERVICE:
        return DisplayKey.get("Web.RiskAssessment.Integration.ErrorContactingParameterService")
      case RiskAssessmentError.TC_LOCATIONREQUIRED:
        return DisplayKey.get("Web.RiskAssessment.Integration.LocationRequired")
    }
    return DisplayKey.get("Web.RiskAssessment.Integration.UnknownUIDescription", this.Code)
  }

}
