package gw.job.uw

enhancement UWIssueTypeEnhancement : entity.UWIssueType {

  /**
   * Compute a default approval value based on an issue value
   */
  function calculateDefaultValue(issueValue : String) : String {
    return ComparatorWrapper.calculateDefaultApprovalValue(this, issueValue)
  }

  property get ComparatorWrapper() : UWIssueValueComparatorWrapper {
    return UWIssueValueComparatorWrapper.wrap(this.Comparator)
  }

  function formatValue(value : String) : String {
    var formatter = ValueFormatter.forType(this.ValueFormatterType)
    return formatter.format(value)
  }
  
  function formatValueAsCondition(value : String) : String {
    var formatter = ValueFormatter.forType(this.ValueFormatterType)
    var comparator = UWIssueValueComparatorWrapper.wrap(this.Comparator)
    return value == null ? null : comparator.formatAsCondition(formatter.format(value))
  }

  /**
   * UWIssueType is versioned to record changes over time, i.e. a single IssueType may have multiple versions (instances).
   * @return true when comparing to a version of the same UWIssueType or self
   */
  function isSameAs(issueType: UWIssueType): boolean {
    return this.Code == issueType.Code
  }

  /**
   * returns the evaluated version of this issue type (head or deployed)
   */
  property get ActiveVersion(): UWIssueType {
    return UWIssueType.finder.findUWIssueTypeByCode(this.Code)
  }
}
