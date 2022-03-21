package gw.plugin.billing.bc900

uses java.math.BigDecimal
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PremiumReportInfo

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement PremiumReportInfoEnhancement : PremiumReportInfo
{
  function sync(period : PolicyPeriod){
    this.syncBasicPolicyInfo(period)
    var auditInfo = period.Audit.AuditInformation
    this.AuditPeriodEndDate = auditInfo.AuditPeriodEndDate.XmlDateTime
    this.AuditPeriodStartDate = auditInfo.AuditPeriodStartDate.XmlDateTime
    var paymentReceived = period.Audit.PaymentReceived
    this.PaymentReceived = paymentReceived != null 
      and paymentReceived.Amount.compareTo( BigDecimal.ZERO ) > 0
  }
}
