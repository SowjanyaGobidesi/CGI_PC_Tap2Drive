package gw.rating.worksheet.treenode.builder

uses gw.rating.worksheet.domain.WorksheetConditional
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses gw.rating.worksheet.treenode.WorksheetTreeNodeContainer
uses gw.rating.worksheet.treenode.WorksheetTreeNodeLeaf
uses gw.rating.worksheet.treenode.WorksheetTreeNodeUtil

@Export
class WorksheetConditionalTreeNodeBuilder extends WorksheetTreeNodeBuilder<WorksheetConditional> {
  var _showConditionals : boolean

  construct() {
    this(false)
  }

  construct(showConditionals: boolean) {
    _showConditionals = showConditionals
  }

  override function build(entry : WorksheetConditional) : List<IWorksheetTreeNode> {
    // skip if we are not displaying conditionals
    if (not _showConditionals) {
      if (WorksheetConditional.ConditionalType.AllValues.contains(entry.Type)) {
        return {}
      }
    }

    if (entry.Type.NodeName.toUpperCase() == "ENDIF") {
      // Swallow ENDIF-s.
      return {}
    }

    var node = new WorksheetTreeNodeLeaf() {
      :Instruction = entry.Type.NodeName.toUpperCase(),
      :Result = entry.Result
    }

    if (entry.Type == EndIfCondition) {
      (node as WorksheetTreeNodeLeaf).Result = null
    }

    // all operands of a conditional will be displayed on the same row of the Operand column
    var operandBuilder = new StringBuilder()
    var valueBuilder = new StringBuilder()
    for (operand in entry.WorksheetOperands index i) {
      if (operand.Operator != null and i > 0) {
        operandBuilder.append(" ${getOperatorForDisplay(operand.Operator)} ")
        valueBuilder.append(" ${getOperatorForDisplay(operand.Operator)} ")
      }
      WorksheetPopulatorUtil.populate(operand, operandBuilder, valueBuilder, false)
    }
    node.OperandValue = valueBuilder.toString()
    node.Operand = operandBuilder.toString()

    var children = new ArrayList<IWorksheetTreeNode>()
    entry.WorksheetEntries?.each(\ subEntry ->
        children.addAll(WorksheetTreeNodeUtil.getWorksheetTreeNodeBuilder(subEntry, _showConditionals).build(subEntry)))

    var retNode = new WorksheetTreeNodeContainer(getDescriptionFromConditionalLeafNode(node))
    retNode.Children.addAll(children)

    return {retNode}
  }

  private function getDescriptionFromConditionalLeafNode(node: WorksheetTreeNodeLeaf): String {
    var descriptionBuilder = new StringBuilder("${node.Instruction} ")

    if (node.LeftParenthesesGroup?.HasContent) {
      descriptionBuilder.append(node.LeftParenthesesGroup)
    }

    if (node.Operand?.HasContent) {
      descriptionBuilder.append(node.Operand.replaceAll("\\?\\.", "."))
    }

    if (node.RightParenthesesGroup?.HasContent) {
      descriptionBuilder.append(node.RightParenthesesGroup)
    }

    var value = node.OperandValue?.toString()
    if (value?.HasContent) {
      descriptionBuilder.append(" (${value})")
    }

    if (node.Result?.toString()?.HasContent) {
      descriptionBuilder.append(" [").append(node.Result.toString().toUpperCase()).append("]")
    }

    return descriptionBuilder.toString()
  }
}
