package gw.job.uw

enhancement UWAuthorityGrantEnhancement : entity.UWAuthorityGrant {

  /**
   * Does this grant authorize approvals for the given value?
   */
  function authorizes(issueValue : String) : boolean {
    return ComparatorWrapper.compare(issueValue, this.Value)
  }
  
  /**
   * Returns the appropriate wrapper around this grant's comparator.  If this
   * grant has no comparator (since the issue type doesn't allow for one), this
   * will return the Any comparator.
   */
  property get ComparatorWrapper() : UWIssueValueComparatorWrapper {
    return UWIssueValueComparatorWrapper.wrap( this.ComparisonType )  
  }
}
