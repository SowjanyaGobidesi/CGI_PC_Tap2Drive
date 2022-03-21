package gw.rating.worksheet.treenode.builder

uses gw.rating.worksheet.domain.WorksheetIteration
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses gw.rating.worksheet.treenode.WorksheetTreeNodeLeaf

@Export
class WorksheetIterationTreeNodeBuilder extends WorksheetTreeNodeBuilder<WorksheetIteration> {
  override function build(iteration : WorksheetIteration) : List<IWorksheetTreeNode> {
    // We will be collected by the loop that contains us.
    return Collections.emptyList()
  }

  static function create(iteration : WorksheetIteration) : IWorksheetTreeNode {
    var iterableName = iteration.IterableName.replaceAll("\\?\\.", ".")
    var loopvarName = iteration.ElementName
    var iterationNode = new WorksheetTreeNodeLeaf() {
      :Instruction = "ITERATION ${loopvarName} \u2190 ${iterableName}[${iteration.LoopIndexVariableValue}]"
    }

    return iterationNode
  }
}