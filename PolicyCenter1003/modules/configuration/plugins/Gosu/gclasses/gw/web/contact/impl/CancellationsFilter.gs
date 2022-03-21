package gw.web.contact.impl

uses gw.api.database.IQuery
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.web.filter.NewQueryBasedQueryFilter

/**
 * Defines filters for cancelled policy metrics.
 *
 * The policy metrics for cancellations are:
 *    1) Cancellations by the customer (Source = Insured)
 *    2) Cancellations by the carrier for Non-Payment
 *    3) Cancellations by the carrier for other reasons,
 *        i.e., anything other than Non-Payment, Policy rewritten (mid-term),
 *        or Policy rewriten or replaced (flat cancel).
 */
@Export
public class CancellationsFilter extends NewQueryBasedQueryFilter<Cancellation> {
  var _cancelSource : CancellationSource
  var _ignoredReasons : ReasonCode[]

  /**
   * Private constructor to disable creating instances besides the static methods.
   */
  private construct() {}

  /**
   * List of Carrier Cancellation Reasons to be ignored when filtering for
   * "other cancellation reasons".
   */
  static final var IgnoredCancellationReasons =
      new ReasonCode[] {TC_NONPAYMENT, TC_FLATREWRITE, TC_MIDTERMREWRITE}

  static function cancellationsByCustomer(): CancellationsFilter {
    var filter = new CancellationsFilter()

    filter._cancelSource = TC_INSURED
    filter._ignoredReasons = null

    return filter
  }

  static function cancellationsForNonPayment(): CancellationsFilter {
    var filter = new CancellationsFilter()

    filter._cancelSource = TC_CARRIER
    filter._ignoredReasons = null

    return filter
  }

  static function otherCancellations(): CancellationsFilter {
    var filter = new CancellationsFilter()

    filter._cancelSource = TC_CARRIER
    filter._ignoredReasons = IgnoredCancellationReasons

    return filter
  }

  /**
   * Filter and count the number of cancellations matching the filter
   *    in the cancellations result.
   */
  static function countCancellationsBy(cancellations : IQueryBeanResult<Cancellation>,
                                       filter : CancellationsFilter): int {
    cancellations.clearFilters()
    cancellations.addFilter(filter)

    return cancellations.Count
  }

  override function applyTypedFilter(cancellation : Cancellation) : boolean {
    return ( cancellation.Source == _cancelSource )
        and ( _cancelSource == TC_INSURED )
            /* Carrier... */
        or ( ( ( _ignoredReasons == null )
        and ( cancellation.CancelReasonCode == TC_NONPAYMENT ) )
        or not _ignoredReasons.contains(cancellation.CancelReasonCode) )
  }

  override function filterNewQuery(cancellations : IQuery<Cancellation>) : IQuery<Cancellation> {
    var query = cancellations as Query<Cancellation>

    query.compare(Cancellation#Source, Equals, _cancelSource)
    if ( _cancelSource == TC_CARRIER ) {
      if ( _ignoredReasons == null ) {
        query.compare(Cancellation#CancelReasonCode, Equals, typekey.ReasonCode.TC_NONPAYMENT)
      } else {
        query.compareNotIn(Cancellation#CancelReasonCode, _ignoredReasons)
      }
    }
    return query
  }
}
