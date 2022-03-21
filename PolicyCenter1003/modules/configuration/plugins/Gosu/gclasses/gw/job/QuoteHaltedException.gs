package gw.job

uses gw.web.productmodel.IProductModelSyncIssueWrapper

/**
 * A marker exception class that is thrown in order to halt a quote due to some sort of error condition
 * such as validation errors, product model sync errors, or blocking UW issues.
 */
@Export
class QuoteHaltedException extends java.lang.RuntimeException {
  
  var _haltedDueToUWIssues : boolean as HaltedDueToUWIssues
  var _productModelSyncIssues : Collection<IProductModelSyncIssueWrapper> as ProductModelSyncIssues

  construct(productIssues : Collection<IProductModelSyncIssueWrapper>) {
    super(productIssues.map(\i -> i.Message).join("; "))
    _productModelSyncIssues = productIssues
    _haltedDueToUWIssues = false
  }
}
