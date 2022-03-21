package gw.webservice.pc.pc1000.purge

uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.transaction.Transaction
uses gw.webservice.SOAPUtil
uses gw.xml.ws.annotation.WsiPermissions
uses gw.xml.ws.annotation.WsiWebService

@WsiWebService("http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/purge/PurgeAPI")
@Export
class PurgeAPI {

  /**
   * Determines whether policy period is restricted from being purged
   *
   * @param policyPeriodPublicID The policy period to query
   * @return true if policy period is restricted from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyPeriodPublicID", "The policy period to query")
  @WsiPermissions({SystemPermissionType.TC_PFILEDETAILS})
  @Returns("true if policy period is restricted from being purged")
  function isDoNotPurgePolicyPeriod(policyPeriodPublicID : String) : boolean {
    return isDoNotDestroyPolicyPeriod(policyPeriodPublicID)
  }

  /** DoNotDestroy flag on policy period**/

  /**
   * Determines whether policy period is restricted from being purged
   *
   * @param policyPeriodPublicID The policy period to query
   * @return true if policy period is restricted from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyPeriodPublicID", "The policy period to query")
  @WsiPermissions({SystemPermissionType.TC_PFILEDETAILS})
  @Returns("true if policy period is restricted from being purged")
  function isDoNotDestroyPolicyPeriod(policyPeriodPublicID : String) : boolean {
    SOAPUtil.require(policyPeriodPublicID, "policyPeriodPublicID")
    var period = findPolicyPeriod(policyPeriodPublicID)
    return period.DoNotDestroy
  }

  /**
   * Restrict specified policy period from being purged
   *
   * @param policyPeriodPublicID The public ID of the policy period to restrict from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyPeriodPublicID", "The public ID of the policy period to restrict from being purged")
  @WsiPermissions({SystemPermissionType.TC_PURGEDISABLE})
  function setDoNotPurgePolicyPeriod(policyPeriodPublicID : String) {
    setDoNotDestroyPolicyPeriod(policyPeriodPublicID)
  }

  /**
   * Restrict specified policy period from being purged
   *
   * @param policyPeriodPublicID The public ID of the policy period to restrict from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyPeriodPublicID", "The public ID of the policy period to restrict from being purged")
  @WsiPermissions({SystemPermissionType.TC_PURGEDISABLE})
  function setDoNotDestroyPolicyPeriod(policyPeriodPublicID : String) {
    SOAPUtil.require(policyPeriodPublicID, "policyPeriodPublicID")
    setDoNotDestroyPolicyPeriod(policyPeriodPublicID, true)
  }

  /**
   * Remove no-purge restriction from specified policy period
   *
   * @param policyPeriodPublicID The public ID of the policy period from which to remove purging restriction
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyPeriodPublicID", "The public ID of the policy period to restrict from being purged")
  @WsiPermissions({SystemPermissionType.TC_PURGEENABLE})
  function unsetDoNotPurgePolicyPeriod(policyPeriodPublicID : String) {
    unsetDoNotDestroyPolicyPeriod(policyPeriodPublicID)
  }

  /**
   * Remove no-purge restriction from specified policy period
   *
   * @param policyPeriodPublicID The public ID of the policy period from which to remove purging restriction
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyPeriodPublicID", "The public ID of the policy period to restrict from being purged")
  @WsiPermissions({SystemPermissionType.TC_PURGEENABLE})
  function unsetDoNotDestroyPolicyPeriod(policyPeriodPublicID : String) {
    SOAPUtil.require(policyPeriodPublicID, "policyPeriodPublicID")
    setDoNotDestroyPolicyPeriod(policyPeriodPublicID, false)
  }


  /**
   * Determine whether jobs and policy periods on policy are restricted from being purged
   *
   * @param policyNumber The policy to query
   *
   * @return true if policy is restricted from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyNumber", "the policy number of the policy whose purge flag should be checked")
  @WsiPermissions({SystemPermissionType.TC_PFILEDETAILS})
  @Returns("true if policy is restricted from being purged")
  function isDoNotPurgePolicy(policyNumber : String) : boolean {
    return isDoNotDestroyPolicy(policyNumber)
  }

  /** DoNotDestroy flag on policy **/

  /**
   * Determine whether jobs and policy periods on policy are restricted from being purged
   *
   * @param policyNumber The policy to query
   *
   * @return true if policy is restricted from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyNumber", "the policy number of the policy whose purge flag should be checked")
  @WsiPermissions({SystemPermissionType.TC_PFILEDETAILS})
  @Returns("true if policy is restricted from being purged")
  function isDoNotDestroyPolicy(policyNumber : String) : boolean {
    SOAPUtil.require(policyNumber, "policyNumber")
    var policy = findPolicyByPolicyNumber(policyNumber)
    return policy.DoNotDestroy
  }

  /**
   * Restrict jobs and policy periods on policy from being purged
   *
   * @param policyNumber The policy to restrict from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyNumber", "the policy number of the policy for which purging should be disabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEDISABLE})
  function setDoNotPurgePolicy(policyNumber : String) {
    setDoNotDestroyPolicy(policyNumber)
  }

  /**
   * Restrict jobs and policy periods on policy from being purged
   *
   * @param policyNumber The policy to restrict from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyNumber", "the policy number of the policy for which purging should be disabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEDISABLE})
  function setDoNotDestroyPolicy(policyNumber : String) {
    SOAPUtil.require(policyNumber, "policyNumber")
    setDoNotDestroyPolicyByPolicyNumber(policyNumber, true)
  }

  /**
   * Remove restriction from jobs and policy periods on policy to be purged
   *
   * @param policyNumber The policy number of the policy from which purging restriction should be removed
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyNumber", "The policy number of the policy for which purging should be enabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEENABLE})
  function unsetDoNotPurgePolicy(policyNumber : String) {
    unsetDoNotDestroyPolicy(policyNumber)
  }

  /**
   * Remove restriction from jobs and policy periods on policy to be purged
   *
   * @param policyNumber The policy number of the policy from which purging restriction should be removed
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyNumber", "The policy number of the policy for which purging should be enabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEENABLE})
  function unsetDoNotDestroyPolicy(policyNumber : String) {
    SOAPUtil.require(policyNumber, "policyNumber")
    setDoNotDestroyPolicyByPolicyNumber(policyNumber, false)
  }

  /**
   * Private methods
  */
  private function setDoNotDestroyPolicyPeriod(policyPeriodPublicID : String, value : boolean) {
    Transaction.runWithNewBundle(\ bundle -> {
      var period = findPolicyPeriod(policyPeriodPublicID)
      period = bundle.add(period)
      period.setDoNotDestroy(value, \-> "")
    })
  }

  private function setDoNotDestroyPolicyByPolicyNumber(policyNumber : String, value : boolean) {
    Transaction.runWithNewBundle(\ bundle -> {
      var policy = findPolicyByPolicyNumber(policyNumber)
      policy = bundle.add(policy)
      policy.setDoNotDestroy(value, \-> "")
    })
  }

  private function findPolicyPeriod(policyPeriodPublicID : String) : PolicyPeriod {
    var policyPeriodQuery = Query.make(PolicyPeriod)
    policyPeriodQuery.withDistinct(true)
    policyPeriodQuery.compare("PublicID", Relop.Equals,  policyPeriodPublicID)
    var resultPolicyPeriod =  policyPeriodQuery.select()

    if (resultPolicyPeriod.Count == 0) {
      throw new BadIdentifierException(DisplayKey.get("PurgeAPI.Error.InvalidPolicyPeriodID", policyPeriodPublicID))
    }
    return resultPolicyPeriod.single()
  }

  private function findPolicyByPolicyNumber(policyNumber : String) : Policy {
    var policy = Policy.finder.findPolicyByPolicyNumber(policyNumber)
    if (policy == null) {
      throw new BadIdentifierException(DisplayKey.get("PurgeAPI.Error.InvalidPolicyNumber", policyNumber))
    }
    return policy
  }
}