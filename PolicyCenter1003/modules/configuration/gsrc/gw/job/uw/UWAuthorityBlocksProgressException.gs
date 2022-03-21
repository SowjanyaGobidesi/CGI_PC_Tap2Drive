package gw.job.uw

@Export
class UWAuthorityBlocksProgressException extends UWAuthorityBlocksProgressBaseException {
  construct(blockingIssuesArg : UWIssue[]) {
    super(blockingIssuesArg)
  }

  override function toString() : String {
    return BlockingIssues.map(\ i -> "UWIssue: ${i.IssueType.Code} ${i.FormattedValueAsCondition}: ${i}").join("\n")
  }
}
