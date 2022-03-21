package gw.rating.worksheet

uses entity.PolicyLine
uses gw.api.locale.DisplayKey
uses gw.api.tree.RowTreeRootNode
uses gw.api.tree.TreeNode
uses gw.api.util.NumberUtil
uses gw.api.web.document.DocumentsHelper
uses gw.document.DocumentContentsInfo
uses gw.rating.worksheet.export.WorksheetExporter
uses gw.rating.worksheet.treenode.WorksheetTreeNodeUtil

uses java.io.FileInputStream
uses java.math.BigDecimal
uses java.math.RoundingMode

@Export
class WorksheetUIHelper {
  public static var MAXIMUM_SCALE : int = 8
  public static var ELLIPSES : String = "..."

  static function getWorksheetRootNode(line : PolicyLine, showConditionals: boolean) : RowTreeRootNode {
    if (line.Branch.ValidRate) {
      return line.getWorksheetRootNode(showConditionals)
    } else {
      var diagWorksheets = line.Branch.Lines*.DiagnosticRatingWorksheets.toList()
      return WorksheetTreeNodeUtil.buildRootNodeForDiagWorksheets(diagWorksheets, showConditionals)
    }
  }

  static function canViewWorksheets(policyLine : PolicyLine) : boolean {
    return canViewRegularWorksheet(policyLine) || canViewDiagnosticWorksheet(policyLine)
  }

  static function canViewRegularWorksheet(policyLine : PolicyLine) : boolean {
    return isAuthorized() && policyLine.Branch.HasWorksheets == AVAILABLE
  }

  static function canViewDiagnosticWorksheet(policyLine : PolicyLine) : boolean {
    return isAuthorized() && policyLine.DiagnosticRatingWorksheets.HasElements
  }

  static function isAuthorized() : boolean {
    return perm.System.ratingworksheetview
  }

  /**
   * Determine the correct message when referring to a partial worksheet containing error information.  Have to check
   * that the user has permission to look at it.
   * @return the correct message to show to the user.
   */
  static function determinePartialWorksheetReferenceMessage() : String {
    if (isAuthorized()) {
      return DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.InvalidQuote.ReferToPartialWorksheet");
    } else {
      /*
       * If the user does not have permission to see the partial worksheet, tell them that the information is there but
       * they need to contact their administrator.
       */
      return DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.InvalidQuote.ReferToPartialWorksheetNotVisible");
    }
  }

  static function format(obj : Object) : String {
    if (obj typeis BigDecimal or obj typeis Double or obj typeis Float) {
      return formatBigDecimal(obj as BigDecimal)
    }
    if (obj typeis java.lang.Number) {
      return NumberUtil.render(obj)
    }
    return obj as String
  }

  static function formatBigDecimal(bd : BigDecimal) : String{
    if (bd.scale() > MAXIMUM_SCALE)  {
      var bigDecimalFormatted = NumberUtil.renderForInput(bd.setScale(MAXIMUM_SCALE, RoundingMode.DOWN), false)
      return bigDecimalFormatted + ELLIPSES
    }
    else if (bd.scale() < 0) {
      return NumberUtil.renderForInput(bd.setScale(0, RoundingMode.HALF_UP), false)
    } else {
      return NumberUtil.renderForInput(bd, false)
    }
  }

  static function download(policyLine: PolicyLine, showConditionals: boolean, format: String) {
    using (var inputStream = new FileInputStream(WorksheetExporter.export(policyLine, showConditionals, format))) {
      var dci = new DocumentContentsInfo(DocumentContentsInfo.ContentResponseType.DOCUMENT_CONTENTS, inputStream,
          WorksheetExporter.FORMAT_TO_MIME_TYPE.get(format))

      var filename = WorksheetExporter.getFilenameForDownload(policyLine, showConditionals, format)

      DocumentsHelper.renderDocumentContentsWithDownloadDisposition(filename, dci)
    }
  }

  static function getTreeSize(rootNode: TreeNode): int {
    return 1 + rootNode.Children?.map(\child -> getTreeSize(child)).sum()
  }
}
