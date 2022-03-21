package gw.forms.generic

uses gw.api.locale.DisplayKey
uses gw.forms.GenericFormInference
uses gw.forms.FormData
uses gw.validation.PCValidationBase
uses gw.xml.XMLNode
uses java.util.Set
uses gw.forms.FormInferenceContext
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses java.util.List

/**
 * Generic class that can be used for any form that should always be added to a policy whenever the
 * form is available.  Using this class directly will lead to a form with no data populated, but is
 * updated with every subsequent job on the policy, similar to the behavior you might want for a
 * declaration sheet.
 */

@Export
class GenericAlwaysAddedEveryJobForm extends FormData implements GenericFormInference {
  var _line : PolicyLine
  var _jobNumber : String

  override property get DisplayName(): String {
    return DisplayKey.get("Forms.Generic.GenericAlwaysAddedEveryJobForm")
  }

  override property get ValidPolicylines(): List <PolicyLinePattern> {
    return PolicyLinePatternLookup.All
  }

  override function populateInferenceData(context: FormInferenceContext, availableStates: Set <Jurisdiction>) {
    _jobNumber = context.Period.Job.JobNumber
    _line = getLine(context)
  }

  override property get InferredByCurrentData(): boolean {
    return isInferredByCoveragePart(_line)
  }

  override function addDataForComparisonOrExport(contentNode: XMLNode) {
    var node = new XMLNode("JobNumber")
    node.Text = _jobNumber
    contentNode.addChild(node)
  }

  override property get PolicyLineRequired(): boolean {
    return false
  }

  override function validateCustomFields(formPattern: FormPattern, validation: PCValidationBase) {
  }

  override function clearCustomFields(formPattern: FormPattern) {
  }
}