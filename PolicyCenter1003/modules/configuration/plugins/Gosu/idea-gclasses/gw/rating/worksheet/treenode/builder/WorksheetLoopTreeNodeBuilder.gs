package gw.rating.worksheet.treenode.builder

uses com.google.gdata.util.common.base.StringUtil
uses gw.rating.flow.domain.ParseUtil
uses gw.rating.worksheet.domain.WorksheetIteration
uses gw.rating.worksheet.domain.WorksheetLoop
uses gw.rating.worksheet.treenode.IWorksheetTreeNode
uses gw.rating.worksheet.treenode.WorksheetTreeNodeContainer
uses gw.rating.worksheet.treenode.WorksheetTreeNodeUtil

@Export
class WorksheetLoopTreeNodeBuilder extends WorksheetTreeNodeBuilder<WorksheetLoop> {
  var _showConditionals : boolean

  construct() {
    this(false)
  }

  construct(showConditionals: boolean) {
    _showConditionals = showConditionals
  }

  override function build(loop : WorksheetLoop) : List<IWorksheetTreeNode> {
    if (loop.IterableSize == 0) {
      // Iterable was empty or null. Suppress this loop.
      return Collections.emptyList()
    }

    var description = getDescriptionFromWorksheetLoop(loop)

    var loopNode = new WorksheetTreeNodeContainer(description)

    var nodeList = new ArrayList<IWorksheetTreeNode>()
    loop.WorksheetEntries.each(\entry -> {
      if (entry typeis WorksheetIteration) {
        nodeList.add(WorksheetIterationTreeNodeBuilder.create(entry))
      } else {
        nodeList.addAll(WorksheetTreeNodeUtil.getWorksheetTreeNodeBuilder(entry, _showConditionals).build(entry))
      }
    })

    loopNode.Children.addAll(nodeList)

    return {loopNode}
  }

  private static function getDescriptionFromWorksheetLoop(loop: WorksheetLoop): String {
    var iterableName = loop.IterableName.replaceAll("\\?\\.", ".")
    var loopvarName = loop.LoopVariableName.replaceAll("\\?\\.", ".")
    var iterableSize = Integer.toString(loop.IterableSize)
    return "${loop.WorksheetClass.toUpperCase()} for ${iterableName}, each named as '${loopvarName}' (Total: ${iterableSize})"
  }

  /**
   * To avoid parsing the description in multiple places. The returned {@link WorksheetLoop} instance may not have all its
   * fields set - only those available in the description can be set.
   *
   * @param description a string returned by {@link WorksheetTreeNodeContainer#getDescription()} for a LOOP node
   *
   * @return an {@link WorksheetLoop} instance with those fields available in description filled in
   */
  static function getWorksheetLoopFromNodeDescription(description : String): WorksheetLoop {
    // description = "${loop.WorksheetClass.toUpperCase()} for ${iterableName}, each named as '${loopvarName}' (Total: ${iterableSize})"
    var indexStart = description.indexOf("for ") + 4
    var indexEnd = description.indexOf(", each ")
    var iterableName = StringUtil.xmlEscape(description.substring(indexStart, indexEnd))

    indexStart = description.indexOf("named as '") + 10
    indexEnd = description.indexOf("' ")
    var loopvarName = StringUtil.xmlEscape(description.substring(indexStart, indexEnd))

    indexStart = description.indexOf("Total: ") + 7
    indexEnd = description.lastIndexOf(")")
    var iterableSize = Integer.valueOf(description.substring(indexStart, indexEnd))

    return new WorksheetLoop() {:IterableName = iterableName, :LoopVariableName = loopvarName, :IterableSize = iterableSize}
  }
}