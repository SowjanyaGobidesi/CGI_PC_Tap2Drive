package gw.policy

uses com.google.common.base.CharMatcher
uses entity.windowed.UWIssueVersionList
uses gw.job.uw.types.ExclusiveSet
uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

@Export
class PolicyEvalContext {

  public static class Error extends RuntimeException {
    construct(msg : String) {
      super(msg)
    }
  }

  var _period : PolicyPeriod as readonly Period
  var _checkingSet : UWIssueCheckingSet as readonly CheckingSet
  var _preExistingIssues : Map<String, Map<String, UWIssueVersionList>>
  var _untouchedIssues : Set<UWIssueVersionList>
  var _cause : String as AutomaticOperationCause  //not read-only for testing

  construct(periodArg : PolicyPeriod, checkingSetArg : UWIssueCheckingSet) {
    _period = periodArg
    _checkingSet = checkingSetArg
    var currentIssuesForCheckingSet = _period.VersionList.UWIssuesIncludingSoftDeleted.where(\i -> CheckingSet == i.AllVersions.first().CheckingSet)
    _preExistingIssues = currentIssuesForCheckingSet
        .partition(\i -> i.AllVersions.first().IssueType.Code)
        .mapValues(\issues -> issues.partitionUniquely<String>(\i -> i.AllVersions.first().IssueKey))
        .toAutoMap(\u -> new HashMap<String, UWIssueVersionList>())
    _untouchedIssues = currentIssuesForCheckingSet.toSet()
    AutomaticOperationCause = "Policy issue evaluation (${CheckingSet.Code})"
  }

  /**
   * Either finds an existing UW issue with the specified type and key (cannot have
   * leading or trailing space), or if no such issue exists, creates a new one.
   * <p>
   * A pre-existing issue returned from here will be marked as "touched" and
   * will not be removed by {@link #removeOrphanedIssues}.
   */
  function addIssue(issueType : String, key : String,
                    shortDescription : block() : String, longDescription : block() : String)
  : UWIssue {
    return addIssueInternal(issueType, key, shortDescription, longDescription, null)
  }

  /**
   * Either finds an existing UW issue with the specified type and key (cannot have
   * leading or trailing space), or if no such issue exists, creates a new one, and
   * then sets the specified state.
   * <p>
   * A pre-existing issue returned from here will be marked as "touched" and
   * will not be removed by {@link #removeOrphanedIssues}.
   */
  function addIssue(issueTypeCode : String, key : String,
                    shortDescription : block() : String, longDescription : block() : String,
                    value : State) : UWIssue {
    var stateSet = new ExclusiveSet<State>(false, {value})
    return addIssueInternal(issueTypeCode, key, shortDescription, longDescription, stateSet)
  }

  /**
   * Either finds an existing UW issue with the specified type and key (cannot have
   * leading or trailing space), or if no such issue exists, creates a new one, and
   * then sets the specified decimal value.
   * <p>
   * A pre-existing issue returned from here will be marked as "touched" and
   * will not be removed by {@link #removeOrphanedIssues}.
   */
  function addIssue(issueType : String, key : String,
                    shortDescription : block() : String, longDescription : block() : String,
                    value : BigDecimal) : UWIssue {
    return addIssueInternal(issueType, key, shortDescription, longDescription, value)
  }

  /**
   * Overload for int/long values -> BigDecimal
   */
  function addIssue(issueType : String, key : String,
                    shortDescription : block() : String, longDescription : block() : String,
                    value : long) : UWIssue {
    return addIssueInternal(issueType, key, shortDescription, longDescription, value as BigDecimal)
  }

  /**
   * Either finds an existing UW issue with the specified type and key (cannot have
   * leading or trailing space), or if no such issue exists, creates a new one, and
   * then sets the specified monetary value.
   * <p>
   * A pre-existing issue returned from here will be marked as "touched" and
   * will not be removed by {@link #removeOrphanedIssues}.
   */
  function addIssue(issueType : String, key : String,
                    shortDescription : block() : String, longDescription : block() : String,
                    value : MonetaryAmount) : UWIssue {
    return addIssueInternal(issueType, key, shortDescription, longDescription, value)
  }

  /**
   * Add an issue with a pre-parsed value
   */
  function addIssue(issueType : String, key : String,
                    shortDescription : block() : String, longDescription : block() : String,
                    value : String) : UWIssue {
    return addIssueInternal(issueType, key, shortDescription, longDescription, value)
  }

  /**
   * Either finds an existing UW issue with the specified type and key,
   * or if no such issue exists, creates a new one.
   * <p>
   * A pre-existing issue returned from here will be marked as "touched" and
   * will not be removed by the removeOrphanedIssues call.
   */
  private function addIssueInternal(issueTypeCode : String, key : String,
                                    shortDescription : block() : String, longDescription : block() : String,
                                    value : Object) : UWIssue {
    var issue = findOrCreateIssue(issueTypeCode, key)
    if (issue.CheckingSet != CheckingSet) {
      var msg = "Issue of type \"${issueTypeCode}\" can only be created at ${issue.CheckingSet}, not ${CheckingSet}."
      msg += "\nException occurred generating issue [${key}] ${shortDescription} (${longDescription})"
      throw new PolicyEvalContext.Error(msg)
    }

    if ((shortDescription != null) || (longDescription != null)) {
      issue.setDescriptions(shortDescription, longDescription)
    }

    if (value typeis String) {
      issue.Value = value
    } else {
      issue.Value = issue.IssueType.ComparatorWrapper.ValueType.serialize(value)
    }

    // Re-open issues that are inactive
    if (not issue.Active) {
      issue.Active = true
      issue.addCreateHistory(AutomaticOperationCause)
    }
    return issue
  }

  /**
   * N.B. Intentionally does *not* set Active to true, and if a new UWIssue is created, it is set
   * :Active = false, so that the caller can use .Active to determine whether the issue was previously Active.
   */
  private function findOrCreateIssue(issueTypeCode : String, key : String) : UWIssue {
    var type = UWIssueType.finder.findUWIssueTypeByCode(issueTypeCode)
    if (type == null) {
      throw new IllegalArgumentException("Code ${issueTypeCode} is not a valid code for a UWIssueType - it might not have been correctly configured")
    }

    // Prevent UWIssue, the IssueKey of which has leading / trailing spaces, from being created, because that could introduce
    // duplicate UWIssues -- e.g. As the leading space will be trimmed before being persisited, ' key' is actually a duplciate
    // of 'key', but because of the space, it will pass the '_preExistingIssues' duplicate check and allow it to be created.
    if (key.HasContent) {
      var matcher = CharMatcher.whitespace()
      if (matcher.matches(key.charAt(0)) || matcher.matches(key.charAt(key.length - 1))) {
        throw new IllegalArgumentException("IssueKey ${key} is illegal - leading or trailing spaces are not allowed.")
      }
    }

    var issueVL = _preExistingIssues.get(type.Code).get(key)

    if (issueVL != null) {
      return initializeFoundIssue(issueVL)
    } else {
      return createIssueAsInactive(type, key)
    }
  }

  private function initializeFoundIssue(issueVL : UWIssueVersionList) : UWIssue {
    _untouchedIssues.remove(issueVL)

    // Find the issue as of the slice date, but if one isn't there we need to clone the first
    // version in the list and then explicitly set it's eff/exp window so that it starts on the slice date and
    // ends either as of the start of the next version of the issue or, if there is no next issue, at the period end
    var issue = issueVL.AsOf(_period.SliceDate)
    if (issue == null) {
      var nextIssue = issueVL.AllVersions.firstWhere(\i -> i.EffectiveDate > _period.SliceDate)
      issue = issueVL.AllVersions.first().clone()
      issue.setEffectiveWindow(_period.SliceDate, nextIssue == null ? _period.PeriodEnd : nextIssue.EffectiveDate)
      issue = issue.getSlice(_period.SliceDate)
      issue.HasApprovalOrRejection = false //don't clone an approval when cloning the issue
      issue.Active = false   //signal to our caller that they need to create a history
    } else {
      issue = issue.getSlice(_period.SliceDate)
    }
    return issue
  }

  private function createIssueAsInactive(type : UWIssueType, key : String) : UWIssue {
    var issue = new UWIssue(_period) {:IssueType = type, :IssueKey = key, :Active = false}
    _period.addToUWIssuesIncludingSoftDeleted(issue)

    // Also add it to the context map so we find it next time we look for an issue with this key
    _preExistingIssues[type.Code].put(key, issue.VersionList)

    return issue
  }

  /**
   * Removes, or marks as inactive, all issues that existed at the time this context object was created
   * and which were not touched by a call to the addIssue method.
   * Issues that are open or marked no longer applicable will simply be removed by this method,
   * whereas issues that are approved, declined, or "human touched" will be marked inactive.
   */
  function removeOrphanedIssues() {
    for (issueVL in _untouchedIssues) {
      // Since the issue may or may not exist at this point in effective time, we need to first check
      // and then only deactive the issue as of that point in time if there is such an issue
      var issue = issueVL.AsOf(_period.SliceDate)
      if (issue != null) {
        issue.getSlice(_period.SliceDate).deactivate(AutomaticOperationCause)
      }
    }
  }
}