package gw.billing

uses gw.api.tree.SimpleTreeNode
uses gw.api.tree.TreeNode
uses gw.api.util.MonetaryAmounts
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.BillingPaymentsPreview
uses gw.plugin.billing.PaymentPreviewItem
uses org.apache.commons.lang3.tuple.ImmutablePair
uses org.apache.commons.lang3.tuple.Pair

uses java.util.Date
uses java.util.LinkedHashSet

@Export
class BillingPaymentsPreviewTrees {

  enum ItemType {PREVIEW_ITEM, PREVIEW_ITEM_CHANGED, INVOICES_OTHER_POLICY}

  private construct() {
  }

  /**
   * Checks if there are invoices from other policies to show
   * @param billingPaymentsPreview: wrapper of the different items to show
   * @return if there are invoices from other policies to show
   */
  static function hasInvoicesToShow(billingPaymentsPreview : BillingPaymentsPreview) : boolean {
    return billingPaymentsPreview.PreviewItems.hasMatch(\invoice -> billingPaymentsPreview.InvoicesOtherPolicies?.hasMatch(\item -> item.DueDate == invoice.DueDate))
  }

  /**
   * Create parent tree structure to show the items
   * @param billingPaymentsPreview: wrapper of the different items to show
   * @param showInvoices: indicate if invoices should be showed
   * @param expandCollapseAll: indicate if tree should be expanded/collapsed all
   * @return Tree representation of the items
   */
  static function createBillingPaymentsPreviewTree(billingPaymentsPreview : BillingPaymentsPreview, showInvoices : boolean, expandCollapseAll : boolean) : TreeNode {
    var rootTree = new SimpleTreeNode(new BillingPaymentsPreviewTreeNode(null, null, null, null), false)
    var itemParents = new LinkedHashSet<Pair<Date,Date>>()

    for (item in billingPaymentsPreview.PreviewItems) {
      itemParents.add(new ImmutablePair(item.StatementDate, item.DueDate))
    }

    for (item in billingPaymentsPreview.PreviewItemsChanged) {
      itemParents.add(new ImmutablePair(item.StatementDate, item.DueDate))
    }

    for (parentDates in itemParents) {
      var parent = new BillingPaymentsPreviewTreeNode(parentDates.Left, parentDates.Right, null, null)
      var parentTree = new SimpleTreeNode(parent, expandCollapseAll)
      rootTree.addChild(parentTree)
    }
    addLeaves(billingPaymentsPreview, rootTree, \parentTree, item -> {
      return (parentTree.Data as BillingPaymentsPreviewTreeNode).DueDate == item.DueDate}, showInvoices)

    return rootTree
  }

  /**
   * Populate the sum of all leaves (items) for each parent (due date)
   * @param item: item to be added as a node of the tree
   * @param ItemType: enum for what the item represents
   * @param parentTree: represents the tree to add new nodes
   * @return PaymentPreviewItem
   */
  static private function createTreeNode(item: PaymentPreviewItem, type: ItemType, parentTree: TreeNode) : PaymentPreviewItem {
    var itemTreeNode = new BillingPaymentsPreviewTreeNode(null as Date, null as Date, item.TypeDisplay, item.ChargeCategoryDisplay)

    var zeroValue = MonetaryAmounts.zeroOf(item.Amount.Currency)
    itemTreeNode.InvoiceAmount = zeroValue
    itemTreeNode.Amount = zeroValue
    itemTreeNode.ChangeAmount = zeroValue

    switch(type) {
      case PREVIEW_ITEM:
        itemTreeNode.Amount = item.Amount
        break;

      case PREVIEW_ITEM_CHANGED:
        itemTreeNode.ChangeAmount = item.Amount
        break;

      case INVOICES_OTHER_POLICY:
        itemTreeNode.InvoiceAmount = item.Amount
        break;
    }
    (parentTree as SimpleTreeNode).addChild(new SimpleTreeNode(itemTreeNode, false))

    return item
  }

  /**
   * Populate the sum of all leaves (items) for each parent (due date)
   * @param node: specific node in the tree
   * @param totalInvoiceAmount: total amount of all invoices for a due date
   * @param totalAmount: total amount of all charges for a due date
   * @param totalChangeAmount: total amount of all changes for a due date
   */
  static private function populateHeader(node : TreeNode, totalInvoiceAmount : MonetaryAmount, totalAmount : MonetaryAmount, totalChangeAmount : MonetaryAmount) {
    var billingPaymentsPreviewTreeNode = node.Data as BillingPaymentsPreviewTreeNode
    billingPaymentsPreviewTreeNode.InvoiceAmount = totalInvoiceAmount
    billingPaymentsPreviewTreeNode.Amount = totalAmount
    billingPaymentsPreviewTreeNode.ChangeAmount = totalChangeAmount
  }

  /**
   * Add items (leaves) to the parent node (due dates)
   * @param billingPaymentsPreview: wrapper of the different items to show
   * @param rootTree: root of tree compounds by parent nodes (no leaves)
   * @param checkCondition: block to filter which items (leaves) should be included in the tree
   * @param showInvoices: indicate if invoices from other policies should be included
   */
  static private function addLeaves(billingPaymentsPreview : BillingPaymentsPreview, rootTree : SimpleTreeNode, checkCondition(parentTree : TreeNode, item : PaymentPreviewItem) : boolean, showInvoices : boolean) {
    for (parentTree in rootTree.Children) {
      if (billingPaymentsPreview.PreviewItems.HasElements) {
        var currency = billingPaymentsPreview.PreviewItems.first().Amount.Currency
        var zeroValue = MonetaryAmounts.zeroOf(currency)
        var totalAmount = zeroValue
        var totalInvoiceAmount = zeroValue
        var totalAmountChange = zeroValue

        totalAmount = billingPaymentsPreview.PreviewItems.where(\elt -> checkCondition(parentTree, elt))
                                                         .sum(currency, \item -> createTreeNode(item, ItemType.PREVIEW_ITEM, parentTree).Amount)

        if (billingPaymentsPreview.PreviewItemsChanged.HasElements) {
          totalAmountChange = billingPaymentsPreview.PreviewItemsChanged.where(\elt -> checkCondition(parentTree, elt))
                                                                        .sum(currency, \item -> createTreeNode(item, ItemType.PREVIEW_ITEM_CHANGED, parentTree).Amount)
        }

        if (showInvoices and billingPaymentsPreview.InvoicesOtherPolicies.HasElements) {
          totalInvoiceAmount = billingPaymentsPreview.InvoicesOtherPolicies.where(\elt -> checkCondition(parentTree, elt))
                                                                           .sum(currency, \item -> createTreeNode(item, ItemType.INVOICES_OTHER_POLICY, parentTree).Amount)
        }
        populateHeader(parentTree, totalInvoiceAmount, totalAmount, totalAmountChange)
      }
    }
  }
}