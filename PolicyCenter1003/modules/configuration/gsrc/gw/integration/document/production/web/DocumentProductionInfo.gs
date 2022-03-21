package gw.integration.document.production.web

uses gw.api.locale.DisplayKey
uses gw.api.util.LocaleUtil
uses gw.plugin.Plugins
uses gw.plugin.document.IDocumentTemplateDescriptor
uses gw.plugin.document.production.DraftDocumentHandler

/**
 * Information collected in UI to create a new document.
 */
@Export
class DocumentProductionInfo extends DocumentProductionInfoBase {
  static var SECTION = "section"

  enum DocumentSource {
    Account, Activity, Contingency, Job, PolicyPeriod
  }

  var _template: IDocumentTemplateDescriptor as Template
  var _source: DocumentSource as Source
  var _name: String as Name
  var _securityType: typekey.DocumentSecurityType as SecurityType
  var _description: String as Description
  var _type: typekey.DocumentType as Type
  var _author: String as Author = User.util.CurrentUser.DisplayName
  var _obsolete: Boolean as Obsolete = false

  construct(source: DocumentSource) {
    _source = source
  }

  property get Title(): String {
    if (this.Contingency != null) {
      return DisplayKey.get("Web.Document.Integration.DocumentCreation.Title.Contingency", Contingency.Title)
    } else if (this.PolicyPeriod != null) {
      return DisplayKey.get("Web.Document.Integration.DocumentCreation.Title.PolicyPeriod", PolicyPeriod.Job.DisplayType, PolicyPeriod.Job.JobNumber)
    } else if (this.Job != null) {
      return DisplayKey.get("Web.Document.Integration.DocumentCreation.Title.Job", Job.DisplayType, Job.JobNumber)
    } else if (this.Policy != null) {
      var period = entity.Policy.finder.findPolicyPeriodByPolicyAndAsOfDate(this.Policy, Date.Today)
      if (period == null) {
        period = this.Policy.Periods.last()
      }
      return DisplayKey.get("Web.Document.Integration.DocumentCreation.Title.Policy", period)
    } else if (this.Account != null) {
      return DisplayKey.get("Web.Document.Integration.DocumentCreation.Title.Account", Account)
    } else {
      return ""
    }
  }

  /**
   * Creates new document with collected information.
   *
   * @param document
   */
  function createDocument(): Document {
    var document = new Document()
    document.Name = _name
    document.TemplateID = this.Template.TemplateId
    document.Account = this.Account
    document.Policy = this.Policy
    document.PolicyPeriod = this.PolicyPeriod
    document.Contingency = this.Contingency
    document.Job = this.Job
    if (this.Template.DefaultSecurityType != null) {
      document.SecurityType = typekey.DocumentSecurityType.get(this.Template.DefaultSecurityType)
    }
    document.Description = _description
    if (this.Template.TemplateType.NotBlank) {
      document.Type = typekey.DocumentType.get(this.Template.TemplateType)
    } else {
      document.Type = DocumentType.TC_OTHER
    }
    if (this.Template.getMetadataPropertyValue(SECTION) != null) {
      document.Section = typekey.DocumentSection.get(this.Template.getMetadataPropertyValue(SECTION) as String)
    }
    document.MimeType = this.Template.MimeType
    document.Author = _author
    document.Obsolete = _obsolete
    document.Language = {
        LocaleUtil.toLanguageType(this.Template.Language),
        LocaleUtil.getDefaultLanguageType()}.firstWhere(\elt -> elt != null)
    return document
  }

  /**
   * Calls the configured document production system and retrieves draftContent for the given document entity
   * (using document template)
   * @param document document entity
   * @return DraftDocument
   */
  function retrieveDraftDocument(document: Document): DraftDocument {
    if (document.DraftDocument != null) {
      return document.DraftDocument
    }
    var draftDocumentHandler = Plugins.get(DraftDocumentHandler)
    var draftContent = draftDocumentHandler.createDraft(document)
    draftDocumentHandler.storeDraft(document, draftContent)
    return document.DraftDocument
  }
}