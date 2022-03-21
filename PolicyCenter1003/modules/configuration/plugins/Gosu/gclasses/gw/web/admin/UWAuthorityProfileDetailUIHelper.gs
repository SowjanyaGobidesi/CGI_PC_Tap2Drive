package gw.web.admin

uses gw.api.locale.DisplayKey
uses gw.api.util.CurrencyUtil
uses gw.api.util.DisplayableException
uses gw.web.community.UWAuthorityGrantUIWrapper

@Export
class UWAuthorityProfileDetailUIHelper {

  var _profile: UWAuthorityProfile
  var _searchStringCache: String as readonly SearchStringCache

  construct(profile: UWAuthorityProfile) {
    _profile = profile
  }


  function validComparisonTypes(issueType : UWIssueType) : ValueComparator[] {
    issueType = issueType.ActiveVersion
    if (issueType == null or issueType.Comparator == TC_NONE) {
      return {}
    } else {
      return {issueType.Comparator, TC_ANY}
    }
  }

  function requiresValue(issueType : UWIssueType) : boolean {
    issueType = issueType.ActiveVersion
    return issueType != null and issueType.Comparator != TC_NONE and issueType.Comparator != TC_ANY
  }

  function requiresCurrency(comparisonType : ValueComparator) : boolean {
    return comparisonType.Code == ValueComparator.TC_MONETARY_GE as String
        or comparisonType.Code == ValueComparator.TC_MONETARY_LE as String
  }

  function shouldDisplayCurrencyColumn() : Boolean {
    return gw.api.util.CurrencyUtil.isMultiCurrencyMode()
        and comparisonTypesIncludeMonetaryAmountComparison()
  }

  private function comparisonTypesIncludeMonetaryAmountComparison() : Boolean {
    for (grant in _profile.Grants) {
      for (comparison in validComparisonTypes(grant.IssueType.ActiveVersion)) {
        if (requiresCurrency(comparison)) return true
      }
    }
    return false
  }

  function updateValueAndCurrency(grant : UWAuthorityGrantUIWrapper) {
    // Do nothing when IssueType is not set
    if (grant.IssueType == null) {
      return
    }

    grant.ApproveAnyValue = grant.ComparisonType == TC_ANY

    if (!requiresValue(grant.IssueType.ActiveVersion)) {
      grant.Value = null
    }
    if (requiresCurrency(grant.ComparisonType)) {
      if (grant.Currency == null) {
        grant.Currency = CurrencyUtil.getDefaultCurrency()
      }
    } else {
      grant.Currency = null
    }
  }

  /**
   * Search for a UWIssueType by name into the available types for a profile grant.
   * Search is first attempted by code. Then a name search is done. If a single exact or substring match is found,
   * it is returned. Otherwise an exception is thrown.
   */
  function issueTypeIn(searchString: String): UWIssueType {
    _searchStringCache = searchString
    // search by code first
    var matchingType = UWIssueType.finder.findUWIssueTypeByCode(searchString)
    if (matchingType == null) {
      // then search by name
      matchingType = findUWIssueTypeByName(searchString)
    }
    var existingGrants = _profile.Grants
        .where(\g -> g.IssueType != null)
        .map(\g -> g.IssueType.ActiveVersion).toSet()
    if (existingGrants.hasMatch(\issueType -> matchingType.isSameAs(issueType))) {
      throw new DisplayableException(DisplayKey.get("Admin.UWAuthorityGrantEnhancement.IssueTypeAsString.CodeAlreadyInUse", searchString))
    }
    return matchingType
  }

  /**
   * Returns a UWIssueType string identifier to display on screen
   */
  function issueTypeOut(issueType: UWIssueType): String {
    return issueType == null ? "" : issueType.ActiveVersion.DisplayName
  }

  /**
   * Search by name sub-string. Return a single exact match if found, or a single substring match. If zero or
   * multiple matches were found, raise an exception.
   */
  private function findUWIssueTypeByName(searchString: String): UWIssueType {
    // substring name search
    var matchingTypes = UWIssueType.finder.findUWIssueTypesByNameAndDescriptionWithExclusions(searchString, null, {})
    // check for an exact name match in the results
    var exactMatches = matchingTypes.where(\issueType -> searchString == issueType.Name)
    if (exactMatches.size() == 1) {
      return exactMatches[0]
    }
    switch (matchingTypes.size()) {
      case 0:
        throw new DisplayableException(DisplayKey.get("Admin.UWAuthorityGrantEnhancement.IssueTypeAsString.NoMatches", searchString))
      case 1:
        return matchingTypes[0]
      default:
        throw new DisplayableException(DisplayKey.get("Admin.UWAuthorityGrantEnhancement.IssueTypeAsString.MultipleMatches", searchString))
    }
  }
}