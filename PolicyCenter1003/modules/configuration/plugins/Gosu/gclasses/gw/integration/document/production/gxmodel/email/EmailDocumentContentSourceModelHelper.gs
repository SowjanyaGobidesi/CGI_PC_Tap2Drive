package gw.integration.document.production.gxmodel.email

uses gw.integration.document.production.gxmodel.account.accountmodel.Account
uses gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency
uses gw.integration.document.production.gxmodel.job.jobmodel.Job
uses gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod
uses gw.integration.document.production.gxmodel.policy.policymodel.Policy
uses gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource
uses gw.xml.gx.PropertyLabel

@Export
class EmailDocumentContentSourceModelHelper {

  private construct() {
  }

  static property get DefaultLabels(): Collection<PropertyLabel> {
    return {EmailDocumentContentSource.Label.Always}
  }

  static property get BasicDocumentModelLabels(): Collection<PropertyLabel> {
    var labels = EmailDocumentContentSourceModelHelper.DefaultLabels
    labels.addAll({
        EmailDocumentContentSource.Label.BasicDocumentModel,
        PolicyPeriod.Label.BasicDocumentModel,
        Policy.Label.BasicDocumentModel,
        Job.Label.BasicDocumentModel,
        Account.Label.BasicDocumentModel,
        Contingency.Label.BasicDocumentModel})
    return labels
  }
}