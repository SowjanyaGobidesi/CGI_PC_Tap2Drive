package gw.plugin.policylocation

uses com.fasterxml.jackson.annotation.JsonAutoDetect
uses com.fasterxml.jackson.annotation.PropertyAccessor
uses com.fasterxml.jackson.core.JsonParseException
uses com.fasterxml.jackson.core.type.TypeReference
uses com.fasterxml.jackson.databind.ObjectMapper
uses com.guidewire.live.loginService.ClientLoginServiceImpl
uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.api.database.spatial.SpatialPoint
uses gw.api.spotlight.inbound.InboundLocationData
uses gw.api.spotlight.inbound.InboundLocationResultData
uses gw.api.spotlight.inbound.InboundRiskAssessmentData
uses gw.api.spotlight.inbound.error.InboundRiskAssessmentErrorData
uses gw.api.spotlight.outbound.OutboundPolicyData
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.lang.reflect.features.PropertyReference
uses gw.plugin.InitializablePlugin
uses gw.riskassessment.DataHasher
uses gw.riskassessment.RiskAssessmentInputDataHasher
uses gw.riskassessment.SpotlightConfigParameters
uses org.apache.http.HttpResponse
uses org.apache.http.client.ResponseHandler
uses org.apache.http.client.ServiceUnavailableRetryStrategy
uses org.apache.http.client.methods.HttpPost
uses org.apache.http.client.utils.URIBuilder
uses org.apache.http.entity.StringEntity
uses org.apache.http.impl.client.BasicCookieStore
uses org.apache.http.impl.client.HttpClients
uses org.apache.http.impl.cookie.BasicClientCookie
uses org.apache.http.protocol.HttpContext
uses org.apache.http.util.EntityUtils
uses pcf.ViewInSpotlight

uses javax.xml.bind.DatatypeConverter

/**
 * This plugin will generate the request to Spotlight risk assessment service and retrieves assessment results.
 */
@Export
class SpotlightLocationRiskAssessmentPlugin implements LocationRiskAssessmentPlugin, InitializablePlugin {

  private static var spotlightAuthTokenExpirationTimeMillis : long
  private static var spotlightAuthToken : String
  var username : String
  var password : String
  
  override function getRiskAssessmentResultsForPeriod(outboundTempStore: OutboundPeriodRiskAssessmentTempStore, params: LocationRiskAssessmentParameters, errorCollector: RiskAssessmentErrorCollector) : List<InboundLocationRiskAssessmentTempStore> {
    //Check to see if riskassessment authenticated the user and got the gwAuth cookie value
    if (AuthenticationToken == null) {
      errorCollector.addRequestError(outboundTempStore, RiskAssessmentError.TC_RISKASSESSMENTAUTHENTICATIONFAILED)
      return null
    }

    var riskAssessmentRequest = new OutboundPolicyData(outboundTempStore.OutboundLocationRiskAssessmentTempStore.toList(), params.RiskProfileCode, params.RiskAssessmentContext)
    modifyOutboundPolicyDataWithParams(outboundTempStore, riskAssessmentRequest, params)

    var riskAssessmentResponse = callSpotlightRiskAssessmentService(outboundTempStore, AuthenticationToken, riskAssessmentRequest, errorCollector)
    return transformSpotlightRiskAssessmentJSONResponseToInboundRiskAssessment(outboundTempStore.OutboundLocationRiskAssessmentTempStore, riskAssessmentResponse)
  }

  internal function modifyOutboundPolicyDataWithParams(outboundTempStore: OutboundPeriodRiskAssessmentTempStore, outboundPolicyData : OutboundPolicyData, params : LocationRiskAssessmentParameters ) {
    var mapOfMovedLocations: Map<String, SpatialPoint> = {}
    outboundTempStore.OutboundLocationRiskAssessmentTempStore.each(\locationData -> {
      if (not params.LocationGeoCodeMap.isEmpty() and params.LocationGeoCodeMap.containsKey(locationData)) {
        var movedLatLong = params.LocationGeoCodeMap.filterByKeys(\k -> k == locationData)
        mapOfMovedLocations = {locationData.PublicID->movedLatLong.Values.single()}
      }
    })
    outboundPolicyData.modifyLatLong(mapOfMovedLocations)
  }

  override function navigateToRiskAssessmentSystem(parameters : List<String>) {
    ViewInSpotlight.push(PCConfigParameters.SpotlightInteractiveServiceURL.Value, parameters.get(0), parameters.get(1), parameters.get(2))
  }

  override function getRiskAssessmentDataHash(outboundRiskAssessmentData : OutboundLocationRiskAssessmentTempStore) : DataHasher {
    return new RiskAssessmentInputDataHasher(outboundRiskAssessmentData)
  }

  /**
   * Gets authentication token using the client login service for spotlight risk assessment
   * @return 'gwAuth' token
   */
  internal property get AuthenticationToken() : String {
    // if login authentication token has expired, login again and get a new one
    using (this.Class as IMonitorLock) {
      var currentTimeMillis = PLDependencies.getSystemClock().currentTimeMillis()
      if (currentTimeMillis > spotlightAuthTokenExpirationTimeMillis) {
        var spotlightLoginService = new ClientLoginServiceImpl(PCConfigParameters.SpotlightLoginURL.Value,
            SpotlightConfigParameters.SPOTLIGHT_LOGIN_PATH,
            SpotlightConfigParameters.SPOTLIGHT_USER_PARAM_NAME,
            SpotlightConfigParameters.SPOTLIGHT_PASSWORD_PARAM_NAME,
            null,
            SpotlightConfigParameters.SPOTLIGHT_AUTH_COOKIE_NAME)
        spotlightAuthToken = spotlightLoginService.login(username, password)
        spotlightAuthTokenExpirationTimeMillis = currentTimeMillis + SpotlightConfigParameters.SPOTLIGHT_MAX_LOGIN_SESSION_MILLISEC
      }
    }

    return spotlightAuthToken
  }

  /**
   * Resets Spotlight Authentication Token Expiration Time to zero, so the subsequent service call to {@link #getAuthenticationToken()} will get a new authentication token using login service
   */
  function resetAuthTokenExpirationTime() {
    using (this.Class as IMonitorLock) {
      spotlightAuthTokenExpirationTimeMillis = 0
    }
  }

  internal property get AuthTokenExpirationTimeMillis() : long {
    return spotlightAuthTokenExpirationTimeMillis
  }

  internal function callSpotlightRiskAssessmentService(outboundTempStore : OutboundPeriodRiskAssessmentTempStore, authCookieValue : String, outboundJsonData : OutboundPolicyData, errorCollector : RiskAssessmentErrorCollector) : String {
    var mapper = new ObjectMapper()
    mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
    var riskAssessmentRequestJSON = mapper.writeValueAsString(outboundJsonData)

    PCLoggerCategory.RISK_ASSESSMENT_PLUGIN.trace("Outbound risk assessment JSON\n" + riskAssessmentRequestJSON)

    var riskAssessmentURI = new URIBuilder(PCConfigParameters.SpotlightRiskAssessmentServiceURL.Value).build()
    var cookieStore = new BasicCookieStore()
    var authCookie = new BasicClientCookie(SpotlightConfigParameters.SPOTLIGHT_AUTH_COOKIE_NAME, authCookieValue)
    authCookie.setDomain(riskAssessmentURI.getHost())
    cookieStore.addCookie(authCookie)
    var httpClient = HttpClients.custom()
        .setDefaultCookieStore(cookieStore)
        .setServiceUnavailableRetryStrategy(ServiceUnavailableRetryStrategy)
        .build()

    try {
      var httpPost = new HttpPost(riskAssessmentURI)
      var stringEntity = new StringEntity(riskAssessmentRequestJSON)
      httpPost.addHeader("content-type", "application/json")
      httpPost.setEntity(stringEntity)
      return httpClient.execute(httpPost, getResponseHandler(outboundTempStore, errorCollector))
    } finally {
      cookieStore.clear()
      httpClient.close()
    }
  }

  private function transformSpotlightRiskAssessmentJSONResponseToInboundRiskAssessment(locationDatas: OutboundLocationRiskAssessmentTempStore[], riskAssessmentResponse: String) : List<InboundLocationRiskAssessmentTempStore> {
    if (riskAssessmentResponse == null) {
      return null
    }
    var mapper = new ObjectMapper()
    var riskAssessmentResponseObject = mapper.readValue(riskAssessmentResponse, new TypeReference<InboundRiskAssessmentData>(){}) as InboundRiskAssessmentData

    //this should be formatted as ISO-8601 Date
    var assessmentDate = DatatypeConverter.parseTime(riskAssessmentResponseObject.timestamp).getTime()
    var parsedPropertyValues: Map<PropertyReference, String> = { InboundLocationRiskAssessmentTempStore#SnapshotReportURL -> riskAssessmentResponseObject.snapshotReportUrl,
        InboundLocationRiskAssessmentTempStore#RiskProfileCode   -> riskAssessmentResponseObject.riskProfile.riskProfileCode }

    var inboundRiskAssessmentTempStores = locationDatas.map(\locationData -> {
      var assessedLocation = riskAssessmentResponseObject.assessedLocations.singleWhere(\elt -> elt.location.policySystemId == locationData.PublicID)
      assessedLocation.results.each(\result -> {
        parsedPropertyValues.putAll(mapDetailsResults(result))
        parsedPropertyValues.putAll(mapSeverityResults(result))
      })

      return createPolicyLocationRiskAssessmentResult(locationData, parsedPropertyValues, riskAssessmentResponse, assessedLocation, assessmentDate)
    })

    return inboundRiskAssessmentTempStores.toList()
  }

  private function mapSeverityResults(result : InboundLocationResultData) : Map<PropertyReference, String> {
    var assessmentCode = result.assessment.assessmentCode
    var parsedPropertyValues : Map<PropertyReference, String> = {}
    var severityLabelToPropertyMap = AssessmentJSONSeverityPropertyToResultPropertyMapping.get(assessmentCode)
    if (severityLabelToPropertyMap != null) {
      severityLabelToPropertyMap.eachValue(\propertyReference -> {
        var value = result.severity.severityCode
        parsedPropertyValues.put(propertyReference, value)
      })
    }

    return parsedPropertyValues
  }

  private function mapDetailsResults(result : InboundLocationResultData) : Map<PropertyReference, String> {
    var assessmentCode = result.assessment.assessmentCode
    var parsedPropertyValues : Map<PropertyReference, String> = {}
    var detailsLabelToPropertyMap = AssessmentJSONDetailsPropertyToResultPropertyMapping.get(assessmentCode)
    if (detailsLabelToPropertyMap != null) {
      detailsLabelToPropertyMap.eachKeyAndValue(\detailCode, propertyReference -> {
        var value = result.details.firstWhere(\detail -> detail.detailCode == detailCode).unformattedValue
        if (value != null) {
          parsedPropertyValues.put(propertyReference, value)
        }
      })
    }

    return parsedPropertyValues
  }

  property get AssessmentJSONSeverityPropertyToResultPropertyMapping() : Map<String, Map<String, PropertyReference>> {
    // <assessment code> -> {<severityCode> -> <property reference in LocationRiskAssessment>}
    return {
        SpotlightConfigParameters.HIGH_FLOOD_ZONE_ASSESSMENT_CODE -> {"" -> InboundLocationRiskAssessmentTempStore#FloodRisk}
    }
  }

  property get AssessmentJSONDetailsPropertyToResultPropertyMapping() : Map<String, Map<String, PropertyReference>> {
    // <assessment code> -> {<name of the label on the response's details> -> <property reference in LocationRiskAssessment>}
    return {
        SpotlightConfigParameters.HIGH_FLOOD_ZONE_ASSESSMENT_CODE -> { SpotlightConfigParameters.METERS_TO_GEOMETRY_LABEL -> InboundLocationRiskAssessmentTempStore#FloodScore}
    }
  }

  private property get ServiceUnavailableRetryStrategy() : ServiceUnavailableRetryStrategy {

    return new ServiceUnavailableRetryStrategy() {
      function retryRequest(response : HttpResponse, executionCount : int, context : HttpContext) : boolean {
        var statusCode = response.getStatusLine().getStatusCode()
        return executionCount <= 3 and (statusCode == 408 or statusCode == 503)//retry for certain response status codes
      }

      property get RetryInterval() : long {
        return 0
      }
    }
  }

  internal function getResponseHandler(outboundTempStore : OutboundPeriodRiskAssessmentTempStore, errorCollector: RiskAssessmentErrorCollector) : ResponseHandler<String> {

    return \response -> {
      var statusCode = response.getStatusLine().getStatusCode()
      if (statusCode >= 200 and statusCode < 300) {
        var entity = response.getEntity()

        if (entity == null) {
          errorCollector.addRequestError(outboundTempStore, RiskAssessmentError.TC_NORESPONSEENTITYFROMRISKASSESSMENTSERVICE)
          return null
        }

        return EntityUtils.toString(entity)
      }

      if (statusCode == 403) {//Http status code - Forbidden.
        errorCollector.addRequestError(outboundTempStore, RiskAssessmentError.TC_RISKASSESSMENTSERVICECONNECTIONREFUSED)
        resetAuthTokenExpirationTime() //Most likely reason for connection forbidden is due to invalid authentication token, so reset authentication token expiration time
        return null
      }

      if (statusCode >= 400 and statusCode < 500) {
        var entity = response.getEntity()

        try {
          var mapper = new ObjectMapper()
          var errorData = mapper.readValue(entity.Content, new TypeReference<InboundRiskAssessmentErrorData>(){}) as InboundRiskAssessmentErrorData
          errorCollector.addErrorsFromInboundRiskAssessmentErrorData(errorData, outboundTempStore.OutboundLocationRiskAssessmentTempStore.toList())
        } catch ( e : JsonParseException) {
          errorCollector.addRequestError(outboundTempStore, RiskAssessmentError.TC_UNABLETOPARSEJSONERRORS)
        }
        return null
      }

      errorCollector.addRequestError(outboundTempStore, RiskAssessmentError.TC_HTTPBADREQUEST)
      return null
    }
  }

  private function createPolicyLocationRiskAssessmentResult(outboundLocationTempStore : OutboundLocationRiskAssessmentTempStore, parsedPropertyValues : Map<PropertyReference, String>, unparsedResponse : String, incomingLocationData : InboundLocationData, assessmentDate : Date) : InboundLocationRiskAssessmentTempStore {
    var result = outboundLocationTempStore.InboundLocationRiskAssessmentTempStore
    var bundle = outboundLocationTempStore.Bundle
    if (result == null) {
      result = new InboundLocationRiskAssessmentTempStore(bundle)
    } else {
      result = bundle.add(result)
    }
    var latitude = incomingLocationData.location.coordinates.latitude
    var longitude = incomingLocationData.location.coordinates.longitude
    if (latitude != null and longitude != null) {
      result.SpatialPoint = new SpatialPoint(longitude, latitude)
    }
    result.UnparsedRiskAssessmentResponse = unparsedResponse
    result.AssessmentDate = assessmentDate
    result.OutboundLocationRiskAssessmentTempStore = outboundLocationTempStore

    parsedPropertyValues.eachKeyAndValue(\propertyReference, value -> propertyReference.set(result, value))
    bundle.commit()

    return result
  }

  override property set Parameters(params : Map<Object, Object>) {
    username = params.get("Username") as String
    password = params.get("Password") as String
  }
}