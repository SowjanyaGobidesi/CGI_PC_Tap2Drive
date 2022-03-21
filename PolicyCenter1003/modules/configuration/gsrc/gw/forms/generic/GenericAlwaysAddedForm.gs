
package gw.forms.generic
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.forms.FormInferenceContext
uses gw.forms.GenericFormInference

uses java.util.Set
uses java.util.List
uses gw.validation.PCValidationBase

/**
 * Generic class that can be used for any form that should always be added to a policy whenever the
 * form is available.  Using this class directly will lead to a form with no data populated, but this
 * class can also be extended by subclasses that override the addDataForComparisonOrExport method.
 */
@Export
class GenericAlwaysAddedForm extends AbstractSimpleAvailabilityForm implements GenericFormInference {
  var _line : PolicyLine

  override function isAvailable(context : FormInferenceContext, availableStates : Set<Jurisdiction>) : boolean {
    return true  
  }

  override property get DisplayName() : String {
    return DisplayKey.get("Forms.Generic.GenericAlwaysAddedForm")
  }

  override function populateInferenceData(context: FormInferenceContext, availableStates: Set <Jurisdiction>) {
    _line = getLine(context)
  }

  override property get InferredByCurrentData(): boolean {
    return isInferredByCoveragePart(_line)
  }

  override property get ValidPolicylines() : List<PolicyLinePattern> {
    return PolicyLinePatternLookup.getAll()
  }

  override property get PolicyLineRequired() : boolean {
    return false
  }

  override function validateCustomFields(formPattern : FormPattern, validation : PCValidationBase) {
  }

  override function clearCustomFields(formPattern : FormPattern) {
  }

}
