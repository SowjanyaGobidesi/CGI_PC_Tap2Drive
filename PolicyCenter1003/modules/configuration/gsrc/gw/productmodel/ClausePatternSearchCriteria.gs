package gw.productmodel

uses gw.api.locale.DisplayKey
uses gw.api.productmodel. *
uses gw.api.util.TypeUtil
uses gw.search.SearchCriteria
uses java.util.List

@Export
class ClausePatternSearchCriteria extends SearchCriteria<ClausePattern> {

  var _keyword : String as Keyword
  var _coverageCategoryPublicID: String as CoverageCategoryCode
  var _policyLinePatternPublicID: String as PolicyLinePatternCode
  var _searchType : CoveragePatternSearchType as SearchType

  override protected property get HasMinimumSearchCriteria() : boolean {
    return PolicyLinePatternLookup.getByPublicID(_policyLinePatternPublicID) != null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    return DisplayKey.get("Web.Search.SearchCriteria.ClausePattern.MinCriteria")
  }

  override protected function doSearch() : ClausePattern[] {
    var clauseTypes : List<Type< ClausePattern >>
    switch (_searchType) {
      case CoveragePatternSearchType.TC_COVERAGE:
        clauseTypes = {CoveragePattern}
        break
      case CoveragePatternSearchType.TC_CONDITION:
        clauseTypes = {ConditionPattern}
        break
      case CoveragePatternSearchType.TC_EXCLUSION:
        clauseTypes = {ExclusionPattern}
        break
      case CoveragePatternSearchType.TC_EXCLCOND:
        clauseTypes = {ConditionPattern, ExclusionPattern}
        break
      default:
        clauseTypes = {ConditionPattern, ExclusionPattern, CoveragePattern}
    }

    var linePattern = PolicyLinePatternLookup.getByPublicID(_policyLinePatternPublicID)
    var allClausePatterns  = linePattern.CoverageCategories.flatMap(\c -> c.AllClausePatterns.where(\ l -> isSearchedType(clauseTypes, l)))

    if (_coverageCategoryPublicID != null) {
      allClausePatterns = allClausePatterns.where(\ clausePattern -> clausePattern.CoverageCategory.PublicID == this.CoverageCategoryCode)
    }

    if (this.Keyword != null) {
      allClausePatterns = allClausePatterns.where(\ c -> c.Name.containsIgnoreCase(this.Keyword))
    }
    return allClausePatterns.toTypedArray()
  }

  private function isSearchedType(clauseTypes : List<Type< ClausePattern >>, pattern : ClausePattern) : boolean {
    for (t in clauseTypes) {
      if (TypeUtil.isNominallyOrStructurallyAssignable(t, typeof pattern)) {
        return true
      }
    }
    return false
  }

  /**
   * @param coverageCategory the CoverageCategory to be matched
   */
  property set CoverageCategory(category : CoverageCategory) {
    if (category == null) {
      _coverageCategoryPublicID = null
    } else {
      _coverageCategoryPublicID = category.PublicID
      _policyLinePatternPublicID = category.PolicyLinePattern.PublicID
    }
  }

  /**
   * @return the CoverageCategory to be matched
   */
  property get CoverageCategory() : CoverageCategory {
    final var policyLinePattern = PolicyLinePatternLookup.getByPublicID(_policyLinePatternPublicID)
    if (policyLinePattern != null) {
      return policyLinePattern.getCoverageCategoryByPublicId(_coverageCategoryPublicID)
    }
    return null
  }

  function containsResult(pattern: ClausePattern): boolean {
    return doSearch().contains(pattern)
  }
}
