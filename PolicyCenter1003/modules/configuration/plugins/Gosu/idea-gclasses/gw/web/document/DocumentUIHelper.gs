package gw.web.document

uses gw.api.domain.document.DocumentContainer
uses gw.i18n.ILocale
uses gw.document.DocumentCreationInfo

@Export
class DocumentUIHelper {

  public static function createDocumentCreationInfo(activity : Activity, policyPeriod: PolicyPeriod, jobContainer : Job, docContainer : DocumentContainer, docTemplate : String, locale : ILocale, contingency : Contingency) : DocumentCreationInfo {
    // adjust the other attributes from activity

    if (activity != null) {
      var doc = new Document()
      doc.Author = User.util.CurrentUser.DisplayName
      doc.Level = docContainer

      var dci = new gw.document.DocumentCreationInfo(doc)
      if (docTemplate != null) {
        var template = gw.plugin.Plugins.get(gw.plugin.document.IDocumentTemplateSource).getDocumentTemplate(docTemplate, locale)
        dci.DocumentTemplateDescriptor = template
        doc.Name = template.getName(template.Language)
        doc.Type = typekey.DocumentType.get(template.TemplateType)
        doc.SecurityType = typekey.DocumentSecurityType.get(template.DefaultSecurityType)
        doc.Section = typekey.DocumentSection.get(template.getMetadataPropertyValue("section") as String)
        doc.MimeType = template.MimeType
        doc.Status = TC_DRAFT
      }
      return dci
    }
    else if (jobContainer != null) {
      return gw.api.web.document.DocumentsHelper.createDocumentCreationInfo(jobContainer)
    }
    else if (contingency != null) {
      return gw.api.web.document.DocumentsHelper.createDocumentCreationInfo(contingency)
    } else {
      return gw.api.web.document.DocumentsHelper.createDocumentCreationInfo(policyPeriod.Policy)
    }
  }

}