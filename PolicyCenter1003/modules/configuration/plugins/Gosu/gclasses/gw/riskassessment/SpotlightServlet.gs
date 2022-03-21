package gw.riskassessment

uses com.guidewire.pl.system.dependency.PLDependencies
uses com.google.common.net.HttpHeaders
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.plugin.Plugins
uses gw.plugin.policylocation.LocationRiskAssessmentPlugin
uses gw.servlet.AbstractCORSRequestServlet
uses gw.servlet.Servlet

uses javax.servlet.http.HttpServletRequest
uses javax.servlet.http.HttpServletResponse

/**
 * This servlet is used to handle all interactions between Spotlight Interactive Service.
 * There are two request handlers in this servlet.
 * 1) The URL contains LocationDetails.do, this request handler is the one that sends the formatted address and the
 * Spatial Point to Spotlight Interactive so that it can be displayed on the Spotlight Interactive map.
 * 2) The URL contains SpotlightReturn.do, this request handler takes the data that the end user risk assessed on the
 * Spotlight Interactive side, and then uses the changed information to get the risk assessed information into
 * Policy Center.  At the end it redirects Spotlight Interactive back to Policy Center and the correct wizard step.
 */
@Servlet("/Spotlight/*")
@Export
class SpotlightServlet extends AbstractCORSRequestServlet {

  override function getAllowOrigin(): String {
    return PCConfigParameters.SpotlightInteractiveServiceURL.Value
  }

  override function applyAdditionalResponseHeaders(req: HttpServletRequest, resp: HttpServletResponse) {
    resp.setHeader(HttpHeaders.ACCESS_CONTROL_MAX_AGE, "1")
  }

  override function isRefererMatchEnabled() : boolean {
    return true
  }

  override function doPost(req: HttpServletRequest, resp: HttpServletResponse) {
    handleRequest(req, resp)
  }

  override function doGet(req: HttpServletRequest, resp: HttpServletResponse) {
    handleRequest(req, resp)
  }

  function handleRequest(request: HttpServletRequest, response: HttpServletResponse) {
    if (Plugins.isEnabled(LocationRiskAssessmentPlugin)) {
      try {
        var requestURI = request.getRequestURI()
        if (requestURI.endsWith(SpotlightConfigParameters.LOCATION_DETAIL)) {
          new SpotlightLocationDetailsRequestHandler().handleRequest(PLDependencies.getWebController().setupRequestInfo(request, response))
        }

        if (requestURI.endsWith(SpotlightConfigParameters.SPOTLIGHT_RETURN)) {
          try {
            new SpotlightReturnToPCRequestHandler().handleRequest(PLDependencies.getWebController().setupRequestInfo(request, response))
          } catch (e : Exception) {
            PCLoggerCategory.RISK_ASSESSMENT.error("SpotlightReturnToPCRequestHandler could not handle the request from Spotlight Interactive", e)
          } finally {
            response.sendRedirect(PLDependencies.WebController.BaseURL)
          }
        }
      } finally {
        PLDependencies.WebController.clearRequestInfo()
      }
    }
  }

}