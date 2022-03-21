package gw.rating.worksheet.export

uses com.guidewire.util.io.CheckedPrintWriter
uses entity.PolicyLine
uses gw.api.system.PCLoggerCategory
uses gw.api.tree.RowTreeRootNode
uses gw.pl.util.FileUtil
uses gw.rating.worksheet.WorksheetUIHelper
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses gw.rating.worksheet.treenode.WorksheetTreeNodeContainer
uses gw.util.StreamUtil

uses java.io.FileOutputStream

/**
 * Base class for exporting worksheets from {@link IWorksheetTreeNode}-s. Uses the visitor pattern for exporting to variuous formats.
 * For each format, we supply as appropriate {@link WorksheetTreeExporterBase.Visitor}.
 */
@Export
class WorksheetTreeExporterBase {
  public static var FORMAT_HTML: String = "html"
  public static var FORMAT_CSV: String  = "csv"

  public static final var COLUMNS: List<String> = {
      "Instruction", "Result", "Operator", "(", "Operand", ")", "Actual Value(s)"
  }

  public static final var WORKSHEETS: String   = "WORKSHEETS"
  public static final var WORKSHEET: String    = "WORKSHEET"
  public static final var CONTINUE: String     = "CONTINUE"
  public static final var CONDITIONAL: String  = "CONDITIONAL"
  public static final var NOTE: String         = "NOTE"
  public static final var ROUTINE: String      = "ROUTINE"
  public static final var SUBROUTINE: String   = "SUBROUTINE"
  public static final var RETURN: String       = "RETURN"
  public static final var ITERATION: String    = "ITERATION"
  public static final var LOOP: String         = "LOOP"
  public static final var ENDLOOP: String      = "ENDLOOP"
  public static final var CONTAINER: String    = "CONTAINER"

  public static final var EMPTY_FILE_HEADER: byte[] = new byte[0]

  static final var _logger = PCLoggerCategory.RATING
  
  final var _policyLine: PolicyLine
  final var _showConditionals: boolean
  final var _format: String
  final var _visitor: Visitor
  
  var _nodeCount = 0
  
  construct(policyLine : PolicyLine, showConditionals : boolean, format : String, visitor : Visitor) {
    _policyLine = policyLine
    _showConditionals = showConditionals
    _format = format
    _visitor = visitor
  }
      
  /**
   * Exports all the worksheet(s) from a quote as XML to a temporary file.
   *
   * @param policyLine the policy line
   * @param showConditionals whether to include conditionals or not
   *
   * @return path to temporary file containing exported XML
   */
  function export(): String {
    var rootNode = WorksheetUIHelper.getWorksheetRootNode(_policyLine, _showConditionals)

    return export(rootNode)
  }

  /**
   * Exports all the worksheet(s) associated with the given tree node as XML to a temporary file.
   *
   * @param rootNode root of the tree
   *
   * @return path to temporary file containing generated XML
   */
  private function export(rootNode: RowTreeRootNode): String {
    var tmpFile = FileUtil.createDeletableTempFile("worksheet", _format)
    var tmpFileName = tmpFile.CanonicalPath

    _logger.info("Exporting worksheet to file '${tmpFileName} as ${_format}' started.")

    using (var fos = new FileOutputStream(tmpFile), var pw = new CheckedPrintWriter(StreamUtil.getOutputStreamWriter(fos))) {
      _nodeCount = 0

      var fileHeader = _visitor.fileHeader()
      if (fileHeader?.length > 0) {
        fos.write(fileHeader)
      }

      pw.print(_visitor.beforeTree(rootNode.Data as IWorksheetTreeNode))

      rootNode.Children.each(\child -> exportSingleWorksheet(child.Data as IWorksheetTreeNode, pw))

      pw.print(_visitor.afterTree(rootNode.Data as IWorksheetTreeNode))

      pw.flush()
    }

    _logger.info("Exporting worksheet to '${tmpFileName}' as ${_format} done. # Nodes = ${_nodeCount}.")

    return tmpFileName
  }

  /**
   * Prints a single worksheet.
   *
   * @param pw CheckedPrintWriter to write the worksheet to
   * @param rootNode root of traversal
   */
  private function exportSingleWorksheet(rootNode: IWorksheetTreeNode, pw: CheckedPrintWriter) {
    pw.print(_visitor.beforeWorksheet(rootNode))
    dfs(rootNode, 0, pw)
    pw.print(_visitor.afterWorksheet(rootNode))
  }

  /**
   * Does a DFS traversal of the worksheet tree starting at the given node.
   *
   * @param node current node of DFS traversal
   * @param depth depth of node in the traversal
   * @param pw CheckedPrintWriter to write contents of node to
   */
  private function dfs(node: IWorksheetTreeNode, depth: int, pw: CheckedPrintWriter) {
    _nodeCount++
    
    pw.print(_visitor.visit(node, depth))
    
    if (node typeis WorksheetTreeNodeContainer) {
      node.Children.each(\child -> dfs(child, depth + 1, pw))
    }
    
    pw.print(_visitor.afterVisit(node, depth))

    pw.flush()
  }

  /**
   * Visitor for DFS traversal.
   */
  interface Visitor {
    // For stuff that cannot be print()-ed, like the UTF-8 BOM.
    function fileHeader(): byte[]

    function beforeTree(root: IWorksheetTreeNode): String

    function beforeWorksheet(worksheetRoot: IWorksheetTreeNode): String

    function visit(node: IWorksheetTreeNode, depth: int): String

    function afterVisit(node: IWorksheetTreeNode, depth: int): String

    function afterWorksheet(worksheetRoot: IWorksheetTreeNode): String

    function afterTree(root: IWorksheetTreeNode): String
  }
}