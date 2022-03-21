package gw.integration.document.production.gxmodel.document

uses gw.integration.document.production.gxmodel.account.accountmodel.Account
uses gw.integration.document.production.gxmodel.contact.addressmodel.Address
uses gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency
uses gw.integration.document.production.gxmodel.document.documentmodel.Document
uses gw.integration.document.production.gxmodel.job.jobmodel.Job
uses gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod
uses gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress
uses gw.integration.document.production.gxmodel.policy.policymodel.Policy
uses gw.xml.gx.PropertyLabel

@Export
class DocumentModelHelper {

  private construct() {
  }

  /**
   * Get the BlankDocumentModel labels for the DocumentModel and any sub models with the label
   *
   * @return a list of BlankDocumentLModel labels
   */
  static property get BlankDocumentModelLabels(): Collection<PropertyLabel> {
    return DocumentModelHelper.DefaultLabels
  }

  /**
   * Get the BasicPolicyModel labels for the DocumentModel GX Model and any sub models with the label
   *
   * @return a list of BasicPolicyModel labels
   */
  static property get BasicPolicyModelLabels(): Collection<PropertyLabel> {
    var labels = DocumentModelHelper.DefaultLabels
    labels.addAll({
        Document.Label.BasicPolicyModel,
        PolicyPeriod.Label.BasicPolicyModel,
        PolicyAddress.Label.BasicPolicyModel,
        Address.Label.BasicPolicyModel})
    return labels
  }

  /**
   * Get the BasicDocumentModel labels for the DocumentModel GX Model and any sub models with the label
   *
   * @return a list of BasicDocumentModel labels
   */
  static property get BasicDocumentModelLabels(): Collection<PropertyLabel> {
    var labels = DocumentModelHelper.DefaultLabels
    labels.addAll({
        Document.Label.BasicDocumentModel,
        PolicyPeriod.Label.BasicDocumentModel,
        Policy.Label.BasicDocumentModel,
        Job.Label.BasicDocumentModel,
        Account.Label.BasicDocumentModel,
        Contingency.Label.BasicDocumentModel})
    return labels
  }

  static property get DefaultLabels(): Collection<PropertyLabel> {
    return {Document.Label.Always}
  }
}