package gw.job.uw

uses java.util.Set
uses gw.search.SearchCriteria

@Export
class UWIssueTypeSearchCriteria extends SearchCriteria<UWIssueType> {
  var _name : String as Name
  var _description : String as Description
  var _excludedTypes : Set<UWIssueType>

  /**
   * Performs UWIssueType searches for a specific authority profile. The supplied profile determines
   * the "taken" UWIssueTypes, which are excluded from the search results (as invalid choices).
   */
  construct(profile: UWAuthorityProfile, name: String, cleanup: block()) {
    _excludedTypes = profile.Grants.map(\g -> g.IssueType.ActiveVersion).toSet()
    _name = name
    cleanup()
  }

  override protected function doSearch() : UWIssueType[]  {
    return UWIssueType.finder.findUWIssueTypesByNameAndDescriptionWithExclusions( _name, _description, _excludedTypes ).toTypedArray()
  }

  override protected property get HasMinimumSearchCriteria() : boolean {
    return true
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    return null
  }
}
