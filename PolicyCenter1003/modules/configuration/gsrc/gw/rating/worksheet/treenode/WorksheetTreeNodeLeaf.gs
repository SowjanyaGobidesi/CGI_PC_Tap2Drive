package gw.rating.worksheet.treenode

@Export
/**
 * A leaf in a worksheet tree
 */
class WorksheetTreeNodeLeaf implements IWorksheetTreeNode {
  
  var _instruction : String as Instruction
  var _result : Object as Result
  var _op : String as Operator
  var _operand : String as Operand
  var _operandValue : Object as OperandValue
  var _leftParens : int as LeftParentheses
  var _rightParens : int as RightParentheses

  construct() {
  }

  construct(instruction: String, result: String, operator: String, operand: String, operandValue: Object,
            leftParens: int, rightParens: int) {
    _instruction = instruction
    _result = result
    _op = operator
    _operand = operand
    _operandValue = operandValue
    _leftParens = leftParens
    _rightParens = rightParens
  }

  property get LeftParenthesesGroup() : String {
    return "(".repeat(LeftParentheses)
  }

  property get RightParenthesesGroup() : String {
    return ")".repeat(RightParentheses)
  }

}
