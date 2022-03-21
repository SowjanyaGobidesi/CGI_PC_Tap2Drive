package gw.rating.worksheet.treenode.builder
uses gw.rating.worksheet.domain.WorksheetFunctionReturn
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses java.util.List

@Export
class WorksheetFunctionReturnTreeNodeBuilder extends WorksheetTreeNodeBuilder<WorksheetFunctionReturn> {

  override function build(entry : WorksheetFunctionReturn) : List<IWorksheetTreeNode> {
    return {}
  }

}
