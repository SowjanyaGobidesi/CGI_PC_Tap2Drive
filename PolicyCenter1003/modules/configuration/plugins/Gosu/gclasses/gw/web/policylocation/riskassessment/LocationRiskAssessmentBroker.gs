package gw.web.policylocation.riskassessment

uses gw.api.database.spatial.SpatialPoint
uses com.fasterxml.jackson.core.type.TypeReference
uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.locale.DisplayKey
uses gw.api.spotlight.inbound.InboundLocationResultData
uses gw.api.spotlight.inbound.InboundRiskAssessmentData
uses gw.api.spotlight.inbound.InboundRiskProfileData
uses gw.api.util.DisplayableException
uses gw.pcf.policylocation.PolicyLocationAddressOwner
uses gw.plugin.policylocation.RiskAssessmentErrorHandler
uses gw.riskassessment.PolicyLocationRiskAssessmentGateway
uses gw.util.GosuStringUtil
uses java.math.BigDecimal

/**
 * The LocationRiskAssessmentBroker facilitates how location data is sent from policy center to the interactive risk
 * assessment service.  It will read back the assessment to be displayed in policy center, and persist the
 * risk assessment data to the location.
 */
@Export
class LocationRiskAssessmentBroker {

  var _period : PolicyPeriod
  var _accountLocation: AccountLocation
  var _viewInSpotlightClicked: boolean as readonly ViewInSpotlightClicked
  var _useNewAssessmentData: boolean as UseNewAssessmentData
  internal var _outboundRiskAssessmentTempStore: OutboundLocationRiskAssessmentTempStore
  internal var _latestRiskAssessment : LocationRiskAssessment
  internal var _wrapper : PolicyLocationRiskAssessmentGateway
  var _areRiskAssessmentDetailsVisible: Boolean as RiskAssessmentDetailsVisible

  construct(policyLocation: PolicyLocation, errorHandler: RiskAssessmentErrorHandler) {
    _period = policyLocation.Branch
    _latestRiskAssessment = policyLocation.LatestLocationRiskAssessment
    _accountLocation = policyLocation.AccountLocation
    _viewInSpotlightClicked = false
    _useNewAssessmentData = true
    _wrapper = new PolicyLocationRiskAssessmentGateway(errorHandler.ErrorCollector)
    RiskAssessmentDetailsVisible = false
  }

  function viewInSpotlight(policyLocation : PolicyLocation) {
    validateLocationDataForRiskAssessment(policyLocation)
    storeRiskAssessmentRequestData(policyLocation)
    _viewInSpotlightClicked = true
    _useNewAssessmentData = true
    _wrapper.navigateToRiskAssessmentSystem({gw.api.spotlight.SpotlightURLs.getPolicySystemServerURLPrefix(), gw.api.spotlight.SpotlightURLs.getEncodedParamUrl(_outboundRiskAssessmentTempStore), gw.api.spotlight.SpotlightURLs.getEncodedReturnUrl()})
  }

  internal function validateLocationDataForRiskAssessment(policyLocation: PolicyLocation) {
    var missingLatLong = this.Latitude == null or this.Longitude == null

    var missingAddressFields : ArrayList<String> = {}
    var addressOwner = new PolicyLocationAddressOwner(policyLocation)
    addressOwner.RequiredFields.each(\field -> {
      var fieldValue = policyLocation[field.Name] as String
      if (GosuStringUtil.isBlank(fieldValue)) {
        missingAddressFields.add(field.Name)
      }
    })

    if (missingLatLong and missingAddressFields.HasElements) {
      throw new DisplayableException(DisplayKey.get("Web.RiskAssessment.Integration.BadLatLongAndAddressForRiskAssessment"))
    }
  }

  internal function storeRiskAssessmentRequestData(policyLocation : PolicyLocation) {
    refresh()
    var riskAssessmentLocationData = _outboundRiskAssessmentTempStore

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      if (riskAssessmentLocationData == null) {
        riskAssessmentLocationData = new OutboundLocationRiskAssessmentTempStore(bundle)
        var periodTempStore = new OutboundPeriodRiskAssessmentTempStore(bundle)
        periodTempStore.addToOutboundLocationRiskAssessmentTempStore(riskAssessmentLocationData)
        periodTempStore.PolicyPeriod = _period
      } else {
        riskAssessmentLocationData.InboundLocationRiskAssessmentErrorTempStore.each(\elt -> {
          var locationError = bundle.add(elt)
          locationError.remove()
        })

        riskAssessmentLocationData.OutboundPeriodRiskAssessmentTempStore.InboundPeriodRiskAssessmentErrorTempStore.each(\elt -> {
          var periodError = bundle.add(elt)
          periodError.remove()
        })

        riskAssessmentLocationData = bundle.add(riskAssessmentLocationData)
      }

      populateOutboundData(riskAssessmentLocationData, policyLocation)
    })

    _outboundRiskAssessmentTempStore = riskAssessmentLocationData
  }

  public property get RiskAssessmentResult(): RiskAssessmentResult {
    if (_viewInSpotlightClicked and _useNewAssessmentData) {
      return _outboundRiskAssessmentTempStore.InboundLocationRiskAssessmentTempStore
    } else if (_latestRiskAssessment != null) {
      return _latestRiskAssessment
    } else {
      return null
    }
  }

  property get FloodRisk(): String {
    return RiskAssessmentResult?.FloodRisk ?: ""
  }

  property get FloodScore(): String {
    return RiskAssessmentResult?.FloodScore ?: ""
  }

  property get Latitude(): BigDecimal {
    return RiskAssessmentResult?.SpatialPoint?.Latitude ?: _accountLocation?.Latitude
  }

  property get Longitude(): BigDecimal {
    return RiskAssessmentResult?.SpatialPoint?.Longitude ?: _accountLocation?.Longitude
  }

  internal function refresh() {
    _outboundRiskAssessmentTempStore = _outboundRiskAssessmentTempStore?.refresh() as OutboundLocationRiskAssessmentTempStore
  }

  /*
   * Will change the latitude and longitude of this CPLocation -> Policy Location with the
   * new latitude and longitude coming from Spotlight
   */
  function acceptRiskAssessmentChanges(policyLocation: PolicyLocation) {
    if (_outboundRiskAssessmentTempStore != null and _useNewAssessmentData) {
      refresh()
      if (_outboundRiskAssessmentTempStore.InboundLocationRiskAssessmentTempStore == null) {
        throw new DisplayableException(DisplayKey.get("Web.RiskAssessment.Integration.NoResponseEntityFromRiskAssessmentService"))
      }
      _wrapper.acceptRiskAssessmentInboundData(policyLocation, _outboundRiskAssessmentTempStore.InboundLocationRiskAssessmentTempStore)
    }
  }

  property get IsRiskAssessmentStale() : boolean {
    if (_latestRiskAssessment == null) {
      return false
    }

    return _latestRiskAssessment.IsRiskAssessmentStale
  }

  private function populateOutboundData(outboundData : OutboundLocationRiskAssessmentTempStore, location : PolicyLocation) {
    outboundData.populateData(location)
    if (Longitude != null and Latitude != null) {
      outboundData.SpatialPoint = new SpatialPoint(Longitude, Latitude)
    }
  }

  private property get ParsedAssessmentResponse(): InboundRiskAssessmentData {
    return new ObjectMapper().readValue(RiskAssessmentResult.UnparsedRiskAssessmentResponse, new TypeReference<InboundRiskAssessmentData>() {
    }) as InboundRiskAssessmentData
  }

  property get LocationResults(): List<InboundLocationResultData> {
    return ParsedAssessmentResponse.assessedLocations.flatMap(\elt -> elt.results)
  }

  property get RiskProfileData(): InboundRiskProfileData {
    return ParsedAssessmentResponse.riskProfile
  }

  property get ShowHideRiskAssessmentDetailButtonLabel(): String {
    return RiskAssessmentDetailsVisible ? DisplayKey.get("Web.Policy.LocationContainer.Location.HideRiskAssessmentDetails") : DisplayKey.get("Web.Policy.LocationContainer.Location.ShowRiskAssessmentDetails")
  }

  function toggleShowHideRiskAssessmentDetailButton() {
    RiskAssessmentDetailsVisible = !RiskAssessmentDetailsVisible
  }

  public function displayFailedRiskAssessmentErrorMessages() : String {
    var errorMessages = _outboundRiskAssessmentTempStore.InboundLocationRiskAssessmentErrorTempStore*.RiskAssessmentError*.ErrorDescription.toList()
    errorMessages.addAll(_outboundRiskAssessmentTempStore.OutboundPeriodRiskAssessmentTempStore.InboundPeriodRiskAssessmentErrorTempStore*.RiskAssessmentError*.ErrorDescription.toList())
    errorMessages.each(\message -> {
      gw.api.util.LocationUtil.addRequestScopedErrorMessage(message)
    })

    //using hidden field to refresh error messages
    return ""
  }

}
