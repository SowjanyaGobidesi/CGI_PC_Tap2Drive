package gw.forms.generic

uses gw.api.locale.DisplayKey
uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.ClausePatternLookup
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.forms.FormData
uses gw.forms.FormInferenceContext
uses gw.forms.GenericFormInference
uses gw.validation.PCValidationBase
uses gw.xml.XMLNode

/**
 * Generic class that can be used for any form that should be added to a policy whenever the
 * clause pattern is not selected.
 */
@Export
class GenericClauseNonExistenceForm extends FormData implements GenericFormInference {
  var _clausePattern : ClausePattern
  var _coverables : Coverable[]
  var _line : PolicyLine

  override property get DisplayName() : String {
    return DisplayKey.get("Forms.Generic.GenericClauseNonExistenceForm")
  }

  override function populateInferenceData(context : FormInferenceContext, availableStates : Set<Jurisdiction>) {
    _line = getLine(context)
    _clausePattern = ClausePatternLookup.getByPublicID(Pattern.ClausePatternCode)
    _coverables = _line.AllCoverables
  }

  /**
   * If the clause does not exist on any coverable of the appropriate type, then return true.
   * Otherwise, return false.
   */
  override property get InferredByCurrentData() : boolean {
    var formCoveragePartTypes = Pattern.FormPatternCoveragePartTypes*.getCoveragePartType()
    var hasCoveragePartsSpecified = formCoveragePartTypes?.Count > 0
    var coverablesToCheck : Coverable[]

    if (hasCoveragePartsSpecified) {
      coverablesToCheck = _coverables.where(\cov -> formCoveragePartTypes.intersect(cov .AssociatedCoveragePartTypes).HasElements)
    } else {
      coverablesToCheck = _coverables
    }
    return coverablesToCheck.IsEmpty ? false :
        coverablesToCheck.allMatch(\covToCheck-> covToCheck.hasCoverageConditionOrExclusion(_clausePattern) == false)
  }

  override function addDataForComparisonOrExport(contentNode : XMLNode) {
    //Add the coverables on which the clause exists
    var allCoverableNode = new XMLNode("Coverables")
    contentNode.addChild(allCoverableNode)
    for (cov in _coverables) {
      // Add the coverable and the clause pattern
      var coverableNode = new XMLNode("Coverable")
      allCoverableNode.addChild(coverableNode)
      coverableNode.addChild(createTextNode("FixedId", cov.TypeIDString))
      coverableNode.addChild(createTextNode("ClausePattern", _clausePattern.PublicID))
    }
  }

  override property get ValidPolicylines() : List<PolicyLinePattern> {
    return PolicyLinePatternLookup.getAll()
  }

  override property get PolicyLineRequired() : boolean {
    return true
  }

  override function validateCustomFields(formPattern : FormPattern, validation : PCValidationBase) {
  }

  override function clearCustomFields(formPattern : FormPattern) {
    formPattern.ClausePattern = null
    formPattern.PatternExistsOnAll = false
    formPattern.clearDependentClausePatternSelections()
  }

}