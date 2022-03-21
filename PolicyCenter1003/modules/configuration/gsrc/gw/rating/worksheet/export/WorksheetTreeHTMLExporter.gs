package gw.rating.worksheet.export

uses com.google.common.collect.ImmutableList
uses com.google.gdata.util.common.base.StringUtil
uses entity.PolicyLine
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses gw.rating.worksheet.treenode.WorksheetTreeNodeContainer
uses gw.rating.worksheet.treenode.WorksheetTreeNodeLeaf

@Export
class WorksheetTreeHTMLExporter implements WorksheetTreeExporterBase.Visitor {
  static final var NUM_INSTRUCTION_DIVISIONS      = 20  // Allows up to 20 levels - may be more than required
  static final var INSTRUCTION_DIVISION_WIDTH     = 30  // Width in pixels of a single division
  static final var NUM_INSTRUCTION_DIVISIONS_STR  = Integer.toString(NUM_INSTRUCTION_DIVISIONS)
  static final var INSTRUCTION_DIVISION_WIDTH_STR = Integer.toString(INSTRUCTION_DIVISION_WIDTH)

  static final var INSTRUCTION_WIDTH = NUM_INSTRUCTION_DIVISIONS * INSTRUCTION_DIVISION_WIDTH
  static final var RESULT_WIDTH      = 250
  static final var OP_WIDTH          = 75
  static final var LEFT_PAREN_WIDTH  = 50
  static final var OPERAND_WIDTH     = 300
  static final var RIGHT_PAREN_WIDTH = 50
  static final var VALUE_WIDTH       = 250

  static final var COLUMN_WIDTHS: List<Integer> = ImmutableList.of(
      INSTRUCTION_WIDTH, RESULT_WIDTH, OP_WIDTH, LEFT_PAREN_WIDTH, OPERAND_WIDTH, RIGHT_PAREN_WIDTH, VALUE_WIDTH
  )

  static final var COLUMN_WIDTH_STRINGS = ImmutableList.copyOf(COLUMN_WIDTHS.map(\width -> Integer.toString(width)))

  static final var TOTAL_WIDTH = COLUMN_WIDTHS.toTypedArray().sum()

  /**
   * Prints all the worksheet(s) from a quote as HTML to a temporary file.
   *
   * @param policyLine the policy line
   *
   * @return path to temporary file containing the generated HTML
   */
  function export(policyLine: PolicyLine, showConditionals: boolean): String {
    return new WorksheetTreeExporterBase(policyLine, showConditionals, WorksheetTreeExporterBase.FORMAT_HTML, this).export()
  }

  override function fileHeader() : byte[] {
    return WorksheetTreeExporterBase.EMPTY_FILE_HEADER
  }

  override function beforeTree(root : IWorksheetTreeNode) : String {
    var headerBuilder = new StringBuilder("<HTML>\n")

    headerBuilder.append("<HEAD>\n")
    headerBuilder.append("<style>html*\n{\nfont-family: 'Open Sans', helvetica, sans-serif\n}\n</style>\n")
    headerBuilder.append("<meta charset=\"utf-8\"/>\n")
    headerBuilder.append("</HEAD>\n")
    headerBuilder.append("<BODY>\n")

    return headerBuilder.toString()
  }

  override function beforeWorksheet(worksheetRoot : IWorksheetTreeNode) : String {
    return printWorksheetProlog()
  }

  override function visit(node : IWorksheetTreeNode, depth : int) : String {
    switch (typeof node) {
      case WorksheetTreeNodeContainer:
        return printContainerNode(node, depth)
      case WorksheetTreeNodeLeaf:
        return printLeafNode(node, depth)
    }

    return ""
  }

  override function afterVisit(node : IWorksheetTreeNode, depth : int) : String {
    return ""
  }

  override function afterWorksheet(worksheetRoot : IWorksheetTreeNode) : String {
    return printWorksheetEpilog()
  }

  override function afterTree(root : IWorksheetTreeNode) : String {
    return "</BODY>\n</HTML>"
  }

  /**
   * Prints a container - non-leaf - node.
   *
   * @param node node to be printed
   * @param depth depth of node in DFS traversal
   */
  private function printContainerNode(node: WorksheetTreeNodeContainer, depth: int): String {
    if (node.Description.startsWith(WorksheetTreeExporterBase.ENDLOOP)) {
      return ""
    } else {
      return "<tr>" + printInstructionColumn("&#x25BC;&nbsp;" + StringUtil.htmlEscape(node.Description), depth) + "</tr>\n"
    }
  }

  /**
   * Prints a a leaf - non-Container - node.
   *
   * @param node node to print
   * @param depth depth of node in DFS traversal
   */
  private function printLeafNode(node: WorksheetTreeNodeLeaf, depth: int): String {
    return
        "<tr>\n" +
        printInstructionColumn(node.Instruction, depth) +
        printColumn(node.Result?.toString()) +
        printColumn(node.Operator) +
        printColumn(node.LeftParenthesesGroup) +
        printColumn(node.Operand) +
        printColumn(node.RightParenthesesGroup) +
        printColumn(node.OperandValue?.toString()) +
        "</tr>\n"
  }

  /**
   * Prints the Instruction column with indentation appropriate to the specified depth.
   *
   * @param instruction Instruction column contents to be printed; assume <b>is</b> HTML escaped
   * @param depth depth of node in DFS traversal
   */
  private function printInstructionColumn(instruction: String, depth: int): String {
    var span: String
    var outputBuilder = new StringBuilder()
    if (depth == 0) {
      span = NUM_INSTRUCTION_DIVISIONS_STR
    } else {
      var skip = Math.min(NUM_INSTRUCTION_DIVISIONS - 1, depth) as int
      span = Integer.toString(NUM_INSTRUCTION_DIVISIONS - skip)
      outputBuilder.append("\t<td colspan=\""+ Integer.toString(skip) + "\">&nbsp;</td>\n")
    }
    if (instruction == null) {
      outputBuilder.append("\t<td colspan=\"" + span + "\">&nbsp;</td>\n")
    } else {
      outputBuilder.append("\t<td colspan=\"" + span + "\" style=\"word-wrap: break-word\">${instruction}</td>\n")
    }

    return outputBuilder.toString()
  }

  /**
   * For printing non-Instruction columns. No indentation.
   * @param value column data; assume <b>not</b> HTML escaped
   */
  private function printColumn(value: String): String {
    if (value?.HasContent) {
      value = StringUtil.htmlEscape(value)
      return "\t<td align=\"left\" style=\"word-wrap: break-word\">${value}</td>\n"
    } else {
      return "\t<td align=\"left\">&nbsp;</td>\n"
    }
  }

  /**
   * Prints the table header with appropriate word-wrap and other style elements for each column as appropriate.
   */
  private function printWorksheetProlog(): String {
    var prologBuilder = new StringBuilder()

    prologBuilder.append("<TABLE style=\"table-layout: fixed; width: " + Integer.toString(TOTAL_WIDTH) + "px\">\n")

    // Instruction column: to allow for indentation split it into NUM_INSTRUCTION_DIVISIONS columns
    prologBuilder.append("<!-- INSTRUCTION -->\n")
    (1..NUM_INSTRUCTION_DIVISIONS).each(\i ->
        prologBuilder.append("<col style=\"width: " + INSTRUCTION_DIVISION_WIDTH_STR + "px\">\n"))
    prologBuilder.append("<!-- INSTRUCTION -->")
    prologBuilder.append("\n")

    // The rest of the columns
    COLUMN_WIDTH_STRINGS.subList(1, COLUMN_WIDTH_STRINGS.size()).each(\ columnWidthString ->
        prologBuilder.append("<col style=\"width: ${columnWidthString}px\">\n"))
    prologBuilder.append("\n")

    // Header row with column titles
    prologBuilder.append("<thead>\n").append("\t<tr>\n")
    prologBuilder.append("\t\t<th colspan=\"").append(NUM_INSTRUCTION_DIVISIONS_STR).append("\" align=\"left\">")
        .append(WorksheetTreeExporterBase.COLUMNS[0]).append("</th>\n")
    WorksheetTreeExporterBase.COLUMNS.subList(1, WorksheetTreeExporterBase.COLUMNS.size()).each(\column ->
        prologBuilder.append("\t\t<th align=\"left\">${column}</th>\n"))
    prologBuilder.append("\t</tr>\n").append("</thead>\n")

    prologBuilder.append("<tbody>\n")

    return prologBuilder.toString()
  }

  private function printWorksheetEpilog(): String {
    return "</tbody>\n</TABLE>\n"
  }
}