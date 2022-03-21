package gw.api.domain.financials

uses gw.entity.IEntityType
uses gw.api.database.Query
uses gw.api.database.ISelectQueryBuilder
uses java.util.Date
uses java.util.List

@Export
internal class TransactionFinderImpl implements TransactionFinder {
  interface QueryProvider {
    function query(currentPeriod : PolicyPeriod, transactionType : IEntityType) : ISelectQueryBuilder
  }

  interface Transformer<F, T> {
    function transform(param : F) : T
  }

  private final var POSTED_NON_AUDIT_TRANSACTIONS : QueryProvider = \ currentPeriod, transactionType -> {
    var periodQuery = sameTermPeriodQuery(currentPeriod).compare(PolicyPeriod#Status, Equals, PolicyPeriodStatus.TC_BOUND)
    return transactionQuery(periodQuery, transactionType)
  }

  private final var POSTED_TRANSACTIONS : QueryProvider = \ currentPeriod, transactionType -> {
    return postedTransactionQuery(currentPeriod, transactionType)
  }

  private final var PREVIOUSLY_POSTED_TRANSACTIONS : QueryProvider = \ currentPeriod, transactionType -> {
    var transactionQuery = postedTransactionQuery(currentPeriod, transactionType)
    if (currentPeriod.Job.CloseDate != null) {
      transactionQuery.compare(Transaction#PostedDate, LessThan, currentPeriod.Job.CloseDate)
    }
    return transactionQuery
  }

  override function findPostedNonAuditTransactions(currentPeriod : PolicyPeriod) : List<Transaction> {
    return transactions(currentPeriod, POSTED_NON_AUDIT_TRANSACTIONS)
  }

  override function findPostedPremiumReportTransactions(currentPeriod : PolicyPeriod, start : Date, end : Date) : List<Transaction> {
    return transactions(currentPeriod, new PostedPremiumReportTransactionQueryProvider(start, end))
  }

  override function findPostedTransactions(currentPeriod : PolicyPeriod) : List<Transaction> {
    return transactions(currentPeriod, POSTED_TRANSACTIONS)
  }

  override function findPreviouslyPostedTransactions(currentPeriod : PolicyPeriod) : List<Transaction> {
    return transactions(currentPeriod, PREVIOUSLY_POSTED_TRANSACTIONS)
  }

  private function postedTransactionQuery(currentPeriod : PolicyPeriod, transactionType : IEntityType) : ISelectQueryBuilder {
    return transactionQuery(sameTermPeriodQuery(currentPeriod), transactionType).compare(Transaction#PostedDate, NotEquals, null)
  }

  private function sameTermPeriodQuery(currentPeriod : PolicyPeriod) : ISelectQueryBuilder<PolicyPeriod> {
    return Query.make(PolicyPeriod).compare(PolicyPeriod#Period, Equals, currentPeriod.PeriodId)
  }

  private function transactionQuery(periodQuery : ISelectQueryBuilder<PolicyPeriod>, transactionType : IEntityType) : ISelectQueryBuilder {
    var transactionQuery = Query.make(transactionType as Type<KeyableBean>)
    transactionQuery.subselect("BranchValue", CompareIn, periodQuery, "ID")
    return transactionQuery
  }

  private function transactions(currentPeriod : PolicyPeriod, provider : QueryProvider) : List<Transaction> {
    return flatResults(currentPeriod, new TransactionTransformer(currentPeriod, provider))
  }

  private function flatResults<T>(currentPeriod : PolicyPeriod, transformer : Transformer<IEntityType, List<T>>) : List<T> {
    return currentPeriod.TransactionTypes.flatMap(\ tt -> transformer.transform(tt))
  }

  class PostedPremiumReportTransactionQueryProvider implements QueryProvider {
    private var _start : Date
    private var _end : Date

    construct(start : Date, end : Date) {
      _start = start
      _end = end
    }

    override function query(currentPeriod : PolicyPeriod, transactionType : IEntityType) : ISelectQueryBuilder {
      var periodQuery = completedPeriodQuery(currentPeriod)
      periodQuery.subselect(PolicyPeriod#Job, CompareIn, Job#ID).cast(Audit)
        .subselect(Audit#AuditInformation, CompareIn, AuditInformation#ID)
        .compare(AuditInformation#AuditScheduleType, Equals, AuditScheduleType.TC_PREMIUMREPORT)
        .compare(AuditInformation#AuditPeriodStartDate, GreaterThanOrEquals, _start)
        .compare(AuditInformation#AuditPeriodEndDate, LessThanOrEquals, _end)
      return transactionQuery(periodQuery, transactionType)
    }

    private function completedPeriodQuery(currentPeriod : PolicyPeriod) : ISelectQueryBuilder<PolicyPeriod> {
      return sameTermPeriodQuery(currentPeriod).compareIn(PolicyPeriod#Status, PolicyPeriod.statuses.PostedStatusSet.toArray())
    }
  }

  class TransactionTransformer implements Transformer<IEntityType, List<Transaction>> {
    private var _currentPeriod : PolicyPeriod
    private var _provider : QueryProvider

    construct(currentPeriod : PolicyPeriod, provider : QueryProvider) {
      _currentPeriod = currentPeriod
      _provider = provider
    }

    override function transform(transactionType : IEntityType) : List<Transaction> {
      return _provider.query(_currentPeriod, transactionType).select().iterator().toList() as List<Transaction>
    }
  }
}