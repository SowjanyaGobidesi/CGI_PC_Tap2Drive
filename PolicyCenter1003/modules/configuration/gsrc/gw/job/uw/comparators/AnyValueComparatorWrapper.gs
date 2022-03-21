package gw.job.uw.comparators
uses gw.job.uw.UWIssueValueComparatorWrapper

/**
 * Comparator wrapper used internally to authorize any value. This is used for
 * valued issue types when a grant authorizes a user to approve any value.
 */
// N.B. This class intentionally not exported.
// NOTE pdalbora 4-May-2015 -- One cannot have a non-exported class extending an exported
// class. If we truly want this class to not be content, then the base class must be pulled
// back to core.
@Export
class AnyValueComparatorWrapper extends UWIssueValueComparatorWrapper {

  construct(comparatorArg : ValueComparator) {
    super(comparatorArg, null)
  }

  override function compare(value : String, referenceValue : String) : boolean {
    return true 
  }

  override function formatAsCondition(formattedValue : String) : String {
    return ""
  }

}
