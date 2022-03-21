package gw.document

uses gw.api.admin.MessagingUtil
uses gw.api.locale.DisplayKey
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PCLoggerCategory
uses gw.api.system.PLConfigParameters
uses gw.integration.document.production.web.DocumentProductionInfo
uses gw.plugin.Plugins
uses gw.plugin.document.IDocumentContentSource
uses gw.plugin.document.IDocumentMetadataSource
uses gw.plugin.document.IDocumentProduction
uses gw.plugin.document.IDocumentTemplateSerializer
uses gw.plugin.document.IDocumentTemplateSource
uses pcf.AccountNewDocumentFromTemplateWorksheet
uses pcf.CreateDraftWorksheet
uses pcf.EditDraftWorksheet
uses pcf.NewDocumentFromTemplateWorksheet
uses pcf.TemplateSelectionWorksheet
uses pcf.api.Location
uses entity.Job
uses entity.Activity

/**
 * UI helper functions for the Documents UI in DocumentsLVs and DocumentPropertiesPopups
 */
@Export
class DocumentsActionsUIHelper {


  /********************* Plugins Helpers *********************************************
   *
   *  IDocumentContentSource and IDocumentMetadataSource plugin helpers.
   *
   ***********************************************************************************/

  /**
   * Determines the asynchronous message to display in the documents actions while the
   * document is being stored in the DMS.
   *
   * @return Asynchronous message for document actions
   */
  static property get AsynchronousActionsMessage(): String {
    return DocumentStoreSuspended ?
        DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.Pending") :
        DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.Pending.Refresh")
  }

  /**
   * Check if the message for the DocumentStore disabled needs to
   * show in the Documents Tab and the Document properties page.
   *
   * @return whether the DocumentStore suspended message should show
   */
  static property get ShowDocumentStoreSuspendedWarning(): boolean {
    return DocumentStoreSuspended
  }

  /**
   * If the Metadata plugin is enabled, this returns whether it is available
   * Otherwise, it returns true
   */
  static property get ShowMetadataServerDownWarning(): boolean {
    return MetadataSourceEnabled and not DocumentMetadataServerAvailable
  }

  /**
   * Gets the status of the DocumentStore transport for the Asynchronous configuration
   * of the IDocumentContentSource plugin.
   *
   * @return true if the MessageDestinationStatus for DocumentStore is suspended. Also returns false if the
   * DocumentStore destination is disabled because there is not a DestinationInfo for it in the MessagingUtil
   */
  static property get DocumentStoreSuspended(): boolean {
    var documentStoreDestination = MessagingUtil.getDestinationInfo().where(\destInfo -> destInfo.DestId == 324)
    if (documentStoreDestination.HasElements) {
      if (documentStoreDestination.Count > 1) {
        PCLoggerCategory.DOCUMENT.error("You have defined more than one configuration for the destination 324 in your messaging-config.xml. Please" +
            "take a look and make sure you only have one definition")
      }
      return MessageDestinationStatus.TF_UNAVAILABLE.TypeKeys.contains(documentStoreDestination.single().Status)
    } else {
      return false
    }
  }

  /**
   * Checks whether the actions in the Documents ListView are not visible because document is 'in flight'
   *
   * @param document
   * @return whether the document is 'in flight'
   */
  static function isDocumentPending(document: Document): boolean {
    return document.PendingDocUID != null and document.DMS
  }

  /**
   * Determines if the IDocumentContentSource plugin is enabled and available to communicate with the DMS
   *
   * @return whether the DMS is available to do actions with the documents
   */
  static property get DocumentContentServerAvailable(): boolean {
    return ContentSourceEnabled and gw.plugin.Plugins.get(IDocumentContentSource).isOutboundAvailable()
  }

  /**
   * Determines if the IDocumentMetadataSource plugin is enabled and available to communicate with the DMS
   *
   * @return whether the DMS is available to do access document metadata
   */
  static property get DocumentMetadataServerAvailable(): boolean {
    return MetadataSourceEnabled and
        (gw.plugin.Plugins.get(IDocumentMetadataSource)).isOutboundAvailable()
  }

  /**
   * Checks if the IDocumentContentSource plugin is configured enabled.
   *
   * @return whether the IDCS plugin is enabled
   */
  static property get ContentSourceEnabled(): boolean {
    return gw.plugin.Plugins.isEnabled(gw.plugin.document.IDocumentContentSource)
  }

  /**
   * Checks if the IDocumentMetadataSource plugin is configured enabled.
   *
   * @return whether the IDMS plugin is enabled
   */
  static property get MetadataSourceEnabled(): boolean {
    return gw.plugin.Plugins.isEnabled(gw.plugin.document.IDocumentMetadataSource)
  }

  /**
   * Checks if the document is stored in the DMS and it is accessible. The documents that
   * are in the temporary location are not in the DMS.
   *
   * @param document
   * @return
   */
  static private function documentStoredInDMS(document: Document): boolean {
    return ContentSourceEnabled and document.PendingDocUID == null and document.DMS
  }

  /********************* Available Helpers *********************************************
   *
   *  Document actions' availability helpers.
   *
   *************************************************************************************/

  /**
   * Tells whether to enable document actions related to the metadata of the
   * document that are independent on the content.
   *
   * @return true if the document metadata server is available, false otherwise
   */
  static property get DocumentMetadataActionsAvailable(): boolean {
    if (MetadataSourceEnabled) {
      return DocumentMetadataServerAvailable
    }
    return ContentSourceEnabled
  }

  static function isViewDocumentContentAvailable(document: Document, contentActionsEnabled: boolean): boolean {
    return contentActionsEnabled and perm.Document.view(document) and document.DMS and
        document.ContentExist and document.PendingDocUID == null and
        document.DocumentMimeTypeAllowed
  }

  static function isDownloadDocumentContentAvailable(document: Document): boolean {
    return DocumentContentActionsAvailable and document.ContentExist
  }

  static function isDeleteDocumentLinkAvailable(document: Document): boolean {
    return DocumentMetadataActionsAvailable
  }

  static function isUploadDocumentContentAvailable(document: Document): boolean {
    return DocumentMetadataActionsAvailable and
        DocumentMetadataActionsAvailable and
        document.ContentExist
  }

  static function isDocumentContentActionsAvailableInDocumentProperties(editable: boolean, document: Document): boolean {
    return not editable and document.ContentExist and document.PendingDocUID == null
        and DocumentContentActionsAvailable
  }

  /**
   * Whether or not Content actions are available. This depends on whether the Content Server is available according
   * to the enabled plugin
   */
  static property get DocumentContentActionsAvailable(): boolean {
    return ContentSourceEnabled and DocumentContentServerAvailable
  }

  /**
   * For template actions to be available, all 4 plugins must be available
   * The document must be picked (TemplateSource), generated (DocumentProduction),
   * and stored(Metadata and Content)
   *
   * @return
   */
  static property get DocumentTemplateActionsAvailable(): boolean {
    return DocumentProductionAvailable
        and DocumentTemplateSourceAvailable
        and DocumentMetadataActionsAvailable
        and DocumentContentActionsAvailable
  }

  /**
   * returns whether the DocumentProduction plugin is enabled
   */
  static property get DocumentProductionAvailable(): boolean {
    return Plugins.isEnabled(IDocumentProduction)
  }

  /**
   * returns whether the TemplateSource plugin is available
   * For the LocalDocumentTemplateSource, the TemplateSerializer needs to be enabled as well
   */
  static property get DocumentTemplateSourceAvailable(): boolean {
    return Plugins.isEnabled(IDocumentTemplateSource) and Plugins.isEnabled(IDocumentTemplateSerializer)
  }

  /*********************
   * Visible Helpers *********************************************
   * <p>
   * Document actions' visibility helpers.
   ***********************************************************************************/

  static function isDownloadDocumentContentVisible(document: Document): boolean {
    return perm.Document.view(document) and documentStoredInDMS(document)
  }

  static function isUploadDocumentContentVisible(document: Document): boolean {
    return PLConfigParameters.DisplayDocumentEditUploadButtons.Value and
        perm.Document.edit(document) and documentStoredInDMS(document)
  }

  static function isDeleteDocumentLinkVisible(document: Document): boolean {
    return document.PendingDocUID == null and perm.Document.delete(document)
  }

  static function isUploadDocumentContentVisibleInDocumentProperties(editable: boolean, document: Document): boolean {
    return not editable and ContentSourceEnabled and perm.Document.edit(document) and
        document.DMS and PLConfigParameters.DisplayDocumentEditUploadButtons.Value
  }

  static function isDownloadDocumentContentVisibleInDocumentProperties(editable: boolean, document: Document): boolean {
    return not editable and ContentSourceEnabled and perm.Document.view(document) and document.DMS
  }

  static function isIconSpacerVisible(editable: boolean, document: Document): boolean {
    return isDownloadDocumentContentVisibleInDocumentProperties(editable, document)
  }

  static function isShowAsynchronousRefreshAction(documents: Document[]): boolean {
    return documents.hasMatch(\d -> isDocumentPending(d)) and not ShowDocumentStoreSuspendedWarning
  }

  /*********************
   * Tooltip Helpers *********************************************
   * <p>
   * Document actions' tooltips helpers. There are different tooltips based on the
   * availability and visibility.
   ***********************************************************************************/

  static property get UploadDocumentContentTooltip(): String {
    return DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.Upload.Tooltip")
  }

  static property get DownloadDocumentContentTooltip(): String {
    return DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.Download.Tooltip")
  }

  static property get ViewDocumentPropertiesTooltip(): String {
    return DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.ViewProperties.Tooltip")
  }

  static property get DocumentProductionIntegrationEnabled(): boolean {
    return PCConfigParameters.DocumentProductionIntegrationEnabled.Value
  }

  /**
   * Retrieves the corresponding view content tooltip for the document. It checks on the content,
   * file type and permission.
   *
   * @return tooltip for View document content action
   */
  static function getViewDocumentContentTooltip(document: Document): String {
    if (document != null) {
      if (!document.DocumentMimeTypeAllowed) {
        return DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.ViewContent.MissingMimetype.Tooltip")
      } else if (!perm.Document.view(document)) {
        return DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.ViewContent.MissingViewPermission.Tooltip")
      }
    }
    return DisplayKey.get("Web.Policy.Documents.Document.ViewAndEdit.ViewContent.Tooltip")
  }

  /**
   * Opens account document template selection worksheet in workspace.
   *
   * @param account worksheet variable
   * @return relevant worksheet instance
   * Note that in tests: button with this action click() method
   * will NOT return anything and you have to use button.clickThis(type).
   */
  static function goInAccountNewDocumentFromTemplateWorksheet(account: Account): Location {
    if (DocumentProductionIntegrationEnabled) {
      var info = new DocumentProductionInfo(DocumentProductionInfo.DocumentSource.Account)
      info.Account = account
      return goToTemplateSelectionWorksheet(info)
    }
    return AccountNewDocumentFromTemplateWorksheet.goInWorkspace(account)
  }

  /**
   * Opens policy document template selection worksheet in workspace.
   *
   * @param policyPeriod worksheet variable
   * @return relevant worksheet instance
   * Note that in tests: button with this action click() method
   * will NOT return anything and you have to use button.clickThis(type).
   */
  static function goInNewDocumentFromTemplateWorksheet(policyPeriod: PolicyPeriod): Location {
    if (DocumentProductionIntegrationEnabled) {
      var info = new DocumentProductionInfo(DocumentProductionInfo.DocumentSource.PolicyPeriod)
      info.PolicyPeriod = policyPeriod
      return goToTemplateSelectionWorksheet(info)
    }
    return NewDocumentFromTemplateWorksheet.goInWorkspace(policyPeriod)
  }

  /**
   * Opens job document template selection worksheet in workspace.
   *
   * @param policyPeriod worksheet variable
   * @param jobContainer worksheet variable
   * @return relevant worksheet instance
   * Note that in tests: button with this action click() method
   * will NOT return anything and you have to use button.clickThis(type).
   */
  static function goInNewDocumentFromTemplateWorksheet(policyPeriod: PolicyPeriod, jobContainer: Job): Location {
    if (DocumentProductionIntegrationEnabled) {
      var info = new DocumentProductionInfo(DocumentProductionInfo.DocumentSource.Job)
      info.PolicyPeriod = policyPeriod
      info.Job = jobContainer
      return goToTemplateSelectionWorksheet(info)
    }
    return NewDocumentFromTemplateWorksheet.goInWorkspace(policyPeriod, jobContainer)
  }

  /**
   * Opens contingency document template selection worksheet in workspace.
   *
   * @param contingency worksheet variable
   * @return relevant worksheet instance
   * Note that in tests: button with this action click() method
   * will NOT return anything and you have to use button.clickThis(type).
   */
  static function goInNewDocumentFromTemplateWorksheet(contingency: Contingency): Location {
    if (DocumentProductionIntegrationEnabled) {
      var info = new DocumentProductionInfo(DocumentProductionInfo.DocumentSource.Contingency)
      info.Contingency = contingency
      return goToTemplateSelectionWorksheet(info)
    }
    return NewDocumentFromTemplateWorksheet.goInWorkspace(contingency)
  }

  static function goInNewDocumentFromTemplateWorksheet(activity: Activity): Location {
    var info = new DocumentProductionInfo(DocumentProductionInfo.DocumentSource.Activity)
    info.Activity = activity
    return goToTemplateSelectionWorksheet(info)
  }

  /**
   * If we already have worksheet opened for this document production context
   * goes into it. Otherwise creates a new one.
   * @param info context of document creation
   * @return result of @{link openNew} if it was invoked. null otherwise.
   */
  static function goToTemplateSelectionWorksheet(info: DocumentProductionInfo): Location {
    if (maybeGoIntoExistingDocumentCreation(info)) {
      return null
    }
    return TemplateSelectionWorksheet.goInWorkspace(info)
  }

  /**
   * Tries to find visible worksheet with the same document creation context
   * and goes into it.
   *
   * We need that as one document production flow uses three different
   * worksheets but we would like to keep normal behaviour of keeping only
   * one flow per context.
   * Normally it is done via comparison of id and subset of arguments
   * (see {@link Destination#isEquivalentTo}).
   * Here we do similar thing manually.
   *
   * @param info initial info about document
   * @return whether existing worksheet is found.
   */
  private static function maybeGoIntoExistingDocumentCreation(
      info: DocumentProductionInfo): boolean {
    return PCDependenciesGateway.goIntoMatchingWorksheet(\ id, variables -> {
      if (id == TemplateSelectionWorksheet.RelativeName||
          id == CreateDraftWorksheet.RelativeName ||
          id == EditDraftWorksheet.RelativeName) {
        for (value in variables) {
          if (value typeis DocumentProductionInfo) {
            return isEquivalentDocumentProductionContext(value, info)
          }
        }
      }
      return false
    })
  }

  /**
   * Compares all values we specify before opening worksheet.
   * @return if initial context of infos is the same.
   */
  private static function isEquivalentDocumentProductionContext(
      lhs: DocumentProductionInfo, rhs: DocumentProductionInfo): boolean {
      return lhs.Source == rhs.Source &&
          lhs.PolicyPeriod == rhs.PolicyPeriod &&
          lhs.Job == rhs.Job &&
          lhs.Account == rhs.Account &&
          lhs.Contingency == rhs.Contingency
  }
}