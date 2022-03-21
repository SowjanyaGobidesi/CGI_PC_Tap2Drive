package gw.rating.worksheet.treenode.builder
uses gw.api.locale.DisplayKey
uses java.util.List
uses gw.rating.worksheet.treenode.builder.WorksheetTreeNodeBuilder
uses gw.rating.worksheet.domain.WorksheetRoutine
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses gw.rating.worksheet.treenode.WorksheetTreeNodeContainer

@Export
class WorksheetRoutineTreeNodeBuilder extends WorksheetTreeNodeBuilder<WorksheetRoutine> {
  
  override function build(entry : WorksheetRoutine) : List<IWorksheetTreeNode> {
    var results : List<IWorksheetTreeNode> = {}
    var rbNode = new WorksheetTreeNodeContainer(DisplayKey.get("Web.Policy.RatingWorksheet.Node.RateBookLabel", entry.RateBookCode, entry.RateBookEdition))
    var rrNode = new WorksheetTreeNodeContainer(DisplayKey.get("Web.Policy.RatingWorksheet.Node.RateRoutineLabel", entry.RoutineCode, entry.RoutineVersion)) 
    results.add(rbNode)
    results.add(rrNode)    
    return results
  }
}
