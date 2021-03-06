package gw.webservice.pc.pc1000.ccintegration

uses gw.api.database.IQueryBeanResult
uses gw.api.util.DisplayableException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.webservice.SOAPUtil
uses gw.webservice.pc.pc1000.ccintegration.entities.Envelope
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCPCFilteringCriteria
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCPCSearchCriteria
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCPolicySummary
uses gw.xml.ws.annotation.WsiPermissions
uses gw.xml.ws.annotation.WsiWebService

/**
 * WebService for ClaimCenter to search and retrieve policies.
 */
@Export
@WsiWebService( "http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/ccintegration/CCPolicySearchIntegration")
class CCPolicySearchIntegration {

  /**
   * Performs a search of policies that match the given criteria, optionally filtering the data
   * if an optional filter is specified.
   *
   * This method may throw a SOAPException if too many results are returned by the query (defaults to 300).
   *
   * @param criteria Policy search criteria; cannot be null.
   * @param filter Data filter used to reduce the amount of data returned with the found policies. May be null.
   * @return An array of CCPolicySummary objects (empty if no results).
   */
  @Throws(SOAPException, "If too many results were returned by the search")
  @Throws(RequiredFieldException, "If criteria is null")
  @Param("criteria", "Policy search criteria; cannot be null.")
  @Param("filter", "Data filter used to reduce the amount of data returned with the found policies. May be null.")
  @WsiPermissions({SystemPermissionType.TC_SEARCHPOLS})
  @Returns("An array of CCPolicySummary objects (empty if no results).")
  public function searchForPolicies(criteria : CCPCSearchCriteria, filter : CCPCFilteringCriteria) : CCPolicySummary[] {
    SOAPUtil.require(criteria, "Policy search criteria");

    // Execute the search
    var policySearchResults : IQueryBeanResult<PolicyPeriodSummary>
    try {
      policySearchResults = new CCPolicyPeriodSummarySearchResults(criteria).results()
    } catch(e : DisplayableException) {
      throw new SOAPException(e.Message)
    }

    // Determine a date to use for evaluating the policy status.  If an "as of date" was provided as search criteria,
    // then use that date.  Otherwise, use the current date (what is the status now?)
    // Note: this does not control the "slice date" which is used for returning details about the policy as of a
    // given date.
    var statusDate = criteria.AsOfDate;
    if (statusDate == null) { statusDate = gw.api.util.DateUtil.currentDate() }

    // Map the data into return results
    var results = new ArrayList<CCPolicySummary>()
    for (period in policySearchResults.iterator()) {
      // Determine the slice date that should be used for returning summary info about the contents of the policy.
      // If the status date above falls within the policy period, then use that.  Otherwise, if it falls before the start of
      // the period, then use PeriodStart.  If it falls after the end of the period, use a time just prior to PeriodEnd.
      var asOfDate : Date
      if (statusDate < period.PeriodStart) {
        asOfDate = period.PeriodStart
      } else if (statusDate < period.PeriodEnd) {
        asOfDate = statusDate
      } else {
        asOfDate = period.PeriodEnd.addMinutes(-1)  // Period is expired at PeriodEnd, so choose a time 1 minute earlier than that
      }

      // Generate info about the policy to be returned
      results.add(new gw.webservice.pc.pc1000.ccintegration.CCPolicyGenerator(statusDate, filter).generatePolicySummary(period, asOfDate));
    }
    return results.toTypedArray()
  }

  /**
   * Retrieves a single Policy by policy number.
   *
   * @param policyNumber Policy Number for the policy to be retrieved. Cannot be null.
   * @param asOfDate The effective date for which you want to retrieve coverage information, such as the loss date of a claim.  This must be a date which falls within the effective period of the policy. Cannot be null.
   * @param filter Data filter used to reduce the amount of data returned with the retrieved policy. May be null.
   * @return An Envelope containing the CCPolicy and related objects, or null if policy not found.
   */
  @Throws(SOAPException, "If too many results were returned by the search")
  @Throws(RequiredFieldException, "If criteria is null")
  @Param("criteria", "Policy search criteria; cannot be null.")
  @Param("asOfDate", "The effective date for which you want to retrieve coverage information, such as the loss date of a claim.  This must be a date which falls within the effective period of the policy. Cannot be null.")
  @Param("filter", "Data filter used to reduce the amount of data returned with the found policies. May be null.")
  @WsiPermissions({SystemPermissionType.TC_SEARCHPOLS, SystemPermissionType.TC_VIEWPOLICYFILE, SystemPermissionType.TC_PFILEDETAILS})
  @Returns("An Envelope containing the CCPolicy and related objects, or null if policy not found.")
  public function retrievePolicy(policyNumber : String, asOfDate : Date, filter : CCPCFilteringCriteria) : Envelope {
    SOAPUtil.require(policyNumber, "policyNumber");
    SOAPUtil.require(asOfDate, "asOfDate");
    var pcPolicyPeriod = Policy.finder.findPolicyPeriodByPolicyNumberAndAsOfDate(policyNumber, asOfDate)
    var ccPolicyGenerator = new gw.webservice.pc.pc1000.ccintegration.CCPolicyGenerator(asOfDate, filter)
    return ccPolicyGenerator.generatePolicy(pcPolicyPeriod)
  }
}