package gw.web.policy
uses gw.api.locale.DisplayKey
uses java.util.Map
uses java.util.LinkedHashMap
uses java.util.List

@Export
class RiskEvaluationPanelSetModalRowOrganizer extends ModalRowOrganizer<String, RiskEvaluationPanelSetModalRow> {

  static var ALREADY_APPROVED_CODE = "AlreadyApproved"

  static function wrapIssues(issues : UWIssue[]) : RiskEvaluationPanelSetModalRow[] {
    var authProfiles = User.util.CurrentUser.UWAuthorityProfiles

    //This method is only tested indirectly via smoketests, and not under unit test.
    //Reason: permissions and users are not available for unit tests
    var modalRows = issues.map(\ issue ->  new RiskEvaluationPanelSetModalRow() {
        :Item = issue, 
        :CanReopen = perm.System.uwreopen, 
        :CanReject = perm.System.uwreject,
        :UserCanApproveIssue = issue.canBeApprovedBy(authProfiles), 
        :UserCanApproveAllIssues = perm.System.uwapproveall
    })
    return new RiskEvaluationPanelSetModalRowOrganizer(modalRows).createWrappers()
  }
    
  /**
   * Essentially, the keys are UWIssueBlockingPoint codes, except for the special "AlreadyApproved" code.
   */
  var _sectionTitles : Map<String, String> as readonly Titles

  var _canReopen : boolean as CanReopen
  var _canReject : boolean as CanReject
  var _canApproveAll : boolean as CanApproveAll
  var userCanApproveIssue(issue : UWIssue) : boolean as CanApprove
  var _alreadyApprovedTitle : String as AlreadyApprovedTitle
  var sectionTitle(bp : UWIssueBlockingPoint) : String as TitleMaker

  construct(reasons : RiskEvaluationPanelSetModalRow[]) {
    this(reasons, createSectionTitles())
  }

  construct(reasons : RiskEvaluationPanelSetModalRow[], sectionTitlesArg : Map<String, String>) {
    super(sectionTitlesArg.Keys, reasons)
    _sectionTitles = sectionTitlesArg
  }

  override function categoryForItem(item : RiskEvaluationPanelSetModalRow) : String {
    var issue = item.Item
    var result = code(issue.CurrentBlockingPoint)
    if (result == code(TC_NONBLOCKING) and issue.HasApprovalOrRejection) {
      result = ALREADY_APPROVED_CODE
    }
    return result
  }

  override function createTitleRow(category : String) : RiskEvaluationPanelSetModalRow {
    return new RiskEvaluationPanelSetModalRow() {:Title = _sectionTitles[category]}
  }
  
  override function sortRowsWithinCategory(list : List<RiskEvaluationPanelSetModalRow>) : List<RiskEvaluationPanelSetModalRow> {
    return list
        .orderBy( \ x -> x.Item.HasApprovalOrRejection)
        .thenBy( \ x -> x.Item.IssueType.Code)
        .thenBy( \ x -> x.Item.IssueKey)
  }
  
  static function createSectionTitles() : Map<String, String> {  //exposed for testing
    return new LinkedHashMap<String, String>() {
        code(TC_REJECTED) -> DisplayKey.get("Web.Policy.EvaluationIssues.AlreadyRejectedTitle"),
        code(TC_BLOCKSQUOTE) -> DisplayKey.get("Web.Policy.EvaluationIssues.BlockingQuoteTitle"),
        code(TC_BLOCKSRATERELEASE) -> DisplayKey.get("Web.Policy.EvaluationIssues.BlockingRateReleaseTitle"),
        code(TC_BLOCKSQUOTERELEASE) -> DisplayKey.get("Web.Policy.EvaluationIssues.BlockingQuoteReleaseTitle"),
        code(TC_BLOCKSBIND) -> DisplayKey.get("Web.Policy.EvaluationIssues.BlockingBindTitle"),
        code(TC_BLOCKSISSUANCE) -> DisplayKey.get("Web.Policy.EvaluationIssues.BlockingIssuanceTitle"),
        code(TC_NONBLOCKING) -> DisplayKey.get("Web.Policy.EvaluationIssues.InformationTitle"),
        ALREADY_APPROVED_CODE -> DisplayKey.get("Web.Policy.EvaluationIssues.AlreadyApprovedTitle")
    }
  }

  private static function code(bp : UWIssueBlockingPoint) : String {
    return bp.Code
  }


}
