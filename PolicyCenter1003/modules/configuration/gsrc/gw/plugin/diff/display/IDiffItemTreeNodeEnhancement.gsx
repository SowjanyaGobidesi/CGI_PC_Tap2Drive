package gw.plugin.diff.display
uses gw.api.locale.DisplayKey
uses gw.api.domain.account.AccountSyncable

enhancement IDiffItemTreeNodeEnhancement : gw.api.diff.node.IDiffItemTreeNode {
  property get ConflictLabel() : String {
    if (this.DiffItem.Bean typeis AccountSyncable) {
      return DisplayKey.get("Web.Differences.DiffItemTreeNode.ConflictLabel", this.Label, this.Parent.Label)
    }
    return this.Label
  }
}
