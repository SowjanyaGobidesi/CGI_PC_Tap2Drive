package gw.policy

uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext

/**
 * A validation that makes sure a given contact is not used for multiple non-primary named insureds
 */
@Export
class NonPrimaryNamedInsuredContactValidation extends PCValidationBase {
  var _policyNonPriNamedInsureds : List<PlcyNonPriNamedInsured>

  construct(context : PCValidationContext, policyContactRoles : PolicyContactRole[]) {
    super(context)
    _policyNonPriNamedInsureds = policyContactRoles.toList().whereTypeIs(PlcyNonPriNamedInsured)
  }

  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    _policyNonPriNamedInsureds.partition(\pcr -> pcr.AccountContactRole.AccountContact.Contact).eachKeyAndValue(\contact, roles -> {
      if (roles.Count > 1) {
        Result.addError(contact, TC_QUOTABLE, DisplayKey.get("Web.PolicyContactRole.Validation.MultipleNamedInsured", contact, roles*.DescriptiveSubType.join(", ")
        ))
      }
    })
  }
}
