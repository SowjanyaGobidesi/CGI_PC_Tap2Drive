package gw.job.audit
uses gw.api.locale.DisplayKey
uses java.util.Date
uses java.lang.Integer
uses gw.pl.currency.MonetaryAmount

@Export
class DisplayableAuditInfo {
  private var _audit : Audit as readonly Audit
  private var _startDate : Date as readonly StartDate
  private var _endDate : Date as readonly EndDate
  private var _initDate : Date as readonly InitDate
  private var _dueDate : Date as readonly DueDate
  private var _status : String as readonly Status
  private var _statusPriority : Integer as readonly StatusPriority
  private var _type : String as readonly Type
  private var _method : String as readonly Method
  private var _transactionAmount : MonetaryAmount as readonly TransactionAmount
  private var _totalCost : MonetaryAmount as readonly TotalCost
  private var _complete : Boolean as readonly Complete
  private var _closeDate : Date as readonly CloseDate
  private var _waive : Boolean as readonly Waive
  private var _actualInfo : AuditInformation as readonly ActualInfo
  
  
  construct (info: AuditInformation) {
    updateAttributes(info)
  }
  
  private function updateAttributes(info : AuditInformation) {
    _actualInfo = info
    _audit = info.Audit
    _startDate = info.AuditPeriodStartDate
    _endDate = info.AuditPeriodEndDate
    _closeDate = info.Audit.CloseDate
    _complete = info.Audit.Complete
    _waive = info.Waive
    _type = info.UIDisplayName
    _status = info.DisplayStatus
    if (info.IsReversal) {
      _statusPriority = 2
    }
    else if (info.HasBeenReversed) {
      _statusPriority = 1
    }
    else {
      _statusPriority = 3
    }
    _initDate = selectDate(info, info.InitDate)
    _dueDate = selectDate(info, info.DueDate)
    _method = info.ActualAuditMethod == null
        ? info.AuditMethod.DisplayName
        : info.ActualAuditMethod.DisplayName
    updateFinancials(info)
  }

  private function selectDate(info : AuditInformation, date : Date) : Date {
    return (info.IsRevision or info.IsReversal ? null : date.trimToMidnight())
  }
  
  private function updateFinancials(info : AuditInformation) {
    if (info.DisplayStatus == DisplayKey.get("Web.PolicyFile.Audits.Completed")
        or info.DisplayStatus == DisplayKey.get("Audit.DisplayStatus.Revised")) {
      var period = info.Audit.PolicyPeriod
      _transactionAmount = period.TransactionCostRPT
      _totalCost = period.TotalCostRPT
    }
    else {
      _transactionAmount = null
      _totalCost = null
    }
  }
}
