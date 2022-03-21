package gw.policy

uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext

/**
 * Validation to ensure that a policy additional insured does not have
 * more than one detail of the same type.
 */
@Export
class PolicyAddlInsuredAndTypeUniqueValidation extends PCValidationBase {

  var _stepId: String
  var _policyAddlInsured: PolicyAddlInsured

  construct(valContext: PCValidationContext, policyAddlInsured: PolicyAddlInsured) {
    this(valContext, policyAddlInsured, null)
  }

  construct(valContext: PCValidationContext, policyAddlInsured: PolicyAddlInsured, stepId: String) {
    super(valContext)
    _stepId = stepId
    _policyAddlInsured = policyAddlInsured
  }

  /**
   * This code formerly existed in
   * BALineValidation.additionalInsuredAndTypeUnique(),
   * BOPLineValidation.additionalInsuredAndTypeUnique(), and
   * GLLineValidation.additionalInsuredAndTypeUnique(). It checks that
   * there are no repeat AdditionalInsuredDetails types in the
   * additionalInsured's list PolicyAdditionalInsuredDetails.
   */
  override function validateImpl() {
    Context.addToVisited(this, "validate")
    var seenTypes = new HashSet<typekey.AdditionalInsuredType>()
    for (var additionalInsuredDetail in _policyAddlInsured.PolicyAdditionalInsuredDetails) {
      if (seenTypes.contains(additionalInsuredDetail.AdditionalInsuredType)) {
        var reason = DisplayKey.get("Web.PolicyLine.Validation.AdditionalInsuredUnique",
            _policyAddlInsured, additionalInsuredDetail.AdditionalInsuredType)
        Result.addError(_policyAddlInsured, TC_DEFAULT, reason, _stepId)
      } else {
        seenTypes.add(additionalInsuredDetail.AdditionalInsuredType)
      }
    }
  }
}