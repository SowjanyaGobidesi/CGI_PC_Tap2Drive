package gw.webservice.pc.pc900.purge

uses gw.api.database.IQueryBeanResult
uses gw.api.locale.DisplayKey
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.transaction.Transaction
uses gw.webservice.SOAPUtil
uses gw.xml.ws.annotation.WsiPermissions
uses gw.xml.ws.annotation.WsiWebService

@WsiWebService("http://guidewire.com/pc/ws/gw/webservice/pc/pc900/purge/PurgeAPI")
@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
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
  @Deprecated(:value="Please use isDoNotDestroyPolicyPeriod. Will be removed in PC11.", :version="PC 9.0.4")
  function isDoNotPurgePolicyPeriod(policyPeriodPublicID : String) : boolean {
    return isDoNotDestroyPolicyPeriod(policyPeriodPublicID)
  }

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
  @Deprecated(:value="Please use setDoNotDestroyPolicyPeriod. Will be removed in PC11.", :version="PC 9.0.4")
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
  @Deprecated(:value="Please use unsetDoNotDestroyPolicyPeriod. Will be removed in PC11.", :version="PC 9.0.4")
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
  @Deprecated(:value="Please use isDoNotDestroyPolicy. Will be removed in PC11.", :version="PC 9.0.4")
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
  @Deprecated(:value="Please use setDoNotDestroyPolicy. Will be removed in PC11.", :version="PC 9.0.4")
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
  @Deprecated(:value="Please use unsetDoNotDestroyPolicy. Will be removed in PC11.", :version="PC 9.0.4")
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

  /** DoNotDestroy flag on account **/

  /**
   * Determine whether the account is restricted from being purged
   *
   * @param accountNumber The account to query
   *
   * @return true if account is restricted from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("accountNumber", "the account number of the account whose purge flag should be checked")
  @WsiPermissions({SystemPermissionType.TC_PFILEDETAILS})
  @Returns("true if account is restricted from being purged")
  function isDoNotDestroyAccount(accountNumber : String) : boolean {
    SOAPUtil.require(accountNumber, "accountNumber")
    var account = findAccountByAccountNumber(accountNumber)
    return account.DoNotDestroy
  }


  /**
   * Restrict policy periods, jobs, and policy on account from being purged
   *
   * @param accountNumber The account to restrict from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("accountNumber", "the account number of the account for which purging should be disabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEDISABLE})
  function setDoNotDestroyAccount(accountNumber : String) {
    SOAPUtil.require(accountNumber, "accountNumber")
    setDoNotDestroyAccountByAccountNumber(accountNumber, true)
  }


  /**
   * Remove restriction from policy periods, jobs, and policy on account from being purged
   *
   * @param accountNumber The account number of the account from which purging restriction should be removed
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("accountNumber", "The account number of the account for which purging should be enabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEENABLE})
  function unsetDoNotDestroyAccount(accountNumber : String) {
    SOAPUtil.require(accountNumber, "accountNumber")
    setDoNotDestroyAccountByAccountNumber(accountNumber, false)
  }


  /** DoNotDestroy flag on contact **/

  /**
   * Determine whether the contact is restricted from being purged
   *
   * @param addressBookUID The contact to query
   *
   * @return true if contact is restricted from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("addressBookUID", "the addressBookUID of the contact whose purge flag should be checked")
  @WsiPermissions({SystemPermissionType.TC_PFILEDETAILS})
  @Returns("true if contact is restricted from being purged")
  function isDoNotDestroyContact(addressBookUID : String) : boolean {
    SOAPUtil.require(addressBookUID, "addressBookUID")
    var contacts = findContacts(addressBookUID)
    return contacts.hasMatch(\elt -> elt.DoNotDestroy)
  }

  /**
   * Restrict policy periods, jobs, policy, accounts related to contact from being purged
   *
   * @param addressBookUID The addressBookUID contact to restrict from being purged
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("addressBookUID", "the addressBookUID number of the contact for which purging should be disabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEDISABLE})
  function setDoNotDestroyContact(addressBookUID : String) {
    SOAPUtil.require(addressBookUID, "addressBookUID")
    setDoNotDestroyContactByAddressBookUIDAccountNumber(addressBookUID, true)
  }


  /**
   * Remove restriction from policy periods, jobs, policy, and account on contact from being purged
   *
   * @param addressBookUID The addressBookUID contact from which purging restriction should be removed
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("addressBookUID", "The addressBookUID of the contact for which purging should be enabled")
  @WsiPermissions({SystemPermissionType.TC_PURGEENABLE})
  function unsetDoNotDestroyContact(addressBookUID : String) {
    SOAPUtil.require(addressBookUID, "addressBookUID")
    setDoNotDestroyContactByAddressBookUIDAccountNumber(addressBookUID, false)
  }


  /**
   * Private methods
  */

  private function setDoNotDestroyContactByAddressBookUIDAccountNumber(addressBookUID: String, value: boolean) {
    Transaction.runWithNewBundle(\ bundle -> {
      var contacts = findContacts(addressBookUID)
      contacts.each(\contact -> {
        contact = bundle.add(contact)
        contact.setDoNotDestroy(value, \-> "")
      })
    })
  }

  private function setDoNotDestroyAccountByAccountNumber(accountNumber: String, value: boolean) {
    Transaction.runWithNewBundle(\ bundle -> {
      var account = findAccountByAccountNumber(accountNumber)
      account = bundle.add(account)
      account.setDoNotDestroy(value, \-> "")
    })
  }

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
      policy.setDoNotDestroy(value, \ -> "")
    })
  }

  private function findPolicyPeriod(policyPeriodPublicID : String) : PolicyPeriod {
    var policyPeriodQuery = Query.make(PolicyPeriod)
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

  private function findAccountByAccountNumber(accountNumber : String) : Account {
    var account = entity.Account.finder.findAccountByAccountNumber(accountNumber)
    if (account == null) {
      throw new BadIdentifierException(DisplayKey.get("PurgeAPI.Error.InvalidAccountNumber", accountNumber))
    }

    return account
  }

  private function findContacts(addressBookUID: String) : IQueryBeanResult<Contact> {
    SOAPUtil.require(addressBookUID, "addressBookUID")
    var query = Query.make(Contact).withFindRetired(true).compare("AddressBookUID", Equals, addressBookUID).select()
    if (query.isEmpty()) {
      throw new BadIdentifierException(DisplayKey.get("PurgeAPI.Error.InvalidAddressBookUID", addressBookUID))
    }
    return query
  }
}