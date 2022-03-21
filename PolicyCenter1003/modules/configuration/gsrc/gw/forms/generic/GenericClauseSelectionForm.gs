package gw.forms.generic

uses gw.api.domain.covterm.DateTimeCovTerm
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.ClausePatternLookup
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.api.util.StringUtil
uses gw.entity.TypeKey
uses gw.forms.FormData
uses gw.forms.FormInferenceContext
uses gw.forms.GenericFormInference
uses gw.validation.PCValidationBase
uses gw.xml.XMLNode

/**
 * Generic class that can be used for any form that should be added to a policy whenever the
 * clause pattern is selected.
 */
@Export
class GenericClauseSelectionForm extends FormData implements GenericFormInference {
  var _clausePattern : ClausePattern
  var _coverables : Coverable[]
  var _line : PolicyLine

  override property get DisplayName() : String {
    return DisplayKey.get("Forms.Generic.GenericClauseSelectionForm")
  }

  /**
   * Returns the reference date of coverable's related clause.
   * If clause exists in more than one instance of coverable, the earliest reference date is returned
   */
  override function getLookupDates(context : FormInferenceContext) : Map<Jurisdiction, Date> {
    _line = getLine(context)
    if (_line == null) {
      return Collections.emptyMap()
    }
    _clausePattern = ClausePatternLookup.getByPublicID(Pattern.ClausePatternCode)
    _coverables = context.getCoverablesForClausePattern(_clausePattern)
    var map = new HashMap<Jurisdiction, Date>()
    for (cov in _coverables) {
      var clause = cov.getCoverageConditionOrExclusion(_clausePattern)
      if (atLineLevel(_clausePattern)) {
        for ( coveredState in context.getLineCoveredStates(_line)) {
          map.put(coveredState, getEarliestDate(map.get(coveredState), clause.ReferenceDate))
        }
      } else {
        var cs = context.getCoverableState(cov)
        map.put(cs, getEarliestDate(map.get(cs), clause.ReferenceDate))
      }
    }
    return map
  }

  override function populateInferenceData(context : FormInferenceContext, availableStates : Set<Jurisdiction>) {
    if (atLineLevel(_clausePattern)) {
      if (Collections.disjoint(availableStates, context.getLineCoveredStates(_line))) {
        _coverables = {}  // If the line doesn't cover any of the available states, then _coverables should be empty
                          // else don't modify the existing _coverables array
      }
    } else {
      _coverables = _coverables.where(\ coverable -> availableStates.contains(context.getCoverableState(coverable)))
    }
  }

  /**
   * If patternExistsOnAll instances is false and the clause exists on at least one coverable of the appropriate type, then return true.
   * If patternExistsOnAll instances is true and the clause exists on all coverables of the appropriate type, then return true.
   * Otherwise, return false.
   */
  override property get InferredByCurrentData() : boolean {
    var formCoveragePartTypes = Pattern.FormPatternCoveragePartTypes*.getCoveragePartType()
    var hasCoveragePartsSpecified = formCoveragePartTypes?.Count > 0
    if (Pattern.PatternExistsOnAll) {
      var existingCoverableType = typeof _coverables.first()
      for (cov in _line.AllCoverables.where(\ i -> typeof i == existingCoverableType)) {
        if (not cov.hasCoverageConditionOrExclusion(_clausePattern)) {
          return false
        }
        if (hasCoveragePartsSpecified and
            formCoveragePartTypes.intersect(cov.getAssociatedCoveragePartTypes()).Count == 0) {
          return false
        }
      }
      return true
    } else {
      if(hasCoveragePartsSpecified){
        return _coverables.hasMatch(\ c -> c.hasCoverageConditionOrExclusion(_clausePattern) and
            formCoveragePartTypes.intersect(c.getAssociatedCoveragePartTypes()).Count > 0)
      }
      return _coverables.hasMatch(\ c -> c.hasCoverageConditionOrExclusion(_clausePattern))
    }
  }

  override function addDataForComparisonOrExport(contentNode : XMLNode) {
    //Add the coverables on which the clause exists
    var allCoverableNode = new XMLNode("Coverables")
    contentNode.addChild(allCoverableNode)
    for (cov in _coverables) {
      var clause = cov.getCoverageConditionOrExclusion(_clausePattern)
      // Add the coverable and the clause pattern
      var coverableNode = new XMLNode("Coverable")
      allCoverableNode.addChild(coverableNode)
      coverableNode.addChild(createTextNode("FixedId", cov.TypeIDString))
      coverableNode.addChild(createTextNode("ClausePattern", _clausePattern.PublicID))

      for (formPatternCovTerm in Pattern.FormPatternCovTerms) {
        var covTermNode = new XMLNode("CovTerm")
        coverableNode.addChild(covTermNode)
        covTermNode.addChild(createTextNode("CovTermPattern",formPatternCovTerm.CovTermPatternCode))
        var covTermFromClause = clause.CovTerms.firstWhere(\ covTerm -> covTerm.PatternCode == formPatternCovTerm.CovTermPatternCode)
        if (covTermFromClause != null) {
          // Add the covTermPattern value
          if (covTermFromClause.ValueAsString != null) {
            if (covTermFromClause typeis DateTimeCovTerm) {
              covTermNode.addChild(createTextNode("CovTermValue", formatDateTime(covTermFromClause.Value)))
            } else {
              covTermNode.addChild(createTextNode("CovTermValue", covTermFromClause.ValueAsString))
            }
          }
        }
      }

      for (formPatternCoverableProp in Pattern.FormPatternCoverableProperties) {
        var coverablePropNode = new XMLNode("CoverableProperty")
        coverableNode.addChild(coverablePropNode)
        var coverablePropValue = cov[formPatternCoverableProp.Name]
        coverablePropNode.addChild(createTextNode("CoverablePropertyName", formPatternCoverableProp.Name))
        if (coverablePropValue != null) {
          if (coverablePropValue typeis Date) {
            coverablePropNode.addChild(createTextNode("CoverablePropertyValue", formatDateTime(coverablePropValue)))
          } else if (coverablePropValue typeis TypeKey) {
            coverablePropNode.addChild(createTextNode("CoverablePropertyValue", coverablePropValue.Code))
          } else {
            coverablePropNode.addChild(createTextNode("CoverablePropertyValue", coverablePropValue.toString()))
          }
        }
      }
    }
  }

  function formatDateTime(date : Date) : String {
    return StringUtil.formatDate(date, "yyyy-MM-dd HH:mm:ss.SSS")
  }

  override property get ValidPolicylines() : List<PolicyLinePattern> {
    return PolicyLinePatternLookup.getAll()
  }

  function getEarliestDate(d1 : Date, d2 : Date) : Date {
    if (d1 == null) {
      return d2
    } else if (d2 == null) {
      return d1
    } else if (d2.before(d1)) {
      return d2
    } else {
      return d1
    }
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

  private function atLineLevel(pattern : ClausePattern) : boolean {
    return pattern.OwningEntityType == _line.Pattern.PolicyLineSubtype.Code
  }

}
