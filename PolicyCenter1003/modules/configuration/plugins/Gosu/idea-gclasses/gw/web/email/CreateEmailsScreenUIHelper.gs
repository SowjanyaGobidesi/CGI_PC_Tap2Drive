package gw.web.email

uses gw.api.locale.DisplayKey
uses gw.api.system.PCConfigParameters
uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.integration.document.production.smartcomms.plugin.impl.SmartCommsDocumentProduction
uses gw.integration.document.production.web.EmailDocumentProductionInfo
uses gw.plugin.document.IDocumentTemplateDescriptor

@Export
class CreateEmailsScreenUIHelper {

  static function initLanguage(docContainer: gw.api.domain.document.DocumentContainer) : LanguageType {
    var lang : LanguageType = null
    if (docContainer typeis Account) {
      lang = docContainer.PrimaryLanguage
    } else if (docContainer typeis Policy) {
      lang = docContainer.PrimaryLanguage
    } else if (docContainer typeis Job) {
      lang = docContainer.Policy.PrimaryLanguage
    } else if (docContainer typeis PolicyPeriod) {
      lang = docContainer.Policy.PrimaryLanguage
    }
    if (lang == null) {
      lang = gw.api.util.LocaleUtil.getDefaultLanguageType()
    }
    return lang
  }


  static function initNewEmail( emailTemplate: String, noDefaultTemplate : Boolean, language: LanguageType,  symbolTable: java.util.Map<String, Object>, documentsToSend:Document[]) : gw.api.email.Email {
    var rtn = new gw.api.email.Email()
    if (emailTemplate != null) {
      executeTemplate(rtn, emailTemplate, noDefaultTemplate, language, symbolTable )
    }
    if (documentsToSend != null) {
      for (document in documentsToSend) {
        rtn.addDocument( document )
      }
    }
    return rtn
  }

  static function executeTemplate(rtn : gw.api.email.Email, emailTemplate: String, noDefaultTemplate : Boolean, language: LanguageType,  symbolTable: java.util.Map<String, Object>) {
    var templatePlugin = gw.plugin.Plugins.get(gw.plugin.email.IEmailTemplateSource)
    var template = templatePlugin.getEmailTemplate(gw.api.util.LocaleUtil.toLanguage(language), emailTemplate)
    if (template == null) {
      noDefaultTemplate = true
      throw new gw.api.util.DisplayableException (DisplayKey.get("Web.Activity.EmailTemplate.Language", emailTemplate, language))
    }
    else {
      rtn.useEmailTemplate(template, symbolTable)
    }
  }

  static function sendEmailToRecipients(
      emailToSend: gw.api.email.Email, language: LanguageType,
      saveAsDocument: Boolean, documentToSave: Document,
      docContainer: gw.api.domain.document.DocumentContainer,
      symbolTable: java.util.Map, emailTemplate: String,
      CurrentLocation: pcf.api.Location) {
    var warnings = gw.api.email.EmailUtil.emailContentsValid(emailToSend)
    if (warnings.length > 0) {
      throw new gw.api.util.DisplayableException(warnings)
    }
    if (saveAsDocument) {
      var template = getEmailDocumentTemplate(language)
      documentToSave = documentToSave != null ? documentToSave : new Document()
      documentToSave.Name  = emailToSend.Subject
      documentToSave.MimeType = template.MimeType
      documentToSave.Type = typekey.DocumentType.get(template.TemplateType)
      documentToSave.Section = typekey.DocumentSection.get(template.getMetadataPropertyValue( "section" ) as String) // assigment will force it to SectionType
      documentToSave.SecurityType = typekey.DocumentSecurityType.get(template.DefaultSecurityType)
      documentToSave.Status = TC_FINAL
      documentToSave.Recipient = emailToSend.ToRecipients.first().Name
      documentToSave.Author = User.util.CurrentUser.DisplayName
      documentToSave.Inbound = false
      documentToSave.Level = docContainer
      documentToSave.DateCreated = gw.api.util.DateUtil.currentDate()

      if (PCConfigParameters.DocumentProductionIntegrationEnabled.Value) {
        createDocumentExternally(template, emailToSend, documentToSave, symbolTable)
      } else {
        var paramMap = new java.util.HashMap (symbolTable)
        paramMap.put("User", User.util.CurrentUser)
        paramMap.put("Email", emailToSend)
        paramMap.put("DateSent", gw.api.util.DateUtil.currentDate())
        gw.document.DocumentProduction.createAndStoreDocumentSynchronously(template, paramMap, documentToSave)
      }
    } else if (documentToSave != null) {
      documentToSave.remove()
    }
    gw.api.email.EmailUtil.sendEmailWithBody(docContainer as KeyableBean, emailToSend)
    // it didn't throw so reset email template so that other templates can be used
    var actv = symbolTable.get("Activity")
    if (emailTemplate != null and actv typeis Activity) {
      if (actv.EmailTemplate == emailTemplate) {
        actv.EmailTemplate = null
      }
    }
    CurrentLocation.commit()
  }

  /**
   * @return document template for email
   *
   * Throws if no template is found.
   */
  private static function getEmailDocumentTemplate(language: LanguageType): IDocumentTemplateDescriptor {
    var templatePlugin = gw.plugin.Plugins.get(gw.plugin.document.IDocumentTemplateSource)
    var templateId = "CreateEmailSent.gosu.htm"
    if (PCConfigParameters.DocumentProductionIntegrationEnabled.Value) {
      templateId = SmartCommsConfigurationProvider.Configuration.EmailTemplateID
    }
    var template = templatePlugin.getDocumentTemplate(templateId, gw.api.util.LocaleUtil.toLanguage(language))
    if (template == null) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Activity.EmailTemplate.DoesNotExist", templateId, language))
    }
    return template
  }

  private static function createDocumentExternally(
      template: IDocumentTemplateDescriptor, emailToSend: gw.api.email.Email,
      documentToSave: Document, symbolTable: java.util.Map) {
    var info = new EmailDocumentProductionInfo()
    info.Email = emailToSend
    info.User = User.util.CurrentUser
    info.DateSent = gw.api.util.DateUtil.currentDate()

    // Copy interesting data from symbols.
    if (symbolTable != null) {
      for (value in symbolTable.values()) {
        if (value typeis PolicyPeriod)
          info.PolicyPeriod = value
        if (value typeis Policy)
          info.Policy = value
        if (value typeis Account)
          info.Account = value
        if (value typeis Contingency)
          info.Contingency = value
        if (value typeis Job)
          info.Job = value
        if (value typeis Activity)
          info.Activity = value
      }
    }

    gw.document.DocumentProduction.createAndStoreDocumentSynchronously(
        template,
        {SmartCommsDocumentProduction.CONTENT_SOURCE_KEY->info.buildEmailDocumentContent()},
        documentToSave)
  }
}