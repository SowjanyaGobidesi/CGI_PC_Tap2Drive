package gw.forms.generic

uses entity.PolicyLine
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.forms.FormData
uses gw.forms.FormInferenceContext
uses gw.forms.GenericFormInference
uses gw.validation.PCValidationBase
uses gw.xml.XMLNode

/**
 * Generic class that can be used for any form that should be added to a policy whenever the
 * specified Additional Insured value is selected.
 */
@Export
class GenericAdditionalInsuredForm extends FormData implements GenericFormInference {
  var _line: PolicyLine

  override property get DisplayName(): String {
    return DisplayKey.get("Forms.Generic.GenericAdditionalInsuredForm")
  }

  override function populateInferenceData(context: FormInferenceContext, availableStates: Set<Jurisdiction>) {
    _line = getLine(context)
  }

  /**
   * If no Additional Insured type is specified, then return true.
   * If at least one of the Additional Insured type specified in the form pattern exists on the line, then return true.
   * Otherwise, return false.
   */
  override property get InferredByCurrentData(): boolean {
    var formAdditionalInsuredTypes = Pattern.AdditionalInsuredTypes
    var lineAdditionalInsuredTypes = _line.AdditionalInsureds*.PolicyAdditionalInsuredDetails*.AdditionalInsuredType
    var additionalInsuredInferred = formAdditionalInsuredTypes.IsEmpty or
        formAdditionalInsuredTypes.intersect(lineAdditionalInsuredTypes).Count > 0
    return isInferredByCoveragePart(_line) and additionalInsuredInferred
  }

  override function addDataForComparisonOrExport(contentNode: XMLNode) {
    var additionalInsuredTypes = new XMLNode("AdditionalInsuredTypes")
    contentNode.addChild(additionalInsuredTypes)
    for (var additionalInsuredType in Pattern.AdditionalInsuredTypes) {
      additionalInsuredTypes.addChild(createTextNode("AdditionalInsuredType", additionalInsuredType.Code))
    }
  }

  override property get ValidPolicylines(): List<PolicyLinePattern> {
    return PolicyLinePatternLookup.getAll()
  }

  override property get PolicyLineRequired(): boolean {
    return true
  }

  override function validateCustomFields(formPattern: FormPattern, validation: PCValidationBase) {
  }

  override function clearCustomFields(formPattern: FormPattern) {
    if (formPattern.FormPatternAdditionalInsuredTypes.HasElements) {
      formPattern.FormPatternAdditionalInsuredTypes.each(\f -> formPattern.removeFromFormPatternAdditionalInsuredTypes(f))
    }
  }
}
