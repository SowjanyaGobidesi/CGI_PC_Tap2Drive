package gw.plugin.claimsearch.cc1000

uses com.google.common.base.Throwables
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.util.LocaleUtil
uses gw.losshistory.ClaimPolicyPeriodFilterSet
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.claimsearch.ClaimSearchSpec
uses gw.plugin.claimsearch.IClaimSearchCriteria
uses gw.plugin.claimsearch.IClaimSearchPlugin
uses gw.plugin.claimsearch.NoResultsClaimSearchException
uses gw.plugin.claimsearch.ResultsCappedClaimSearchException
uses org.apache.commons.lang3.exception.ExceptionUtils
uses wsi.remote.gw.webservice.cc.cc1000.pcclaimsearchintegrationapi.PCClaimSearchIntegrationAPI
uses wsi.remote.gw.webservice.cc.cc1000.pcclaimsearchintegrationapi.anonymous.elements.PCClaimSearchCriteria_PolicyNumbers
uses wsi.remote.gw.webservice.cc.cc1000.pcclaimsearchintegrationapi.types.complex.PCClaim
uses wsi.remote.gw.webservice.cc.cc1000.pcclaimsearchintegrationapi.types.complex.PCClaimSearchCriteria

/**
 *  Claim Search Plugin
 *  The integration with ClaimCenter is handled by the GWClaimSearchPlugin.
 *   This plugin calls the ClaimCenter PCClaimSearchIntegrationAPI and translates
 *   the result into PolicyCenter claim objects. The plugin has methods that do the following:
 *   • Search for claims
 *   • Retrieve details of an individual claim
 *   • Grant a user view permissions on a claim
 *  To learn more about this plugin, see “Claim Search from PolicyCenter” in the Integration Guide.
 *
 *
 * PolicyCenter Plugin Changes For Multicurrency
 * To support multicurrency in PolicyCenter 8.0, the following plugin interfaces changed arguments and return values that represent money (for example, BigDecimal types) to the new MonetaryAmount type.
 *   • GWClaimSearchPlugin
 *   • ProrationPlugin
 *   • PCReinsuranceCedingPlugin
 *   • PCReinsurancePlugin
 *   • ReinsuranceConfigPlugin
 *   • LossHistoryPlugin
 *   For customers who upgrade, fix any compilation errors in plugin implementations to use MonetaryAmount as required by the new versions of the plugin interfaces.
 **/

@Export
class GWClaimSearchPlugin implements IClaimSearchPlugin {
  var logger = PCLoggerCategory.CLAIMINTEGRATION_API

  static var MAX_NUMBER_ALLOWABLE = 100

  /**
   * When calling into ClaimCenter, the call blocks until either the call succeeds or the call times out.  This
   * is the call timeout time in milliseconds used by default.
   */
  static final var DEFAULT_CALL_TIMEOUT_MS = 10000

  var _callTimeout : int as CallTimeout = DEFAULT_CALL_TIMEOUT_MS

  construct() {
  }

  private property get ClaimSearchServiceWithLanguage() : PCClaimSearchIntegrationAPI {
    var ccAPI = new PCClaimSearchIntegrationAPI()
    ccAPI.Config.Guidewire.Locale = LocaleUtil.CurrentLanguage.Code
    ccAPI.Config.CallTimeout = CallTimeout
    return ccAPI
  }

  override function searchForClaims(claimSearchCriteria : IClaimSearchCriteria) : ClaimSet {
    var claimResult = getClaimsFromExternalSystem(claimSearchCriteria.SearchSpecs)
    if (claimResult == null or claimResult.size() == 0) {
      throw new NoResultsClaimSearchException()
    }
    var result : ClaimSet
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      result = new ClaimSet(bundle)
      for (pcClaim in claimResult) {
        var claim = addClaimToClaimSet(pcClaim, result)
        mapClaimToPeriod(claim, pcClaim.PolicyNumber)
      }
      var claimFilter = new ClaimPolicyPeriodFilterSet(result.Claims)
      result.setClaimsFilter(claimFilter)
    })
    return result
  }

  /**
   * Intended override point for tests.
   */
  protected function getClaimsFromExternalSystem(specs : List<ClaimSearchSpec>)  : List<PCClaim> {
    var criteriaForCC = specs.map(\ c -> toPCClaimSearchCriteria(c)).toTypedArray()
    validateCriteria(criteriaForCC)
    var claimCount = callRemoteClaimService(\claimRemoteApi -> claimRemoteApi.getNumberOfClaimsMultiCriteria(criteriaForCC))
    if (claimCount == 0 ) {
      return null
    } else if (claimCount > MAX_NUMBER_ALLOWABLE) {
      throw new ResultsCappedClaimSearchException()
    }

    return callRemoteClaimService(\claimRemoteApi -> claimRemoteApi.searchForClaimsMultiCriteria(criteriaForCC).toList())
  }
    /**
     * Sets the policyperiod by first finding the policy that matches the policyNumber
     * and then choosing the most recent bound period associated with that policy with
     * an effective date range containing the lossDate.  This
     * allows the claim to be attached to a period with a different policy number, for example
     * when a new job has been bound that changes the policy number, but the claims system
     * is not aware of the change and returns the prior policy number.
     */
    private function mapClaimToPeriod(claim : Claim, policyNumber : String) {
      // First finds the policy from the policyNumber, then the matching period.
      claim.PolicyPeriod = Policy.finder.findPolicyPeriodByPolicyNumberAndAsOfDate(policyNumber, claim.LossDate)
      claim.PolicyInForce = (claim.PolicyPeriod != null)
    }

  private function toPCClaimSearchCriteria(searchSpec: ClaimSearchSpec): PCClaimSearchCriteria {
    var pcClaimSearchCriteria = new PCClaimSearchCriteria()
    var dateRange = searchSpec.DateRange
    pcClaimSearchCriteria.BeginDate = dateRange.AllTime ? null : dateRange.BeginDate
    pcClaimSearchCriteria.EndDate = dateRange.AllTime ? null : dateRange.EndDate

    // Find all related policy numbers by looking up all policy periods and extracting
    // the unique set of policy numbers relating to those periods
    pcClaimSearchCriteria.PolicyNumbers = new PCClaimSearchCriteria_PolicyNumbers()
    pcClaimSearchCriteria.PolicyNumbers.Entry.addAll(searchSpec.PolicyNumbers.toList())
    pcClaimSearchCriteria.Status = searchSpec.ClaimStatus
    return pcClaimSearchCriteria
  }

  private function validateCriteria(criteria: PCClaimSearchCriteria[]) {
    // Test to see if there are no policy numbers specified
    if (criteria*.PolicyNumbers.Count == 0) {
      throw new NoResultsClaimSearchException()
    }
  }

  override function giveUserViewPermissionsOnClaim(username: String, claimPublicID: String) {
    callRemoteClaimService(\claimRemoteApi -> {
      claimRemoteApi.giveUserClaimViewPermission(claimPublicID, username)
      return null
    })
  }

  override function getClaimDetail(inclaim: Claim): ClaimDetail {
    var pcClaimDetail = callRemoteClaimService(\claimRemoteApi -> claimRemoteApi.getClaimByClaimNumber(inclaim.ClaimNumber))
    if (pcClaimDetail != null) {
      var claimDetail = new ClaimDetail(inclaim)
      claimDetail.Claim = inclaim
      claimDetail.Description = pcClaimDetail.Description
      claimDetail.LossCause = pcClaimDetail.LossCause
      claimDetail.ClaimPublicID = pcClaimDetail.ClaimPublicID
      claimDetail.ClaimInfoPublicID = pcClaimDetail.ClaimInfoPublicID
      claimDetail.Injuries = pcClaimDetail.Injury
      claimDetail.Litigation = pcClaimDetail.Litigation
      if (pcClaimDetail.Recoveries != null and pcClaimDetail.RecoveriesCurrency != null) {
        claimDetail.Recoveries = new MonetaryAmount(pcClaimDetail.Recoveries,
            Currency.get(pcClaimDetail.RecoveriesCurrency.GosuValue))
      }
      if (pcClaimDetail.RemainingReserves != null and pcClaimDetail.RemainingReservesCurrency != null) {
        claimDetail.RemainingReserves = new MonetaryAmount(pcClaimDetail.RemainingReserves,
            Currency.get(pcClaimDetail.RemainingReservesCurrency as String))
      }
      if (pcClaimDetail.TotalPaid != null and pcClaimDetail.TotalPaidCurrency != null) {
        claimDetail.TotalPaid = new MonetaryAmount(pcClaimDetail.TotalPaid,
            Currency.get(pcClaimDetail.TotalPaidCurrency as String))
      }
      return claimDetail
    }
    return null
  }

  private function addClaimToClaimSet(pcClaim: PCClaim, claimSet: ClaimSet): Claim {
    var claim = new Claim(claimSet)
    claim.ClaimNumber = pcClaim.ClaimNumber
    claim.PolicyType = pcClaim.PolicyTypeName
    claim.LossDate = pcClaim.LossDate
    claim.Status = pcClaim.Status
    claim.LitigationIndicator = pcClaim.LitigationIndicator
    claim.FraudIndicator = pcClaim.FraudIndicator
    claim.LargeLossIndicator = pcClaim.LargeLossIndicator
    if (pcClaim.TotalIncurred != null and pcClaim.TotalIncurredCurrency != null) {
      claim.TotalIncurred = new MonetaryAmount(pcClaim.TotalIncurred,
          Currency.get(pcClaim.TotalIncurredCurrency as String))
    }
    claim.LossType = pcClaim.LossType
    claim.ClaimSecurityType = pcClaim.ClaimSecurityType
    claim.ClaimPublicID = pcClaim.ClaimPublicID
    claim.AdjusterDisplayName = pcClaim.Adjuster.DisplayName
    claim.AdjusterPhoneNumber = pcClaim.Adjuster.PrimaryPhone
    claimSet.addToClaims(claim)
    return claim
  }

  private function callRemoteClaimService<T>(task: block(api: PCClaimSearchIntegrationAPI): T): T {
    try {
      return task(ClaimSearchServiceWithLanguage)
    } catch (e: Exception) {
      logger.error("Error encountered during retrieval of claims", e)
      Throwables.propagateIfInstanceOf(e, wsi.remote.gw.webservice.cc.cc1000.pcclaimsearchintegrationapi.faults.DataConversionException)
      Throwables.propagateIfInstanceOf(e, DisplayableException)
      throw new DisplayableException(DisplayKey.get("Web.Claims.ClaimSystem.Error.GeneralException", ExceptionUtils.getRootCauseMessage(e)))
    }
  }
}
