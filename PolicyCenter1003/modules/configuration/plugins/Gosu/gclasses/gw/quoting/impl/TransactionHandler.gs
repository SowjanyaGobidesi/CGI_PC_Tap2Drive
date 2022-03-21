package gw.quoting.impl

uses gw.api.locale.DisplayKey
uses gw.api.quoting.QuoteDataManagerException
uses gw.beantransfer.BeanExportHandler
uses gw.beantransfer.BeanImportHandler

/**
 * Handler for Transaction beans.
 *
 * This handler does not export Transaction beans. During importing, it recreates them based on the Costs.
 */
@Export
class TransactionHandler implements BeanExportHandler, BeanImportHandler {

  override function handleBeanExport(bean: KeyableBean): KeyableBean {
    if (bean typeis Transaction) {
      // Don't export Transaction entities. Since we always deal with Submissions only, we can always recreate them
      // without losing any information.
      return null
    }
    return bean
  }

  override function handlePostImport(info : Set<RootInfo>) {
    var period = extractUniqueImportedBeanFromRootBundle(PolicyPeriod,info)
    // Recreate the Transactions for the PolicyPeriod since they were not exported.
    period.calculateTransactions()
  }
}