package gw.plugin.personaldata

uses entity.AccountContact
uses entity.Contact
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.losshistory.ClaimSearchCriteria
uses gw.plugin.Plugins
uses gw.plugin.claimsearch.ClaimSearchSpec
uses gw.plugin.claimsearch.IClaimSearchPlugin
uses gw.plugin.claimsearch.NoResultsClaimSearchException

@Export
public class SamplePersonalDataDestructionPlugin extends PCPersonalDataDestructionPlugin {

  override public function shouldDestroyUser(userContact: UserContact): PersonalDataDisposition {

    var results = Query.make(User).compare(User#Contact, Relop.Equals, userContact.ID).select()
    if (results.isEmpty()) {
      return MUST_DESTROY
    } else if (results.hasMatch(\elt -> elt.Credential.Active)) {
      return MUST_NOT_DESTROY
    }

    return MAY_DESTROY
  }

  /**
   * MUST_NOT: Has open activities or any policy term of the policy is MUST_NOT
   * MAY: All policy terms of the policy are MAY
   * MUST: All policy terms of the policy are MUST
   *
   * @param policy the policy whose disposition is to be determined
   * @return disposition of the given policy
   */
  override function shouldDestroyPolicy(policy: Policy, descendants: Collection<DestructionRootPinnable>,
                                        origin: DestructionRootPinnable): PersonalDataDisposition {
    if (policy.isRetired()) {
      return MUST_DESTROY
    }

    /**
     * MUST_NOT destroy if there are any open activities against this policy
     * We are assuming that old activities will get purged by cleanup batch process(es).
     */
    if (policy.AllOpenActivities.HasElements) {
      return MUST_NOT_DESTROY
    }

    var policyTerms = policy.Periods*.PolicyTerm.toSet()
    var dispositions = policyTerms.map(\ policyTerm ->
        shouldDestroyPolicyTerm(policyTerm, policyTerm.getPinnableDescendants(), origin))

    if (dispositions.hasMatch(\elt -> elt == PersonalDataDisposition.MUST_NOT_DESTROY)) {
      return MUST_NOT_DESTROY
    }

    if (dispositions.hasMatch(\elt -> elt == PersonalDataDisposition.MUST_DESTROY)) {
      // All the others must be MUST_DESTROY or MAY_DESTROY
      return MUST_DESTROY
    }

    // All dispositions must be MAY_DESTROY as no MUST_NOT_DESTROY, or MUST_DESTOY
    return MAY_DESTROY
  }

  /**
   * MUST_NOT: Open claims against the policy
   * MUST: policy term has been out of force for 10years
   * MAY: LOB is Personal Auto and has been out of force for 3years
   * MAY: No related PolicyPeriod or Job
   * MAY: Not bound and proposed end of coverage data is greater than 13months in the past
   *
   * @param policyTerm the policy term whose disposition is to be determined
   * @return the disposition of the given policy term
   */
  override function shouldDestroyPolicyTerm(policyTerm: PolicyTerm, descendants: Collection<DestructionRootPinnable>,
                                            origin: DestructionRootPinnable): PersonalDataDisposition {
    if (policyTerm.isRetired()) {
      return MUST_DESTROY
    }

    /**
     * MUST_NOT destroy if there are any open activities against the policy.
     * We are assuming that old activities will get purged by cleanup batch process(es).
     */
    if (policyTerm.Policy.AllOpenActivities.iterator().hasNext()) {
      return MUST_NOT_DESTROY
    }

    /**
     * MUST_NOT destroy if there are any open jobs against the policy.
     * We are assuming that old jobs will get purged by cleanup batch process(es).
     */
    if (policyTerm.isBound()) {
      if (policyTerm.Policy.OpenJobs.length > 0) {
        return MUST_NOT_DESTROY
      }
    } else {
      // > 1 since the unbound submission would itself also be open.
      if (policyTerm.Policy.OpenJobs.length > 1) {
        return MUST_NOT_DESTROY
      }
    }

    /**
     * If there are any open claims against the policy then the policy term MUST_NOT be destroyed.
     */
    if (Plugins.isEnabled(IClaimSearchPlugin)) {
      var claimSearchCriteria = new ClaimSearchCriteria() {
        construct() {
          super.Policy = policyTerm.Policy
        }

        override property get SearchSpecs(): List<ClaimSearchSpec> {
          var specs = super.SearchSpecs
          specs.each(\spec -> {spec.ClaimStatus = "Open"})
          return specs
        }
      }

      var claimSearchException: Exception = null
      var openClaims: ClaimSet
      try {
        openClaims = claimSearchCriteria.performSearch()
      } catch (ex: Exception) {
        claimSearchException = ex
      }

      if (claimSearchException != null and  not (claimSearchException typeis NoResultsClaimSearchException)) {
        return MUST_NOT_DESTROY
      }

      if (openClaims != null and not openClaims.Claims.IsEmpty) {
        return MUST_NOT_DESTROY
      }
    }

    /**
     * If the policy is not bound and the coverage end date is more than 13months in the past it is MAY_DESTROY.
     */
    if (!policyTerm.isBound()) {
      var periods = policyTerm.Policy.Periods
      var coverageEndDate = periods*.EndOfCoverageDate.sort().last()
      if (coverageEndDate.addMonths(13) < Date.Today) {
        return MAY_DESTROY
      } else {
        return MUST_NOT_DESTROY
      }
    }

    /**
     * The policy ended more than 10years ago, so it MUST be destroyed.
     */
    var policyTermEndDate = policyTerm.findMostRecentPeriod().getCoverageEndDate()
    if (policyTermEndDate.addYears(10) < Date.Today) {
      return MUST_DESTROY
    }

    /**
     * If its a PersonalAuto policy and ended more than 3years ago it MAY be destroyed.
     */
    var lobs = policyTerm.Periods*.Lines
    if (lobs.allMatch(\elt -> elt typeis entity.PersonalAutoLine) and policyTermEndDate.addYears(3) < Date.Today) {
      return MAY_DESTROY
    }

    return MUST_NOT_DESTROY
  }

  /**
   * MAY: Account status is Withdrawn and all policies, if any, are MAY_DESTROY or MUST_DESTROY
   * MUST: last activity was 3-years ago
   *
   * @param account the account whose disposition is to be determined
   * @return the disposition of the account
   *
   * CAVEAT: As written this function fetches all policies associated with an account. If there are large numbers of
   *         policies per account, this method should be rewritten.
   */
  override function shouldDestroyAccount(account: Account, descendants: Collection<DestructionRootPinnable>,
                                         origin: DestructionRootPinnable): PersonalDataDisposition {
    if (account.isRetired()) {
      return MUST_DESTROY
    }

    if (account.AccountStatus == AccountStatus.TC_WITHDRAWN) {
      /**
       * If account was withdrawn more than 3years ago, then MUST_DESTROY
       */
      if (account.AccountStatusUpdateTime.addYears(3) < Date.Today) {
        return MUST_DESTROY
      }

      var policies = account.Policies
      if (policies.IsEmpty) {
        return MAY_DESTROY
      }

      /**
       * Check if there are policies associated with this account that MUST_NOT be destroyed.
       */
      if (policies.hasMatch(\policy ->
          shouldDestroyPolicy(policy, policy.getPinnableDescendants(), origin) == MUST_NOT_DESTROY)) {
        // At least one policy that MUST_NOT be destroyed. Therefore this account MUST_NOT be destroyed either.
        return MUST_NOT_DESTROY
      }

      /**
       * If all policies are MUST_DESTROY, then MUST_DESTROY
       */
      if (policies.allMatch(\policy ->
          shouldDestroyPolicy(policy, policy.getPinnableDescendants(), origin) == MUST_DESTROY)) {
        return MUST_DESTROY
      }

      return MAY_DESTROY
    }

    return MUST_NOT_DESTROY
  }

  /**
   * MUST_NOT: Company, CompanyVendor, Place, LegalVenue
   * MUST_NOT: In use by anything that is MUST_NOT (not implemented yet)
   * MUST: All accounts that use this contact are MUST
   *
   * @param contact the contact whose disposition is to be
   * @return the disposition of the given contact
   */
  override function shouldDestroyContact(contact: Contact, descendants: Collection<DestructionRootPinnable>,
                                         origin: DestructionRootPinnable): PersonalDataDisposition {
    if (contact typeis Company or contact typeis CompanyVendor or contact typeis Place or contact typeis LegalVenue) {
      return MUST_NOT_DESTROY
    }

    if (contact.isRetired()) {
      return MUST_DESTROY
    }

    var query = Query.make(AccountContact)
    query.compare(AccountContact#Contact, Relop.Equals, contact.ID)
    var results = query.select()

    if (results.isEmpty()) {
      return MUST_DESTROY
    }

    var accounts = results.map(\elt -> elt.Account)

    if (accounts.allMatch(\elt -> shouldDestroyAccount(elt, elt.getPinnableDescendants(), origin) == MUST_DESTROY )) {
      return MUST_DESTROY
    }

    if (accounts.allMatch(\elt -> shouldDestroyAccount(elt, elt.getPinnableDescendants(), origin) == MAY_DESTROY)) {
      return MAY_DESTROY
    }

    if (accounts.allMatch(\elt -> shouldDestroyAccount(elt, elt.getPinnableDescendants(), origin) == MUST_DESTROY or
        shouldDestroyAccount(elt, elt.getPinnableDescendants(), origin) == MAY_DESTROY)) {
      return MUST_DESTROY
    }

    return MUST_NOT_DESTROY
  }
}