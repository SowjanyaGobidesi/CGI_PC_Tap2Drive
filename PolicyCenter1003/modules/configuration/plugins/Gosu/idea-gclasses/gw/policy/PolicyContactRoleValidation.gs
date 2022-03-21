package gw.policy

uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext


@Export
class PolicyContactRoleValidation extends PCValidationBase {

  var _policyRole : PolicyContactRole as PolicyRole

  construct(valContext : PCValidationContext, role : PolicyContactRole) {
    super(valContext)
    _policyRole = role
  }

  override protected function validateImpl() {
    Context.addToVisited( this, "validateImpl" )

    allAccountContactsAreActive()
  }

  function allAccountContactsAreActive() {
    Context.addToVisited(this, "allAccounContactsAreActive")
    if (Context.isAtLeast(TC_QUOTABLE)) {
      if (!PolicyRole.AccountContactRole.AccountContact.Active) {
        Result.addError(PolicyRole.Branch, TC_QUOTABLE, DisplayKey.get("Web.Policy.PolicyContact.Validation.NotActive", PolicyRole.DisplayName))
      }
    }
  }
}
