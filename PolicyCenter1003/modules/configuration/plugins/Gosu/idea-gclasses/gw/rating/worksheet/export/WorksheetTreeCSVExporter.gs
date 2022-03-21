package gw.rating.worksheet.export

uses entity.PolicyLine
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses gw.rating.worksheet.treenode.WorksheetTreeNodeContainer
uses gw.rating.worksheet.treenode.WorksheetTreeNodeLeaf
uses gw.rating.worksheet.treenode.builder.WorksheetLoopTreeNodeBuilder

@Export
class WorksheetTreeCSVExporter implements WorksheetTreeExporterBase.Visitor {
  static final var NUM_INSTRUCTION_DIVISIONS = 10  // Allows up to 10 levels

  static final var NUM_COLUMNS = WorksheetTreeExporterBase.COLUMNS.size()

  public static final var BYTE_ORDER_MARK: byte[] = {0xEF as byte, 0xBB as byte, 0xBF as byte}

  /**
   * Exports all the worksheet(s) from a quote as CSV to a temporary file.
   *
   * @param policyLine the policy line
   * @param showConditionals whether to include conditionals or not
   *
   * @return path to temporary file containing exported XML
   */
  public function export(policyLine: PolicyLine, showConditionals: boolean): String {
    return new WorksheetTreeExporterBase(policyLine, showConditionals, WorksheetTreeExporterBase.FORMAT_CSV, this).export()
  }

  override function fileHeader() : byte[] {
    return BYTE_ORDER_MARK
  }

  override function beforeTree(root : IWorksheetTreeNode) : String {
    return printLine(WorksheetTreeExporterBase.COLUMNS[0], WorksheetTreeExporterBase.COLUMNS[1], WorksheetTreeExporterBase.COLUMNS[2],
        WorksheetTreeExporterBase.COLUMNS[3], WorksheetTreeExporterBase.COLUMNS[4], WorksheetTreeExporterBase.COLUMNS[5],
        WorksheetTreeExporterBase.COLUMNS[6], 0)
  }

  override function beforeWorksheet(worksheetRoot : IWorksheetTreeNode) : String {
    return ""
  }

  override function visit(node : IWorksheetTreeNode, depth : int) : String {
    switch (typeof node) {
      case WorksheetTreeNodeContainer:
        if (node.Description.startsWith(WorksheetTreeExporterBase.LOOP)) {
          return printLoopNode(node.Description, depth)
        } else if (not node.Description.startsWith(WorksheetTreeExporterBase.ENDLOOP)) {
          return  printInstructionOnlyLine(node.Description, depth)
        }
        break
      case WorksheetTreeNodeLeaf:
        return printLeafNode(node as WorksheetTreeNodeLeaf, depth)
    }

    return ""
  }

  override function afterVisit(node : IWorksheetTreeNode, depth : int) : String {
    return ""
  }

  override function afterWorksheet(worksheetRoot : IWorksheetTreeNode) : String {
    return ""
  }

  override function afterTree(root : IWorksheetTreeNode) : String {
    return ""
  }

  /**
   * Prints a leaf - non-Container - node.
   *
   * @param node node to print
   * @param depth depth of node in DFS traversal
   * @param pw PrintWriter
   */
  private function printLeafNode(node: WorksheetTreeNodeLeaf, depth: int): String {
    var instruction = node.Instruction
    if (not node.Instruction?.HasContent) {
      // This node continues the previous one.
      instruction = WorksheetTreeExporterBase.CONTINUE
      depth++
    } else if (node.Instruction == WorksheetTreeExporterBase.ITERATION) {
      return printIterationNode(node, depth)
    }

    return printLine(instruction, node.Result?.toString(), node.Operator, node.LeftParenthesesGroup, node.Operand,
        node.RightParenthesesGroup, node.OperandValue?.toString(), depth)
  }

  private function printInstructionOnlyLine(instruction: String, depth: int): String {
    return printInstruction(instruction, depth) + printBlankRest()
  }

  private function printLoopNode(description: String, depth: int): String {
    var loop = WorksheetLoopTreeNodeBuilder.getWorksheetLoopFromNodeDescription(description)

    return printLine(WorksheetTreeExporterBase.LOOP, loop.IterableName, Integer.toString(loop.IterableSize), null, loop.LoopVariableName, null, null, depth)
  }

  private function printIterationNode(node: WorksheetTreeNodeLeaf, depth: int): String {
    return printLine(WorksheetTreeExporterBase.ITERATION, node.Result?.toString(), "\u2190", null, node.Operand, null, null, depth)
  }

  private function printInstruction(instruction: String, depth: int):String {
    // Move everything left 2 columns
    depth = depth - 2
    depth = Math.max(0, Math.min(NUM_INSTRUCTION_DIVISIONS - 1, depth))

    return ", ".repeat(depth) + csvEscape(instruction) + ", ".repeat(NUM_INSTRUCTION_DIVISIONS - 1 - depth)
  }

  private function printBlankRest(): String {
    return ", ".repeat(NUM_COLUMNS - 1) + "\n"
  }

  private function printLine(instruction: String, result: String, op: String, leftParens: String, operand: String,
                             rightParens: String, actualValue: String, depth: int): String {
    var csvBuilder = new StringBuilder(printInstruction(instruction, depth))

    csvBuilder.append(", ").append(csvEscape(result ?: ""))

    csvBuilder.append(", ").append(csvEscape(op ?: ""))

    csvBuilder.append(", ").append(csvEscape(leftParens ?: ""))

    csvBuilder.append(", ").append(csvEscape(operand ?: ""))

    csvBuilder.append(", ").append(csvEscape(rightParens ?: ""))

    csvBuilder.append(", ").append(csvEscape(actualValue ?: ""))

    csvBuilder.append("\n")

    return csvBuilder.toString()
  }

  private function csvEscape(input: String): String {
    if (not input?.HasContent or not (input.contains("\"") or input.contains(","))) {
      return input
    }

    return "\"" + input.replaceAll("\"", "\"\"") + "\""
  }
}