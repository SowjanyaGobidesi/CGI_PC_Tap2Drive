package gw.contact

uses gw.api.locale.DisplayKey
uses gw.policy.PolicyAddlInsuredAndTypeUniqueValidation
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses org.apache.commons.lang3.StringUtils

@Export
class PolicyAddlInsuredValidation extends PCValidationBase {
  var _stepId: String
  var _addlInsureds: PolicyAddlInsured[]

  construct(valContext: PCValidationContext, addlInsureds: PolicyAddlInsured[], stepId: String) {
    super(valContext)
    _stepId = stepId
    _addlInsureds = addlInsureds
  }

  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    checkAdditionalInsuredsForUniqueness()
    checkAdditionalInformationSpecifiedWhenRequired()
  }

  /**
   * Ensure that additional information is present for additional insureds that require it.
   */
  protected function checkAdditionalInformationSpecifiedWhenRequired() {
    Context.addToVisited(this, "checkAdditionalInformationSpecifiedWhenRequired")
    var allAdditionalInsuredDetails = _addlInsureds*.PolicyAdditionalInsuredDetails
    allAdditionalInsuredDetails.each(\d -> {
      if (d.AdditionalInformationType != null and StringUtils.isEmpty(d.AdditionalInformation)) {
        var reason = DisplayKey.get("Web.PolicyLine.Validation.AdditionalInsured.AddlInformationRequired", d.AdditionalInsuredType)
        Result.addFieldError(d, "AdditionalInformation", ValidationLevel.TC_DEFAULT, reason, _stepId)
      }
    })
  }

  /**
   * Ensure that there are no duplicate additional insureds (name and type) present.
   */
  protected function checkAdditionalInsuredsForUniqueness() {
    Context.addToVisited(this, "checkAdditionalInsuredsForUniqueness")
    _addlInsureds.each(\a -> new PolicyAddlInsuredAndTypeUniqueValidation(Context, a, _stepId).validate())
  }
}