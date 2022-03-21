package gw.job.uw

uses java.util.Date

enhancement UWIssueHistoryEnhancement : UWIssueHistory {

  property get CreateDate() : Date {
    return CreateTimeOrNow.trimToMidnight()
  }
  
  property get CreateTimeOrNow() : Date {
    var time = this.CreateTime
    return time == null
        ? Date.CurrentDate
        : time
  }

  /**
   * Returns a descriptive string of how long the UW issue approval is valid. If an expiration date is set,
   * a short formatted version of the date (e.g. "04/28/2016") will be returned. If not set, the display name
   * of the {@link UWApprovalDurationType} will be returned (e.g. "Rescinded").
   * <p>
   * See {@link gw.job.uw.UWIssueApprovalEnhancement#Duration(UWApprovalDurationType)} for how expiration dates
   * are calculated for the various {@link UWApprovalDurationType}s.
   */
  function InvalidFrom() : String {
    var date = this.ApprovalInvalidFrom
    return date == null ? this.ApprovalDurationType.DisplayName : date.ShortFormat
  }

  property get FormattedReferenceValue() : String {
    switch (this.Status) {
      case TC_CREATED:
        return this.IssueType.formatValue(this.ReferenceValue)
      case TC_APPROVED:
        return this.IssueType.formatValueAsCondition(this.ReferenceValue)
      case TC_CHANGEEFFDATE:
        return this.IssueType.formatValueAsCondition(this.ReferenceValue)
      default:
        return ""
    }
  }
}
