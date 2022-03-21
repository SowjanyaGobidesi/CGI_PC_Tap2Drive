package gw.api.contact

/**
 * Delegate pattern to provide methods related to AddlInterestDetail.  This is the default implementation.
 */
@Export
class AddlInterestDetailMethodsDefaultImpl implements AddlInterestDetailMethods {

  protected var _addlInterestDetail : AddlInterestDetail

  construct() {}

  construct(aid : AddlInterestDetail){
    _addlInterestDetail = aid
  }

  /**
   * Called when an AddlInterestDetail is removed.  If the PolicyAddlInterest
   * has no more AdditionalInterestDetails, we do some clean up.
   */
  override function addlInterestDetailRemoved() {
    var policyAddlInterest = _addlInterestDetail.PolicyAddlInterest
    if (policyAddlInterest == null) {
      // due to the cascade deletion, this method is reentrant (not on the same entity though)
      // additional interest period removed -> additional interest policy removed -> future versions (add interest period) removed
      return
    }
    // we need to get the slice as of the expiration date to handle calls in window mode
    policyAddlInterest = policyAddlInterest.getSlice(_addlInterestDetail.ExpirationDate)
    if (policyAddlInterest.AdditionalInterestDetails.Count == 0) {
      var branch = policyAddlInterest.Branch

      // Remove the PolicyAddlInterest
      branch.removeFromPolicyContactRoles(policyAddlInterest)

      // If the AccountContactRole is new, remove it.
      var accountContactRole = policyAddlInterest.AccountContactRole
      var accountContact = accountContactRole.AccountContact;
      var removeRole = true
      var removeAccountContact = true
      branch.PolicyContactRoles.each(\ role -> {
        var roleAcctContactRole = role.AccountContactRole
        var roleAC = roleAcctContactRole.AccountContact
        if (roleAcctContactRole == accountContactRole) {
          removeRole = false
        }
        if (roleAC == accountContact) {
          removeAccountContact = false
        }
      })

      //if the role is new and unshared, remove it
      if (accountContactRole.isNew() && removeRole) {
        accountContactRole.AccountContact.removeFromRoles(accountContactRole)
      }

      // If the AccountContact is new and unshared, remove it.
      if (accountContact.isNew() && removeAccountContact) {
        accountContact.Account.removeFromAccountContacts(accountContact)
      }
    }
  }
}