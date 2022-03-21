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
 * specified Additional Interest value is selected.
 */
@Export
class GenericAdditionalInterestForm extends FormData implements GenericFormInference {
  var _line: PolicyLine

  override property get DisplayName(): String {
    return DisplayKey.get("Forms.Generic.GenericAdditionalInterestForm")
  }

  override function populateInferenceData(context: FormInferenceContext, availableStates: Set<Jurisdiction>) {
    _line = getLine(context)
  }

  /**
   * If no Additional Interest type is specified, then return true.
   * If at least one of the Additional Interest type specified in the form pattern exists on the line, then return true.
   * Otherwise, return false.
   */
  override property get InferredByCurrentData(): boolean {
    var formAdditionalInterestTypes = Pattern.AdditionalInterestTypes
    var lineAdditionalInterestTypes = _line.Branch.PolicyContactRoles.whereTypeIs(PolicyAddlInterest)*.AdditionalInterestDetails*.AdditionalInterestType
    var additionalInterestInferred =  formAdditionalInterestTypes.IsEmpty or
        formAdditionalInterestTypes.intersect(lineAdditionalInterestTypes).Count > 0
    return isInferredByCoveragePart(_line) and additionalInterestInferred
  }

  override function addDataForComparisonOrExport(contentNode: XMLNode) {
    var additionalInterestTypes = new XMLNode("AdditionalInterestTypes")
    contentNode.addChild(additionalInterestTypes)
    for (var additionalInterestType in Pattern.AdditionalInterestTypes) {
      additionalInterestTypes.addChild(createTextNode("AdditionalInterestType", additionalInterestType.Code))
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
    if (formPattern.FormPatternAdditionalInterestTypes.HasElements) {
      formPattern.FormPatternAdditionalInterestTypes.each(\f -> formPattern.removeFromFormPatternAdditionalInterestTypes(f))
    }
  }
}
