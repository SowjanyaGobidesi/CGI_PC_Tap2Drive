package gw.job.uw

uses java.util.List
uses typekey.UWIssueBlockingPoint
uses entity.UWIssue

/**
 * Logic for UWApprovalLV
 */
@Export
class UWApprovalLVAsst {

  var _issue : UWIssue as readonly Issue
  var _bpValueRange : List<UWIssueBlockingPoint> 
  
  construct (issueArg : UWIssue) {
    _issue = issueArg
    _bpValueRange = _issue.ValidApprovalBlockingPoints  //must be computed early
  }

  function validate(refVal : String) : String {
    var wrapper = UWIssueValueComparatorWrapper.wrap(Issue.IssueType.Comparator)
    return wrapper.ValueType.validate(refVal)
  }
  
  property get BlockingPointValueRange() :  List<UWIssueBlockingPoint> {
    return (_issue.Branch != null and  _issue.Branch.Job.Subtype != TC_SUBMISSION)? _bpValueRange.where( \ip -> ip.DisplayAsThroughValue != "Bind") : _bpValueRange
  }

}
