package gw.riskassessment

uses com.fasterxml.jackson.core.type.TypeReference
uses com.fasterxml.jackson.databind.ObjectMapper
uses com.guidewire.pl.system.bundle.EntityBundleImpl
uses com.guidewire.pl.web.controller.WebRequestInfo
uses gw.api.database.Query
uses gw.api.database.spatial.SpatialPoint
uses gw.api.spotlight.InteractivePolicyLocationRiskAssessmentParameters
uses gw.api.spotlight.inbound.InboundPolicyRequestData
uses gw.api.spotlight.inbound.error.InboundRiskAssessmentErrorData
uses gw.api.system.PCLoggerCategory
uses gw.plugin.policylocation.RiskAssessmentErrorHandler
uses gw.plugin.policylocation.LocationRiskAssessmentParameters

uses java.lang.IllegalStateException

@Export
class SpotlightReturnToPCRequestHandler {

  protected var _errorHandler : RiskAssessmentErrorHandler

  construct() {
    _errorHandler = new SpotlightInteractiveErrorHandler()
  }

  function handleRequest(request : WebRequestInfo) {
    var successfulRequest = request.RequestWrapper.Request.getParameter(SpotlightConfigParameters.SPOTLIGHT_TO_PC_STATUS_KEY)
    var jsonData = request.RequestWrapper.Request.getParameter(SpotlightConfigParameters.SPOTLIGHT_TO_PC_KEY)

    //Error case
    if (successfulRequest != null and not successfulRequest.toBoolean()) {
      try {
        processErrorJsonDataAndAddErrors(jsonData)
      } catch (e : Exception) {
        PCLoggerCategory.RISK_ASSESSMENT.error("Error JSON data passed back to PC is not compatible with InboundRiskAssessmentErrorData", e)
        var locations = retryToGetLocationFromInboundRiskAssessmentErrorData(jsonData)
        if (locations.HasElements) {
          locations.each(\location -> {
            _errorHandler.ErrorCollector.addLocationError(location, RiskAssessmentError.TC_INVALIDJSON)
          })
        }
      }
    } else { //Good request case
      try {
        var params = locationParameters(jsonData)
        var riskAssessmentGateway = new PolicyLocationRiskAssessmentGateway(_errorHandler.ErrorCollector)
        riskAssessmentGateway.getRiskAssessmentResultsForLocation(params)
      } catch (e : Exception) {
        PCLoggerCategory.RISK_ASSESSMENT.error("JSON data passed back to PC is not compatible with InboundPolicyRequestData", e)
        var locations = retryToGetLocationFromInboundPolicyRequestData(jsonData)
        if (locations.HasElements) {
          locations.each(\location -> {
            _errorHandler.ErrorCollector.addLocationError(location, RiskAssessmentError.TC_INVALIDJSON)
          })
        }
      }
    }

    _errorHandler.handleErrors()
  }

  private function locationParameters(jsonData : String) : LocationRiskAssessmentParameters {
    var mapper = new ObjectMapper()
    var assessmentData = mapper.readValue(jsonData, new TypeReference<InboundPolicyRequestData>(){}) as InboundPolicyRequestData
    var locationRequestData = assessmentData.locations.single()
    var outboundTempStoreId = locationRequestData.policySystemId

    var outboundLocationRiskAssessmentTempStore = Query.make(OutboundLocationRiskAssessmentTempStore).compare(OutboundLocationRiskAssessmentTempStore#PublicID, Equals, outboundTempStoreId).select().single()
    if (outboundLocationRiskAssessmentTempStore == null) {
      throw new IllegalStateException("Policy Location not found with public id : " + outboundTempStoreId)
    }

    var bundle = new EntityBundleImpl()
    outboundLocationRiskAssessmentTempStore = bundle.add(outboundLocationRiskAssessmentTempStore)
    var spatialPoint = new SpatialPoint(locationRequestData.coordinates.longitude, locationRequestData.coordinates.latitude)
    var params = new InteractivePolicyLocationRiskAssessmentParameters(assessmentData.spotlightContext, assessmentData.riskProfile.riskProfileCode, {outboundLocationRiskAssessmentTempStore -> spatialPoint })
    return params
  }

  private function processErrorJsonDataAndAddErrors(jsonData: String) {
    var mapper = new ObjectMapper()
    var errorData = mapper.readValue(jsonData, new TypeReference<InboundRiskAssessmentErrorData>(){}) as InboundRiskAssessmentErrorData
    var locations = createListOutboundLocationRiskAssessmentTempStoreFromJsonWithNewBundle(errorData)
    _errorHandler.ErrorCollector.addErrorsFromInboundRiskAssessmentErrorData(errorData, locations)
  }

  /**
   * We failed in reading the error Json InboundRiskAssessmentErrorData, so now we are just going to try to read the public id
   * for outboundLocationRiskAssessmentTempStore, and return a list of all the temporary locations, if we were able to read the json
   * @param errorJsonData
   * @return List of locations that are in the error json data
   */
  private function retryToGetLocationFromInboundRiskAssessmentErrorData(errorJsonData : String) : List<OutboundLocationRiskAssessmentTempStore> {
    try {
      var mapper = new ObjectMapper()
      var errorData = mapper.readValue(errorJsonData, new TypeReference<InboundRiskAssessmentErrorData>(){}) as InboundRiskAssessmentErrorData
      return createListOutboundLocationRiskAssessmentTempStoreFromJsonWithNewBundle(errorData)
    } catch (e : Exception) {
      // failed to parse, will return empty list
    }

    //We didn't find any locations in the json, so return empty list
    return {}
  }

  /**
   * We failed in reading the error Json InboundPolicyRequestData, so now we are just going to try to read the public id
   * for outboundLocationRiskAssessmentTempStore, and return a list of all the temporary locations, if we were able to read the json
   * @param jsonData
   * @return List of locations that are in the json data
   */
  private function retryToGetLocationFromInboundPolicyRequestData(jsonData: String) : List<OutboundLocationRiskAssessmentTempStore> {
    try {
      var mapper = new ObjectMapper()
      var assessmentData = mapper.readValue(jsonData, new TypeReference<InboundPolicyRequestData>(){}) as InboundPolicyRequestData
      var listOfPublicIds = assessmentData.locations*.policySystemId
      var dbLocations = Query.make(OutboundLocationRiskAssessmentTempStore)
          .compareIn(OutboundLocationRiskAssessmentTempStore#PublicID, listOfPublicIds).select().toList()
      var locations : List<OutboundLocationRiskAssessmentTempStore> = {}
      var bundle = new EntityBundleImpl()
      dbLocations.each(\elt -> {
        var location = bundle.add(elt)
        locations.add(location)
      })
      return locations
    } catch (e : Exception) {
      // failed to parse, will return empty list
    }

    return {}
  }

  private function createListOutboundLocationRiskAssessmentTempStoreFromJsonWithNewBundle(errorJsonData : InboundRiskAssessmentErrorData) : List<OutboundLocationRiskAssessmentTempStore> {
    var bundle = new EntityBundleImpl()
    var locations : List<OutboundLocationRiskAssessmentTempStore> = {}
    errorJsonData.OutboundLocationRiskAssessmentTempStoreFromDB.each(\elt -> {
      var location = bundle.add(elt)
      locations.add(location)
    })
    return locations
  }



}